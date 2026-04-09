'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Tool } from '@/types/tool'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const t = useTranslations('tools')

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group rounded-xl border bg-card p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-200"
    >
      <div className="text-3xl mb-3">{tool.icon}</div>
      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
      <div className="mt-3 flex items-center gap-2">
        {tool.isAI && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {t('aiPowered')}
          </span>
        )}
        {tool.isClientSide && (
          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
            {t('clientSide')}
          </span>
        )}
      </div>
    </Link>
  )
}
