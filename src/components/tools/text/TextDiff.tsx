'use client'

import { useState, useMemo } from 'react'

type LineStatus = 'same' | 'added' | 'removed'

interface DiffLine {
  text: string
  status: LineStatus
  lineNumber: number | null
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split('\n')
  const modLines = modified.split('\n')

  const m = origLines.length
  const n = modLines.length

  // Build LCS table
  const lcs: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        lcs[i][j] = lcs[i - 1][j - 1] + 1
      } else {
        lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1])
      }
    }
  }

  // Backtrack to get diff
  const result: DiffLine[] = []
  let i = m
  let j = n

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      result.unshift({ text: origLines[i - 1], status: 'same', lineNumber: j })
      i--
      j--
    } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
      result.unshift({ text: modLines[j - 1], status: 'added', lineNumber: j })
      j--
    } else if (i > 0) {
      result.unshift({ text: origLines[i - 1], status: 'removed', lineNumber: i })
      i--
    }
  }

  return result
}

interface DiffStats {
  added: number
  removed: number
  unchanged: number
}

export default function TextDiff() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [showDiff, setShowDiff] = useState(false)

  const diff = useMemo(() => {
    if (!showDiff) return []
    return computeDiff(original, modified)
  }, [original, modified, showDiff])

  const stats = useMemo<DiffStats>(() => {
    if (!showDiff || diff.length === 0) return { added: 0, removed: 0, unchanged: 0 }
    return {
      added: diff.filter((l) => l.status === 'added').length,
      removed: diff.filter((l) => l.status === 'removed').length,
      unchanged: diff.filter((l) => l.status === 'same').length,
    }
  }, [diff, showDiff])

  const compare = () => {
    setShowDiff(true)
  }

  const clear = () => {
    setOriginal('')
    setModified('')
    setShowDiff(false)
  }

  const loadSample = () => {
    setOriginal(
      'The quick brown fox\njumps over the lazy dog.\nThis line stays the same.\nThis line will be removed.\nAnother unchanged line.'
    )
    setModified(
      'The quick brown cat\njumps over the lazy dog.\nThis line stays the same.\nA brand new line appears.\nAnother unchanged line.\nOne more added line.'
    )
    setShowDiff(false)
  }

  const getLineClass = (status: LineStatus): string => {
    switch (status) {
      case 'added':
        return 'bg-green-500/15 text-green-700 dark:text-green-400'
      case 'removed':
        return 'bg-destructive/10 text-destructive'
      case 'same':
        return ''
    }
  }

  const getLinePrefix = (status: LineStatus): string => {
    switch (status) {
      case 'added':
        return '+'
      case 'removed':
        return '-'
      case 'same':
        return ' '
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Original Text</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste the original text here..."
            value={original}
            onChange={(e) => {
              setOriginal(e.target.value)
              setShowDiff(false)
            }}
            aria-label="Original text for comparison"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Modified Text</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste the modified text here..."
            value={modified}
            onChange={(e) => {
              setModified(e.target.value)
              setShowDiff(false)
            }}
            aria-label="Modified text for comparison"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={compare}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label="Compare texts"
        >
          Compare
        </button>
        <button
          onClick={loadSample}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Load sample texts"
        >
          Load Sample
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear all fields"
        >
          Clear
        </button>
      </div>

      {showDiff && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-green-500/15 p-3 text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                +{stats.added}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Lines Added</div>
            </div>
            <div className="rounded-lg bg-destructive/10 p-3 text-center">
              <div className="text-2xl font-bold text-destructive">-{stats.removed}</div>
              <div className="text-xs text-muted-foreground mt-1">Lines Removed</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-2xl font-bold">{stats.unchanged}</div>
              <div className="text-xs text-muted-foreground mt-1">Unchanged</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Diff Result</label>
            <div className="rounded-lg border overflow-hidden">
              {diff.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  Both texts are empty.
                </div>
              ) : diff.every((l) => l.status === 'same') ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No differences found. The texts are identical.
                </div>
              ) : (
                <div className="font-mono text-sm overflow-x-auto">
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex border-b border-border/50 last:border-b-0 ${getLineClass(line.status)}`}
                    >
                      <span className="w-8 shrink-0 text-center text-xs text-muted-foreground py-1 border-r border-border/50 select-none">
                        {line.lineNumber ?? ''}
                      </span>
                      <span className="w-6 shrink-0 text-center py-1 select-none font-bold">
                        {getLinePrefix(line.status)}
                      </span>
                      <span className="py-1 px-2 whitespace-pre-wrap break-all">
                        {line.text || '\u00A0'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
