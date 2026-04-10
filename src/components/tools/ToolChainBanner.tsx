'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

/**
 * Tool chain configuration: maps a tool slug to its suggested "next step" tool.
 */
const toolChains: Record<string, string> = {
  'pdf-merge': 'pdf-compress',
  'pdf-split': 'pdf-merge',
  'image-compress': 'image-convert',
  'image-resize': 'image-crop',
  'image-convert': 'image-compress',
  'json-formatter': 'json-to-csv',
  'csv-to-json': 'json-formatter',
  'markdown-preview': 'markdown-to-html',
  'word-counter': 'ai-text-rewriter',
  'ai-text-rewriter': 'ai-grammar-checker',
}

interface ToolChainBannerProps {
  currentSlug: string
}

export default function ToolChainBanner({ currentSlug }: ToolChainBannerProps) {
  const t = useTranslations('toolChain')
  const toolsT = useTranslations('tools')

  const nextSlug = toolChains[currentSlug]
  if (!nextSlug) return null

  // Resolve localized tool name
  const nameKey = `toolNames.${nextSlug}.name` as Parameters<typeof toolsT>[0]
  let nextToolName = nextSlug
  try {
    const translated = toolsT(nameKey)
    if (translated && translated !== nameKey) nextToolName = translated
  } catch {
    // fallback to slug
  }

  return (
    <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 md:p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            {t('nextStep')}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t('suggestion', { toolName: nextToolName })}
          </p>
        </div>
        <Link
          href={`/tools/${nextSlug}`}
          className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {nextToolName}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
