'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import DOMPurify from 'dompurify'

function sanitizeUrl(url: string): string {
  const trimmed = url.trim().toLowerCase().replace(/\s/g, '')
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
    return '#'
  }
  return url
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function parseMarkdown(md: string): string {
  let html = md

  // Code blocks (``` ... ```) - process first to protect content
  const codeBlocks: string[] = []
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_match, _lang, code) => {
    const index = codeBlocks.length
    codeBlocks.push(
      `<pre class="bg-muted/70 rounded-lg p-4 overflow-x-auto my-3"><code class="text-sm font-mono">${escapeHtml(code.trim())}</code></pre>`
    )
    return `%%CODEBLOCK_${index}%%`
  })

  // Inline code (protect from further processing)
  const inlineCodes: string[] = []
  html = html.replace(/`([^`]+)`/g, (_match, code) => {
    const index = inlineCodes.length
    inlineCodes.push(
      `<code class="bg-muted/70 px-1.5 py-0.5 rounded text-sm font-mono">${escapeHtml(code)}</code>`
    )
    return `%%INLINECODE_${index}%%`
  })

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-primary/40 pl-4 py-1 my-2 text-muted-foreground italic">$1</blockquote>')

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="border-t my-4" />')

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    const safeUrl = sanitizeUrl(url)
    return `<a href="${safeUrl}" class="text-primary underline hover:opacity-80" target="_blank" rel="noopener noreferrer">${text}</a>`
  })

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => {
    const safeUrl = sanitizeUrl(url)
    return `<img src="${safeUrl}" alt="${alt}" class="max-w-full rounded-lg my-2" />`
  })

  // Unordered lists: group consecutive lines starting with - or *
  html = html.replace(/^(?:[*-] .+\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map((line) => {
      const content = line.replace(/^[*-]\s+/, '')
      return `<li class="ml-4 list-disc">${content}</li>`
    })
    return `<ul class="my-2 space-y-1">${items.join('')}</ul>`
  })

  // Ordered lists: group consecutive numbered lines
  html = html.replace(/^(?:\d+\. .+\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map((line) => {
      const content = line.replace(/^\d+\.\s+/, '')
      return `<li class="ml-4 list-decimal">${content}</li>`
    })
    return `<ol class="my-2 space-y-1">${items.join('')}</ol>`
  })

  // Paragraphs: wrap non-tag lines
  html = html.replace(/^(?!<[a-zA-Z/]|%%CODEBLOCK)(.+)$/gm, (_, content) => {
    const trimmed = content.trim()
    if (!trimmed) return ''
    return `<p class="my-1">${trimmed}</p>`
  })

  // Restore code blocks and inline codes
  codeBlocks.forEach((block, index) => {
    html = html.replace(`%%CODEBLOCK_${index}%%`, block)
  })
  inlineCodes.forEach((code, index) => {
    html = html.replace(`%%INLINECODE_${index}%%`, code)
  })

  // Clean up excessive newlines
  html = html.replace(/\n{3,}/g, '\n\n')

  return html.trim()
}

const sampleMarkdown = `# Markdown Preview

## Features

This tool supports **bold**, *italic*, and ***bold italic*** text.

### Code

Inline \`code\` works, and so do code blocks:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

### Lists

- First item
- Second item
- Third item

1. Ordered first
2. Ordered second
3. Ordered third

### Other

> This is a blockquote

[Visit Example](https://example.com)

---

That's it!`

export default function MarkdownPreview() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit')

  const preview = useMemo(() => {
    const rawHtml = parseMarkdown(input)
    if (!rawHtml) return ''
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','br','hr','ul','ol','li','a','img','strong','em','del','code','pre','blockquote','table','thead','tbody','tr','th','td','span','div'],
      ALLOWED_ATTR: ['href','src','alt','title','class','id','target','rel'],
      ALLOW_DATA_ATTR: false,
      ADD_ATTR: ['target'],
      FORBID_ATTR: ['onerror','onload','onclick','onmouseover','onfocus','onblur'],
      FORBID_TAGS: ['script','style','iframe','object','embed','form','input','textarea','select','button'],
    })
  }, [input])

  const loadSample = () => setInput(sampleMarkdown)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={loadSample}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-accent transition-colors"
          aria-label="Load sample markdown"
        >
          {t('loadSample')}
        </button>
        <div className="lg:hidden flex gap-2">
          <button
            onClick={() => setMobileView('edit')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mobileView === 'edit' ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
            }`}
          >
            {t('input')}
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mobileView === 'preview' ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
            }`}
          >
            {t('preview')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`${mobileView === 'preview' ? 'hidden lg:block' : ''}`}>
          <label className="block text-sm font-medium mb-1">{t('markdownInput')}</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[400px] focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            placeholder="Type your markdown here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Markdown input"
          />
        </div>
        <div className={`${mobileView === 'edit' ? 'hidden lg:block' : ''}`}>
          <label className="block text-sm font-medium mb-1">{t('preview')}</label>
          <div
            className="w-full rounded-lg border bg-background px-4 py-3 min-h-[400px] overflow-auto prose-sm"
            dangerouslySetInnerHTML={{ __html: preview || '<p class="text-muted-foreground text-sm">Preview will appear here...</p>' }}
            aria-label="Markdown preview"
          />
        </div>
      </div>
    </div>
  )
}
