import { MetadataRoute } from 'next'
import { tools } from '@/config/tools'
import { newsArticles } from '@/data/news-articles'
import { blogPosts } from '@/data/blog-posts'
import { locales, defaultLocale, Locale } from '@/i18n/config'
import { getLocalizedUrl } from '@/lib/utils/seo/url'

/**
 * Build an alternates object with hreflang entries for every locale.
 *
 * Delegates to the shared getLocalizedUrl() helper so the sitemap cannot
 * drift from the HTML <link rel="alternate"> emissions (single source of
 * truth for hreflang URL shape).
 */
function buildAlternates(path: string): {
  languages: Record<string, string>
} {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = getLocalizedUrl(path, locale)
  }
  languages['x-default'] = getLocalizedUrl(path, defaultLocale)
  return { languages }
}

/**
 * Create a sitemap entry for every locale variant of a given path.
 */
function localeEntries(
  path: string,
  lastModified: Date,
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
  priority: number,
): MetadataRoute.Sitemap {
  const alternates = buildAlternates(path)

  return locales.map((locale) => ({
    url: getLocalizedUrl(path, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    ...localeEntries('/', now, 'daily', 1),
    ...localeEntries('/info', now, 'daily', 0.9),
    ...localeEntries('/tools', now, 'weekly', 0.9),
    ...localeEntries('/blog', now, 'weekly', 0.7),
    ...localeEntries('/about', monthAgo, 'monthly', 0.3),
    ...localeEntries('/privacy', monthAgo, 'monthly', 0.2),
    ...localeEntries('/terms', monthAgo, 'monthly', 0.2),
  ]

  // Tool pages — fixed date for static tools (avoids lastModified changing every build)
  const toolsLastModified = new Date('2026-04-09')
  const toolPages: MetadataRoute.Sitemap = tools.flatMap((tool) =>
    localeEntries(`/tools/${tool.slug}`, toolsLastModified, 'weekly', 0.8),
  )

  // News article pages — only include locale variants that the article supports
  const infoPages: MetadataRoute.Sitemap = Object.entries(newsArticles).flatMap(
    ([slug, article]) => {
      // If article has a locale field, only generate entry for that locale
      if (article.locale) {
        const articleLocale = article.locale as Locale
        const url = getLocalizedUrl(`/info/${slug}`, articleLocale)
        return [{
          url,
          lastModified: new Date(article.date),
          changeFrequency: 'daily' as const,
          priority: 0.7,
          alternates: {
            languages: {
              [articleLocale]: url,
              'x-default': url,
            },
          },
        }]
      }
      // Articles without locale restriction get all locale variants
      return localeEntries(`/info/${slug}`, new Date(article.date), 'daily', 0.7)
    },
  )

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = Object.entries(blogPosts).flatMap(
    ([slug, post]) =>
      localeEntries(`/blog/${slug}`, new Date(post.date), 'weekly', 0.6),
  )

  return [...staticPages, ...toolPages, ...infoPages, ...blogPages]
}
