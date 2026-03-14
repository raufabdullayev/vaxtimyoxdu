'use client'

import { useCallback, useEffect, useState } from 'react'
import { type Theme, getTheme, setTheme, getResolvedTheme } from '@/lib/theme'

const icons: Record<Theme, { path: string; label: string }> = {
  light: {
    path: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    label: 'Light mode',
  },
  dark: {
    path: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    label: 'Dark mode',
  },
  system: {
    path: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'System preference',
  },
}

const cycle: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
}

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setThemeState(getTheme())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (getTheme() === 'system') {
        document.documentElement.classList.toggle('dark', mq.matches)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mounted])

  const toggle = useCallback(() => {
    const next = cycle[theme]
    setTheme(next)
    setThemeState(next)
  }, [theme])

  if (!mounted) {
    return (
      <button
        className="rounded-md p-2 text-muted-foreground"
        aria-label="Toggle theme"
        disabled
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icons.system.path} />
        </svg>
      </button>
    )
  }

  const { path, label } = icons[theme]
  const resolved = getResolvedTheme(theme)

  return (
    <button
      onClick={toggle}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={label}
      title={`${label} (${resolved})`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </button>
  )
}
