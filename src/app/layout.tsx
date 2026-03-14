import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'
import ServiceWorkerRegistrar from '@/components/layout/ServiceWorkerRegistrar'
import { generateBaseMetadata } from '@/lib/utils/seo'
import { themeBlockingScript } from '@/lib/theme'
import { initSentryServer } from '../../sentry.server.config'

// Initialize Sentry for server-side error tracking
initSentryServer()

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = generateBaseMetadata()

export const viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || ''

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vaxtim Yoxdu',
  url: 'https://vaxtimyoxdu.com',
  description: 'Vaxtınız yoxdursa, biz varıq. Qısa xəbər xülasələri və pulsuz AI onlayn alətlər.',
  inLanguage: ['az', 'en', 'tr', 'ru'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://vaxtimyoxdu.com/tools?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vaxtim Yoxdu',
  url: 'https://vaxtimyoxdu.com',
  logo: 'https://vaxtimyoxdu.com/logo.png',
  description: 'Qısa xəbərlər və pulsuz onlayn alətlər - Azərbaycan',
  sameAs: [
    'https://github.com/vaxtimyoxdu',
    'https://x.com/vaxtimyoxdu',
    'https://instagram.com/vaxtimyoxdu',
    'https://linkedin.com/company/vaxtimyoxdu',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@vaxtimyoxdu.com',
    contactType: 'customer service',
    availableLanguage: ['az', 'en', 'tr', 'ru'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <head>
        {/* Blocking inline script to prevent dark mode FOUC — zero network overhead */}
        <script dangerouslySetInnerHTML={{ __html: themeBlockingScript }} />
        {/* PWA meta tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Vaxtim Yoxdu" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vaxtim Yoxdu" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* DNS prefetch and preconnect for external domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <ServiceWorkerRegistrar />
        {ADSENSE_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        )}
        {GA_ID && (
          <>
            <Script src="/analytics.js" strategy="beforeInteractive" />
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-config" strategy="afterInteractive">
              {`gtag('config','${GA_ID}')`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
