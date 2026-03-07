'use client'

import { useState } from 'react'

export default function GrammarChecker() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const check = async () => {
    if (!input.trim()) {
      setError('Please enter text to check')
      return
    }
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch('/api/ai/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 429) throw new Error('Daily limit reached. Please try again tomorrow.')
        throw new Error('Service temporarily unavailable. Please try again later.')
      }
      setOutput(data.result)
    } catch (e) {
      if (e instanceof TypeError && e.message === 'Failed to fetch') {
        setError('Connection error. Please check your internet connection.')
      } else {
        setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
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
      <div>
        <label className="block text-sm font-medium mb-1">
          Text to Check <span className="text-muted-foreground">(max 5,000 chars)</span>
        </label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Paste your text here to check grammar, spelling, and punctuation..."
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 5000))}
        />
        <div className="text-xs text-muted-foreground text-right">{input.length}/5000</div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <button
        onClick={check}
        disabled={loading}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Grammar'}
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Corrected Text</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">Copy</button>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
