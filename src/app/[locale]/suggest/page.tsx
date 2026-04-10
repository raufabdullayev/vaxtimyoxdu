import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateHreflangAlternates } from '@/lib/utils/seo'
import SuggestionBoard from '@/components/gamification/SuggestionBoard'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'suggest' })
  const alternates = generateHreflangAlternates('/suggest', locale)

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates,
  }
}

export default async function SuggestPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-12 max-w-3xl">
      <SuggestionBoard />
    </div>
  )
}
