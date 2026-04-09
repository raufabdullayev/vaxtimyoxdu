'use client'

import { useEffect, useRef } from 'react'

const THRESHOLDS = [0.25, 0.5, 0.75, 1.0] as const

/**
 * Fires analytics events at 25%, 50%, 75%, and 100% scroll depth
 * using IntersectionObserver on sentinel elements placed at those
 * positions within the tracked container.
 *
 * @param slug - Identifier for the content (blog slug, page path, etc.)
 * @param containerRef - Ref to the scrollable content container
 */
export function useScrollDepth(
  slug: string,
  containerRef: React.RefObject<HTMLElement | null>
) {
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sentinels: HTMLDivElement[] = []

    THRESHOLDS.forEach((threshold) => {
      const sentinel = document.createElement('div')
      sentinel.style.position = 'absolute'
      sentinel.style.top = `${threshold * 100}%`
      sentinel.style.height = '1px'
      sentinel.style.width = '1px'
      sentinel.style.pointerEvents = 'none'
      sentinel.style.opacity = '0'
      sentinel.setAttribute('aria-hidden', 'true')
      sentinel.dataset.scrollDepth = String(threshold)
      sentinels.push(sentinel)
    })

    // Ensure parent is positioned for absolute children
    const originalPosition = container.style.position
    if (!originalPosition || originalPosition === 'static') {
      container.style.position = 'relative'
    }

    sentinels.forEach((s) => container.appendChild(s))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const depth = Number(
            (entry.target as HTMLElement).dataset.scrollDepth
          )
          if (firedRef.current.has(depth)) return
          firedRef.current.add(depth)

          const percent = Math.round(depth * 100)
          fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_type: 'scroll_depth',
              event_data: { slug, depth: percent },
            }),
          }).catch(() => {})
        })
      },
      { threshold: 0 }
    )

    sentinels.forEach((s) => observer.observe(s))

    return () => {
      observer.disconnect()
      sentinels.forEach((s) => s.remove())
      if (!originalPosition || originalPosition === 'static') {
        container.style.position = originalPosition || ''
      }
    }
  }, [slug, containerRef])
}
