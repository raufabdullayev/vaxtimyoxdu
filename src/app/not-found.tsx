'use client'

import Link from 'next/link'

/**
 * Root-level 404 page. This catches requests that do not match any route
 * including invalid locale prefixes. The locale-specific not-found page
 * at [locale]/not-found.tsx will handle 404s within a valid locale context.
 */
export default function RootNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">Sehife tapilmadi / Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Axtardiginiz sehife movcud deyil. / The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Ana Sehife / Home
      </Link>
    </div>
  )
}
