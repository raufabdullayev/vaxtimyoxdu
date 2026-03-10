import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { generateHreflangAlternates, getOgLocale } from '@/lib/utils/seo'
import { getBlogPostsByLocale } from '@/data/blog-posts'
import type { Locale } from '@/i18n/config'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })
  const alternates = generateHreflangAlternates('/blog', params.locale)
  const ogLocale = getOgLocale(params.locale)

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

/**
 * Extract a short excerpt from the blog post content.
 * Uses the first sentence or the first 200 characters, whichever is shorter.
 */
function extractExcerpt(content: string): string {
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

export default async function BlogPage({ params }: Props) {
  setRequestLocale(params.locale)
  const t = await getTranslations('blog')

  // Get blog posts for the current locale; falls back to 'en' when no translation exists
  const postsMap = getBlogPostsByLocale(params.locale as Locale)
  const posts = Object.entries(postsMap)
    .map(([slug, post]) => ({ slug, ...post }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container py-12 max-w-3xl">
      <Breadcrumb
        items={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbBlog') },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">{t('noArticles')}</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post, index) => (
            <div key={post.slug}>
              <article className="border-b pb-8">
                <time className="text-sm text-muted-foreground">{post.date}</time>
                <h2 className="text-xl font-semibold mt-1 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-sm">{extractExcerpt(post.content)}</p>
              </article>
              {index === 1 && <LazyAdBanner slot="blog-list-mid" format="in-article" className="my-6" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
