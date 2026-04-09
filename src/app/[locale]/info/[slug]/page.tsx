import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateArticleMetadata, generateNewsArticleJsonLd, generateHreflangAlternates } from '@/lib/utils/seo'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import NewsletterInlineCTA from '@/components/layout/NewsletterInlineCTA'
import ShareButtonsWrapper from '@/components/common/ShareButtonsWrapper'
import SocialShareBar from '@/components/common/SocialShareBar'
import MarkdownRenderer from '@/components/common/MarkdownRenderer'
import RelatedArticles from '@/components/layout/RelatedArticles'
import NewsRelatedTools from '@/components/layout/NewsRelatedTools'
import { newsArticles } from '@/data/news-articles'

export function generateStaticParams() {
  return Object.keys(newsArticles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const article = newsArticles[slug]
  if (!article) return {}

  // Match the same locale gating as the page component
  if (article.locale && article.locale !== locale) return {}

  const description = article.content.slice(0, 160).replace(/[#\n*-]/g, '').trim()

  const metadata = generateArticleMetadata({
    title: article.title,
    description,
    slug,
    date: article.date,
    category: article.category,
    locale,
  })
  const alternates = generateHreflangAlternates(`/info/${slug}`, locale)
  return { ...metadata, alternates }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const nav = await getTranslations('common.nav')
  const infoT = await getTranslations('info')
  const crossT = await getTranslations('crossLinks')

  const article = newsArticles[slug]
  if (!article) notFound()

  // Check if article is available in the requested locale
  if (article.locale && article.locale !== locale) {
    notFound()
  }

  const description = article.content.slice(0, 160).replace(/[#\n*-]/g, '').trim()

  const jsonLd = generateNewsArticleJsonLd({
    title: article.title,
    description,
    slug,
    date: article.date,
    category: article.category,
    locale,
  })

  return (
    <div className="container py-12 max-w-3xl">
      <SocialShareBar
        path={`/info/${slug}`}
        title={article.title}
        description={description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        locale={locale}
        items={[
          { label: nav('home'), href: '/' },
          { label: nav('news'), href: '/info' },
          { label: article.title },
        ]}
      />
      <div className="flex items-center gap-3 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {article.category}
        </span>
        <time className="text-sm text-muted-foreground">{article.date}</time>
        <span className="text-sm text-muted-foreground">
          {infoT('readingTime', { minutes: Math.ceil(article.content.split(/\s+/).length / 200) })}
        </span>
      </div>
      <h1 className="text-3xl font-bold mt-2 mb-8">{article.title}</h1>
      <MarkdownRenderer content={article.content} />
      <ShareButtonsWrapper
        path={`/info/${slug}`}
        title={article.title}
        description={description}
      />
      <NewsRelatedTools category={article.category} title={crossT('tryTheseTool')} />
      <NewsletterInlineCTA variant="news" />
      <LazyAdBanner slot="info-article-bottom" format="in-article" className="mt-8" />
      <RelatedArticles
        title={crossT('relatedNews')}
        items={Object.entries(newsArticles)
          .filter(([s, a]) => s !== slug && (!a.locale || a.locale === locale))
          .sort((a, b) => {
            // Prioritize same category
            const aCat = a[1].category === article.category ? 1 : 0
            const bCat = b[1].category === article.category ? 1 : 0
            if (bCat !== aCat) return bCat - aCat
            // Then by recency
            return new Date(b[1].date).getTime() - new Date(a[1].date).getTime()
          })
          .slice(0, 2)
          .map(([s, a]) => ({
            slug: s,
            title: a.title,
            category: a.category,
            date: a.date,
          }))}
      />
    </div>
  )
}
