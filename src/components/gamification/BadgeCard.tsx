'use client'

import { useTranslations } from 'next-intl'
import { Badge, BadgeId } from '@/hooks/useGamification'

const BADGE_ICONS: Record<BadgeId, string> = {
  'first-step': '\u{1F3AF}',
  'explorer': '\u{1F9ED}',
  'expert': '\u{1F3C6}',
  'speed-runner': '\u{26A1}',
  'category-master': '\u{1F451}',
  'seven-day-streak': '\u{1F525}',
}

interface BadgeCardProps {
  badge: Badge
  onShare?: (badge: Badge) => void
}

export default function BadgeCard({ badge, onShare }: BadgeCardProps) {
  const t = useTranslations('badges')

  const icon = BADGE_ICONS[badge.id]
  const nameKey = `items.${badge.id}.name` as Parameters<typeof t>[0]
  const descKey = `items.${badge.id}.description` as Parameters<typeof t>[0]

  let name: string
  let description: string
  try {
    name = t(nameKey)
    description = t(descKey)
  } catch {
    name = badge.id
    description = ''
  }

  const progressPercent = badge.total > 0 ? (badge.progress / badge.total) * 100 : 0

  return (
    <div
      className={`relative rounded-xl border p-5 transition-all duration-300 ${
        badge.earned
          ? 'bg-card border-primary/30 shadow-md animate-in fade-in zoom-in-95'
          : 'bg-muted/30 border-border opacity-60'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`text-4xl transition-transform duration-300 ${
            badge.earned ? 'scale-110' : 'grayscale'
          }`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base ${
              badge.earned ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>

          {!badge.earned && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>
                  {badge.progress}/{badge.total}
                </span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary/60 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {badge.earned && onShare && (
            <button
              onClick={() => onShare(badge)}
              className="mt-3 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t('share')}
            </button>
          )}
        </div>
      </div>

      {badge.earned && (
        <div className="absolute top-2 right-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
          {t('earned')}
        </div>
      )}
    </div>
  )
}
