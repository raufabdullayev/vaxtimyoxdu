'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Search } from 'lucide-react'
import { Tool, ToolCategory } from '@/types/tool'
import ToolCard from './ToolCard'

const CATEGORY_ORDER: ToolCategory[] = ['ai', 'pdf', 'image', 'dev', 'generators', 'text']

interface ToolsPageClientProps {
  tools: Tool[]
}

export default function ToolsPageClient({ tools }: ToolsPageClientProps) {
  const t = useTranslations('tools')
  const pathname = usePathname()
  const locale = useLocale()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const trackSearchQuery = useCallback(
    (query: string) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        const trimmed = query.trim()
        if (!trimmed) return
        try {
          fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_type: 'search_query',
              page_path: pathname,
              locale,
              event_data: { query: trimmed },
            }),
            keepalive: true,
          }).catch(() => {})
        } catch {
          // Silently swallow -- analytics must never degrade UX
        }
      }, 1000)
    },
    [pathname, locale]
  )

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  const filtered = useMemo(() => {
    let result = tools
    if (activeCategory) {
      result = result.filter((tool) => tool.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(q) ||
          tool.shortDescription.toLowerCase().includes(q) ||
          tool.keywords.some((k) => k.toLowerCase().includes(q))
      )
    }
    return result
  }, [tools, search, activeCategory])

  const groupedTools = useMemo(() => {
    const grouped: Partial<Record<ToolCategory, Tool[]>> = {}
    for (const tool of filtered) {
      if (!grouped[tool.category]) grouped[tool.category] = []
      grouped[tool.category]!.push(tool)
    }
    return CATEGORY_ORDER
      .filter((cat) => grouped[cat] && grouped[cat]!.length > 0)
      .map((cat) => ({ category: cat, tools: grouped[cat]! }))
  }, [filtered])

  const handleCategoryClick = (cat: ToolCategory | null) => {
    setActiveCategory(cat)
    if (cat) {
      const el = document.getElementById(cat)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Search bar */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            trackSearchQuery(e.target.value)
          }}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-xl border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={t('searchPlaceholder')}
        />
      </div>

      {/* Category tabs */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b mb-8 -mx-4 px-4 overflow-x-auto">
        <div className="flex items-center gap-1 py-2 min-w-max">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {t('filterAll')}
          </button>
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Tool grid */}
      {groupedTools.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">{t('noToolsFound')}</p>
        </div>
      ) : (
        groupedTools.map(({ category, tools: categoryTools }) => (
          <section key={category} id={category} className="mb-10 scroll-mt-16">
            <h2 className="text-2xl font-bold mb-2">
              {t(`categories.${category}`)}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t(`categories.${category}Desc`)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  )
}
