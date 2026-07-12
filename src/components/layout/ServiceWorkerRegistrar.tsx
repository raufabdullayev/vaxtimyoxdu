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
      // If the component unmounts before register() resolves, the interval id
      // is still null when cleanup runs — this flag prevents the late .then()
      // from creating an interval that would then never be cleared.
      let cancelled = false

      const onLoad = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (cancelled) return
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
        cancelled = true
        window.removeEventListener('load', onLoad)
        if (updateIntervalId !== null) {
          clearInterval(updateIntervalId)
        }
      }
    }
  }, [])

  return null
}
