'use client'

import { useState } from 'react'

function minifyJs(code: string): string {
  return code
    // Remove single-line comments (but not inside strings)
    .replace(/(?<![:'"])\/\/[^\n]*/g, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around operators
    .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    .trim()
}

function beautifyJs(code: string): string {
  const tab = '  '
  let indent = 0
  let result = ''
  let inString: string | null = null
  let escaped = false

  for (let i = 0; i < code.length; i++) {
    const ch = code[i]
    const prev = i > 0 ? code[i - 1] : ''

    // Handle strings
    if (inString) {
      result += ch
      if (escaped) {
        escaped = false
      } else if (ch === '\\') {
        escaped = true
      } else if (ch === inString) {
        inString = null
      }
      continue
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      inString = ch
      result += ch
      continue
    }

    // Skip comments
    if (ch === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i)
      if (end === -1) break
      i = end - 1
      continue
    }
    if (ch === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2)
      if (end === -1) break
      i = end + 1
      continue
    }

    if (ch === '{') {
      result += ' {\n'
      indent++
      result += tab.repeat(indent)
    } else if (ch === '}') {
      indent = Math.max(0, indent - 1)
      result = result.trimEnd()
      result += '\n' + tab.repeat(indent) + '}'
      if (i + 1 < code.length && code[i + 1] !== ';' && code[i + 1] !== ',' && code[i + 1] !== ')') {
        result += '\n' + tab.repeat(indent)
      }
    } else if (ch === ';') {
      result += ';\n' + tab.repeat(indent)
    } else if (ch === '\n' || ch === '\r') {
      // skip existing newlines
    } else {
      result += ch
    }
  }

  // Clean up multiple blank lines
  return result
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line, i, arr) => !(line === '' && i > 0 && arr[i - 1] === ''))
    .join('\n')
    .trim()
}

export default function JsMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<{ original: number; result: number } | null>(null)

  const handleMinify = () => {
    if (!input.trim()) return
    const result = minifyJs(input)
    setOutput(result)
    setStats({ original: input.length, result: result.length })
  }

  const handleBeautify = () => {
    if (!input.trim()) return
    const result = beautifyJs(input)
    setOutput(result)
    setStats({ original: input.length, result: result.length })
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setStats(null)
  }

  const savings = stats
    ? Math.round(((stats.original - stats.result) / stats.original) * 100)
    : 0

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input JavaScript</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[250px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste your JavaScript code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="JavaScript input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label="Copy output to clipboard"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[250px] focus:outline-none"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            aria-label="JavaScript output"
          />
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-4 p-3 rounded-lg bg-muted/50 text-sm">
          <div className="text-center">
            <span className="text-muted-foreground">Original: </span>
            <span className="font-medium">{stats.original} chars</span>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">Result: </span>
            <span className="font-medium">{stats.result} chars</span>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">Change: </span>
            <span className={`font-medium ${savings > 0 ? 'text-green-600' : ''}`}>
              {savings > 0 ? `-${savings}%` : `+${Math.abs(savings)}%`}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleMinify}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Minify
        </button>
        <button
          onClick={handleBeautify}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Beautify
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
