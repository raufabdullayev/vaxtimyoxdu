import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { tools } from '@/config/tools'
import ToolCard from '@/components/tools/ToolCard'
import { ToolCategory } from '@/types/tool'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { generateHreflangAlternates, getOgLocale } from '@/lib/utils/seo'

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

/** Map category keys to translation keys */
const categoryTranslationKeys: Record<ToolCategory, { name: string; desc: string }> = {
  ai: { name: 'categories.ai', desc: 'categories.aiDesc' },
  pdf: { name: 'categories.pdf', desc: 'categories.pdfDesc' },
  image: { name: 'categories.image', desc: 'categories.imageDesc' },
  dev: { name: 'categories.dev', desc: 'categories.devDesc' },
  generators: { name: 'categories.generators', desc: 'categories.generatorsDesc' },
  text: { name: 'categories.text', desc: 'categories.textDesc' },
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('tools')

  const groupedTools = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = []
      acc[tool.category].push(tool)
      return acc
    },
    {} as Record<string, typeof tools>
  )

  return (
    <div className="container py-8 md:py-12">
      <Breadcrumb
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

      {Object.entries(groupedTools).map(([category, categoryTools]) => {
        const keys = categoryTranslationKeys[category as ToolCategory]
        return (
          <section key={category} className="mb-10">
            <h2 className="text-2xl font-bold mb-2">
              {keys ? t(keys.name) : category}
            </h2>
            <p className="text-muted-foreground mb-4">
              {keys ? t(keys.desc) : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
