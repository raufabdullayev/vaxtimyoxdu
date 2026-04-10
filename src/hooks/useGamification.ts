'use client'

import { useState, useCallback, useEffect } from 'react'
import { ToolCategory } from '@/types/tool'

const STORAGE_KEY = 'tool-usage-stats'
const STREAK_KEY = 'tool-streak-data'

export type BadgeId =
  | 'first-step'
  | 'explorer'
  | 'expert'
  | 'speed-runner'
  | 'category-master'
  | 'seven-day-streak'

export interface Badge {
  id: BadgeId
  earned: boolean
  progress: number
  total: number
  earnedAt?: number
}

interface UsageStats {
  toolSlugs: string[]
  categorySet: string[]
  sessionTools: string[]
  sessionId: string
  totalUses: number
}

interface StreakData {
  currentStreak: number
  lastUsedDate: string
  longestStreak: number
}

const ALL_CATEGORIES: ToolCategory[] = ['ai', 'pdf', 'image', 'dev', 'generators', 'text']

function getSessionId(): string {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${Math.floor(now.getHours() / 4)}`
}

function getTodayString(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA + 'T00:00:00')
  const b = new Date(dateB + 'T00:00:00')
  return Math.round(Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24))
}

function loadUsageStats(): UsageStats {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as UsageStats
      const currentSession = getSessionId()
      if (parsed.sessionId !== currentSession) {
        parsed.sessionTools = []
        parsed.sessionId = currentSession
      }
      return parsed
    }
  } catch { /* corrupted or unavailable */ }
  return {
    toolSlugs: [],
    categorySet: [],
    sessionTools: [],
    sessionId: getSessionId(),
    totalUses: 0,
  }
}

function saveUsageStats(stats: UsageStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch { /* storage full or unavailable */ }
}

function loadStreakData(): StreakData {
  try {
    const stored = localStorage.getItem(STREAK_KEY)
    if (stored) return JSON.parse(stored) as StreakData
  } catch { /* corrupted */ }
  return { currentStreak: 0, lastUsedDate: '', longestStreak: 0 }
}

function saveStreakData(data: StreakData): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data))
  } catch { /* storage full */ }
}

function computeBadges(stats: UsageStats, streak: StreakData): Badge[] {
  const uniqueTools = new Set(stats.toolSlugs).size
  const uniqueCategories = new Set(stats.categorySet)
  const sessionToolCount = new Set(stats.sessionTools).size

  return [
    {
      id: 'first-step',
      earned: stats.totalUses >= 1,
      progress: Math.min(stats.totalUses, 1),
      total: 1,
    },
    {
      id: 'explorer',
      earned: uniqueTools >= 5,
      progress: Math.min(uniqueTools, 5),
      total: 5,
    },
    {
      id: 'expert',
      earned: uniqueTools >= 10,
      progress: Math.min(uniqueTools, 10),
      total: 10,
    },
    {
      id: 'speed-runner',
      earned: sessionToolCount >= 3,
      progress: Math.min(sessionToolCount, 3),
      total: 3,
    },
    {
      id: 'category-master',
      earned: ALL_CATEGORIES.every((c) => uniqueCategories.has(c)),
      progress: Math.min(
        ALL_CATEGORIES.filter((c) => uniqueCategories.has(c)).length,
        ALL_CATEGORIES.length
      ),
      total: ALL_CATEGORIES.length,
    },
    {
      id: 'seven-day-streak',
      earned: streak.longestStreak >= 7,
      progress: Math.min(streak.currentStreak, 7),
      total: 7,
    },
  ]
}

export function useGamification() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    lastUsedDate: '',
    longestStreak: 0,
  })

  useEffect(() => {
    const stats = loadUsageStats()
    const streakData = loadStreakData()
    setBadges(computeBadges(stats, streakData))
    setStreak(streakData)
  }, [])

  const trackToolUse = useCallback((slug: string, category: ToolCategory) => {
    const stats = loadUsageStats()

    if (!stats.toolSlugs.includes(slug)) {
      stats.toolSlugs.push(slug)
    }
    if (!stats.categorySet.includes(category)) {
      stats.categorySet.push(category)
    }
    if (!stats.sessionTools.includes(slug)) {
      stats.sessionTools.push(slug)
    }
    stats.totalUses += 1
    saveUsageStats(stats)

    const streakData = loadStreakData()
    const today = getTodayString()
    if (streakData.lastUsedDate !== today) {
      const gap = streakData.lastUsedDate
        ? daysBetween(streakData.lastUsedDate, today)
        : 0
      if (gap === 1) {
        streakData.currentStreak += 1
      } else if (gap > 1) {
        streakData.currentStreak = 1
      } else {
        streakData.currentStreak = 1
      }
      streakData.lastUsedDate = today
      streakData.longestStreak = Math.max(
        streakData.longestStreak,
        streakData.currentStreak
      )
      saveStreakData(streakData)
    }

    setBadges(computeBadges(stats, streakData))
    setStreak(streakData)
  }, [])

  const getBadges = useCallback((): Badge[] => {
    return badges
  }, [badges])

  const getStreak = useCallback((): StreakData => {
    return streak
  }, [streak])

  return { badges, streak, trackToolUse, getBadges, getStreak }
}
