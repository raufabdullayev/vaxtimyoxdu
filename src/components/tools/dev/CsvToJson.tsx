'use client'

import { useState } from 'react'

function parseCsv(csv: string, delimiter: string, firstRowHeaders: boolean): { json: string; count: number } {
  const lines = csv.trim().split('\n').map((line) => line.trim()).filter(Boolean)

  if (lines.length === 0) {
    throw new Error('CSV is empty')
  }

  const splitLine = (line: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  if (firstRowHeaders) {
    const headers = splitLine(lines[0])
    if (headers.length === 0) {
      throw new Error('No headers found in first row')
    }
    const data = lines.slice(1).map((line, lineIndex) => {
      const values = splitLine(line)
      const obj: Record<string, string> = {}
      headers.forEach((header, i) => {
        if (!header) {
          obj[`column_${i + 1}`] = values[i] || ''
        } else {
          obj[header] = values[i] || ''
        }
      })
      if (values.length > headers.length) {
        for (let i = headers.length; i < values.length; i++) {
          obj[`extra_${i + 1}`] = values[i]
        }
      }
      return obj
    })
    return { json: JSON.stringify(data, null, 2), count: data.length }
  } else {
    const data = lines.map((line) => splitLine(line))
    return { json: JSON.stringify(data, null, 2), count: data.length }
  }
}

const sampleCsv = `name,email,role,city
Alice Johnson,alice@example.com,Developer,New York
Bob Smith,bob@example.com,Designer,San Francisco
Carol White,carol@example.com,Manager,Chicago
Dave Brown,"dave@example.com",Developer,"Los Angeles"`

export default function CsvToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [firstRowHeaders, setFirstRowHeaders] = useState(true)
  const [delimiter, setDelimiter] = useState(',')
  const [error, setError] = useState('')
  const [rowCount, setRowCount] = useState(0)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) {
      setError('Please enter CSV data')
      setOutput('')
      setRowCount(0)
      return
    }
    try {
      setError('')
      const delimiterChar = delimiter === '\\t' ? '\t' : delimiter
      const result = parseCsv(input, delimiterChar, firstRowHeaders)
      setOutput(result.json)
      setRowCount(result.count)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse CSV')
      setOutput('')
      setRowCount(0)
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={firstRowHeaders}
            onChange={(e) => setFirstRowHeaders(e.target.checked)}
            className="rounded border-2 accent-primary"
            aria-label="First row as headers"
          />
          First row as headers
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-lg border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Select delimiter"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        <button
          onClick={() => setInput(sampleCsv)}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-accent transition-colors"
          aria-label="Load sample CSV"
        >
          Load Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CSV Input</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            placeholder="Paste your CSV data here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="CSV input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">
              JSON Output
              {rowCount > 0 && <span className="text-muted-foreground font-normal ml-2">({rowCount} rows)</span>}
            </label>
            {output && (
              <div className="flex gap-3">
                <button
                  onClick={copy}
                  className="text-xs text-primary hover:underline"
                  aria-label="Copy JSON output"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={download}
                  className="text-xs text-primary hover:underline"
                  aria-label="Download JSON file"
                >
                  Download
                </button>
              </div>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none resize-y"
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
            aria-label="JSON output"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <button
        onClick={convert}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        aria-label="Convert CSV to JSON"
      >
        Convert to JSON
      </button>
    </div>
  )
}
