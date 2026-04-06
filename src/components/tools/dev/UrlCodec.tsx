'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ToolTextarea, ToolAlert } from '@/components/ui'

export default function UrlCodec() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.devTools')
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
        <ToolTextarea
          label={tc('input')}
          className="font-mono min-h-[200px]"
          placeholder="Enter text to encode or decode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div>
          <ToolTextarea
            label={tc('output')}
            className="font-mono min-h-[200px] bg-muted/50"
            value={output}
            readOnly
            placeholder="Result will appear here..."
          />
          {output && (
            <button
              onClick={copy}
              className="text-xs text-primary hover:underline mt-1"
              aria-label="Copy output to clipboard"
            >
              {copied ? tc('copied') : tc('copy')}
            </button>
          )}
        </div>
      </div>

      {error && (
        <ToolAlert variant="error">{error}</ToolAlert>
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
            {tc('swap')}
          </button>
        )}
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear all fields"
        >
          {tc('clear')}
        </button>
      </div>
    </div>
  )
}
