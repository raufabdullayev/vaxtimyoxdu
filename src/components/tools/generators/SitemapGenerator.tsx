'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface SitemapUrl {
  loc: string
  changefreq: string
  priority: string
  lastmod: string
}

export default function SitemapGenerator() {
  const t = useTranslations('toolUI.common')
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { loc: '', changefreq: 'weekly', priority: '1.0', lastmod: new Date().toISOString().split('T')[0] },
  ])
  const [bulkInput, setBulkInput] = useState('')
  const [copied, setCopied] = useState(false)

  const addUrl = () => {
    setUrls([...urls, { loc: '', changefreq: 'weekly', priority: '0.5', lastmod: new Date().toISOString().split('T')[0] }])
  }

  const removeUrl = (idx: number) => {
    setUrls(urls.filter((_, i) => i !== idx))
  }

  const updateUrl = (idx: number, field: keyof SitemapUrl, value: string) => {
    setUrls(urls.map((u, i) => i === idx ? { ...u, [field]: value } : u))
  }

  const addBulkUrls = () => {
    const newUrls = bulkInput.split('\n')
      .map((u) => u.trim())
      .filter((u) => u)
      .map((loc) => ({ loc, changefreq: 'weekly', priority: '0.5', lastmod: new Date().toISOString().split('T')[0] }))
    setUrls([...urls, ...newUrls])
    setBulkInput('')
  }

  const validUrls = urls.filter((u) => u.loc.trim())

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validUrls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  const copy = async () => {
    await navigator.clipboard.writeText(xml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([xml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {urls.map((u, i) => (
          <div key={i} className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">URL {i + 1}</span>
              {urls.length > 1 && (
                <button onClick={() => removeUrl(i)} className="text-xs text-destructive hover:underline">Remove</button>
              )}
            </div>
            <input
              type="text"
              value={u.loc}
              onChange={(e) => updateUrl(i, 'loc', e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Frequency</label>
                <select
                  value={u.changefreq}
                  onChange={(e) => updateUrl(i, 'changefreq', e.target.value)}
                  className="w-full rounded-lg border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Priority</label>
                <select
                  value={u.priority}
                  onChange={(e) => updateUrl(i, 'priority', e.target.value)}
                  className="w-full rounded-lg border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Last Modified</label>
                <input
                  type="date"
                  value={u.lastmod}
                  onChange={(e) => updateUrl(i, 'lastmod', e.target.value)}
                  className="w-full rounded-lg border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addUrl} className="w-full px-4 py-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors">
        + Add URL
      </button>

      <div>
        <label className="block text-xs font-medium mb-1">Bulk Add URLs (one per line)</label>
        <textarea
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder="https://example.com/page1&#10;https://example.com/page2"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={addBulkUrls}
          disabled={!bulkInput.trim()}
          className="mt-1 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Add All
        </button>
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">sitemap.xml ({validUrls.length} URLs)</span>
          <div className="flex gap-2">
            <button onClick={download} className="text-xs text-primary hover:underline">{t('download')}</button>
            <button onClick={copy} className="text-xs text-primary hover:underline">{copied ? t('copied') : t('copy')}</button>
          </div>
        </div>
        <pre className="p-3 text-xs font-mono whitespace-pre-wrap max-h-96 overflow-auto">{xml}</pre>
      </div>
    </div>
  )
}
