import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateHreflangAlternates } from '@/lib/utils/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' })
  const alternates = generateHreflangAlternates('/privacy', params.locale)

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates,
  }
}

export default async function PrivacyPage({ params }: Props) {
  setRequestLocale(params.locale)
  const t = await getTranslations('privacy')

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p className="text-sm">{t('lastUpdated')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('collectTitle')}</h2>
        <p>{t('collectDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('aiTitle')}</h2>
        <p>{t('aiDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('analyticsTitle')}</h2>
        <p>{t('analyticsDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('advertisingTitle')}</h2>
        <p>{t('advertisingDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('cookiesTitle')}</h2>
        <p>{t('cookiesDescription')}</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">{t('contactTitle')}</h2>
        <p>
          {t('contactDescription')}{' '}
          <a href="mailto:privacy@vaxtimyoxdu.com" className="text-primary hover:underline">
            privacy@vaxtimyoxdu.com
          </a>
        </p>
      </div>
    </div>
  )
}
