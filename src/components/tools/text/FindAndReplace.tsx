'use client'

import { useState, useMemo, useCallback } from 'react'
import { useTranslations } from 'next-intl'

interface MatchInfo {
  index: number
  length: number
  match: string
}

export default function FindAndReplace() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.textTools')
  const [text, setText] = useState('')
  const [findValue, setFindValue] = useState('')
  const [replaceValue, setReplaceValue] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const [regexError, setRegexError] = useState('')
  const [copied, setCopied] = useState(false)

  const matches = useMemo((): MatchInfo[] => {
    if (!text || !findValue) return []

    try {
      setRegexError('')
      let pattern: RegExp

      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi'
        pattern = new RegExp(findValue, flags)
      } else {
        let escaped = findValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        if (wholeWord) {
          escaped = `\\b${escaped}\\b`
        }
        const flags = caseSensitive ? 'g' : 'gi'
        pattern = new RegExp(escaped, flags)
      }

      const result: MatchInfo[] = []
      let match: RegExpExecArray | null

      // Safety: prevent infinite loop on zero-length matches
      let iterations = 0
      const maxIterations = 10000

      while ((match = pattern.exec(text)) !== null && iterations < maxIterations) {
        result.push({
          index: match.index,
          length: match[0].length,
          match: match[0],
        })
        // Advance past zero-length matches
        if (match[0].length === 0) {
          pattern.lastIndex++
        }
        iterations++
      }

      return result
    } catch (e) {
      if (useRegex) {
        setRegexError(e instanceof Error ? e.message : t('invalidRegex'))
      }
      return []
    }
  }, [text, findValue, caseSensitive, useRegex, wholeWord])

  const replaceAll = useCallback(() => {
    if (!text || !findValue || matches.length === 0) return

    try {
      let pattern: RegExp

      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi'
        pattern = new RegExp(findValue, flags)
      } else {
        let escaped = findValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        if (wholeWord) {
          escaped = `\\b${escaped}\\b`
        }
        const flags = caseSensitive ? 'g' : 'gi'
        pattern = new RegExp(escaped, flags)
      }

      const newText = text.replace(pattern, replaceValue)
      setText(newText)
    } catch {
      // Error already shown via regexError
    }
  }, [text, findValue, replaceValue, caseSensitive, useRegex, wholeWord, matches.length])

  const replaceFirst = useCallback(() => {
    if (!text || !findValue || matches.length === 0) return

    try {
      let pattern: RegExp

      if (useRegex) {
        const flags = caseSensitive ? '' : 'i'
        pattern = new RegExp(findValue, flags)
      } else {
        let escaped = findValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        if (wholeWord) {
          escaped = `\\b${escaped}\\b`
        }
        const flags = caseSensitive ? '' : 'i'
        pattern = new RegExp(escaped, flags)
      }

      const newText = text.replace(pattern, replaceValue)
      setText(newText)
    } catch {
      // Error already shown via regexError
    }
  }, [text, findValue, replaceValue, caseSensitive, useRegex, wholeWord, matches.length])

  const highlightedHtml = useMemo(() => {
    if (!text || matches.length === 0) return null

    const parts: { text: string; isMatch: boolean }[] = []
    let lastEnd = 0

    for (const m of matches) {
      if (m.index > lastEnd) {
        parts.push({ text: text.slice(lastEnd, m.index), isMatch: false })
      }
      parts.push({ text: text.slice(m.index, m.index + m.length), isMatch: true })
      lastEnd = m.index + m.length
    }

    if (lastEnd < text.length) {
      parts.push({ text: text.slice(lastEnd), isMatch: false })
    }

    return parts
  }, [text, matches])

  const copy = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    setText(
      `The quick brown fox jumps over the lazy dog.
The quick brown cat jumps over the lazy dog.
The slow brown fox walks over the lazy dog.
The quick brown fox jumps over the happy dog.
The QUICK brown fox jumps over the lazy dog.`
    )
    setFindValue('quick')
    setReplaceValue('fast')
    setCaseSensitive(false)
    setUseRegex(false)
    setWholeWord(false)
  }

  const clear = () => {
    setText('')
    setFindValue('')
    setReplaceValue('')
    setRegexError('')
  }

  return (
    <div className="space-y-4">
      {/* Find & Replace inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('find')}</label>
          <input
            type="text"
            value={findValue}
            onChange={(e) => setFindValue(e.target.value)}
            placeholder={useRegex ? t('enterRegexPattern') : t('enterTextToFind')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('find')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('replaceWith')}</label>
          <input
            type="text"
            value={replaceValue}
            onChange={(e) => setReplaceValue(e.target.value)}
            placeholder={t('enterReplacementText')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('replaceWith')}
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">{t('caseSensitive')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => {
              setUseRegex(e.target.checked)
              setRegexError('')
            }}
            className="rounded"
          />
          <span className="text-sm">{t('regex')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={wholeWord}
            onChange={(e) => setWholeWord(e.target.checked)}
            disabled={useRegex}
            className="rounded"
          />
          <span className={`text-sm ${useRegex ? 'text-muted-foreground' : ''}`}>
            {t('wholeWord')}
          </span>
        </label>
      </div>

      {/* Match count & actions */}
      {findValue && (
        <div className="flex items-center flex-wrap gap-3">
          <span
            className={`text-sm font-medium ${
              matches.length > 0 ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {matches.length === 1
              ? t('matchesFound', { count: matches.length })
              : t('matchesFoundPlural', { count: matches.length })}
          </span>
          {matches.length > 0 && (
            <>
              <button
                onClick={replaceFirst}
                className="px-3 py-1.5 text-sm border rounded-lg hover:bg-accent transition-colors"
              >
                {t('replaceFirst')}
              </button>
              <button
                onClick={replaceAll}
                className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('replaceAll')}
              </button>
            </>
          )}
        </div>
      )}

      {regexError && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {t('regexError')}: {regexError}
        </div>
      )}

      {/* Text input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">{t('text')}</label>
          <div className="flex gap-2">
            {text && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label={tc('copy')}
              >
                {copied ? tc('copied') : tc('copy')}
              </button>
            )}
            <button
              onClick={loadSample}
              className="text-xs text-primary hover:underline"
            >
              {t('sample')}
            </button>
          </div>
        </div>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={t('enterOrPasteText')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text input for find and replace"
        />
      </div>

      {/* Highlighted preview */}
      {highlightedHtml && highlightedHtml.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('matchHighlights')} ({matches.length})
          </label>
          <div className="w-full rounded-lg border bg-muted/30 px-3 py-2 text-sm font-mono min-h-[100px] max-h-[300px] overflow-auto whitespace-pre-wrap break-words">
            {highlightedHtml.map((part, i) =>
              part.isMatch ? (
                <mark
                  key={i}
                  className="bg-yellow-300 dark:bg-yellow-600 text-foreground rounded px-0.5"
                >
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {text.trim() && (
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear all fields"
        >
          {t('clearAll')}
        </button>
      )}
    </div>
  )
}
