'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

/**
 * ToolUseTracker
 *
 * A client component that fires a single tool_use analytics event when
 * it mounts.  It renders no visible UI.
 *
 * Place it inside the tool page to automatically track when a user
 * visits/uses a tool.
 *
 * The tracking logic is inlined (rather than delegated to a separate
 * hook) to avoid any indirection that could interfere with the effect
 * firing during hydration of statically generated pages.
 *
 * The fetch is fire-and-forget with keepalive so it survives page
 * unloads and never blocks rendering.
 *
 * @param slug - The tool's URL slug (e.g. 'json-formatter')
 */
interface ToolUseTrackerProps {
  slug: string
}

export default function ToolUseTracker({ slug }: ToolUseTrackerProps) {
  const pathname = usePathname()
  const locale = useLocale()
  const hasFired = useRef(false)

  useEffect(() => {
    // Guard: only fire once per mount (prevents double-fire in StrictMode)
    if (hasFired.current) return
    hasFired.current = true

    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'tool_use',
          page_path: pathname,
          locale,
          event_data: { tool: slug },
        }),
        keepalive: true,
      }).catch(() => {
        // Silently swallow -- analytics must never degrade UX
      })
    } catch {
      // Ignore synchronous errors (e.g. fetch not available)
    }
  }, [slug, pathname, locale])

  return null
}
