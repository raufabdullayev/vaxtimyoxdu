'use client'

import { useState } from 'react'

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s*=\s*/g, '=')
    .trim()
}

function beautifyHtml(html: string): string {
  const trimmed = html.trim()
  let result = ''
  let indent = 0
  const tab = '  '
  const selfClosingTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr',
  ])

  // Split into tags and text
  const tokens = trimmed.split(/(<[^>]+>)/g).filter(Boolean)

  for (const token of tokens) {
    const trimmedToken = token.trim()
    if (!trimmedToken) continue

    if (trimmedToken.startsWith('</')) {
      // Closing tag
      indent = Math.max(0, indent - 1)
      result += tab.repeat(indent) + trimmedToken + '\n'
    } else if (trimmedToken.startsWith('<')) {
      const tagMatch = trimmedToken.match(/^<(\w+)/)
      const tagName = tagMatch ? tagMatch[1].toLowerCase() : ''
      const isSelfClosing =
        selfClosingTags.has(tagName) || trimmedToken.endsWith('/>')

      result += tab.repeat(indent) + trimmedToken + '\n'

      if (!isSelfClosing && !trimmedToken.startsWith('<!')) {
        indent++
      }
    } else {
      // Text content
      result += tab.repeat(indent) + trimmedToken + '\n'
    }
  }

  return result.trimEnd()
}

export default function HtmlMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<{ original: number; result: number } | null>(null)

  const handleMinify = () => {
    if (!input.trim()) return
    const result = minifyHtml(input)
    setOutput(result)
    setStats({ original: input.length, result: result.length })
  }

  const handleBeautify = () => {
    if (!input.trim()) return
    const result = beautifyHtml(input)
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
          <label className="block text-sm font-medium mb-1">Input HTML</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[250px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste your HTML code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="HTML input"
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
            aria-label="HTML output"
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
