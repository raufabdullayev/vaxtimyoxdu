'use client'

import { useState, useMemo } from 'react'

type TruncateMode = 'characters' | 'words' | 'sentences'
type EllipsisPosition = 'end' | 'middle' | 'start'

export default function TextTruncator() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<TruncateMode>('characters')
  const [limit, setLimit] = useState(100)
  const [ellipsis, setEllipsis] = useState('...')
  const [position, setPosition] = useState<EllipsisPosition>('end')
  const [preserveWords, setPreserveWords] = useState(true)
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => {
    const text = input
    return {
      characters: text.length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      sentences: text.trim() ? text.split(/[.!?]+\s*/).filter(Boolean).length : 0,
    }
  }, [input])

  const truncated = useMemo(() => {
    if (!input.trim()) return ''
    const text = input

    if (mode === 'characters') {
      if (text.length <= limit) return text

      if (position === 'end') {
        if (preserveWords) {
          const sub = text.slice(0, limit)
          const lastSpace = sub.lastIndexOf(' ')
          if (lastSpace > 0) return sub.slice(0, lastSpace) + ellipsis
          return sub + ellipsis
        }
        return text.slice(0, limit) + ellipsis
      }

      if (position === 'start') {
        if (preserveWords) {
          const sub = text.slice(text.length - limit)
          const firstSpace = sub.indexOf(' ')
          if (firstSpace > 0) return ellipsis + sub.slice(firstSpace + 1)
          return ellipsis + sub
        }
        return ellipsis + text.slice(text.length - limit)
      }

      // middle
      const half = Math.floor(limit / 2)
      const start = text.slice(0, half)
      const end = text.slice(text.length - half)
      return start + ellipsis + end
    }

    if (mode === 'words') {
      const words = text.trim().split(/\s+/)
      if (words.length <= limit) return text

      if (position === 'end') {
        return words.slice(0, limit).join(' ') + ellipsis
      }
      if (position === 'start') {
        return ellipsis + words.slice(words.length - limit).join(' ')
      }
      // middle
      const half = Math.floor(limit / 2)
      return words.slice(0, half).join(' ') + ellipsis + words.slice(words.length - half).join(' ')
    }

    if (mode === 'sentences') {
      const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean)
      if (sentences.length <= limit) return text

      if (position === 'end') {
        return sentences.slice(0, limit).join(' ') + ellipsis
      }
      if (position === 'start') {
        return ellipsis + sentences.slice(sentences.length - limit).join(' ')
      }
      const half = Math.floor(limit / 2)
      return sentences.slice(0, half).join(' ') + ellipsis + sentences.slice(sentences.length - half).join(' ')
    }

    return text
  }, [input, mode, limit, ellipsis, position, preserveWords])

  const copy = async () => {
    await navigator.clipboard.writeText(truncated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    setInput('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Input Text</label>
          <button onClick={loadSample} className="text-xs text-primary hover:underline">
            Load Sample
          </button>
        </div>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter or paste your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Text input"
        />
        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
          <span>{stats.characters} characters</span>
          <span>{stats.words} words</span>
          <span>{stats.sentences} sentences</span>
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Truncate mode */}
        <div>
          <label className="block text-sm font-medium mb-1">Truncate By</label>
          <div className="flex gap-2">
            {([
              { value: 'characters' as const, label: 'Chars' },
              { value: 'words' as const, label: 'Words' },
              { value: 'sentences' as const, label: 'Sentences' },
            ]).map((m) => (
              <button
                key={m.value}
                onClick={() => {
                  setMode(m.value)
                  setLimit(m.value === 'characters' ? 100 : m.value === 'words' ? 20 : 3)
                }}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === m.value
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Limit */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Limit: {limit} {mode}
          </label>
          <input
            type="number"
            min={1}
            max={mode === 'characters' ? 10000 : mode === 'words' ? 1000 : 100}
            value={limit}
            onChange={(e) => setLimit(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Truncation limit"
          />
        </div>

        {/* Ellipsis position */}
        <div>
          <label className="block text-sm font-medium mb-1">Ellipsis Position</label>
          <div className="flex gap-2">
            {([
              { value: 'end' as const, label: 'End' },
              { value: 'middle' as const, label: 'Middle' },
              { value: 'start' as const, label: 'Start' },
            ]).map((p) => (
              <button
                key={p.value}
                onClick={() => setPosition(p.value)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  position === p.value
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ellipsis character */}
        <div>
          <label className="block text-sm font-medium mb-1">Ellipsis String</label>
          <input
            type="text"
            value={ellipsis}
            onChange={(e) => setEllipsis(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="..."
            aria-label="Ellipsis string"
          />
        </div>
      </div>

      {/* Preserve words option */}
      {mode === 'characters' && position !== 'middle' && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={preserveWords}
            onChange={(e) => setPreserveWords(e.target.checked)}
            className="accent-primary"
          />
          Preserve whole words (don't cut in the middle of a word)
        </label>
      )}

      {/* Output */}
      {truncated && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">
              Result ({truncated.length} characters)
            </label>
            <button onClick={copy} className="text-xs text-primary hover:underline">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="rounded-lg border bg-muted/50 px-3 py-2 text-sm whitespace-pre-wrap">
            {truncated}
          </div>
        </div>
      )}
    </div>
  )
}
