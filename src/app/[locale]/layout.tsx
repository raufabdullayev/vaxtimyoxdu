import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Lazy load below-the-fold / post-interactive components.
// These are only needed after the page is interactive, so deferring them
// reduces the initial JS bundle and improves TTI and LCP.
const CookieConsent = dynamic(() => import('@/components/layout/CookieConsent'), {
  ssr: false,
})
const InstallPrompt = dynamic(() => import('@/components/layout/InstallPrompt'), {
  ssr: false,
})

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <a href="#main-content" className="skip-to-content">
        {messages && typeof messages === 'object' && 'common' in messages
          ? (messages.common as Record<string, string>).skipToContent || 'Kontenta kec'
          : 'Kontenta kec'}
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </div>
      <CookieConsent />
      <InstallPrompt />
    </NextIntlClientProvider>
  )
}
