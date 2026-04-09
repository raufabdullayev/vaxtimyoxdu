import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { generateHreflangAlternates, getOgLocale } from '@/lib/utils/seo'
import { getBlogPostsByLocale } from '@/data/blog-posts'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const alternates = generateHreflangAlternates('/blog', locale)
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

/**
 * Extract a short excerpt from the blog post content.
 * Uses the first sentence or the first 200 characters, whichever is shorter.
 */
function extractExcerpt(content: string): string {
  const plain = content.replace(/^#+\s.*/gm, '').trim()
  const firstSentence = plain.match(/^[^.!?]+[.!?]/)
  if (firstSentence && firstSentence[0].length <= 200) {
    return firstSentence[0].trim()
  }
  return plain.slice(0, 160).trim() + '...'
}

function getReadingTime(content: string): number {
  return Math.ceil(content.split(/\s+/).length / 200)
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')

  const postsMap = getBlogPostsByLocale(locale as Locale)
  const posts = Object.entries(postsMap)
    .map(([slug, post]) => ({ slug, ...post }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const [featured, ...rest] = posts

  return (
    <div className="container py-12 max-w-4xl">
      <Breadcrumb
        locale={locale}
        items={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbBlog') },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">{t('noArticles')}</p>
      ) : (
        <>
          {/* Featured (newest) post */}
          {featured && (
            <article className="mb-10 p-6 rounded-xl border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {t('featured')}
                </span>
                <time className="text-sm text-muted-foreground">{featured.date}</time>
                <span className="text-sm text-muted-foreground">
                  {t('readingTime', { minutes: getReadingTime(featured.content) })}
                </span>
              </div>
              <h2 className="text-2xl font-bold mt-1 mb-3">
                <Link href={`/blog/${featured.slug}`} className="hover:text-primary transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-muted-foreground">{extractExcerpt(featured.content)}</p>
              {featured.relatedTools && featured.relatedTools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {featured.relatedTools.slice(0, 4).map((tool) => (
                    <span key={tool} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      {tool.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )}

          {/* Remaining posts in 2-column grid */}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post, index) => (
                <div key={post.slug}>
                  <article className="border rounded-lg p-5 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <time className="text-sm text-muted-foreground">{post.date}</time>
                      <span className="text-sm text-muted-foreground">
                        {t('readingTime', { minutes: getReadingTime(post.content) })}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold mb-2 flex-grow">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground text-sm">{extractExcerpt(post.content)}</p>
                    {post.relatedTools && post.relatedTools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.relatedTools.slice(0, 3).map((tool) => (
                          <span key={tool} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                            {tool.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                  {index === 1 && <LazyAdBanner slot="blog-list-mid" format="in-article" className="my-6 sm:col-span-2" />}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
