'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

export default function RegexTester() {
  const t = useTranslations('toolUI')
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [error, setError] = useState('')

  const results = useMemo(() => {
    if (!pattern || !testString) return null
    setError('')
    try {
      const regex = new RegExp(pattern, flags)
      const matches: { match: string; index: number; groups?: Record<string, string> }[] = []

      if (flags.includes('g')) {
        let m
        while ((m = regex.exec(testString)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.groups })
          if (!m[0]) break // prevent infinite loop on zero-length matches
        }
      } else {
        const m = regex.exec(testString)
        if (m) {
          matches.push({ match: m[0], index: m.index, groups: m.groups })
        }
      }

      return { matches, isMatch: matches.length > 0 }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid regular expression')
      return null
    }
  }, [pattern, flags, testString])

  const highlightedText = useMemo(() => {
    if (!pattern || !testString || !results?.isMatch) return null
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      const parts: { text: string; highlighted: boolean }[] = []
      let lastIndex = 0
      let m
      while ((m = regex.exec(testString)) !== null) {
        if (m.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, m.index), highlighted: false })
        }
        parts.push({ text: m[0], highlighted: true })
        lastIndex = m.index + m[0].length
        if (!m[0]) break
      }
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), highlighted: false })
      }
      return parts
    } catch {
      return null
    }
  }, [pattern, flags, testString, results])

  const flagOptions = [
    { value: 'g', label: 'Global (g)' },
    { value: 'i', label: 'Case Insensitive (i)' },
    { value: 'm', label: 'Multiline (m)' },
    { value: 's', label: 'Dot All (s)' },
  ]

  const toggleFlag = (flag: string) => {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, '') : prev + flag))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('regex')}</label>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-lg">/</span>
          <input
            type="text"
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter regex pattern..."
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
          <span className="text-muted-foreground text-lg">/{flags}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t('flags')}</label>
        <div className="flex flex-wrap gap-2">
          {flagOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => toggleFlag(f.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                flags.includes(f.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t('testString')}</label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[120px] font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter text to test against..."
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {highlightedText && (
        <div>
          <label className="text-sm font-medium mb-1 block">{t('matches')}</label>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm font-mono whitespace-pre-wrap break-all">
            {highlightedText.map((part, i) =>
              part.highlighted ? (
                <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {results && (
        <div>
          <label className="text-sm font-medium mb-1 block">
            Matches ({results.matches.length})
          </label>
          {results.matches.length === 0 ? (
            <p className="text-sm text-muted-foreground">No matches found</p>
          ) : (
            <div className="rounded-lg border divide-y">
              {results.matches.map((m, i) => (
                <div key={i} className="p-3 text-sm">
                  <span className="font-mono bg-primary/10 px-1.5 py-0.5 rounded">{m.match}</span>
                  <span className="text-muted-foreground ml-2">at index {m.index}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
