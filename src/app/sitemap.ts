import { MetadataRoute } from 'next'
import { tools } from '@/config/tools'
import { newsArticles } from '@/data/news-articles'
import { blogPosts } from '@/data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vaxtimyoxdu.com'

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date('2026-03-10'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const infoPages = Object.entries(newsArticles).map(([slug, article]) => ({
    url: `${baseUrl}/info/${slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const blogPages = Object.entries(blogPosts).map(([slug, post]) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: baseUrl, lastModified: new Date('2026-03-10'), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/info`, lastModified: new Date('2026-03-10'), changeFrequency: 'daily', priority: 0.9 },
    ...infoPages,
    { url: `${baseUrl}/tools`, lastModified: new Date('2026-03-10'), changeFrequency: 'weekly', priority: 0.9 },
    ...toolPages,
    { url: `${baseUrl}/blog`, lastModified: new Date('2026-03-10'), changeFrequency: 'weekly', priority: 0.7 },
    ...blogPages,
    { url: `${baseUrl}/about`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.2 },
  ]
}
