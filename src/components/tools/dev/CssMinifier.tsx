'use client'

import { useState } from 'react'

function minifyCss(css: string): string {
  let result = css
  // Remove comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove newlines and carriage returns
  result = result.replace(/[\n\r]/g, '')
  // Remove spaces around colons, semicolons, braces, commas
  result = result.replace(/\s*{\s*/g, '{')
  result = result.replace(/\s*}\s*/g, '}')
  result = result.replace(/\s*:\s*/g, ':')
  result = result.replace(/\s*;\s*/g, ';')
  result = result.replace(/\s*,\s*/g, ',')
  // Remove trailing semicolons before closing brace
  result = result.replace(/;}/g, '}')
  // Collapse remaining whitespace
  result = result.replace(/\s{2,}/g, ' ')
  return result.trim()
}

function beautifyCss(css: string): string {
  // First, minify to normalize
  let result = minifyCss(css)
  // Add newline after opening brace
  result = result.replace(/{/g, ' {\n  ')
  // Add newline before closing brace
  result = result.replace(/}/g, ';\n}\n\n')
  // Add newline after semicolons (inside blocks)
  result = result.replace(/;(?![\n}])/g, ';\n  ')
  // Add space after colons
  result = result.replace(/:/g, ': ')
  // Clean double semicolons before closing
  result = result.replace(/;;\n}/g, ';\n}')
  // Clean up multiple blank lines
  result = result.replace(/\n{3,}/g, '\n\n')
  // Fix media queries and nested selectors
  result = result.replace(/,\s*/g, ',\n')
  return result.trim()
}

function getByteSize(str: string): number {
  return new TextEncoder().encode(str).length
}

export default function CssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState<{ before: number; after: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter CSS to minify')
      setOutput('')
      setStats(null)
      return
    }
    setError('')
    const result = minifyCss(input)
    setOutput(result)
    setStats({ before: getByteSize(input), after: getByteSize(result) })
  }

  const handleBeautify = () => {
    if (!input.trim()) {
      setError('Please enter CSS to beautify')
      setOutput('')
      setStats(null)
      return
    }
    setError('')
    const result = beautifyCss(input)
    setOutput(result)
    setStats({ before: getByteSize(input), after: getByteSize(result) })
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
    setError('')
    setStats(null)
  }

  const sampleCss = `/* Main styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0;
}

.header .nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #2563eb;
}`

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setInput(sampleCss)}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-accent transition-colors"
          aria-label="Load sample CSS"
        >
          Load Sample
        </button>
        <button
          onClick={clear}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-accent transition-colors"
          aria-label="Clear all"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input CSS</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            placeholder="Paste your CSS here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="CSS input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label="Copy output"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none resize-y"
            value={output}
            readOnly
            placeholder="Processed CSS will appear here..."
            aria-label="CSS output"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {stats && (
        <div className="rounded-lg border bg-muted/50 p-3 text-sm flex flex-wrap gap-4">
          <span>Before: <strong>{stats.before.toLocaleString()} bytes</strong></span>
          <span>After: <strong>{stats.after.toLocaleString()} bytes</strong></span>
          <span>
            {stats.after < stats.before ? 'Saved' : 'Added'}:{' '}
            <strong className={stats.after < stats.before ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
              {Math.abs(stats.before - stats.after).toLocaleString()} bytes
              ({stats.before > 0 ? Math.round((Math.abs(stats.before - stats.after) / stats.before) * 100) : 0}%)
            </strong>
          </span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleMinify}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label="Minify CSS"
        >
          Minify
        </button>
        <button
          onClick={handleBeautify}
          className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Beautify CSS"
        >
          Beautify
        </button>
      </div>
    </div>
  )
}
