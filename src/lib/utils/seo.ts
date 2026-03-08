import { Metadata } from 'next'
import { Tool } from '@/types/tool'

const SITE_URL = 'https://vaxtimyoxdu.com'
const SITE_NAME = 'Vaxtim Yoxdu'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export function generateBaseMetadata(): Metadata {
  return {
    title: `${SITE_NAME} - Qisa Xeberler ve Pulsuz Onlayn Aletler`,
    description: 'Vaxtiniz yoxdursa, biz variq. Gunluk xeber xulasaleri, pulsuz AI aletleri, PDF birlesdirici, sekil sixma, QR kod yaradici ve daha cox.',
    keywords: 'vaxtim yoxdu, xeberler, online tools, ai tools, pdf merger, image compressor, qr code generator, azerbaycan',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: {
      google: 'g9mV18mJU1P_Pjk_zOoomjHwDU2PdQsoLN5Vli4NOz8',
    },
    openGraph: {
      title: `${SITE_NAME} - Qisa Xeberler ve Pulsuz Onlayn Aletler`,
      description: 'Vaxtiniz yoxdursa, biz variq. Qisa xeberler ve pulsuz aletler.',
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'az_AZ',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} - Qisa Xeberler ve Pulsuz Onlayn Aletler`,
      description: 'Vaxtiniz yoxdursa, biz variq. Qisa xeberler ve pulsuz aletler.',
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: SITE_URL,
      languages: { 'az': SITE_URL, 'en': SITE_URL },
    },
  }
}

export function generateToolMetadata(tool: Tool): Metadata {
  const url = `${SITE_URL}/tools/${tool.slug}`
  return {
    title: `${tool.name} - Free Online Tool | ${SITE_NAME}`,
    description: tool.description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: `${tool.name} - ${SITE_NAME}`,
      description: tool.shortDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${tool.name} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - ${SITE_NAME}`,
      description: tool.shortDescription,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
      languages: {
        'az': url,
        'en': url,
      },
    },
  }
}

export function generateToolJsonLd(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}/tools/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: undefined,
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function generateArticleMetadata({
  title,
  description,
  slug,
  date,
  category,
}: {
  title: string
  description: string
  slug: string
  date: string
  category: string
}): Metadata {
  const url = `${SITE_URL}/info/${slug}`
  return {
    title: `${title} - ${SITE_NAME}`,
    description,
    keywords: `${category}, xeberler, azerbaycan, ${title.toLowerCase().split(' ').slice(0, 5).join(', ')}`,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'az_AZ',
      publishedTime: date,
      section: category,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
      languages: {
        'az': url,
        'en': url,
      },
    },
  }
}

export function generateNewsArticleJsonLd({
  title,
  description,
  slug,
  date,
  category,
}: {
  title: string
  description: string
  slug: string
  date: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    url: `${SITE_URL}/info/${slug}`,
    datePublished: date,
    dateModified: date,
    articleSection: category,
    inLanguage: 'az',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/info/${slug}`,
    },
    image: DEFAULT_OG_IMAGE,
  }
}

export function generateBlogPostMetadata({
  title,
  description,
  slug,
  date,
}: {
  title: string
  description: string
  slug: string
  date: string
}): Metadata {
  const url = `${SITE_URL}/blog/${slug}`
  return {
    title: `${title} - ${SITE_NAME} Blog`,
    description,
    keywords: `${title.toLowerCase().split(' ').slice(0, 5).join(', ')}, online tools, free tools`,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_US',
      publishedTime: date,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
      languages: {
        'az': url,
        'en': url,
      },
    },
  }
}

export function generateBlogArticleJsonLd({
  title,
  description,
  slug,
  date,
}: {
  title: string
  description: string
  slug: string
  date: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: date,
    dateModified: date,
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    image: DEFAULT_OG_IMAGE,
  }
}

