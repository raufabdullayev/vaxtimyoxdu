import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateHreflangAlternates } from '@/lib/utils/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' })
  const alternates = generateHreflangAlternates('/about')

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates,
  }
}

export default async function AboutPage({ params }: Props) {
  setRequestLocale(params.locale)
  const t = await getTranslations('about')

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p className="text-lg font-medium text-foreground italic">
          &quot;{t('motto')}&quot;
        </p>
        <p>{t('description')}</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">{t('missionTitle')}</h2>
        <p>{t('missionDescription')}</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">{t('privacyTitle')}</h2>
        <p>{t('privacyDescription')}</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">{t('contactTitle')}</h2>
        <p>
          {t('contactDescription')}{' '}
          <a href="mailto:hello@vaxtimyoxdu.com" className="text-primary hover:underline">
            hello@vaxtimyoxdu.com
          </a>
        </p>
      </div>
    </div>
  )
}
