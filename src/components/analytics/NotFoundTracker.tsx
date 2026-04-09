'use client'

import { useEffect, useRef } from 'react'

/**
 * NotFoundTracker
 *
 * A client component that fires a `404_error` analytics event when mounted.
 * Renders no visible UI. Used inside server-rendered 404 pages to track
 * the attempted URL path.
 */
export default function NotFoundTracker() {
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true

    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: '404_error',
          page_path: window.location.pathname,
          event_data: {
            attempted_url: window.location.pathname + window.location.search,
            referrer: document.referrer || null,
            client_ts: new Date().toISOString(),
          },
        }),
        keepalive: true,
      }).catch(() => {})
    } catch {
      // Ignore errors -- analytics must never break the UX
    }
  }, [])

  return null
}
