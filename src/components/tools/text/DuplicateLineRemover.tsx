'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function DuplicateLineRemover() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [sortOutput, setSortOutput] = useState(false)
  const [copied, setCopied] = useState(false)

  const process = (): { output: string; totalLines: number; uniqueLines: number; duplicatesRemoved: number } => {
    if (!input.trim()) return { output: '', totalLines: 0, uniqueLines: 0, duplicatesRemoved: 0 }

    const lines = input.split('\n')
    const totalLines = lines.length
    const seen = new Set<string>()
    const unique: string[] = []

    for (const line of lines) {
      const processed = trimWhitespace ? line.trim() : line
      const key = caseSensitive ? processed : processed.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        unique.push(processed)
      }
    }

    const result = sortOutput ? [...unique].sort((a, b) => a.localeCompare(b)) : unique
    return {
      output: result.join('\n'),
      totalLines,
      uniqueLines: unique.length,
      duplicatesRemoved: totalLines - unique.length,
    }
  }

  const result = process()

  const copy = async () => {
    await navigator.clipboard.writeText(result.output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('input')}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="apple&#10;banana&#10;apple&#10;cherry&#10;banana&#10;date"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[160px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
          Case sensitive
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={trimWhitespace} onChange={(e) => setTrimWhitespace(e.target.checked)} className="rounded" />
          Trim whitespace
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sortOutput} onChange={(e) => setSortOutput(e.target.checked)} className="rounded" />
          Sort output
        </label>
      </div>

      {input.trim() && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Total Lines</div>
            <div className="text-lg font-bold">{result.totalLines}</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Unique Lines</div>
            <div className="text-lg font-bold text-primary">{result.uniqueLines}</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Removed</div>
            <div className="text-lg font-bold text-destructive">{result.duplicatesRemoved}</div>
          </div>
        </div>
      )}

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">{t('output')}</span>
          <button onClick={copy} className="text-xs text-primary hover:underline" disabled={!result.output}>
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="p-3 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-auto">{result.output || 'Output will appear here...'}</pre>
      </div>
    </div>
  )
}
