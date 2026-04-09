'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { getPopularTools, getToolCategories } from '@/lib/utils/cross-links'
import type { ToolCategory } from '@/types/tool'

/** Category icon mapping for visual consistency in the 404 page. */
const categoryIcons: Record<ToolCategory, string> = {
  ai: '🤖',
  pdf: '📄',
  image: '🖼️',
  dev: '💻',
  generators: '⚙️',
  text: '📝',
}

/**
 * Root-level 404 page. This catches requests that do not match any route
 * including invalid locale prefixes. The locale-specific not-found page
 * at [locale]/not-found.tsx will handle 404s within a valid locale context.
 */
export default function RootNotFound() {
  const popularTools = getPopularTools(10)
  const toolCategories = getToolCategories()
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true

    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: '404_error',
          page_path: window.location.pathname,
          event_data: {
            attempted_url: window.location.pathname + window.location.search,
            referrer: document.referrer || null,
            client_ts: new Date().toISOString(),
          },
        }),
        keepalive: true,
      }).catch(() => {})
    } catch {
      // Ignore errors -- analytics must never break the UX
    }
  }, [])

  return (
    <div className="container py-12 md:py-20">
      {/* Hero section */}
      <div className="text-center mb-12">
        <p className="text-8xl md:text-9xl font-bold text-primary/20 mb-2 select-none">404</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Sehife tapilmadi / Page not found
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-2">
          Axtardiginiz sehife movcud deyil. / The page you are looking for does not exist.
        </p>
        <p className="text-sm text-muted-foreground/80">
          Maybe you can find what you are looking for here:
        </p>
      </div>

      {/* Quick navigation buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Link
          href="/"
          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Ana Sehife / Home
        </Link>
        <Link
          href="/tools"
          className="px-5 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Aletler / Tools
        </Link>
        <Link
          href="/info"
          className="px-5 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Xeberler / News
        </Link>
        <Link
          href="/blog"
          className="px-5 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Blog
        </Link>
      </div>

      {/* Popular tools section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {popularTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all group"
            >
              <span className="text-xl flex-shrink-0">{tool.icon}</span>
              <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tool categories section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-center">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {toolCategories.map((cat) => (
            <Link
              key={cat.key}
              href="/tools"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all group text-center"
            >
              <span className="text-2xl">{categoryIcons[cat.key]}</span>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Browse all tools
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
