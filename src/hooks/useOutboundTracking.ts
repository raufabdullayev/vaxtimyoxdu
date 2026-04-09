'use client'

import { useEffect } from 'react'

/**
 * useOutboundTracking
 *
 * Attaches a click listener via event delegation on document.body to
 * track clicks on external links. Fires an `outbound_click` analytics
 * event with the destination URL.
 *
 * External links are identified by `<a>` elements whose href starts with
 * "http" and whose hostname differs from the current page.
 */
export function useOutboundTracking() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Walk up from the click target to find the nearest <a> element
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.href
      if (!href) return

      try {
        const url = new URL(href)
        // Only track links to external domains
        if (url.hostname === window.location.hostname) return

        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'outbound_click',
            page_path: window.location.pathname,
            event_data: {
              destination_url: href,
              client_ts: new Date().toISOString(),
            },
          }),
          keepalive: true,
        }).catch(() => {
          // Silently swallow -- analytics must never degrade UX
        })
      } catch {
        // Invalid URL -- ignore
      }
    }

    document.body.addEventListener('click', handleClick)
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])
}
