'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ToolTextarea, ToolRadioGroup, ToolAlert } from '@/components/ui'

const lengths = [
  { value: 'short', label: 'Short (1-2 sentences)' },
  { value: 'medium', label: 'Medium (3-5 sentences)' },
  { value: 'long', label: 'Detailed (with bullet points)' },
]

export default function TextSummarizer() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [length, setLength] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remainingCount, setRemainingCount] = useState<string | null>(null)

  const summarize = async () => {
    if (!input.trim()) {
      setError(t('pleaseEnterText'))
      return
    }
    setLoading(true)
    setError('')
    setOutput('')
    setRemainingCount(null)
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, length }),
      })

      const remaining = res.headers.get('X-RateLimit-Remaining')

      if (!res.ok) {
        if (res.status === 429) {
          const retryAfter = res.headers.get('Retry-After')
          setError(retryAfter
            ? t('rateLimitRetry', { seconds: retryAfter })
            : t('rateLimitExceeded'))
          return
        }
        if (res.status >= 500) {
          setError(t('serviceUnavailable'))
          return
        }
        setError(t('errorOccurred'))
        return
      }

      const data = await res.json()
      setOutput(data.result)
      if (remaining) setRemainingCount(remaining)
    } catch (err) {
      if (err instanceof TypeError) {
        setError(t('checkConnection'))
      } else {
        setError(t('errorOccurred'))
      }
    } finally {
      setLoading(false)
    }
  }

  const copy = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  return (
    <div className="space-y-4">
      <ToolRadioGroup
        label="Summary Length"
        options={lengths}
        value={length}
        onChange={setLength}
      />

      <ToolTextarea
        label="Text to Summarize"
        maxLength={10000}
        showCount
        className="min-h-[200px]"
        placeholder="Paste your article, essay, or any text..."
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, 10000))}
      />

      {error && (
        <ToolAlert variant="error">{error}</ToolAlert>
      )}

      <button
        onClick={summarize}
        disabled={loading}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? t('summarizing') : t('summarize')}
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{t('result')}</span>
            <button onClick={copy} className="text-xs text-primary hover:underline">{t('copy')}</button>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm whitespace-pre-wrap">
            {output}
          </div>
          {remainingCount && (
            <p className="text-xs text-muted-foreground mt-2">
              {t('remainingUses')}: {remainingCount}/20
            </p>
          )}
        </div>
      )}
    </div>
  )
}
