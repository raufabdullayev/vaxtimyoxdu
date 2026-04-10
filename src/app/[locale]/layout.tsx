import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientShell from '@/components/layout/ClientShell'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale)

  const messages = await getMessages()

  // Only pass namespaces needed by client components to reduce bundle size.
  // Server-only namespaces are used exclusively via getTranslations() in server
  // components and never by useTranslations() in client components.
  // NOTE: 'home' and 'tools' are NOT listed here because client components
  // (ToolOfTheDay, ToolsPageClient, ToolCard, DailyChallenge) use
  // useTranslations('tools') and useTranslations('home').
  // - toolUI (7KB): provided per-page via NextIntlClientProvider on tool slug pages
  // - toolComponents (1KB): same as toolUI
  const serverOnlyNamespaces = [
    'about', 'privacy', 'terms', 'info', 'blog', 'crossLinks',
    'toolUI', 'toolComponents',
  ]
  const clientMessages = Object.fromEntries(
    Object.entries(messages).filter(([key]) => !serverOnlyNamespaces.includes(key))
  )

  return (
    <NextIntlClientProvider messages={clientMessages}>
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
      <ClientShell />
    </NextIntlClientProvider>
  )
}
