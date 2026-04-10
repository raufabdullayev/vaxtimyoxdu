'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

const STORAGE_KEY = 'tool-use-counter'

interface ToolUsageCounterProps {
  slug: string
}

export default function ToolUsageCounter({ slug }: ToolUsageCounterProps) {
  const t = useTranslations('toolUsage')
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const stats: Record<string, number> = JSON.parse(raw)
      const toolCount = stats[slug]
      if (typeof toolCount === 'number' && toolCount > 0) {
        setCount(toolCount)
      }
    } catch {
      // localStorage unavailable or corrupted
    }
  }, [slug])

  // Increment usage on mount
  useEffect(() => {
    if (!mounted) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const stats: Record<string, number> = raw ? JSON.parse(raw) : {}
      stats[slug] = (stats[slug] || 0) + 1
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
      setCount(stats[slug])
    } catch {
      // localStorage unavailable
    }
  }, [slug, mounted])

  if (!mounted || count === 0) return null

  return (
    <p className="text-sm text-muted-foreground mt-1">
      {t('usedTimes', { count })}
    </p>
  )
}
