import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { generateArticleMetadata, generateNewsArticleJsonLd } from '@/lib/utils/seo'
import AdBanner from '@/components/layout/AdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import RelatedArticles from '@/components/layout/RelatedArticles'
import { newsArticles } from '@/data/news-articles'

export function generateStaticParams() {
  return Object.keys(newsArticles).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = newsArticles[params.slug]
  if (!article) return {}

  const description = article.content.slice(0, 160).replace(/[#\n*-]/g, '').trim()

  return generateArticleMetadata({
    title: article.title,
    description,
    slug: params.slug,
    date: article.date,
    category: article.category,
  })
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = newsArticles[params.slug]
  if (!article) notFound()

  const description = article.content.slice(0, 160).replace(/[#\n*-]/g, '').trim()

  const jsonLd = generateNewsArticleJsonLd({
    title: article.title,
    description,
    slug: params.slug,
    date: article.date,
    category: article.category,
  })

  return (
    <div className="container py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: 'Ana s\u0259hif\u0259', href: '/' },
          { label: 'X\u0259b\u0259rl\u0259r', href: '/info' },
          { label: article.title },
        ]}
      />
      <div className="flex items-center gap-3 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {article.category}
        </span>
        <time className="text-sm text-muted-foreground">{article.date}</time>
      </div>
      <h1 className="text-3xl font-bold mt-2 mb-8">{article.title}</h1>
      <div className="prose prose-sm max-w-none">
        {article.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={i} className="text-xl font-semibold mt-8 mb-3 text-foreground">
                {paragraph.replace('## ', '')}
              </h2>
            )
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={i} className="list-disc pl-6 space-y-1 text-muted-foreground">
                {paragraph.split('\n').map((item, j) => (
                  <li key={j}>{item.replace(/^- \*\*(.+?)\*\*/, '$1').replace('- ', '')}</li>
                ))}
              </ul>
            )
          }
          return (
            <p key={i} className="text-muted-foreground mb-4">{paragraph}</p>
          )
        })}
      </div>
      <AdBanner slot="info-article-bottom" format="in-article" className="mt-8" />
      <RelatedArticles
        items={Object.entries(newsArticles)
          .filter(([slug]) => slug !== params.slug)
          .slice(0, 2)
          .map(([slug, a]) => ({
            slug,
            title: a.title,
            category: a.category,
            date: a.date,
          }))}
      />
    </div>
  )
}
