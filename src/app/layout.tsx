import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/layout/CookieConsent'
import { generateBaseMetadata } from '@/lib/utils/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = generateBaseMetadata()

export const viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
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
