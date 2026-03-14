'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

interface TextStats {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  readingTime: string
  speakingTime: string
  avgWordLength: number
  longestWord: string
  uniqueWords: number
}

function calculateStats(text: string): TextStats {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length

  const trimmed = text.trim()
  const words = trimmed ? trimmed.split(/\s+/).length : 0

  // Sentences: split on . ! ? followed by space or end of string
  const sentences = trimmed
    ? (trimmed.match(/[.!?]+(?:\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0)
    : 0

  // Paragraphs: non-empty blocks separated by blank lines
  const paragraphs = trimmed
    ? trimmed
        .split(/\n\s*\n/)
        .filter((p) => p.trim().length > 0).length
    : 0

  const lines = text ? text.split('\n').length : 0

  // Reading time: ~200-250 words per minute
  const readingMinutes = words / 225
  const readingTime = formatTime(readingMinutes)

  // Speaking time: ~125-150 words per minute
  const speakingMinutes = words / 130
  const speakingTime = formatTime(speakingMinutes)

  // Average word length
  const wordList = trimmed ? trimmed.split(/\s+/) : []
  const avgWordLength =
    wordList.length > 0
      ? Math.round(
          (wordList.reduce((sum, w) => sum + w.replace(/[^a-zA-Z0-9]/g, '').length, 0) /
            wordList.length) *
            10
        ) / 10
      : 0

  // Longest word
  const longestWord =
    wordList.length > 0
      ? wordList.reduce((longest, w) => {
          const clean = w.replace(/[^a-zA-Z0-9'-]/g, '')
          return clean.length > longest.length ? clean : longest
        }, '')
      : ''

  // Unique words
  const uniqueWords = new Set(wordList.map((w) => w.toLowerCase().replace(/[^a-z0-9'-]/g, '')))
  const uniqueCount = wordList.length > 0 ? uniqueWords.size : 0

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
    avgWordLength,
    longestWord,
    uniqueWords: uniqueCount,
  }
}

function formatTime(minutes: number): string {
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60)
    return `${seconds}s`
  }
  const mins = Math.floor(minutes)
  const secs = Math.round((minutes - mins) * 60)
  if (mins === 0) return `${secs}s`
  if (secs === 0) return `${mins}m`
  return `${mins}m ${secs}s`
}

interface CharFreq {
  char: string
  count: number
  percentage: number
}

function getCharFrequency(text: string, top: number = 10): CharFreq[] {
  if (!text) return []
  const freq: Record<string, number> = {}
  for (const char of text) {
    if (char === ' ' || char === '\n' || char === '\t') continue
    const lower = char.toLowerCase()
    freq[lower] = (freq[lower] || 0) + 1
  }
  const total = Object.values(freq).reduce((a, b) => a + b, 0)
  return Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, top)
    .map(([char, count]) => ({
      char,
      count,
      percentage: Math.round((count / total) * 1000) / 10,
    }))
}

export default function CharacterCounter() {
  const t = useTranslations('toolUI')
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => calculateStats(text), [text])
  const charFreq = useMemo(() => getCharFrequency(text), [text])

  const copy = async () => {
    const report = [
      `Characters: ${stats.characters}`,
      `Characters (no spaces): ${stats.charactersNoSpaces}`,
      `Words: ${stats.words}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Lines: ${stats.lines}`,
      `Reading Time: ${stats.readingTime}`,
      `Speaking Time: ${stats.speakingTime}`,
      `Avg Word Length: ${stats.avgWordLength}`,
      `Unique Words: ${stats.uniqueWords}`,
      `Longest Word: ${stats.longestWord}`,
    ].join('\n')
    await navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    setText(
      `The quick brown fox jumps over the lazy dog. This is a classic pangram that contains every letter of the English alphabet at least once.

Pangrams are often used to test fonts, keyboards, and other text-related tools. They provide a good way to see all characters in a single sentence.

Another well-known pangram is: "Pack my box with five dozen liquor jugs." Both sentences serve the same purpose but use different words and structures.`
    )
  }

  return (
    <div className="space-y-4">
      {/* Primary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.characters}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('characters')}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('characters')}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.words}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('words')}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('sentences')}</div>
        </div>
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('paragraphs')}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.lines}</div>
          <div className="text-xs text-muted-foreground mt-1">Lines</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.readingTime}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('readingTime')}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.speakingTime}</div>
          <div className="text-xs text-muted-foreground mt-1">{t('speakingTime')}</div>
        </div>
      </div>

      {/* Additional stats */}
      {text.trim() && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-xl font-bold text-primary">{stats.avgWordLength}</div>
            <div className="text-xs text-muted-foreground mt-1">Avg Word Length</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-xl font-bold text-primary">{stats.uniqueWords}</div>
            <div className="text-xs text-muted-foreground mt-1">Unique Words</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div
              className="text-xl font-bold text-primary truncate"
              title={stats.longestWord}
            >
              {stats.longestWord || '-'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Longest Word</div>
          </div>
        </div>
      )}

      {/* Text input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Your Text</label>
          <div className="flex gap-2">
            {text.trim() && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label="Copy stats report"
              >
                {copied ? t('copied') : t('copy')}
              </button>
            )}
            <button
              onClick={loadSample}
              className="text-xs text-primary hover:underline"
            >
              {t('loadSample')}
            </button>
          </div>
        </div>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Start typing or paste your text here to see detailed character statistics..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text input for character counting"
        />
      </div>

      {/* Character frequency */}
      {charFreq.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Top Character Frequency
          </label>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_80px_80px] text-xs font-medium bg-muted/50 px-3 py-2 border-b">
              <span>Char</span>
              <span>Bar</span>
              <span className="text-right">Count</span>
              <span className="text-right">%</span>
            </div>
            {charFreq.map((item) => (
              <div
                key={item.char}
                className="grid grid-cols-[60px_1fr_80px_80px] items-center px-3 py-1.5 border-b last:border-b-0 text-sm"
              >
                <span className="font-mono font-bold">
                  {item.char === ' ' ? 'SPC' : item.char}
                </span>
                <div className="pr-4">
                  <div
                    className="h-4 rounded-sm bg-primary/20"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-right text-muted-foreground">{item.count}</span>
                <span className="text-right text-muted-foreground">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {text.trim() && (
        <button
          onClick={() => setText('')}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear text"
        >
          {t('clear')}
        </button>
      )}
    </div>
  )
}
