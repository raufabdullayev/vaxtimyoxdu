'use client'

import { useEffect } from 'react'

/**
 * Registers the service worker on mount.
 *
 * This is a client component because service worker registration
 * requires access to the `navigator` API. It renders nothing visible.
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // Tracked across the async registration so cleanup can clear it.
      let updateIntervalId: ReturnType<typeof setInterval> | null = null

      const onLoad = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // Check for SW updates periodically (every hour)
            updateIntervalId = setInterval(() => {
              registration.update()
            }, 60 * 60 * 1000)
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
      }

      // Register after the page has fully loaded to avoid
      // competing for bandwidth with initial page resources.
      window.addEventListener('load', onLoad)

      return () => {
        window.removeEventListener('load', onLoad)
        if (updateIntervalId !== null) {
          clearInterval(updateIntervalId)
        }
      }
    }
  }, [])

  return null
}
