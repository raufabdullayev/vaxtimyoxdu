'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="h-6 w-6 text-primary" />
          <span>Vaxtım <span className="text-primary">Yoxdu</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/info" className="text-sm font-medium hover:text-primary transition-colors">
            Xəbərlər
          </Link>
          <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">
            Alətlər
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            Haqqımızda
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menyu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col gap-2 py-4">
            <Link href="/info" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>
              Xəbərlər
            </Link>
            <Link href="/tools" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>
              Alətlər
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>
              Haqqımızda
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
