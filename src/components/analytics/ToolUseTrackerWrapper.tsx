'use client'

import dynamic from 'next/dynamic'

/**
 * ToolUseTrackerWrapper
 *
 * A thin client component that loads ToolUseTracker with ssr: false.
 *
 * Why this wrapper exists:
 * Next.js App Router does not allow `dynamic(() => ..., { ssr: false })`
 * inside Server Components (the tool page is an async Server Component).
 * This client component wrapper enables the ssr: false pattern, which
 * guarantees the tracker only runs on the client side after hydration --
 * matching the proven approach used by PageViewTracker in ClientShell.
 *
 * This solves a subtle issue where a `'use client'` component returning
 * null, when directly imported in a Server Component with static
 * generation, may not hydrate reliably on all pages (its useEffect
 * never fires).  By using ssr: false, we ensure the component is
 * exclusively client-rendered and its useEffect always executes.
 */
const ToolUseTracker = dynamic(
  () => import('@/components/analytics/ToolUseTracker'),
  { ssr: false }
)

interface ToolUseTrackerWrapperProps {
  slug: string
}

export default function ToolUseTrackerWrapper({ slug }: ToolUseTrackerWrapperProps) {
  return <ToolUseTracker slug={slug} />
}
