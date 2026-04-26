import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateArticleMetadata, generateNewsArticleJsonLd, getLocalizedUrl } from '@/lib/utils/seo'
import { getOgImageUrl } from '@/lib/utils/seo/og'
import type { Locale } from '@/i18n/config'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import NewsletterInlineCTA from '@/components/layout/NewsletterInlineCTA'
import ShareButtonsWrapper from '@/components/common/ShareButtonsWrapper'
import SocialShareBar from '@/components/common/SocialShareBar'
import MarkdownRenderer from '@/components/common/MarkdownRenderer'
import RelatedArticles from '@/components/layout/RelatedArticles'
import NewsRelatedTools from '@/components/layout/NewsRelatedTools'
import { newsArticles } from '@/data/news-articles'
import { extractNewsSourceNames } from '@/lib/news/source-extraction'

export function generateStaticParams() {
  return Object.entries(newsArticles).map(([slug, article]) => ({
    locale: article.locale || 'az',
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const article = newsArticles[slug]
  if (!article) return {}

  // Match the same locale gating as the page component
  if (article.locale && article.locale !== locale) return {}

  const description = article.content.slice(0, 150).replace(/[#\n*-]/g, '').trim()

  const metadata = generateArticleMetadata({
    title: article.title,
    description,
    slug,
    date: article.date,
    category: article.category,
    locale,
  })
  // News articles have locale-specific slugs (e.g., AZ slug differs from EN slug),
  // so cross-locale hreflang would point to non-existent pages (404).
  // Only emit self-referencing hreflang for the article's own locale.
  const articleUrl = getLocalizedUrl(`/info/${slug}`, locale as Locale)
  const alternates = {
    canonical: articleUrl,
    languages: {
      [locale]: articleUrl,
      'x-default': articleUrl,
    },
  }
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

  const description = article.content.slice(0, 150).replace(/[#\n*-]/g, '').trim()
  const sourceNames = extractNewsSourceNames(article.content)
  const sourceSummary = sourceNames.length
    ? sourceNames.slice(0, 6).join(', ')
    : infoT('sourceValue')

  const jsonLd = generateNewsArticleJsonLd({
    title: article.title,
    description,
    slug,
    date: article.date,
    category: article.category,
    locale,
    content: article.content,
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
      <img
        src={getOgImageUrl({
          title: article.title,
          subtitle: article.content.slice(0, 80).replace(/[#*_`\[\]]/g, '').trim(),
          type: 'news',
        })}
        alt={article.title}
        width={1200}
        height={630}
        className="w-full rounded-lg mb-6 aspect-[1200/630] object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <section
        aria-label={infoT('trustTitle')}
        className="my-6 rounded-lg border bg-muted/30 p-4 text-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {infoT('trustKicker')}
        </p>
        <h2 className="mt-1 text-base font-semibold">{infoT('trustTitle')}</h2>
        <p className="mt-2 text-muted-foreground">{infoT('trustDescription')}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <dt className="font-medium">{infoT('sourceLabel')}</dt>
            <dd className="mt-1 text-muted-foreground">{sourceSummary}</dd>
          </div>
          <div>
            <dt className="font-medium">{infoT('editorialLabel')}</dt>
            <dd className="mt-1 text-muted-foreground">{infoT('editorialValue')}</dd>
          </div>
          <div>
            <dt className="font-medium">{infoT('updatedLabel')}</dt>
            <dd className="mt-1 text-muted-foreground">{article.date}</dd>
          </div>
        </dl>
      </section>
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
