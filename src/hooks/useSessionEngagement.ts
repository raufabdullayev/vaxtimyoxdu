'use client'

import { useEffect, useRef } from 'react'

/**
 * useSessionEngagement
 *
 * Tracks time on page, bounce detection (left before 30s), and session
 * duration. Fires a `session_engagement` event on page unload via
 * navigator.sendBeacon.
 *
 * A user is considered "bounced" if they leave the page within 30 seconds.
 * The event payload includes:
 *   - duration_ms: time spent on page in milliseconds
 *   - bounced: true if duration < 30s
 *   - page_path: current pathname
 */
export function useSessionEngagement() {
  const startTime = useRef<number>(Date.now())

  useEffect(() => {
    startTime.current = Date.now()

    const handleUnload = () => {
      const durationMs = Date.now() - startTime.current
      const bounced = durationMs < 30_000

      const payload = JSON.stringify({
        event_type: 'session_engagement',
        page_path: window.location.pathname,
        event_data: {
          duration_ms: durationMs,
          bounced,
          client_ts: new Date().toISOString(),
        },
      })

      // sendBeacon is the recommended way to send data during unload --
      // it survives page navigation and doesn't block the browser.
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/track', new Blob([payload], { type: 'application/json' }))
      } else {
        // Fallback for environments without sendBeacon
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    }

    window.addEventListener('beforeunload', handleUnload)

    // Also fire on visibilitychange to hidden -- handles mobile tab switches
    // and some browsers that skip beforeunload.
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleUnload()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}
