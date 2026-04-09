'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Sparkles } from 'lucide-react'
import { tools } from '@/config/tools'

export default function ToolOfTheDay() {
  const t = useTranslations('home')
  const toolsT = useTranslations('tools')

  const tool = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000) % tools.length
    return tools[dayIndex]
  }, [])

  const toolNameKey = `toolNames.${tool.slug}.name` as Parameters<typeof toolsT>[0]
  const toolDescKey = `toolNames.${tool.slug}.description` as Parameters<typeof toolsT>[0]

  let displayName = tool.name
  let displayDesc = tool.shortDescription
  try {
    const translated = toolsT(toolNameKey)
    if (translated && translated !== toolNameKey) displayName = translated
  } catch { /* fallback */ }
  try {
    const translated = toolsT(toolDescKey)
    if (translated && translated !== toolDescKey) displayDesc = translated
  } catch { /* fallback */ }

  return (
    <section className="max-w-4xl mx-auto mb-10">
      <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-primary/10 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t('toolOfTheDay')}</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-4xl">{tool.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold mb-1">{displayName}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{displayDesc}</p>
          </div>
          <Link
            href={`/tools/${tool.slug}`}
            className="shrink-0 bg-primary text-primary-foreground rounded-lg px-6 py-2.5 font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {t('tryNow')}
          </Link>
        </div>
      </div>
    </section>
  )
}
