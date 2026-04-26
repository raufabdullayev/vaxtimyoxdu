import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { generateBlogPostMetadata, generateBlogArticleJsonLd, getLocalizedUrl } from '@/lib/utils/seo'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import NewsletterInlineCTA from '@/components/layout/NewsletterInlineCTA'
import ShareButtonsWrapper from '@/components/common/ShareButtonsWrapper'
import SocialShareBar from '@/components/common/SocialShareBar'
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker'
import MarkdownRenderer from '@/components/common/MarkdownRenderer'
import { blogPostsByLocale, getBlogPostBySlug, getBlogPostsByLocale } from '@/data/blog-posts'
import { tools } from '@/config/tools'
import { locales, defaultLocale } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.keys(blogPostsByLocale[locale] || {}).map((slug) => ({
      locale,
      slug,
    })),
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = (rawLocale ?? 'az') as Locale
  const post = getBlogPostBySlug(slug, locale)
  if (!post) return {}

  const description = post.description || post.content.slice(0, 160).replace(/[#\n]/g, '').trim()

  const metadata = generateBlogPostMetadata({
    title: post.title,
    description,
    slug,
    date: post.date,
    locale: rawLocale,
    metaTitle: post.metaTitle,
  })

  // Blog posts use per-locale slug sets (src/data/blog-posts.ts::blogPostsByLocale).
  // A post available only in some locales would 404 on the missing ones if we
  // emitted the full 4-language hreflang set — so probe each locale and only
  // emit a hreflang entry when the slug actually resolves there.
  // This mirrors the pattern established in src/app/[locale]/info/[slug]/page.tsx
  // (commit af6d684) but tolerates the case where the same slug DOES exist in
  // multiple locales (which is the norm for translated posts).
  const languages: Record<string, string> = {}
  for (const loc of locales) {
    if (blogPostsByLocale[loc]?.[slug]) {
      languages[loc] = getLocalizedUrl(`/blog/${slug}`, loc)
    }
  }
  // x-default: prefer default locale if it has the post, otherwise fall back to self.
  languages['x-default'] =
    languages[defaultLocale] ?? getLocalizedUrl(`/blog/${slug}`, locale)

  const alternates = {
    canonical: getLocalizedUrl(`/blog/${slug}`, locale),
    languages,
  }
  return { ...metadata, alternates }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: rawLocale } = await params
  setRequestLocale(rawLocale)
  const nav = await getTranslations('common.nav')
  const blogT = await getTranslations('blog')
  const crossT = await getTranslations('crossLinks')

  const locale = (rawLocale ?? 'az') as Locale
  const post = getBlogPostBySlug(slug, locale)
  if (!post) notFound()

  const description = post.description || post.content.slice(0, 160).replace(/[#\n]/g, '').trim()
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200)

  const jsonLd = generateBlogArticleJsonLd({
    title: post.title,
    description,
    slug,
    date: post.date,
    locale,
  })

  // Find related blog posts that share at least one relatedTool
  const allPosts = getBlogPostsByLocale(locale)
  const currentTools = new Set(post.relatedTools ?? [])
  const relatedBlogPosts = Object.entries(allPosts)
    .filter(([s]) => s !== slug)
    .map(([s, p]) => ({
      slug: s,
      title: p.title,
      date: p.date,
      overlap: (p.relatedTools ?? []).filter(t => currentTools.has(t)).length,
    }))
    .filter(p => p.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="container py-12 max-w-3xl">
      <SocialShareBar
        path={`/blog/${slug}`}
        title={post.title}
        description={description}
      />
      {/* JSON-LD structured data from trusted internal data only */}
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
      <div className="flex items-center gap-3 mb-2">
        <time className="text-sm text-muted-foreground">{post.date}</time>
        <span className="text-sm text-muted-foreground">
          {blogT('readingTime', { minutes: readingTime })}
        </span>
      </div>
      <h1 className="text-3xl font-bold mt-2 mb-8">{post.title}</h1>
      <LazyAdBanner slot="blog-post-top" format="banner" className="mb-8" />
      <ScrollDepthTracker slug={slug}>
        <MarkdownRenderer content={post.content} />
      </ScrollDepthTracker>
      {post.relatedTools && post.relatedTools.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">{crossT('relatedTools')}</h2>
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
      {relatedBlogPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">{crossT('relatedBlogPosts')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedBlogPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="p-4 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all"
              >
                <p className="font-medium text-sm">{related.title}</p>
                <time className="text-xs text-muted-foreground mt-2 block">{related.date}</time>
              </Link>
            ))}
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
