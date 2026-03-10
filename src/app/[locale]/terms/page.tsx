import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateHreflangAlternates } from '@/lib/utils/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  const alternates = generateHreflangAlternates('/terms', locale)

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates,
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('terms')

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p className="text-sm">{t('lastUpdated')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('acceptTitle')}</h2>
        <p>{t('acceptDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('useTitle')}</h2>
        <p>{t('useDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('limitationsTitle')}</h2>
        <p>{t('limitationsDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('disclaimerTitle')}</h2>
        <p>{t('disclaimerDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('changesTitle')}</h2>
        <p>{t('changesDescription')}</p>
      </div>
    </div>
  )
}
