import { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Newspaper, Wrench } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import { generateHreflangAlternates } from '@/lib/utils/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const alternates = generateHreflangAlternates('/')

  return {
    alternates,
  }
}

export default async function HomePage({ params }: Props) {
  setRequestLocale(params.locale)
  const t = await getTranslations('home')

  return (
    <div className="container py-12 md:py-20">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <Zap className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {t('heroTitle')} <span className="text-primary">{t('heroTitleHighlight')}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          {t('heroDescription')}
        </p>
      </section>

      {/* Two columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Info Card */}
        <Link
          href="/info"
          className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary transition-all hover:shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{t('newsTitle')}</h2>
          </div>
          <p className="text-muted-foreground mb-6">{t('newsDescription')}</p>
          <div className="flex items-center gap-2 text-primary font-medium">
            <span>{t('newsLink')}</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        </Link>

        {/* Tools Card */}
        <Link
          href="/tools"
          className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary transition-all hover:shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{t('toolsTitle')}</h2>
          </div>
          <p className="text-muted-foreground mb-6">{t('toolsDescription')}</p>
          <div className="flex items-center gap-2 text-primary font-medium">
            <span>{t('toolsLink')}</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        </Link>
      </section>

      {/* Ad */}
      <div className="max-w-4xl mx-auto mt-12">
        <LazyAdBanner slot="homepage-mid" format="banner" />
      </div>

      {/* Stats */}
      <section className="mt-16 text-center">
        <div className="grid grid-cols-3 max-w-lg mx-auto gap-8">
          <div>
            <p className="text-3xl font-bold text-primary">70+</p>
            <p className="text-sm text-muted-foreground">{t('statTools')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">{t('statRegistration')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground">{t('statAvailability')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
