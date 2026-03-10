'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

/**
 * PageViewTracker
 *
 * A client component that fires a page_view event to /api/analytics/track
 * on every client-side navigation.  It uses the pathname + locale as a
 * deduplication key so the same page is not counted twice in a row
 * (e.g. when React strict mode double-renders in development).
 *
 * This component renders no visible UI.  It should be placed once in the
 * locale layout so it captures all page transitions.
 *
 * The fetch call is fire-and-forget with keepalive: true so it survives
 * page unloads and never blocks rendering.
 */
export default function PageViewTracker() {
  const pathname = usePathname()
  const locale = useLocale()
  const lastTracked = useRef<string>('')

  useEffect(() => {
    // Build a dedup key from pathname + locale
    const key = `${locale}:${pathname}`

    // Skip if we already tracked this exact page in this session
    if (key === lastTracked.current) return
    lastTracked.current = key

    // Fire-and-forget: send the event to the server
    try {
      const referrer =
        typeof document !== 'undefined' ? document.referrer : ''

      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'page_view',
          page_path: pathname,
          locale,
          event_data: {
            referrer: referrer || null,
            // User agent is available server-side from headers; adding a
            // timestamp here helps correlate client/server clocks.
            client_ts: new Date().toISOString(),
          },
        }),
        // keepalive ensures the request completes even if the user
        // navigates away before the fetch resolves.
        keepalive: true,
      }).catch(() => {
        // Silently swallow network errors -- analytics must never
        // degrade the user experience.
      })
    } catch {
      // Ignore any synchronous errors (e.g. fetch not available in SSR)
    }
  }, [pathname, locale])

  return null
}
