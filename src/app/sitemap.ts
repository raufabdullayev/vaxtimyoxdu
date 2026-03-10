import { MetadataRoute } from 'next'
import { tools } from '@/config/tools'
import { newsArticles } from '@/data/news-articles'
import { blogPosts } from '@/data/blog-posts'
import { locales, defaultLocale, Locale } from '@/i18n/config'

const baseUrl = 'https://vaxtimyoxdu.com'

/**
 * Build a locale-prefixed URL.
 * The default locale (az) gets no prefix.
 */
function localizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) {
    return `${baseUrl}${cleanPath}`
  }
  return `${baseUrl}/${locale}${cleanPath}`
}

/**
 * Build an alternates object with hreflang entries for every locale.
 */
function buildAlternates(path: string): {
  languages: Record<string, string>
} {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = localizedUrl(path, locale)
  }
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
    url: localizedUrl(path, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-03-10')
  const monthAgo = new Date('2026-03-01')

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

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.flatMap((tool) =>
    localeEntries(`/tools/${tool.slug}`, now, 'weekly', 0.8),
  )

  // News article pages
  const infoPages: MetadataRoute.Sitemap = Object.entries(newsArticles).flatMap(
    ([slug, article]) =>
      localeEntries(`/info/${slug}`, new Date(article.date), 'daily', 0.7),
  )

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = Object.entries(blogPosts).flatMap(
    ([slug, post]) =>
      localeEntries(`/blog/${slug}`, new Date(post.date), 'weekly', 0.6),
  )

  return [...staticPages, ...toolPages, ...infoPages, ...blogPages]
}
