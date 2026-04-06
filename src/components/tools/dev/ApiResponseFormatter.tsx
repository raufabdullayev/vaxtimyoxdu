'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type ViewMode = 'formatted' | 'raw' | 'tree'

function tryParseJson(input: string): { parsed: unknown; error: string | null } {
  try {
    return { parsed: JSON.parse(input), error: null }
  } catch (e) {
    return { parsed: null, error: (e as Error).message }
  }
}

function getType(value: unknown): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'string': return 'text-green-600 dark:text-green-400'
    case 'number': return 'text-blue-600 dark:text-blue-400'
    case 'boolean': return 'text-orange-600 dark:text-orange-400'
    case 'null': return 'text-red-600 dark:text-red-400'
    default: return 'text-foreground'
  }
}

function TreeNode({ name, value, depth = 0 }: { name: string; value: unknown; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2)
  const type = getType(value)

  if (type === 'object' || type === 'array') {
    const entries = type === 'array'
      ? (value as unknown[]).map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, unknown>)

    return (
      <div style={{ paddingLeft: depth * 16 }}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-mono hover:bg-accent rounded px-1"
        >
          <span className="text-muted-foreground">{expanded ? '\u25BC' : '\u25B6'}</span>{' '}
          <span className="font-bold">{name}</span>{' '}
          <span className="text-muted-foreground text-xs">
            {type === 'array' ? `[${entries.length}]` : `{${entries.length}}`}
          </span>
        </button>
        {expanded && entries.map(([k, v]) => (
          <TreeNode key={k} name={k} value={v} depth={depth + 1} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ paddingLeft: depth * 16 }} className="text-sm font-mono py-0.5">
      <span className="text-muted-foreground">{name}:</span>{' '}
      <span className={getTypeColor(type)}>
        {type === 'string' ? `"${String(value)}"` : String(value)}
      </span>
    </div>
  )
}

const SAMPLE_JSON = `{
  "status": 200,
  "data": {
    "users": [
      { "id": 1, "name": "John Doe", "email": "john@example.com", "active": true },
      { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "active": false }
    ],
    "total": 2,
    "page": 1
  },
  "meta": {
    "requestId": "abc-123",
    "timestamp": "2026-03-24T10:00:00Z"
  }
}`

export default function ApiResponseFormatter() {
  const t = useTranslations('toolUI.common')
  const [input, setInput] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('formatted')
  const [indentSize, setIndentSize] = useState(2)
  const [copied, setCopied] = useState(false)

  const { parsed, error } = input.trim() ? tryParseJson(input) : { parsed: null, error: null }

  const formatted = parsed ? JSON.stringify(parsed, null, indentSize) : ''
  const minified = parsed ? JSON.stringify(parsed) : ''

  const stats = parsed ? {
    size: new Blob([input]).size,
    formattedSize: new Blob([formatted]).size,
    minifiedSize: new Blob([minified]).size,
    keys: JSON.stringify(parsed).match(/"[^"]+"\s*:/g)?.length || 0,
  } : null

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">API Response (JSON)</label>
          <button
            onClick={() => { setInput(SAMPLE_JSON) }}
            className="text-xs text-primary hover:underline"
          >
            {t('loadSample')}
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"status": 200, "data": {...}}'
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[160px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {parsed !== null && (
        <>
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <div className="text-xs text-muted-foreground">Original</div>
                <div className="font-bold">{stats.size} B</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-xs text-muted-foreground">Formatted</div>
                <div className="font-bold">{stats.formattedSize} B</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-xs text-muted-foreground">Minified</div>
                <div className="font-bold">{stats.minifiedSize} B</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-xs text-muted-foreground">Keys</div>
                <div className="font-bold">{stats.keys}</div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {(['formatted', 'tree', 'raw'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-accent'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
            {viewMode === 'formatted' && (
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="ml-auto rounded-lg border bg-background px-2 py-1 text-xs"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>Tab (8)</option>
              </select>
            )}
          </div>

          <div className="rounded-lg border">
            <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
              <span className="text-xs text-muted-foreground">{viewMode} view</span>
              <button
                onClick={() => copy(viewMode === 'raw' ? minified : formatted)}
                className="text-xs text-primary hover:underline"
              >
                {copied ? t('copied') : t('copy')}
              </button>
            </div>
            <div className="p-3 max-h-96 overflow-auto">
              {viewMode === 'tree' ? (
                <TreeNode name="root" value={parsed} />
              ) : (
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {viewMode === 'raw' ? minified : formatted}
                </pre>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
