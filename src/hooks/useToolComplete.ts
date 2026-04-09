'use client'

import { useCallback, useRef } from 'react'

/**
 * Hook that fires a 'tool_complete' analytics event.
 * Call the returned function when the user finishes an action in a tool
 * (e.g. generates output, converts a file, copies a result).
 *
 * De-duplicates rapid-fire calls within a 1 second window.
 */
export function useToolComplete(slug: string) {
  const lastFired = useRef(0)

  const trackComplete = useCallback(
    (action?: string) => {
      const now = Date.now()
      if (now - lastFired.current < 1000) return
      lastFired.current = now

      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'tool_complete',
          event_data: { toolSlug: slug, action },
        }),
      }).catch(() => {})
    },
    [slug]
  )

  return trackComplete
}
