'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { tools } from '@/config/tools'
import LazyAdBanner from './LazyAdBanner'

export default function Sidebar() {
  const t = useTranslations('tools')

  const localizedName = (slug: string, fallback: string) => {
    const key = `toolNames.${slug}.name` as Parameters<typeof t>[0]
    try {
      const translated = t(key)
      if (translated && translated !== key) return translated
    } catch { /* fallback */ }
    return fallback
  }

  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-20 space-y-6">
        <LazyAdBanner slot="sidebar-top" format="sidebar" />
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold text-sm mb-3">{t('popularTools')}</h3>
          <ul className="space-y-2">
            {tools.slice(0, 6).map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span>{tool.icon}</span>
                  <span>{localizedName(tool.slug, tool.name)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <LazyAdBanner slot="sidebar-bottom" format="sidebar" />
      </div>
    </aside>
  )
}
