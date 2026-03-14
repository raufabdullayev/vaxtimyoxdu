'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function UrlCodec() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    if (!input.trim()) {
      setError('Please enter text to encode')
      setOutput('')
      return
    }
    setError('')
    try {
      setOutput(encodeURIComponent(input))
    } catch {
      setError('Failed to encode the input')
      setOutput('')
    }
  }

  const decode = () => {
    if (!input.trim()) {
      setError('Please enter text to decode')
      setOutput('')
      return
    }
    setError('')
    try {
      setOutput(decodeURIComponent(input))
    } catch {
      setError('Invalid URL-encoded string. Check for malformed percent-encoding sequences.')
      setOutput('')
    }
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
    setError('')
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('input')}</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter text to encode or decode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="URL encode/decode input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">{t('output')}</label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label="Copy output to clipboard"
              >
                {copied ? t('copied') : t('copy')}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[200px] focus:outline-none"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            aria-label="URL encode/decode output"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={encode}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label="URL encode"
        >
          {t('encode')}
        </button>
        <button
          onClick={decode}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label="URL decode"
        >
          {t('decode')}
        </button>
        {output && (
          <button
            onClick={swap}
            className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
            aria-label="Swap output to input"
          >
            {t('swap')}
          </button>
        )}
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear all fields"
        >
          {t('clear')}
        </button>
      </div>
    </div>
  )
}
