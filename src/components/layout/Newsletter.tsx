'use client'

import { useState, FormEvent } from 'react'
import { Mail } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    // Save to localStorage array
    try {
      const stored = localStorage.getItem('newsletter-emails')
      const emails: string[] = stored ? JSON.parse(stored) : []

      if (emails.includes(trimmed)) {
        setError('Bu email artıq abunə olub.')
        return
      }

      emails.push(trimmed)
      localStorage.setItem('newsletter-emails', JSON.stringify(emails))
      setSuccess(true)
      setEmail('')
    } catch {
      setError('Xəta baş verdi. Yenidən cəhd edin.')
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
      <form onSubmit={handleSubmit} noValidate className="flex gap-2">
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
          className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-describedby={error ? 'newsletter-error' : undefined}
          aria-invalid={error ? 'true' : undefined}
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Abunə ol
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
