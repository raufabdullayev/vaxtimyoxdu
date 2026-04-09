'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Menu, X, Zap } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from '@/components/common/ThemeToggle'

const navLinks = [
  { href: '/info', label: 'nav.news' },
  { href: '/tools', label: 'nav.tools' },
  { href: '/blog', label: 'nav.blog' },
  { href: '/about', label: 'nav.about' },
] as const

export default function Header() {
  const t = useTranslations('common')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
          <span>Vaxtim <span className="text-primary">Yoxdu</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isActive(href) ? 'text-primary font-semibold' : 'hover:text-primary'
              }`}
              {...(isActive(href) ? { 'aria-current': 'page' as const } : {})}
            >
              {t(label)}
            </Link>
          ))}
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
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium py-2 transition-colors ${
                isActive(href) ? 'text-primary font-semibold' : 'hover:text-primary'
              }`}
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
              {...(isActive(href) ? { 'aria-current': 'page' as const } : {})}
            >
              {t(label)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
