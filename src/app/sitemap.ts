import { MetadataRoute } from 'next'
import { tools } from '@/config/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vaxtimyoxdu.com'

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date('2026-03-08'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const infoArticles = [
    { slug: 'texnologiya-suni-zekanin-yeni-dovru', date: '2026-02-28' },
    { slug: 'iqtisadiyyat-manat-mohkemlenmesi', date: '2026-02-27' },
    { slug: 'idman-premyer-liqa', date: '2026-02-26' },
    { slug: 'tehsil-yeni-islahatlar', date: '2026-02-25' },
  ]

  const infoPages = infoArticles.map((a) => ({
    url: `${baseUrl}/info/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const blogArticles = [
    { slug: 'best-free-online-tools-2026', date: '2026-03-07' },
    { slug: 'how-ai-text-rewriting-works', date: '2026-03-05' },
    { slug: 'compress-images-without-losing-quality', date: '2026-03-04' },
    { slug: 'regex-guide-for-beginners', date: '2026-03-03' },
    { slug: 'why-grammar-matters-in-professional-writing', date: '2026-03-02' },
  ]

  const blogPages = blogArticles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: baseUrl, lastModified: new Date('2026-03-08'), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/info`, lastModified: new Date('2026-02-28'), changeFrequency: 'daily', priority: 0.9 },
    ...infoPages,
    { url: `${baseUrl}/tools`, lastModified: new Date('2026-03-08'), changeFrequency: 'weekly', priority: 0.9 },
    ...toolPages,
    { url: `${baseUrl}/blog`, lastModified: new Date('2026-03-07'), changeFrequency: 'weekly', priority: 0.7 },
    ...blogPages,
    { url: `${baseUrl}/about`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.2 },
  ]
}
