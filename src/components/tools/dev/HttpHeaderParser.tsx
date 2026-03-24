'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface ParsedHeader {
  name: string
  value: string
  category: string
}

const HEADER_CATEGORIES: Record<string, string> = {
  'content-type': 'Content',
  'content-length': 'Content',
  'content-encoding': 'Content',
  'content-language': 'Content',
  'content-disposition': 'Content',
  'cache-control': 'Caching',
  'expires': 'Caching',
  'etag': 'Caching',
  'last-modified': 'Caching',
  'age': 'Caching',
  'pragma': 'Caching',
  'authorization': 'Auth',
  'www-authenticate': 'Auth',
  'set-cookie': 'Auth',
  'cookie': 'Auth',
  'access-control-allow-origin': 'CORS',
  'access-control-allow-methods': 'CORS',
  'access-control-allow-headers': 'CORS',
  'access-control-max-age': 'CORS',
  'x-frame-options': 'Security',
  'x-content-type-options': 'Security',
  'strict-transport-security': 'Security',
  'content-security-policy': 'Security',
  'x-xss-protection': 'Security',
  'referrer-policy': 'Security',
  'permissions-policy': 'Security',
  'server': 'General',
  'date': 'General',
  'connection': 'General',
  'accept': 'Request',
  'accept-encoding': 'Request',
  'accept-language': 'Request',
  'user-agent': 'Request',
  'host': 'Request',
  'referer': 'Request',
}

function parseHeaders(input: string): ParsedHeader[] {
  const headers: ParsedHeader[] = []
  const lines = input.split('\n').filter((l) => l.trim())
  for (const line of lines) {
    const colonIdx = line.indexOf(':')
    if (colonIdx > 0) {
      const name = line.substring(0, colonIdx).trim()
      const value = line.substring(colonIdx + 1).trim()
      const category = HEADER_CATEGORIES[name.toLowerCase()] || 'Other'
      headers.push({ name, value, category })
    }
  }
  return headers
}

const SAMPLE = `Content-Type: application/json; charset=utf-8
Cache-Control: max-age=3600, public
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
Access-Control-Allow-Origin: *
Server: nginx/1.24.0
Date: Mon, 24 Mar 2026 10:00:00 GMT
ETag: "abc123"
X-Content-Type-Options: nosniff`

export default function HttpHeaderParser() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState<ParsedHeader[]>([])

  const parse = () => {
    setParsed(parseHeaders(input))
  }

  const loadSample = () => {
    setInput(SAMPLE)
    setParsed(parseHeaders(SAMPLE))
  }

  const categoryColors: Record<string, string> = {
    Content: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    Caching: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Auth: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    CORS: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    Security: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    General: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    Request: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    Other: 'bg-muted text-muted-foreground',
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">HTTP Headers</label>
          <button onClick={loadSample} className="text-xs text-primary hover:underline">
            {t('loadSample')}
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Content-Type: application/json&#10;Cache-Control: max-age=3600"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[160px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        onClick={parse}
        disabled={!input.trim()}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        Parse Headers
      </button>

      {parsed.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">{parsed.length} headers found</div>
          {parsed.map((h, i) => (
            <div key={i} className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[h.category]}`}>
                  {h.category}
                </span>
                <span className="font-mono text-sm font-bold">{h.name}</span>
              </div>
              <div className="font-mono text-sm text-muted-foreground break-all">{h.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
