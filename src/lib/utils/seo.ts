import { Metadata } from 'next'
import { Tool } from '@/types/tool'
import { locales, defaultLocale, Locale } from '@/i18n/config'

const SITE_URL = 'https://vaxtimyoxdu.com'
const SITE_NAME = 'Vaxtim Yoxdu'

/**
 * Build a locale-prefixed absolute URL.
 * The default locale (az) has no prefix; others get /{locale}/path.
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) {
    return `${SITE_URL}${cleanPath}`
  }
  return `${SITE_URL}/${locale}${cleanPath}`
}

/**
 * Generate hreflang alternate links for a given path.
 * Returns an object suitable for Next.js metadata `alternates.languages`
 * plus `x-default` pointing to the az (default locale) variant.
 */
export function generateHreflangAlternates(path: string, currentLocale?: string): {
  canonical: string
  languages: Record<string, string>
} {
  const resolvedLocale = (currentLocale || defaultLocale) as Locale
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = getLocalizedUrl(path, locale)
  }
  // x-default should point to the default locale version
  languages['x-default'] = getLocalizedUrl(path, defaultLocale)

  return {
    canonical: getLocalizedUrl(path, resolvedLocale),
    languages,
  }
}

/**
 * Map a locale code to an OpenGraph locale string (e.g. "az" -> "az_AZ").
 */
export function getOgLocale(locale: string): string {
  const map: Record<string, string> = {
    az: 'az_AZ',
    en: 'en_US',
    tr: 'tr_TR',
    ru: 'ru_RU',
  }
  return map[locale] || 'az_AZ'
}
// Static fallback OG image kept for reference; dynamic generation is used via getOgImageUrl
// const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

function getOgImageUrl(params: {
  title: string
  subtitle?: string
  type?: string
}): string {
  const url = new URL(`${SITE_URL}/api/og`)
  url.searchParams.set('title', params.title)
  if (params.subtitle) url.searchParams.set('subtitle', params.subtitle)
  if (params.type) url.searchParams.set('type', params.type)
  return url.toString()
}

export function generateBaseMetadata(): Metadata {
  const ogImage = getOgImageUrl({
    title: 'Vaxtim Yoxdu',
    subtitle: 'Qisa xeberler ve pulsuz onlayn aletler',
  })
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} - Qisa Xeberler ve Pulsuz Onlayn Aletler`,
      description: 'Vaxtiniz yoxdursa, biz variq. Qisa xeberler ve pulsuz aletler.',
      images: [ogImage],
    },
    alternates: {
      canonical: SITE_URL,
    },
  }
}

export function generateToolMetadata(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
): Metadata {
  const locale = options?.locale || 'en'
  const name = options?.localizedName || tool.name
  const description = options?.localizedDescription || tool.description
  const ogLocale = getOgLocale(locale)
  const url = getLocalizedUrl(`/tools/${tool.slug}`, locale as Locale)
  const ogImage = getOgImageUrl({
    title: name,
    subtitle: description.slice(0, 80),
    type: 'tool',
  })
  return {
    title: `${name} - Free Online Tool | ${SITE_NAME}`,
    description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: `${name} - ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: ogLocale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${name} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} - ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateToolJsonLd(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
) {
  const locale = options?.locale || 'en'
  const name = options?.localizedName || tool.name
  const description = options?.localizedDescription || tool.description
  const url = getLocalizedUrl(`/tools/${tool.slug}`, locale as Locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    inLanguage: locale,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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
  const ogImage = getOgImageUrl({
    title,
    subtitle: description.slice(0, 80),
    type: 'news',
  })
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
          url: ogImage,
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
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateNewsArticleJsonLd({
  title,
  description,
  slug,
  date,
  category,
  locale = 'az',
}: {
  title: string
  description: string
  slug: string
  date: string
  category: string
  locale?: string
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
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: locale,
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
    image: getOgImageUrl({
      title,
      subtitle: description.slice(0, 80),
      type: 'news',
    }),
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
  const ogImage = getOgImageUrl({
    title,
    subtitle: description.slice(0, 80),
    type: 'blog',
  })
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
          url: ogImage,
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
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateToolFaqJsonLd(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
) {
  const faqs = generateToolFaqs(tool, options)
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

function generateToolFaqs(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
): { question: string; answer: string }[] {
  const name = options?.localizedName || tool.name
  const description = options?.localizedDescription || tool.description
  const shortDesc = options?.localizedDescription || tool.shortDescription
  const faqs: { question: string; answer: string }[] = []

  // FAQ 1: What is this tool and what does it do?
  faqs.push({
    question: `What is ${name} and what does it do?`,
    answer: `${name} is a free online tool that lets you ${shortDesc.toLowerCase()}. ${description}`,
  })

  // FAQ 2: Privacy/processing question based on tool type
  if (tool.isClientSide) {
    faqs.push({
      question: `Is ${name} safe to use? Are my files uploaded to a server?`,
      answer: `Yes, ${name} is completely safe to use. This tool processes everything directly in your browser using client-side technology. Your data never leaves your device -- nothing is uploaded to any server. This ensures complete privacy and security for all your files and data.`,
    })
  } else if (tool.isAI) {
    faqs.push({
      question: `How does the AI in ${name} work?`,
      answer: `${name} uses advanced AI language models to ${shortDesc.toLowerCase()}. The AI analyzes your input text, understands context and meaning, and generates high-quality results. The tool is free to use with no account required.`,
    })
  } else {
    faqs.push({
      question: `Is ${name} free to use?`,
      answer: `Yes, ${name} is completely free to use with no hidden fees, no account required, and no usage limits. Simply open the tool and start working immediately.`,
    })
  }

  // FAQ 3: Practical usage question based on category and keywords
  const categoryQuestions: Record<string, { question: string; answer: string }> = {
    ai: {
      question: `Do I need to create an account to use ${name}?`,
      answer: `No, you do not need to create an account or sign up to use ${name}. The tool is available immediately -- just open the page and start using it. There are no word limits, no daily caps, and no hidden restrictions.`,
    },
    pdf: {
      question: `What file formats does ${name} support?`,
      answer: `${name} supports standard PDF files. You can work with PDFs of any size directly in your browser. The tool handles multi-page documents and preserves the quality of your original files throughout the process.`,
    },
    image: {
      question: `What image formats does ${name} support?`,
      answer: `${name} supports all major image formats including JPEG, PNG, and WebP. You can process images of any size directly in your browser without installing any software. The tool maintains optimal quality while performing the requested operation.`,
    },
    dev: {
      question: `Can I use ${name} on any device or browser?`,
      answer: `Yes, ${name} works on any modern web browser including Chrome, Firefox, Safari, and Edge on desktop, tablet, and mobile devices. No installation or plugins are required -- it runs entirely in your browser.`,
    },
    generators: {
      question: `Can I customize the output of ${name}?`,
      answer: `Yes, ${name} offers various customization options to tailor the output to your specific needs. You can adjust settings and parameters to get exactly the result you want. All processing happens in your browser for instant results.`,
    },
    text: {
      question: `Can I use ${name} for large documents?`,
      answer: `Yes, ${name} handles text of any length. Whether you are working with a short paragraph or a lengthy document, the tool processes your text instantly in your browser with no size limitations.`,
    },
  }

  const categoryFaq = categoryQuestions[tool.category]
  if (categoryFaq) {
    faqs.push(categoryFaq)
  }

  return faqs
}

export function generateBlogArticleJsonLd({
  title,
  description,
  slug,
  date,
  locale = 'en',
}: {
  title: string
  description: string
  slug: string
  date: string
  locale?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: date,
    dateModified: date,
    inLanguage: locale,
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
    image: getOgImageUrl({
      title,
      subtitle: description.slice(0, 80),
      type: 'blog',
    }),
  }
}

