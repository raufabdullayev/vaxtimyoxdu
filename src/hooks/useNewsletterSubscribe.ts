'use client'

import { useState, useCallback, useRef, FormEvent } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STORAGE_KEY_EMAILS = 'newsletter-emails'
const STORAGE_KEY_SUBSCRIBED = 'newsletter-subscribed'

export type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

interface UseNewsletterSubscribeOptions {
  source?: string
  locale?: string
  translations: {
    errorEmpty: string
    errorInvalid: string
    errorDuplicate: string
    errorGeneral: string
  }
}

interface UseNewsletterSubscribeReturn {
  email: string
  setEmail: (value: string) => void
  error: string
  status: NewsletterStatus
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  isAlreadySubscribed: boolean
}

/**
 * Checks whether the current visitor has already subscribed to the newsletter.
 * Works in any context (SSR-safe).
 */
export function isSubscribed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY_SUBSCRIBED) === 'true'
  } catch {
    return false
  }
}

export function useNewsletterSubscribe({
  source,
  locale,
  translations,
}: UseNewsletterSubscribeOptions): UseNewsletterSubscribeReturn {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<NewsletterStatus>('idle')

  // Keep the latest translations in a ref so handleSubmit always reads the
  // freshest copy without `translations` (an inline object literal from
  // callers) having to be in the useCallback dependency array. Updated on every
  // render; handleSubmit only runs after commit via user events, so it never
  // observes a stale value.
  const translationsRef = useRef(translations)
  translationsRef.current = translations

  const alreadySubscribed = typeof window !== 'undefined' && isSubscribed()

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError('')

      const trimmed = email.trim()

      if (!trimmed) {
        setError(translationsRef.current.errorEmpty)
        setStatus('error')
        return
      }

      if (!EMAIL_REGEX.test(trimmed)) {
        setError(translationsRef.current.errorInvalid)
        setStatus('error')
        return
      }

      // Client-side dedup check
      try {
        const stored = localStorage.getItem(STORAGE_KEY_EMAILS)
        const emails: string[] = stored ? JSON.parse(stored) : []
        if (emails.includes(trimmed.toLowerCase())) {
          setError(translationsRef.current.errorDuplicate)
          setStatus('error')
          return
        }
      } catch {
        // localStorage unavailable, proceed with API call
      }

      setStatus('loading')

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: trimmed,
            source: source ?? 'unknown',
            locale: locale ?? undefined,
          }),
        })

        if (res.status === 409) {
          setError(translationsRef.current.errorDuplicate)
          setStatus('error')
          return
        }

        if (res.status === 400) {
          const data = await res.json()
          setError(
            data.error === 'Invalid email format'
              ? translationsRef.current.errorInvalid
              : translationsRef.current.errorEmpty
          )
          setStatus('error')
          return
        }

        if (!res.ok) {
          setError(translationsRef.current.errorGeneral)
          setStatus('error')
          return
        }

        // Save to localStorage
        try {
          const stored = localStorage.getItem(STORAGE_KEY_EMAILS)
          const emails: string[] = stored ? JSON.parse(stored) : []
          emails.push(trimmed.toLowerCase())
          localStorage.setItem(STORAGE_KEY_EMAILS, JSON.stringify(emails))
          localStorage.setItem(STORAGE_KEY_SUBSCRIBED, 'true')
        } catch {
          // localStorage unavailable
        }

        setStatus('success')
        setEmail('')
      } catch {
        setError(translationsRef.current.errorGeneral)
        setStatus('error')
      }
    },
    [email, source, locale]
  )

  return {
    email,
    setEmail: (value: string) => {
      setEmail(value)
      if (error) setError('')
      if (status === 'error') setStatus('idle')
    },
    error,
    status,
    handleSubmit,
    isAlreadySubscribed: alreadySubscribed,
  }
}
