import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/layout/CookieConsent'
import InstallPrompt from '@/components/layout/InstallPrompt'
import ServiceWorkerRegistrar from '@/components/layout/ServiceWorkerRegistrar'
import { generateBaseMetadata } from '@/lib/utils/seo'

const inter = Inter({
  subsets: ['latin'],
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
  description: 'Vaxtiniz yoxdursa, biz variq. Qisa xeber xulaseleri ve pulsuz AI onlayn aletler.',
  inLanguage: ['az', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://vaxtimyoxdu.com/tools/{search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vaxtim Yoxdu',
  url: 'https://vaxtimyoxdu.com',
  logo: 'https://vaxtimyoxdu.com/logo.png',
  description: 'Qisa xeberler ve pulsuz onlayn aletler - Azerbaycan',
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
    availableLanguage: ['az', 'en'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <head>
        {/* PWA meta tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Vaxtim Yoxdu" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vaxtim Yoxdu" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        {ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-content">Kontenta kec</a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
        <InstallPrompt />
        <ServiceWorkerRegistrar />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
