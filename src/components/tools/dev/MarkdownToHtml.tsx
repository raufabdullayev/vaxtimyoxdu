'use client'

import { useState, useMemo } from 'react'

type ViewMode = 'preview' | 'html'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function markdownToHtml(md: string): string {
  let html = md

  // Code blocks (fenced) — must be done before inline processing
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const langAttr = lang ? ` class="language-${escapeHtml(lang)}"` : ''
    return `<pre><code${langAttr}>${escapeHtml(code.trimEnd())}</code></pre>`
  })

  // Process line by line for block elements
  const lines = html.split('\n')
  const result: string[] = []
  let inList: 'ul' | 'ol' | null = null
  let inBlockquote = false
  let inPre = false
  let inParagraph = false

  // Helper to close open block-level elements before starting a new one.
  // Declared before the loop so it can reference the mutable state variables
  // (inParagraph, inList, inBlockquote) via closure.
  const closeOpenBlocks = () => {
    if (inParagraph) {
      result.push('</p>')
      inParagraph = false
    }
    if (inList) {
      result.push(inList === 'ol' ? '</ol>' : '</ul>')
      inList = null
    }
    if (inBlockquote) {
      result.push('</blockquote>')
      inBlockquote = false
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip if inside pre block
    if (line.includes('<pre>')) inPre = true
    if (line.includes('</pre>')) {
      inPre = false
      result.push(line)
      continue
    }
    if (inPre) {
      result.push(line)
      continue
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      closeOpenBlocks()
      result.push('<hr />')
      continue
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headerMatch) {
      closeOpenBlocks()
      const level = headerMatch[1].length
      const text = processInline(headerMatch[2])
      result.push(`<h${level}>${text}</h${level}>`)
      continue
    }

    // Blockquote
    const bqMatch = line.match(/^>\s?(.*)$/)
    if (bqMatch) {
      if (!inBlockquote) {
        closeOpenBlocks()
        result.push('<blockquote>')
        inBlockquote = true
      }
      result.push(`<p>${processInline(bqMatch[1])}</p>`)
      continue
    } else if (inBlockquote) {
      result.push('</blockquote>')
      inBlockquote = false
    }

    // Unordered list
    const ulMatch = line.match(/^[\s]*[-*+]\s+(.+)$/)
    if (ulMatch) {
      if (inList !== 'ul') {
        if (inList) {
          result.push(inList === 'ol' ? '</ol>' : '</ul>')
        }
        if (inParagraph) {
          result.push('</p>')
          inParagraph = false
        }
        result.push('<ul>')
        inList = 'ul'
      }
      result.push(`<li>${processInline(ulMatch[1])}</li>`)
      continue
    }

    // Ordered list
    const olMatch = line.match(/^[\s]*\d+\.\s+(.+)$/)
    if (olMatch) {
      if (inList !== 'ol') {
        if (inList) {
          result.push(`</${inList}>`)
        }
        if (inParagraph) {
          result.push('</p>')
          inParagraph = false
        }
        result.push('<ol>')
        inList = 'ol'
      }
      result.push(`<li>${processInline(olMatch[1])}</li>`)
      continue
    }

    if (inList) {
      result.push(inList === 'ol' ? '</ol>' : '</ul>')
      inList = null
    }

    // Empty line
    if (line.trim() === '') {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }

    // Regular paragraph text
    if (!inParagraph) {
      result.push('<p>')
      inParagraph = true
    } else {
      result.push('<br />')
    }
    result.push(processInline(line))
  }

  // Close any open blocks
  if (inParagraph) result.push('</p>')
  if (inList) result.push(inList === 'ol' ? '</ol>' : '</ul>')
  if (inBlockquote) result.push('</blockquote>')

  return result.join('\n')
}

function processInline(text: string): string {
  let result = text

  // Inline code (must be before other inline elements)
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Images (must be before links)
  result = result.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" />'
  )

  // Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  )

  // Bold + Italic
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  result = result.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')

  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // Italic
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>')
  result = result.replace(/_(.+?)_/g, '<em>$1</em>')

  // Strikethrough
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>')

  return result
}

export default function MarkdownToHtml() {
  const [input, setInput] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('preview')
  const [copied, setCopied] = useState(false)

  const htmlOutput = useMemo(() => markdownToHtml(input), [input])

  const copy = async () => {
    if (!htmlOutput) return
    await navigator.clipboard.writeText(htmlOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    setInput(`# Markdown to HTML Converter

## Features

This tool converts **Markdown** to _HTML_ in real-time.

### Supported Syntax

- **Bold text** and *italic text*
- ~~Strikethrough~~ text
- [Links](https://example.com)
- Inline \`code\` snippets

### Code Blocks

\`\`\`javascript
function greet(name) {
  console.log("Hello, " + name);
}
\`\`\`

### Lists

1. First ordered item
2. Second ordered item
3. Third ordered item

> This is a blockquote. It can contain **formatted** text.

---

That's it! Start typing your markdown on the left.`)
  }

  const clear = () => {
    setInput('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
            aria-pressed={viewMode === 'preview'}
          >
            Preview
          </button>
          <button
            onClick={() => setViewMode('html')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              viewMode === 'html'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
            aria-pressed={viewMode === 'html'}
          >
            HTML Source
          </button>
        </div>
        <button
          onClick={loadSample}
          className="px-3 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
        >
          Load Sample
        </button>
        {htmlOutput && (
          <button
            onClick={copy}
            className="px-3 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
          >
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
        )}
        <button
          onClick={clear}
          className="px-3 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Markdown Input</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[400px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type your Markdown here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Markdown input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {viewMode === 'preview' ? 'Live Preview' : 'HTML Output'}
          </label>
          {viewMode === 'preview' ? (
            <div
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm min-h-[400px] overflow-auto prose prose-sm dark:prose-invert max-w-none
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-4
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-3
                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3
                [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-1 [&_h4]:mt-2
                [&_p]:mb-2 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2
                [&_li]:mb-1
                [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono
                [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-3
                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3
                [&_a]:text-primary [&_a]:underline
                [&_hr]:border-t [&_hr]:border-border [&_hr]:my-4
                [&_strong]:font-bold
                [&_em]:italic
                [&_del]:line-through
                [&_img]:max-w-full [&_img]:rounded"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
              aria-label="Markdown preview"
            />
          ) : (
            <textarea
              className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[400px] focus:outline-none"
              value={htmlOutput}
              readOnly
              placeholder="HTML output will appear here..."
              aria-label="HTML output"
            />
          )}
        </div>
      </div>

      {input.trim() && (
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Markdown: {input.length} chars</span>
          <span>HTML: {htmlOutput.length} chars</span>
        </div>
      )}
    </div>
  )
}
