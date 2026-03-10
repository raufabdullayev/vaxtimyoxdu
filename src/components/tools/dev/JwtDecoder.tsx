'use client'

import { useState, useMemo } from 'react'

interface DecodedJwt {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  signature: string
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padding = base64.length % 4
  if (padding === 2) base64 += '=='
  else if (padding === 3) base64 += '='
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
}

function getExpirationStatus(payload: Record<string, unknown>): { text: string; isExpired: boolean; timestamp: string } | null {
  const exp = payload.exp
  if (typeof exp !== 'number') return null
  const expirationDate = new Date(exp * 1000)
  const now = new Date()
  const isExpired = expirationDate < now
  return {
    text: isExpired ? 'Expired' : 'Valid',
    isExpired,
    timestamp: expirationDate.toLocaleString(),
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [copied, setCopied] = useState('')

  const decoded = useMemo<{ data: DecodedJwt; error: null } | { data: null; error: string }>(() => {
    if (!token.trim()) return { data: null, error: '' }
    const parts = token.trim().split('.')
    if (parts.length !== 3) {
      return { data: null, error: 'Invalid JWT format. A JWT must have 3 parts separated by dots.' }
    }
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]))
      const payload = JSON.parse(base64UrlDecode(parts[1]))
      const signature = parts[2]
      return { data: { header, payload, signature }, error: null }
    } catch {
      return { data: null, error: 'Failed to decode JWT. Ensure it is a valid Base64URL-encoded token.' }
    }
  }, [token])

  const expirationStatus = useMemo(() => {
    if (!decoded.data) return null
    return getExpirationStatus(decoded.data.payload)
  }, [decoded])

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">JWT Token</label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Paste your JWT token here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          aria-label="JWT token input"
        />
      </div>

      {decoded.error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{decoded.error}</div>
      )}

      {expirationStatus && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${
            expirationStatus.isExpired
              ? 'bg-destructive/10 text-destructive'
              : 'bg-green-500/10 text-green-700 dark:text-green-400'
          }`}
        >
          Token is {expirationStatus.text} &mdash; Expires: {expirationStatus.timestamp}
        </div>
      )}

      {decoded.data && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-blue-600 dark:text-blue-400">Header</label>
              <button
                onClick={() => copy(JSON.stringify(decoded.data!.header, null, 2), 'header')}
                className="text-xs text-primary hover:underline"
                aria-label="Copy header"
              >
                {copied === 'header' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 p-4">
              <pre className="text-sm font-mono whitespace-pre-wrap break-all text-blue-900 dark:text-blue-200">
                {JSON.stringify(decoded.data.header, null, 2)}
              </pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-green-600 dark:text-green-400">Payload</label>
              <button
                onClick={() => copy(JSON.stringify(decoded.data!.payload, null, 2), 'payload')}
                className="text-xs text-primary hover:underline"
                aria-label="Copy payload"
              >
                {copied === 'payload' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30 p-4">
              <pre className="text-sm font-mono whitespace-pre-wrap break-all text-green-900 dark:text-green-200">
                {JSON.stringify(decoded.data.payload, null, 2)}
              </pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-muted-foreground">Signature</label>
              <button
                onClick={() => copy(decoded.data!.signature, 'signature')}
                className="text-xs text-primary hover:underline"
                aria-label="Copy signature"
              >
                {copied === 'signature' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm font-mono break-all text-muted-foreground">
                {decoded.data.signature}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Signature verification is not available client-side. This tool only decodes the token.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
