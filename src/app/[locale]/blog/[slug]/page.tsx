import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateBlogPostMetadata, generateBlogArticleJsonLd, generateHreflangAlternates } from '@/lib/utils/seo'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import NewsletterInlineCTA from '@/components/layout/NewsletterInlineCTA'
import ShareButtonsWrapper from '@/components/common/ShareButtonsWrapper'
import { blogPosts, getBlogPostBySlug } from '@/data/blog-posts'
import { tools } from '@/config/tools'
import type { Locale } from '@/i18n/config'

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = (rawLocale ?? 'az') as Locale
  const post = getBlogPostBySlug(slug, locale)
  if (!post) return {}

  const description = post.content.slice(0, 160).replace(/[#\n]/g, '').trim()

  const metadata = generateBlogPostMetadata({
    title: post.title,
    description,
    slug,
    date: post.date,
    locale: rawLocale,
  })
  const alternates = generateHreflangAlternates(`/blog/${slug}`, rawLocale)
  return { ...metadata, alternates }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: rawLocale } = await params
  setRequestLocale(rawLocale)
  const nav = await getTranslations('common.nav')

  const locale = (rawLocale ?? 'az') as Locale
  const post = getBlogPostBySlug(slug, locale)
  if (!post) notFound()

  const description = post.content.slice(0, 160).replace(/[#\n]/g, '').trim()

  const jsonLd = generateBlogArticleJsonLd({
    title: post.title,
    description,
    slug,
    date: post.date,
    locale,
  })

  return (
    <div className="container py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        locale={rawLocale}
        items={[
          { label: nav('home'), href: '/' },
          { label: nav('blog'), href: '/blog' },
          { label: post.title },
        ]}
      />
      <time className="text-sm text-muted-foreground">{post.date}</time>
      <h1 className="text-3xl font-bold mt-2 mb-8">{post.title}</h1>
      <LazyAdBanner slot="blog-post-top" format="banner" className="mb-8" />
      <div className="prose prose-sm max-w-none">
        {post.content.split('\n\n').map((paragraph, i) => {
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
                  <li key={j}>{item.replace(/^- \*\*(.+?)\*\*: /, '$1: ').replace('- ', '')}</li>
                ))}
              </ul>
            )
          }
          if (paragraph.match(/^\d\. /)) {
            return (
              <ol key={i} className="list-decimal pl-6 space-y-1 text-muted-foreground">
                {paragraph.split('\n').map((item, j) => (
                  <li key={j}>{item.replace(/^\d+\. /, '')}</li>
                ))}
              </ol>
            )
          }
          return (
            <p key={i} className="text-muted-foreground mb-4">
              {paragraph}
            </p>
          )
        })}
      </div>
      {post.relatedTools && post.relatedTools.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {post.relatedTools.map((toolSlug) => {
              const tool = tools.find(t => t.slug === toolSlug)
              if (!tool) return null
              return (
                <Link key={toolSlug} href={`/tools/${toolSlug}`} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.shortDescription}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
      <ShareButtonsWrapper
        path={`/blog/${slug}`}
        title={post.title}
        description={description}
      />
      <NewsletterInlineCTA variant="blog" />
      <LazyAdBanner slot="blog-post-bottom" format="in-article" className="mt-8" />
    </div>
  )
}
