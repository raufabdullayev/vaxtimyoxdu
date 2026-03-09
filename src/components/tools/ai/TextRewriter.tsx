'use client'

import { useState } from 'react'

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'academic', label: 'Academic' },
  { value: 'simple', label: 'Simple' },
  { value: 'creative', label: 'Creative' },
]

export default function TextRewriter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [tone, setTone] = useState('professional')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remainingCount, setRemainingCount] = useState<string | null>(null)

  const rewrite = async () => {
    if (!input.trim()) {
      setError('Yenidən yazmaq üçün mətn daxil edin')
      return
    }
    setLoading(true)
    setError('')
    setOutput('')
    setRemainingCount(null)
    try {
      const res = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, tone }),
      })

      const remaining = res.headers.get('X-RateLimit-Remaining')

      if (!res.ok) {
        if (res.status === 429) {
          const retryAfter = res.headers.get('Retry-After')
          setError(retryAfter
            ? `Gündəlik limit aşılıb. ${retryAfter} saniyə sonra yenidən cəhd edin.`
            : 'Gündəlik limit aşılıb. Sabah yenidən cəhd edin.')
          return
        }
        if (res.status >= 500) {
          setError('Xidmət müvəqqəti əlçatmazdır. Bir neçə dəqiqə sonra yenidən cəhd edin.')
          return
        }
        setError('Xəta baş verdi. Yenidən cəhd edin.')
        return
      }

      const data = await res.json()
      setOutput(data.result)
      if (remaining) setRemainingCount(remaining)
    } catch (err) {
      if (err instanceof TypeError) {
        setError('İnternet bağlantınızı yoxlayın.')
      } else {
        setError('Xəta baş verdi. Yenidən cəhd edin.')
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
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <button
            key={t.value}
            onClick={() => setTone(t.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tone === t.value
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Original Text <span className="text-muted-foreground">(max 5,000 chars)</span>
        </label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[180px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter text to rewrite..."
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 5000))}
        />
        <div className="text-xs text-muted-foreground text-right">{input.length}/5000</div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <button
        onClick={rewrite}
        disabled={loading}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Mətn yenidən yazılır...' : 'Rewrite Text'}
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Rewritten Text</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">Copy</button>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm whitespace-pre-wrap">
            {output}
          </div>
          {remainingCount && (
            <p className="text-xs text-muted-foreground mt-2">
              Qalan istifad{'\u0259'}: {remainingCount}/20
            </p>
          )}
        </div>
      )}
    </div>
  )
}
