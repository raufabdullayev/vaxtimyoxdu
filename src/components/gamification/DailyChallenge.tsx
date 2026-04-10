'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Target, Check, Flame } from 'lucide-react'

const STORAGE_KEY = 'daily-challenge'

interface ChallengeConfig {
  toolSlug: string
  labelKey: string
}

/**
 * Seven challenges, one per day of the week (0 = Sunday … 6 = Saturday).
 * labelKey maps to dailyChallenge.challenges.* in messages.
 */
const challenges: ChallengeConfig[] = [
  { toolSlug: 'pdf-merge', labelKey: 'mergePdf' },
  { toolSlug: 'image-compress', labelKey: 'compressImage' },
  { toolSlug: 'password-generator', labelKey: 'generatePassword' },
  { toolSlug: 'qr-code-generator', labelKey: 'generateQr' },
  { toolSlug: 'json-formatter', labelKey: 'formatJson' },
  { toolSlug: 'ai-text-rewriter', labelKey: 'rewriteText' },
  { toolSlug: 'age-calculator', labelKey: 'calculateAge' },
]

interface StoredState {
  /** ISO date string (YYYY-MM-DD) of the last completed challenge */
  lastCompleted: string
  /** Number of consecutive days completed */
  streak: number
}

function getTodayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getYesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getTodayChallenge(): ChallengeConfig {
  const dayIndex = Math.floor(Date.now() / 86400000) % challenges.length
  return challenges[dayIndex]
}

function readState(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredState
  } catch {
    return null
  }
}

function writeState(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable
  }
}

export default function DailyChallenge() {
  const t = useTranslations('dailyChallenge')
  const [completedToday, setCompletedToday] = useState(false)
  const [streak, setStreak] = useState(0)
  const [mounted, setMounted] = useState(false)

  const challenge = useMemo(() => getTodayChallenge(), [])

  useEffect(() => {
    setMounted(true)
    const state = readState()
    if (!state) return

    const today = getTodayKey()
    if (state.lastCompleted === today) {
      setCompletedToday(true)
      setStreak(state.streak)
    } else if (state.lastCompleted === getYesterdayKey()) {
      // Streak is still active but not completed today
      setStreak(state.streak)
    }
    // If lastCompleted is older than yesterday, streak resets (stays 0)
  }, [])

  const handleComplete = () => {
    if (completedToday) return

    const today = getTodayKey()
    const state = readState()
    let newStreak = 1

    if (state) {
      if (state.lastCompleted === getYesterdayKey()) {
        newStreak = state.streak + 1
      }
    }

    writeState({ lastCompleted: today, streak: newStreak })
    setCompletedToday(true)
    setStreak(newStreak)
  }

  // Avoid hydration mismatch — render nothing on server
  if (!mounted) return null

  const challengeLabel = t(`challenges.${challenge.labelKey}` as Parameters<typeof t>[0])

  return (
    <section className="max-w-4xl mx-auto mb-10">
      <div className="rounded-2xl border bg-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t('title')}</h2>
          {streak > 0 && (
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-orange-500">
              <Flame className="h-4 w-4" />
              {t('streak', { count: streak })}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{challengeLabel}</p>
          </div>
          {completedToday ? (
            <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              {t('completed')}
            </span>
          ) : (
            <Link
              href={`/tools/${challenge.toolSlug}`}
              onClick={handleComplete}
              className="shrink-0 bg-primary text-primary-foreground rounded-lg px-6 py-2.5 font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {t('startChallenge')}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
