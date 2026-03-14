'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Download, X } from 'lucide-react'

/**
 * BeforeInstallPromptEvent is a non-standard event fired by Chromium browsers
 * when the site meets the PWA installability criteria.
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  prompt(): Promise<void>
}

const DISMISS_KEY = 'pwa-install-dismissed'
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

/**
 * Check if the user previously dismissed the prompt recently.
 */
function wasDismissedRecently(): boolean {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(DISMISS_KEY)
  if (!stored) return false
  const timestamp = parseInt(stored, 10)
  if (isNaN(timestamp)) return false
  return Date.now() - timestamp < DISMISS_DURATION_MS
}

/**
 * Simple mobile detection heuristic.
 * We show the install prompt primarily on mobile devices where
 * "Add to Home Screen" provides the most value.
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Check if the app is already running in standalone (installed) mode.
 */
function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

export default function InstallPrompt() {
  const t = useTranslations('installPrompt')
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  const handleBeforeInstallPrompt = useCallback((e: Event) => {
    // Prevent the default mini-infobar from appearing on mobile
    e.preventDefault()
    setDeferredPrompt(e as BeforeInstallPromptEvent)
  }, [])

  useEffect(() => {
    // Don't show if already installed, recently dismissed, or on desktop
    if (isStandalone() || wasDismissedRecently() || !isMobileDevice()) {
      return
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [handleBeforeInstallPrompt])

  // Show the banner with a small delay once we have the deferred prompt
  useEffect(() => {
    if (!deferredPrompt) return

    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [deferredPrompt])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setVisible(false)
        setDeferredPrompt(null)
      }
    } catch {
      // User may have dismissed or an error occurred
    }
  }

  const handleDismiss = () => {
    setVisible(false)
    setDeferredPrompt(null)
    localStorage.setItem(DISMISS_KEY, Date.now().toString())
  }

  if (!visible || !deferredPrompt) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-label={t('ariaLabel')}
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-lg p-4">
        <div className="rounded-lg border bg-card p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Download className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground">
                {t('title')}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t('description')}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label={t('close')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleDismiss}
              className="flex-1 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t('dismiss')}
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t('install')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
