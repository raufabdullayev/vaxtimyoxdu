import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateHreflangAlternates } from '@/lib/utils/seo'
import BadgeSystem from '@/components/gamification/BadgeSystem'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'badges' })
  const alternates = generateHreflangAlternates('/badges', locale)

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates,
  }
}

export default async function BadgesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-12 max-w-4xl">
      <BadgeSystem />
    </div>
  )
}
