'use client'

import { useState } from 'react'

function jsonToCsv(jsonStr: string, delimiter: string): string {
  const data = JSON.parse(jsonStr)

  if (!Array.isArray(data)) {
    throw new Error('Input must be a JSON array of objects')
  }
  if (data.length === 0) {
    throw new Error('Array is empty')
  }

  // Collect all unique keys
  const keySet = new Set<string>()
  for (const item of data) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new Error('Each array item must be a plain object')
    }
    Object.keys(item).forEach((k) => keySet.add(k))
  }
  const headers = Array.from(keySet)

  // Escape value for CSV
  const escapeValue = (val: unknown): string => {
    if (val === null || val === undefined) return ''
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val)
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"'
    }
    return str
  }

  const lines = [headers.map(escapeValue).join(delimiter)]
  for (const item of data) {
    const row = headers.map((h) => escapeValue(item[h]))
    lines.push(row.join(delimiter))
  }

  return lines.join('\n')
}

export default function JsonToCsv() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) {
      setError('Please enter JSON data')
      setOutput('')
      return
    }
    setError('')
    try {
      const csv = jsonToCsv(input, delimiter)
      setOutput(csv)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCsv = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadExample = () => {
    setInput(
      JSON.stringify(
        [
          { name: 'Alice', age: 30, city: 'New York' },
          { name: 'Bob', age: 25, city: 'London' },
          { name: 'Charlie', age: 35, city: 'Tokyo' },
        ],
        null,
        2
      )
    )
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Delimiter</label>
          <select
            className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value={'\t'}>Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">JSON Input</label>
            <button
              onClick={loadExample}
              className="text-xs text-primary hover:underline"
            >
              Load Example
            </button>
          </div>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[250px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder='[{"name":"Alice","age":30}, ...]'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="JSON input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">CSV Output</label>
            {output && (
              <div className="flex gap-2">
                <button
                  onClick={copy}
                  className="text-xs text-primary hover:underline"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadCsv}
                  className="text-xs text-primary hover:underline"
                >
                  Download
                </button>
              </div>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[250px] focus:outline-none"
            value={output}
            readOnly
            placeholder="CSV output will appear here..."
            aria-label="CSV output"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convert}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Convert
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
