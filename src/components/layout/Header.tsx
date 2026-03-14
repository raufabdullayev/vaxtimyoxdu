'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Menu, X, Zap } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from '@/components/common/ThemeToggle'

export default function Header() {
  const t = useTranslations('common')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
          <span>Vaxtim <span className="text-primary">Yoxdu</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/info" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.news')}</Link>
          <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.tools')}</Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.blog')}</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.about')}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t('menu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden border-t overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          mobileOpen ? 'max-h-60' : 'max-h-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="container flex flex-col gap-2 py-4" aria-label="Mobile navigation">
          <Link href="/info" className="text-sm font-medium hover:text-primary py-2 transition-colors" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>{t('nav.news')}</Link>
          <Link href="/tools" className="text-sm font-medium hover:text-primary py-2 transition-colors" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>{t('nav.tools')}</Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary py-2 transition-colors" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>{t('nav.blog')}</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary py-2 transition-colors" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>{t('nav.about')}</Link>
        </nav>
      </div>
    </header>
  )
}
