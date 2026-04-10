'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useGamification, Badge, BadgeId } from '@/hooks/useGamification'
import BadgeCard from './BadgeCard'

const BADGE_ICONS: Record<BadgeId, string> = {
  'first-step': '\u{1F3AF}',
  'explorer': '\u{1F9ED}',
  'expert': '\u{1F3C6}',
  'speed-runner': '\u{26A1}',
  'category-master': '\u{1F451}',
  'seven-day-streak': '\u{1F525}',
}

export default function BadgeSystem() {
  const t = useTranslations('badges')
  const { badges, streak } = useGamification()

  const earnedCount = badges.filter((b) => b.earned).length

  const handleShare = useCallback(
    (badge: Badge) => {
      const nameKey = `items.${badge.id}.name` as Parameters<typeof t>[0]
      let name: string
      try {
        name = t(nameKey)
      } catch {
        name = badge.id
      }
      const icon = BADGE_ICONS[badge.id]
      const text = t('shareText', { badge: `${icon} ${name}`, site: 'vaxtimyoxdu.com' })

      if (navigator.share) {
        navigator.share({ text }).catch(() => {})
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {})
      }
    },
    [t]
  )

  if (badges.length === 0) return null

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{earnedCount}</p>
            <p className="text-xs text-muted-foreground">{t('badgesEarned')}</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{badges.length}</p>
            <p className="text-xs text-muted-foreground">{t('totalBadges')}</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {streak.currentStreak}
            </p>
            <p className="text-xs text-muted-foreground">{t('dayStreak')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} onShare={handleShare} />
        ))}
      </div>
    </div>
  )
}
