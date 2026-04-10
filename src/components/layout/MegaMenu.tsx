'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Sparkles, FileText, Image as ImageIcon, Code, Palette, Type, ChevronDown } from 'lucide-react'
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

export default function MegaMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const navT = useTranslations('common.nav')
  const toolsT = useTranslations('tools')

  const isActive = pathname === '/tools' || pathname.startsWith('/tools/')

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

  const handleMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }, [])

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          isActive ? 'text-primary font-semibold' : 'hover:text-primary'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="mega-menu-panel"
        onClick={() => setOpen(true)}
      >
        {navT('tools')}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          id="mega-menu-panel"
          role="menu"
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-[720px] max-w-[90vw] rounded-xl border bg-background shadow-xl z-50 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {CATEGORY_ORDER.map((cat) => {
              const Icon = CATEGORY_ICONS[cat]
              const catName = toolsT(`categories.${cat}` as Parameters<typeof toolsT>[0])
              const popularSlugs = POPULAR_PER_CATEGORY[cat]
              const count = countByCategory[cat] || 0

              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="font-semibold text-sm">{catName}</h3>
                    <span className="text-xs text-muted-foreground ml-auto">({count})</span>
                  </div>
                  <ul className="space-y-1.5">
                    {popularSlugs.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/tools/${slug}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                          onClick={() => setOpen(false)}
                        >
                          {getToolName(slug)}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-1">
                      <Link
                        href={`/tools#${cat}`}
                        className="text-xs text-primary font-medium hover:underline"
                        onClick={() => setOpen(false)}
                      >
                        {navT('viewAll')} →
                      </Link>
                    </li>
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
