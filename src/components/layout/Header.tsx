'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Zap, Moon, Sun } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark)
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
          <span>Vaxtim <span className="text-primary">Yoxdu</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/info" className="text-sm font-medium hover:text-primary transition-colors">Xeberler</Link>
          <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">Aletler</Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Haqqimizda</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menyu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col gap-2 py-4" aria-label="Mobile navigation">
            <Link href="/info" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>Xeberler</Link>
            <Link href="/tools" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>Aletler</Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>Haqqimizda</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
