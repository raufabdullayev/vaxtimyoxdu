'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { initSentryClient } from '../../sentry.client.config'

// Initialize Sentry on client
initSentryClient()

/**
 * Global error boundary that catches errors in the root layout.
 * Uses inline styles instead of Tailwind because the root layout
 * (and its CSS imports) may not be available during a global error.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to console for development
    console.error('Global application error:', error)

    // Capture error in Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'global-error',
        digest: error.digest || 'unknown',
      },
      level: 'fatal',
    })
  }, [error])

  return (
    <html lang="az">
      <body
        style={{
          margin: 0,
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#fafafa',
          color: '#18181b',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '5rem',
              fontWeight: 700,
              color: 'rgba(230, 138, 0, 0.2)',
              marginBottom: '0.5rem',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            Xeta
          </p>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            Xeta bas verdi
          </h1>
          <p
            style={{
              color: '#71717a',
              marginBottom: '2rem',
              maxWidth: '28rem',
              lineHeight: 1.6,
            }}
          >
            Gozlenilmeyen xeta bas verdi. Zehmet olmasa yeniden cehd edin.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.625rem 1.5rem',
              backgroundColor: '#E68A00',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Yeniden cehd et
          </button>
        </div>
      </body>
    </html>
  )
}
