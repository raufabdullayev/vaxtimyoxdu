'use client'

import { useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

/**
 * useTrackToolUse
 *
 * A client-side hook that sends a tool_use analytics event to the server.
 * It includes built-in deduplication: the same tool slug is only tracked
 * once per page load to avoid inflating numbers when a user interacts
 * with a tool multiple times on the same page.
 *
 * Usage:
 *   const trackToolUse = useTrackToolUse()
 *   // later, when the user interacts with a tool:
 *   trackToolUse('json-formatter')
 *
 * The fetch is fire-and-forget and never throws.
 */
export function useTrackToolUse() {
  const pathname = usePathname()
  const locale = useLocale()
  const trackedSlugs = useRef(new Set<string>())

  const trackToolUse = useCallback(
    (toolSlug: string) => {
      // Deduplicate: only track each tool once per page load
      if (trackedSlugs.current.has(toolSlug)) return
      trackedSlugs.current.add(toolSlug)

      try {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'tool_use',
            page_path: pathname,
            locale,
            event_data: { tool: toolSlug },
          }),
          keepalive: true,
        }).catch(() => {
          // Silently swallow -- analytics must never break the UX
        })
      } catch {
        // Ignore synchronous errors
      }
    },
    [pathname, locale]
  )

  return trackToolUse
}
