'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Rule {
  userAgent: string
  allow: string[]
  disallow: string[]
}

const COMMON_DISALLOW = ['/admin', '/api', '/private', '/tmp', '/cgi-bin', '/*.pdf$', '/search', '/login', '/register']

export default function RobotsTxtGenerator() {
  const t = useTranslations('toolUI')
  const [rules, setRules] = useState<Rule[]>([{ userAgent: '*', allow: ['/'], disallow: [] }])
  const [sitemap, setSitemap] = useState('')
  const [crawlDelay, setCrawlDelay] = useState('')
  const [copied, setCopied] = useState(false)

  const addRule = () => {
    setRules([...rules, { userAgent: '*', allow: [], disallow: [] }])
  }

  const removeRule = (idx: number) => {
    setRules(rules.filter((_, i) => i !== idx))
  }

  const updateUserAgent = (idx: number, value: string) => {
    setRules(rules.map((r, i) => i === idx ? { ...r, userAgent: value } : r))
  }

  const toggleDisallow = (ruleIdx: number, path: string) => {
    setRules(rules.map((r, i) => {
      if (i !== ruleIdx) return r
      const has = r.disallow.includes(path)
      return { ...r, disallow: has ? r.disallow.filter((d) => d !== path) : [...r.disallow, path] }
    }))
  }

  const addCustomDisallow = (ruleIdx: number, path: string) => {
    if (!path.trim()) return
    setRules(rules.map((r, i) => {
      if (i !== ruleIdx) return r
      if (r.disallow.includes(path)) return r
      return { ...r, disallow: [...r.disallow, path] }
    }))
  }

  const generated = (() => {
    const lines: string[] = []
    for (const rule of rules) {
      lines.push(`User-agent: ${rule.userAgent}`)
      for (const a of rule.allow) lines.push(`Allow: ${a}`)
      for (const d of rule.disallow) lines.push(`Disallow: ${d}`)
      if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`)
      lines.push('')
    }
    if (sitemap.trim()) lines.push(`Sitemap: ${sitemap.trim()}`)
    return lines.join('\n').trim()
  })()

  const copy = async () => {
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {rules.map((rule, ruleIdx) => (
        <div key={ruleIdx} className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rule {ruleIdx + 1}</span>
            {rules.length > 1 && (
              <button onClick={() => removeRule(ruleIdx)} className="text-xs text-destructive hover:underline">Remove</button>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">User-agent</label>
            <input
              type="text"
              value={rule.userAgent}
              onChange={(e) => updateUserAgent(ruleIdx, e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Disallow paths</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_DISALLOW.map((path) => (
                <button
                  key={path}
                  onClick={() => toggleDisallow(ruleIdx, path)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    rule.disallow.includes(path)
                      ? 'bg-destructive/10 text-destructive ring-1 ring-destructive/30'
                      : 'bg-muted/50 text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {path}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="/custom-path"
                className="flex-1 rounded-lg border bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addCustomDisallow(ruleIdx, e.currentTarget.value)
                    e.currentTarget.value = ''
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addRule} className="w-full px-4 py-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors">
        + Add Rule
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Sitemap URL</label>
          <input
            type="text"
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Crawl Delay (seconds)</label>
          <input
            type="number"
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            placeholder="10"
            min="0"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">robots.txt</span>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="p-3 text-sm font-mono whitespace-pre-wrap">{generated}</pre>
      </div>
    </div>
  )
}
