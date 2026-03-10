'use client'

import { useState, useMemo } from 'react'

type LinkType = 'html' | 'markdown' | 'bbcode' | 'textile' | 'wiki' | 'restructuredtext'

interface LinkConfig {
  url: string
  anchorText: string
  title: string
  nofollow: boolean
  newTab: boolean
  noopener: boolean
}

const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: 'html', label: 'HTML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'bbcode', label: 'BBCode' },
  { value: 'textile', label: 'Textile' },
  { value: 'wiki', label: 'Wiki' },
  { value: 'restructuredtext', label: 'reStructuredText' },
]

function generateLink(config: LinkConfig, type: LinkType): string {
  const { url, anchorText, title, nofollow, newTab, noopener } = config
  const text = anchorText || url

  switch (type) {
    case 'html': {
      const attrs: string[] = [`href="${url}"`]
      if (title) attrs.push(`title="${title}"`)
      if (newTab) attrs.push('target="_blank"')
      const rels: string[] = []
      if (nofollow) rels.push('nofollow')
      if (noopener) rels.push('noopener noreferrer')
      if (rels.length > 0) attrs.push(`rel="${rels.join(' ')}"`)
      return `<a ${attrs.join(' ')}>${text}</a>`
    }
    case 'markdown': {
      if (title) return `[${text}](${url} "${title}")`
      return `[${text}](${url})`
    }
    case 'bbcode':
      return `[url=${url}]${text}[/url]`
    case 'textile':
      if (title) return `"${text}(${title})":${url}`
      return `"${text}":${url}`
    case 'wiki':
      return `[${url} ${text}]`
    case 'restructuredtext':
      return `\`${text} <${url}>\`_`
    default:
      return url
  }
}

export default function BacklinkGenerator() {
  const [config, setConfig] = useState<LinkConfig>({
    url: '',
    anchorText: '',
    title: '',
    nofollow: false,
    newTab: true,
    noopener: true,
  })
  const [selectedTypes, setSelectedTypes] = useState<LinkType[]>(['html', 'markdown', 'bbcode'])
  const [copied, setCopied] = useState('')

  const update = (field: keyof LinkConfig, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const toggleType = (type: LinkType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const results = useMemo(() => {
    if (!config.url.trim()) return []
    return selectedTypes.map((type) => ({
      type,
      label: LINK_TYPES.find((t) => t.value === type)?.label || type,
      code: generateLink(config, type),
    }))
  }, [config, selectedTypes])

  const copyAll = async () => {
    const text = results.map((r) => `${r.label}:\n${r.code}`).join('\n\n')
    await navigator.clipboard.writeText(text)
    setCopied('all')
    setTimeout(() => setCopied(''), 2000)
  }

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const loadSample = () => {
    setConfig({
      url: 'https://example.com',
      anchorText: 'Visit Example',
      title: 'Example Website',
      nofollow: false,
      newTab: true,
      noopener: true,
    })
  }

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">URL</label>
          <button onClick={loadSample} className="text-xs text-primary hover:underline">
            Load Sample
          </button>
        </div>
        <input
          type="url"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com"
          value={config.url}
          onChange={(e) => update('url', e.target.value)}
          aria-label="URL input"
        />
      </div>

      {/* Anchor text */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Anchor Text</label>
          <input
            type="text"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Click here"
            value={config.anchorText}
            onChange={(e) => update('anchorText', e.target.value)}
            aria-label="Anchor text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (optional)</label>
          <input
            type="text"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Link title"
            value={config.title}
            onChange={(e) => update('title', e.target.value)}
            aria-label="Link title"
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={config.nofollow}
            onChange={(e) => update('nofollow', e.target.checked)}
            className="accent-primary"
          />
          rel=&quot;nofollow&quot;
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={config.newTab}
            onChange={(e) => update('newTab', e.target.checked)}
            className="accent-primary"
          />
          Open in new tab
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={config.noopener}
            onChange={(e) => update('noopener', e.target.checked)}
            className="accent-primary"
          />
          rel=&quot;noopener&quot;
        </label>
      </div>

      {/* Link formats */}
      <div>
        <label className="block text-sm font-medium mb-2">Output Formats</label>
        <div className="flex flex-wrap gap-2">
          {LINK_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => toggleType(type.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedTypes.includes(type.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Generated Links</label>
            <button onClick={copyAll} className="text-xs text-primary hover:underline">
              {copied === 'all' ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          <div className="space-y-3">
            {results.map((result) => (
              <div key={result.type} className="rounded-lg border p-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-muted-foreground">{result.label}</label>
                  <button
                    onClick={() => copy(result.code, result.type)}
                    className="text-xs text-primary hover:underline"
                  >
                    {copied === result.type ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="text-sm font-mono break-all">{result.code}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HTML Preview */}
      {config.url.trim() && (
        <div>
          <label className="text-sm font-medium mb-1 block">Preview</label>
          <div className="rounded-lg border bg-muted/30 p-4">
            <a
              href={config.url}
              target={config.newTab ? '_blank' : undefined}
              rel={[config.nofollow ? 'nofollow' : '', config.noopener ? 'noopener noreferrer' : ''].filter(Boolean).join(' ') || undefined}
              className="text-primary hover:underline"
              title={config.title || undefined}
            >
              {config.anchorText || config.url}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
