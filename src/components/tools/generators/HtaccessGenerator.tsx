'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Redirect {
  from: string
  to: string
  type: '301' | '302'
}

export default function HtaccessGenerator() {
  const t = useTranslations('toolUI')
  const [httpsRedirect, setHttpsRedirect] = useState(false)
  const [wwwRedirect, setWwwRedirect] = useState<'none' | 'www' | 'non-www'>('none')
  const [indexFile, setIndexFile] = useState('')
  const [errorPages, setErrorPages] = useState({ '404': '', '403': '', '500': '' })
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [gzip, setGzip] = useState(false)
  const [caching, setCaching] = useState(false)
  const [blockIps, setBlockIps] = useState('')
  const [hotlinkProtection, setHotlinkProtection] = useState(false)
  const [domain, setDomain] = useState('')
  const [copied, setCopied] = useState(false)

  const addRedirect = () => {
    setRedirects([...redirects, { from: '', to: '', type: '301' }])
  }

  const updateRedirect = (idx: number, field: keyof Redirect, value: string) => {
    setRedirects(redirects.map((r, i) => i === idx ? { ...r, [field]: value } : r))
  }

  const removeRedirect = (idx: number) => {
    setRedirects(redirects.filter((_, i) => i !== idx))
  }

  const generated = (() => {
    const lines: string[] = []

    if (httpsRedirect) {
      lines.push('# Force HTTPS')
      lines.push('RewriteEngine On')
      lines.push('RewriteCond %{HTTPS} off')
      lines.push('RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]')
      lines.push('')
    }

    if (wwwRedirect === 'www') {
      lines.push('# Redirect to www')
      lines.push('RewriteEngine On')
      lines.push('RewriteCond %{HTTP_HOST} !^www\\. [NC]')
      lines.push('RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]')
      lines.push('')
    } else if (wwwRedirect === 'non-www') {
      lines.push('# Redirect to non-www')
      lines.push('RewriteEngine On')
      lines.push('RewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]')
      lines.push('RewriteRule ^(.*)$ https://%1/$1 [R=301,L]')
      lines.push('')
    }

    if (indexFile) {
      lines.push(`# Custom index file`)
      lines.push(`DirectoryIndex ${indexFile}`)
      lines.push('')
    }

    const errorEntries = Object.entries(errorPages).filter(([, v]) => v.trim())
    if (errorEntries.length > 0) {
      lines.push('# Custom error pages')
      errorEntries.forEach(([code, page]) => lines.push(`ErrorDocument ${code} ${page}`))
      lines.push('')
    }

    if (redirects.length > 0) {
      lines.push('# Redirects')
      redirects.forEach((r) => {
        if (r.from && r.to) lines.push(`Redirect ${r.type} ${r.from} ${r.to}`)
      })
      lines.push('')
    }

    if (gzip) {
      lines.push('# Enable Gzip Compression')
      lines.push('<IfModule mod_deflate.c>')
      lines.push('  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json')
      lines.push('</IfModule>')
      lines.push('')
    }

    if (caching) {
      lines.push('# Browser Caching')
      lines.push('<IfModule mod_expires.c>')
      lines.push('  ExpiresActive On')
      lines.push('  ExpiresByType image/jpeg "access plus 1 year"')
      lines.push('  ExpiresByType image/png "access plus 1 year"')
      lines.push('  ExpiresByType image/svg+xml "access plus 1 year"')
      lines.push('  ExpiresByType text/css "access plus 1 month"')
      lines.push('  ExpiresByType application/javascript "access plus 1 month"')
      lines.push('  ExpiresByType text/html "access plus 1 hour"')
      lines.push('</IfModule>')
      lines.push('')
    }

    if (blockIps.trim()) {
      lines.push('# Block IPs')
      lines.push('order allow,deny')
      blockIps.split('\n').filter((ip) => ip.trim()).forEach((ip) => {
        lines.push(`deny from ${ip.trim()}`)
      })
      lines.push('allow from all')
      lines.push('')
    }

    if (hotlinkProtection && domain.trim()) {
      lines.push('# Hotlink Protection')
      lines.push('RewriteEngine On')
      lines.push(`RewriteCond %{HTTP_REFERER} !^$`)
      lines.push(`RewriteCond %{HTTP_REFERER} !^https?://(www\\.)?${domain.replace(/\./g, '\\.')}/ [NC]`)
      lines.push('RewriteRule \\.(jpg|jpeg|png|gif|svg|webp)$ - [F,NC,L]')
      lines.push('')
    }

    return lines.join('\n').trim() || '# Empty .htaccess file'
  })()

  const copy = async () => {
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={httpsRedirect} onChange={(e) => setHttpsRedirect(e.target.checked)} className="rounded" />
          Force HTTPS
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={gzip} onChange={(e) => setGzip(e.target.checked)} className="rounded" />
          Enable Gzip
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={caching} onChange={(e) => setCaching(e.target.checked)} className="rounded" />
          Browser Caching
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={hotlinkProtection} onChange={(e) => setHotlinkProtection(e.target.checked)} className="rounded" />
          Hotlink Protection
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">WWW Redirect</label>
          <select
            value={wwwRedirect}
            onChange={(e) => setWwwRedirect(e.target.value as 'none' | 'www' | 'non-www')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="none">No redirect</option>
            <option value="www">Force www</option>
            <option value="non-www">Force non-www</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Domain (for hotlink)</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Custom Index File</label>
        <input
          type="text"
          value={indexFile}
          onChange={(e) => setIndexFile(e.target.value)}
          placeholder="index.html"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(errorPages) as Array<keyof typeof errorPages>).map((code) => (
          <div key={code}>
            <label className="block text-xs font-medium mb-1">{code} Error Page</label>
            <input
              type="text"
              value={errorPages[code]}
              onChange={(e) => setErrorPages({ ...errorPages, [code]: e.target.value })}
              placeholder={`/${code}.html`}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium">Redirects</label>
          <button onClick={addRedirect} className="text-xs text-primary hover:underline">+ Add</button>
        </div>
        {redirects.map((r, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <select value={r.type} onChange={(e) => updateRedirect(i, 'type', e.target.value)} className="rounded-lg border bg-background px-2 py-1 text-sm">
              <option value="301">301</option>
              <option value="302">302</option>
            </select>
            <input type="text" placeholder="/old-page" value={r.from} onChange={(e) => updateRedirect(i, 'from', e.target.value)} className="flex-1 rounded-lg border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="text" placeholder="/new-page" value={r.to} onChange={(e) => updateRedirect(i, 'to', e.target.value)} className="flex-1 rounded-lg border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={() => removeRedirect(i)} className="text-xs text-destructive">X</button>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Block IPs (one per line)</label>
        <textarea
          value={blockIps}
          onChange={(e) => setBlockIps(e.target.value)}
          placeholder="192.168.1.1&#10;10.0.0.0/24"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[60px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">.htaccess</span>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="p-3 text-sm font-mono whitespace-pre-wrap max-h-96 overflow-auto">{generated}</pre>
      </div>
    </div>
  )
}
