'use client'

import { useState, useCallback } from 'react'

interface MetaFormState {
  title: string
  description: string
  keywords: string
  author: string
  ogImage: string
  twitterCard: 'summary' | 'summary_large_image'
  robotsIndex: boolean
  robotsFollow: boolean
  robotsNoindex: boolean
  robotsNofollow: boolean
  canonical: string
  viewport: string
}

const DEFAULT_STATE: MetaFormState = {
  title: '',
  description: '',
  keywords: '',
  author: '',
  ogImage: '',
  twitterCard: 'summary_large_image',
  robotsIndex: true,
  robotsFollow: true,
  robotsNoindex: false,
  robotsNofollow: false,
  canonical: '',
  viewport: 'width=device-width, initial-scale=1',
}

function buildRobotsContent(state: MetaFormState): string {
  const parts: string[] = []
  if (state.robotsNoindex) parts.push('noindex')
  else if (state.robotsIndex) parts.push('index')
  if (state.robotsNofollow) parts.push('nofollow')
  else if (state.robotsFollow) parts.push('follow')
  return parts.join(', ')
}

function generateHtml(state: MetaFormState): string {
  const lines: string[] = []

  if (state.title) {
    lines.push(`<title>${state.title}</title>`)
  }
  if (state.viewport) {
    lines.push(`<meta name="viewport" content="${state.viewport}" />`)
  }
  if (state.description) {
    lines.push(`<meta name="description" content="${state.description}" />`)
  }
  if (state.keywords) {
    lines.push(`<meta name="keywords" content="${state.keywords}" />`)
  }
  if (state.author) {
    lines.push(`<meta name="author" content="${state.author}" />`)
  }

  const robots = buildRobotsContent(state)
  if (robots) {
    lines.push(`<meta name="robots" content="${robots}" />`)
  }

  if (state.canonical) {
    lines.push(`<link rel="canonical" href="${state.canonical}" />`)
  }

  // Open Graph
  if (state.title) {
    lines.push(`<meta property="og:title" content="${state.title}" />`)
  }
  if (state.description) {
    lines.push(`<meta property="og:description" content="${state.description}" />`)
  }
  if (state.ogImage) {
    lines.push(`<meta property="og:image" content="${state.ogImage}" />`)
  }
  if (state.canonical) {
    lines.push(`<meta property="og:url" content="${state.canonical}" />`)
  }
  lines.push(`<meta property="og:type" content="website" />`)

  // Twitter Card
  lines.push(`<meta name="twitter:card" content="${state.twitterCard}" />`)
  if (state.title) {
    lines.push(`<meta name="twitter:title" content="${state.title}" />`)
  }
  if (state.description) {
    lines.push(`<meta name="twitter:description" content="${state.description}" />`)
  }
  if (state.ogImage) {
    lines.push(`<meta name="twitter:image" content="${state.ogImage}" />`)
  }

  return lines.join('\n')
}

export default function MetaTagGenerator() {
  const [form, setForm] = useState<MetaFormState>(DEFAULT_STATE)
  const [copied, setCopied] = useState(false)

  const update = useCallback(<K extends keyof MetaFormState>(key: K, value: MetaFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const html = generateHtml(form)

  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [html])

  const descLen = form.description.length
  const descColor =
    descLen === 0 ? 'text-muted-foreground' :
    descLen >= 150 && descLen <= 160 ? 'text-green-600 dark:text-green-400' :
    descLen > 160 ? 'text-red-500' : 'text-yellow-600'

  const previewTitle = form.title || 'Page Title'
  const previewUrl = form.canonical || 'https://example.com'
  const previewDesc = form.description || 'Page description will appear here...'

  return (
    <div className="space-y-6">
      {/* Form inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="meta-title" className="block text-sm font-medium mb-1">
            Page Title
          </label>
          <input
            id="meta-title"
            type="text"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="My Awesome Page"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="meta-desc" className="text-sm font-medium">
              Description
            </label>
            <span className={`text-xs ${descColor}`}>
              {descLen}/160 {descLen >= 150 && descLen <= 160 ? '(ideal)' : ''}
            </span>
          </div>
          <textarea
            id="meta-desc"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="A brief description of the page (150-160 characters ideal)"
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          />
        </div>

        <div>
          <label htmlFor="meta-keywords" className="block text-sm font-medium mb-1">
            Keywords
          </label>
          <input
            id="meta-keywords"
            type="text"
            value={form.keywords}
            onChange={(e) => update('keywords', e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="meta-author" className="block text-sm font-medium mb-1">
            Author
          </label>
          <input
            id="meta-author"
            type="text"
            value={form.author}
            onChange={(e) => update('author', e.target.value)}
            placeholder="Author Name"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="meta-ogimage" className="block text-sm font-medium mb-1">
            OG Image URL
          </label>
          <input
            id="meta-ogimage"
            type="text"
            value={form.ogImage}
            onChange={(e) => update('ogImage', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="meta-twitter" className="block text-sm font-medium mb-1">
            Twitter Card Type
          </label>
          <select
            id="meta-twitter"
            value={form.twitterCard}
            onChange={(e) => update('twitterCard', e.target.value as 'summary' | 'summary_large_image')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary Large Image</option>
          </select>
        </div>

        <div>
          <label htmlFor="meta-canonical" className="block text-sm font-medium mb-1">
            Canonical URL
          </label>
          <input
            id="meta-canonical"
            type="text"
            value={form.canonical}
            onChange={(e) => update('canonical', e.target.value)}
            placeholder="https://example.com/page"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="meta-viewport" className="block text-sm font-medium mb-1">
            Viewport
          </label>
          <input
            id="meta-viewport"
            type="text"
            value={form.viewport}
            onChange={(e) => update('viewport', e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Robots */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Robots</label>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Index', key: 'robotsIndex' as const },
              { label: 'Follow', key: 'robotsFollow' as const },
              { label: 'Noindex', key: 'robotsNoindex' as const },
              { label: 'Nofollow', key: 'robotsNofollow' as const },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[opt.key] as boolean}
                  onChange={(e) => {
                    const val = e.target.checked
                    if (opt.key === 'robotsNoindex' && val) {
                      setForm((prev) => ({ ...prev, robotsNoindex: true, robotsIndex: false }))
                    } else if (opt.key === 'robotsIndex' && val) {
                      setForm((prev) => ({ ...prev, robotsIndex: true, robotsNoindex: false }))
                    } else if (opt.key === 'robotsNofollow' && val) {
                      setForm((prev) => ({ ...prev, robotsNofollow: true, robotsFollow: false }))
                    } else if (opt.key === 'robotsFollow' && val) {
                      setForm((prev) => ({ ...prev, robotsFollow: true, robotsNofollow: false }))
                    } else {
                      update(opt.key, val)
                    }
                  }}
                  className="rounded accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Google search preview */}
      <div>
        <h3 className="text-sm font-medium mb-2">Google Search Preview</h3>
        <div className="rounded-lg border bg-background p-4 space-y-1 max-w-xl">
          <p className="text-lg text-blue-600 dark:text-blue-400 truncate leading-snug cursor-pointer hover:underline">
            {previewTitle}
          </p>
          <p className="text-sm text-green-700 dark:text-green-500 truncate">
            {previewUrl}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {previewDesc}
          </p>
        </div>
      </div>

      {/* Generated HTML */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Generated Meta Tags</h3>
          <button
            onClick={copyHtml}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label="Copy HTML meta tags"
          >
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>
        <pre className="rounded-lg border bg-muted/50 p-4 text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-[400px] overflow-y-auto">
          {html || '<!-- Fill in the form above to generate meta tags -->'}
        </pre>
      </div>
    </div>
  )
}
