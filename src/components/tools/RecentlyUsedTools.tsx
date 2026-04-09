'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Clock } from 'lucide-react'
import { tools } from '@/config/tools'

const STORAGE_KEY = 'recently-used-tools'
const MAX_RECENT = 6

export default function RecentlyUsedTools() {
  const t = useTranslations('home')
  const toolsT = useTranslations('tools')
  const [recentTools, setRecentTools] = useState<typeof tools>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return
      const slugs: string[] = JSON.parse(stored)
      if (!Array.isArray(slugs) || slugs.length === 0) return

      const toolMap = new Map(tools.map((t) => [t.slug, t]))
      const resolved = slugs
        .slice(0, MAX_RECENT)
        .map((slug) => toolMap.get(slug))
        .filter(Boolean) as typeof tools

      if (resolved.length > 0) {
        setRecentTools(resolved)
      }
    } catch {
      // localStorage unavailable or corrupted
    }
  }, [])

  if (recentTools.length === 0) return null

  return (
    <section className="max-w-4xl mx-auto mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-bold">{t('recentlyUsed')}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recentTools.map((tool) => {
          const nameKey = `toolNames.${tool.slug}.name` as Parameters<typeof toolsT>[0]
          let displayName = tool.name
          try {
            const translated = toolsT(nameKey)
            if (translated && translated !== nameKey) displayName = translated
          } catch { /* fallback */ }

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <span className="text-2xl">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                  {displayName}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
