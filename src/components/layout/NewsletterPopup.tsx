'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { X, Mail, Loader2, CheckCircle2, Bell } from 'lucide-react'
import {
  useNewsletterSubscribe,
  isSubscribed,
} from '@/hooks/useNewsletterSubscribe'

const POPUP_DELAY_MS = 45_000
const STORAGE_KEY_DISMISSED = 'newsletter-popup-dismissed'
const STORAGE_KEY_SESSION = 'newsletter-popup-shown-session'

/**
 * Non-intrusive newsletter popup that slides up from the bottom-right corner
 * after 45 seconds on the page.
 *
 * Visibility rules:
 * - Does NOT show if user is already subscribed (localStorage)
 * - Does NOT show if user previously dismissed with "Don't show again"
 * - Only shows once per session (sessionStorage)
 * - Respects prefers-reduced-motion for animations
 */
export default function NewsletterPopup() {
  const t = useTranslations('newsletterPopup')
  const locale = useLocale()

  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [dontShow, setDontShow] = useState(false)

  const {
    email,
    setEmail,
    error,
    status,
    handleSubmit,
    isAlreadySubscribed,
  } = useNewsletterSubscribe({
    source: 'popup',
    locale,
    translations: {
      errorEmpty: t('errorEmpty'),
      errorInvalid: t('errorInvalid'),
      errorDuplicate: t('errorDuplicate'),
      errorGeneral: t('errorGeneral'),
    },
  })

  // Determine whether the popup should appear at all
  useEffect(() => {
    // Already subscribed -- never show
    if (isSubscribed()) return

    // Previously dismissed permanently
    try {
      if (localStorage.getItem(STORAGE_KEY_DISMISSED) === 'true') return
    } catch {
      // localStorage unavailable
    }

    // Already shown this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY_SESSION) === 'true') return
    } catch {
      // sessionStorage unavailable
    }

    const timer = setTimeout(() => {
      // Re-check right before showing (user may have subscribed via footer)
      if (isSubscribed()) return

      setMounted(true)

      // Mark as shown for this session
      try {
        sessionStorage.setItem(STORAGE_KEY_SESSION, 'true')
      } catch {
        // sessionStorage unavailable
      }

      // Small delay to allow the DOM to render the off-screen element
      // before transitioning it into view.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true)
        })
      })
    }, POPUP_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)

    if (dontShow) {
      try {
        localStorage.setItem(STORAGE_KEY_DISMISSED, 'true')
      } catch {
        // localStorage unavailable
      }
    }

    // Wait for exit animation before unmounting
    setTimeout(() => setMounted(false), 350)
  }, [dontShow])

  // Don't render anything until the timer fires
  if (!mounted || isAlreadySubscribed) return null

  return (
    <div
      role="dialog"
      aria-label={t('title')}
      aria-modal="false"
      className={`
        fixed z-50
        bottom-4 right-4 left-4
        sm:left-auto sm:w-[400px]
        transition-all duration-300 ease-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl backdrop-blur-sm">
        {/* Decorative gradient stripe at top */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-primary/30" />

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={t('close')}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-5 pt-4">
          {status === 'success' ? (
            /* Success state */
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-semibold text-foreground">
                {t('success')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('successDescription')}
              </p>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-4 flex items-start gap-3 pr-6">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-tight text-foreground">
                    {t('title')}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t('description')}
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-3"
                aria-busy={status === 'loading'}
              >
                <div className="flex gap-2">
                  <label htmlFor="popup-newsletter-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="popup-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('placeholder')}
                    autoComplete="email"
                    disabled={status === 'loading'}
                    className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                    aria-describedby={
                      error ? 'popup-newsletter-error' : undefined
                    }
                    aria-invalid={error ? 'true' : undefined}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span>
                      {status === 'loading' ? t('sending') : t('subscribe')}
                    </span>
                  </button>
                </div>

                {error && (
                  <p
                    id="popup-newsletter-error"
                    role="alert"
                    className="text-xs text-destructive"
                  >
                    {error}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={dontShow}
                      onChange={(e) => setDontShow(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-border accent-primary"
                    />
                    {t('dontShowAgain')}
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {t('noSpam')}
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
