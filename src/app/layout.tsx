import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateBaseMetadata } from '@/lib/utils/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = generateBaseMetadata()

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vaxtım Yoxdu',
  url: 'https://vaxtimyoxdu.com',
  description: 'Vaxtınız yoxdursa, biz varıq. Qısa xəbər xülasələri və pulsuz AI onlayn alətlər.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://vaxtimyoxdu.com/tools/{search_term_string}',
    'query-input': 'required name=search_term_string',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
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
