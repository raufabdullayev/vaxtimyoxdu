'use client'

import { useState, FormEvent } from 'react'
import { Mail, Loader2 } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const trimmed = email.trim()

    if (!trimmed) {
      setError('Email ünvanı daxil edin.')
      return
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Düzgün email ünvanı daxil edin.')
      return
    }

    // Client-side dedup check via localStorage
    try {
      const stored = localStorage.getItem('newsletter-emails')
      const emails: string[] = stored ? JSON.parse(stored) : []

      if (emails.includes(trimmed.toLowerCase())) {
        setError('Bu email artıq abunə olub.')
        return
      }
    } catch {
      // localStorage unavailable, proceed with API call
    }

    setLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })

      const data = await res.json()

      if (res.status === 409) {
        setError('Bu email artıq abunə olub.')
        return
      }

      if (res.status === 400) {
        setError(data.error === 'Invalid email format'
          ? 'Düzgün email ünvanı daxil edin.'
          : 'Email ünvanı daxil edin.')
        return
      }

      if (!res.ok) {
        setError('Xəta baş verdi. Yenidən cəhd edin.')
        return
      }

      // Save to localStorage as client-side dedup cache
      try {
        const stored = localStorage.getItem('newsletter-emails')
        const emails: string[] = stored ? JSON.parse(stored) : []
        emails.push(trimmed.toLowerCase())
        localStorage.setItem('newsletter-emails', JSON.stringify(emails))
      } catch {
        // localStorage unavailable, not critical
      }

      setSuccess(true)
      setEmail('')
    } catch {
      setError('Xəta baş verdi. Yenidən cəhd edin.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm text-primary">
        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Uğurla abunə oldunuz!</span>
      </div>
    )
  }

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Mail className="h-4 w-4" aria-hidden="true" />
        Yeniliklərdən xəbərdar olun
      </h4>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex gap-2"
        aria-busy={loading}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email ünvanı
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          placeholder="Email ünvanınızı daxil edin"
          autoComplete="email"
          disabled={loading}
          className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          aria-describedby={error ? 'newsletter-error' : undefined}
          aria-invalid={error ? 'true' : undefined}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {loading && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          {loading ? 'Göndərilir...' : 'Abunə ol'}
        </button>
      </form>
      {error && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  )
}
