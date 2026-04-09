'use client'

import { useRef } from 'react'
import { useScrollDepth } from '@/hooks/useScrollDepth'

interface ScrollDepthTrackerProps {
  slug: string
  children: React.ReactNode
}

/**
 * Wraps content and tracks scroll depth at 25%, 50%, 75%, 100%.
 * Fires scroll_depth analytics events via the useScrollDepth hook.
 */
export default function ScrollDepthTracker({
  slug,
  children,
}: ScrollDepthTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollDepth(slug, containerRef)

  return <div ref={containerRef}>{children}</div>
}
