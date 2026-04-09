import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { tools } from '@/config/tools'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ToolsPageClient from '@/components/tools/ToolsPageClient'
import { generateHreflangAlternates, getOgLocale, generateToolsItemListJsonLd } from '@/lib/utils/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools' })
  const alternates = generateHreflangAlternates('/tools', locale)
  const ogLocale = getOgLocale(locale)

  return {
    title: `${t('pageTitle')} ${t('pageTitleHighlight')} - Vaxtim Yoxdu`,
    description: t('pageDescription'),
    openGraph: {
      title: `${t('pageTitle')} ${t('pageTitleHighlight')} - Vaxtim Yoxdu`,
      description: t('pageDescription'),
      url: alternates.canonical,
      siteName: 'Vaxtim Yoxdu',
      type: 'website',
      locale: ogLocale,
      images: [
        {
          url: 'https://vaxtimyoxdu.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Vaxtim Yoxdu - ' + t('pageTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('pageTitle')} ${t('pageTitleHighlight')} - Vaxtim Yoxdu`,
      description: t('pageDescription'),
      images: ['https://vaxtimyoxdu.com/og-image.png'],
    },
    alternates,
  }
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('tools')
  const itemListJsonLd = generateToolsItemListJsonLd(tools, locale)

  return (
    <div className="container py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Breadcrumb
        locale={locale}
        items={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbTools') },
        ]}
      />
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('pageTitle')}
          <span className="text-primary"> {t('pageTitleHighlight')}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('pageDescription')}
        </p>
      </section>

      <ToolsPageClient tools={tools} />
    </div>
  )
}
