'use client'

import dynamic from 'next/dynamic'

// Lazy load below-the-fold / post-interactive components.
// These are only needed after the page is interactive, so deferring them
// reduces the initial JS bundle and improves TTI and LCP.
// In Next.js 15, `ssr: false` with `next/dynamic` is not allowed in Server
// Components, so we wrap these imports in a Client Component.
const CookieConsent = dynamic(() => import('@/components/layout/CookieConsent'), {
  ssr: false,
})
const InstallPrompt = dynamic(() => import('@/components/layout/InstallPrompt'), {
  ssr: false,
})
const PageViewTracker = dynamic(() => import('@/components/analytics/PageViewTracker'), {
  ssr: false,
})

export default function ClientShell() {
  return (
    <>
      <CookieConsent />
      <InstallPrompt />
      <PageViewTracker />
    </>
  )
}
