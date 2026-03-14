'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type ConsentStatus = 'accepted' | 'rejected' | null

export default function CookieConsent() {
  const t = useTranslations('cookie')
  const [status, setStatus] = useState<ConsentStatus>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored === 'accepted' || stored === 'rejected') {
      setStatus(stored)
    } else {
      // Small delay so the slide-up animation is visible
      const timer = setTimeout(() => setVisible(true), 300)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setStatus('accepted')
    setVisible(false)

    // Enable Google Analytics if gtag is available
    if (typeof window !== 'undefined') {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      if (typeof w.gtag === 'function') {
        w.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        })
      }
    }
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setStatus('rejected')
    setVisible(false)
  }

  // Don't render if user already made a choice
  if (status !== null) return null

  return (
    <div
      role="dialog"
      aria-label={t('ariaLabel')}
      aria-describedby="cookie-consent-description"
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-4xl p-4">
        <div className="rounded-lg border bg-card p-4 shadow-lg sm:flex sm:items-center sm:gap-4">
          <p
            id="cookie-consent-description"
            className="flex-1 text-sm text-card-foreground"
          >
            {t('message')}{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-primary"
            >
              {t('privacyLink')}
            </Link>
          </p>
          <div className="mt-3 flex items-center gap-2 sm:mt-0 sm:shrink-0">
            <button
              onClick={handleReject}
              className="rounded-md border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t('ariaReject')}
            >
              {t('reject')}
            </button>
            <button
              onClick={handleAccept}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t('ariaAccept')}
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
