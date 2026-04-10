'use client'

import { useState, useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Sparkles, FileText, Image as ImageIcon, Code, Palette, Type, ChevronRight } from 'lucide-react'
import { tools } from '@/config/tools'
import type { ToolCategory } from '@/types/tool'

const CATEGORY_ORDER: ToolCategory[] = ['ai', 'pdf', 'image', 'dev', 'generators', 'text']

const CATEGORY_ICONS: Record<ToolCategory, typeof Sparkles> = {
  ai: Sparkles,
  pdf: FileText,
  image: ImageIcon,
  dev: Code,
  generators: Palette,
  text: Type,
}

const POPULAR_PER_CATEGORY: Record<ToolCategory, string[]> = {
  ai: ['ai-text-rewriter', 'ai-text-summarizer', 'ai-grammar-checker'],
  pdf: ['pdf-merge', 'pdf-split', 'pdf-compress'],
  image: ['image-compress', 'image-convert', 'image-resize'],
  dev: ['json-formatter', 'base64-encode-decode', 'regex-tester'],
  generators: ['password-generator', 'qr-code-generator', 'color-picker'],
  text: ['word-counter', 'case-converter', 'text-diff'],
}

interface Props {
  onNavigate?: () => void
}

export default function MobileToolsAccordion({ onNavigate }: Props) {
  const [expanded, setExpanded] = useState<ToolCategory | null>(null)
  const navT = useTranslations('common.nav')
  const toolsT = useTranslations('tools')

  const countByCategory = useMemo(() => {
    const counts: Partial<Record<ToolCategory, number>> = {}
    for (const t of tools) counts[t.category] = (counts[t.category] || 0) + 1
    return counts
  }, [])

  const getToolName = useCallback((slug: string): string => {
    try {
      const key = `toolNames.${slug}.name` as Parameters<typeof toolsT>[0]
      const translated = toolsT(key)
      if (translated && translated !== key) return translated
    } catch {}
    const tool = tools.find(t => t.slug === slug)
    return tool?.name || slug
  }, [toolsT])

  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold py-2">{navT('tools')}</div>
      {CATEGORY_ORDER.map((cat) => {
        const Icon = CATEGORY_ICONS[cat]
        const catName = toolsT(`categories.${cat}` as Parameters<typeof toolsT>[0])
        const isOpen = expanded === cat
        const popularSlugs = POPULAR_PER_CATEGORY[cat]
        const count = countByCategory[cat] || 0

        return (
          <div key={cat} className="border-t">
            <button
              type="button"
              className="w-full flex items-center gap-2 py-3 text-sm"
              aria-expanded={isOpen}
              onClick={() => setExpanded(isOpen ? null : cat)}
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="flex-1 text-left">{catName}</span>
              <span className="text-xs text-muted-foreground">({count})</span>
              <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
            </button>
            {isOpen && (
              <ul className="pb-2 pl-6 space-y-1">
                {popularSlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/tools/${slug}`}
                      className="text-sm text-muted-foreground hover:text-primary block py-1"
                      onClick={onNavigate}
                    >
                      {getToolName(slug)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/tools#${cat}`}
                    className="text-xs text-primary font-medium py-1 block"
                    onClick={onNavigate}
                  >
                    {navT('viewAll')} →
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
