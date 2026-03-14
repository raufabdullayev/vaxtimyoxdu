import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/api/og'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://vaxtimyoxdu.com/sitemap.xml',
    host: 'https://vaxtimyoxdu.com',
  }
}
