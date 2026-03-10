import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { generateHreflangAlternates, getOgLocale } from '@/lib/utils/seo'
import { getArticlesByLocale } from '@/data/news-articles'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'info' })
  const alternates = generateHreflangAlternates('/info', locale)
  const ogLocale = getOgLocale(locale)

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: alternates.canonical,
      siteName: 'Vaxtim Yoxdu',
      type: 'website',
      locale: ogLocale,
      images: [
        {
          url: 'https://vaxtimyoxdu.com/og-image.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: ['https://vaxtimyoxdu.com/og-image.png'],
    },
    alternates,
  }
}

const categoryColors: Record<string, string> = {
  // AZ categories
  'Texnologiya': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'İqtisadiyyat': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'İdman': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'Təhsil': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Sağlamlıq': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  'Elm': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Mədəniyyət': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  'Səyahət': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  'Biznes': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  // EN categories
  'Technology': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Economy': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Sports': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'Education': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Health': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  'Science': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Culture': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  'Travel': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  'Business': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
}

/**
 * Extract a short summary from the article content.
 * Uses the first sentence or the first 160 characters, whichever is shorter.
 */
function extractSummary(content: string): string {
  // Strip markdown headings and leading whitespace
  const plain = content.replace(/^#+\s.*/gm, '').trim()
  // Take the first sentence (up to first period followed by space or end)
  const firstSentence = plain.match(/^[^.!?]+[.!?]/)
  if (firstSentence && firstSentence[0].length <= 200) {
    return firstSentence[0].trim()
  }
  // Fallback: first 160 chars with ellipsis
  return plain.slice(0, 160).trim() + '...'
}

export default async function InfoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('info')

  // Get articles for current locale; falls back to 'az' if locale has no articles
  const articlesMap = getArticlesByLocale(locale)
  const articles = Object.entries(articlesMap)
    .map(([slug, article]) => ({ slug, ...article }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <Breadcrumb
        items={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbNews') },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
      <p className="text-muted-foreground mb-8">{t('subtitle')}</p>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">{t('noArticles')}</p>
      ) : (
        <div className="space-y-6">
          {articles.map((article, index) => (
            <div key={article.slug}>
              <Link
                href={`/info/${article.slug}`}
                className="block rounded-xl border bg-card p-6 hover:border-primary transition-all hover:shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[article.category] || 'bg-muted text-muted-foreground'}`}>
                    {article.category}
                  </span>
                  <time className="text-xs text-muted-foreground">{article.date}</time>
                </div>
                <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
                <p className="text-sm text-muted-foreground">{extractSummary(article.content)}</p>
              </Link>
              {index === 1 && <LazyAdBanner slot="info-list-mid" format="in-article" className="my-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
