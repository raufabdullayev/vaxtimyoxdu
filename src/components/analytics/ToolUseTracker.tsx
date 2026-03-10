'use client'

import { useEffect } from 'react'
import { useTrackToolUse } from './useTrackToolUse'

/**
 * ToolUseTracker
 *
 * A client component that fires a single tool_use event when it mounts.
 * It renders no visible UI.
 *
 * Place it inside the tool page to automatically track when a user
 * visits/interacts with a tool.
 *
 * @param slug - The tool's URL slug (e.g. 'json-formatter')
 */
interface ToolUseTrackerProps {
  slug: string
}

export default function ToolUseTracker({ slug }: ToolUseTrackerProps) {
  const trackToolUse = useTrackToolUse()

  useEffect(() => {
    trackToolUse(slug)
  }, [slug, trackToolUse])

  return null
}
