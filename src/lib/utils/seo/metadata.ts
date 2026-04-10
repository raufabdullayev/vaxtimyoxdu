import { Metadata } from 'next'
import { Tool } from '@/types/tool'
import { defaultLocale, Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'
import { SITE_URL, SITE_NAME, getLocalizedUrl, generateHreflangAlternates } from './url'
import { getOgLocale, getOgImageUrl } from './og'

function getAlternateOgLocales(locale: string): string[] {
  return locales.filter((l) => l !== locale).map((l) => getOgLocale(l))
}

export function generateBaseMetadata(): Metadata {
  const ogImage = getOgImageUrl({
    title: 'Vaxtim Yoxdu',
    subtitle: 'Qısa xəbərlər və pulsuz onlayn alətlər',
  })
  return {
    title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
    description: 'Vaxtınız yoxdursa, biz varıq. Gündəlik xəbər xülasələri, pulsuz AI alətləri, PDF birləşdirici, şəkil sıxma, QR kod yaradıcı və daha çox.',
    keywords: 'vaxtim yoxdu, xəbərlər, online tools, ai tools, pdf merger, image compressor, qr code generator, azərbaycan',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: {
      google: [
        'g9mV18mJU1P_Pjk_zOoomjHwDU2PdQsoLN5Vli4NOz8',
        'DsJOuCRkCBTHzY7mkm6NTQWcnj5qNEkwB56oZruVZw0',
      ],
    },
    openGraph: {
      title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
      description: 'Vaxtınız yoxdursa, biz varıq. Qısa xəbərlər və pulsuz alətlər.',
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'az_AZ',
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
      description: 'Vaxtınız yoxdursa, biz varıq. Qısa xəbərlər və pulsuz alətlər.',
      images: [ogImage],
    },
    alternates: generateHreflangAlternates('/'),
  }
}

export function generateToolMetadata(
  tool: Tool,
  options?: {
    locale?: string
    localizedName?: string
    localizedDescription?: string
    titleSuffix?: string
    browserBasedNote?: string
  }
): Metadata {
  const locale = options?.locale || 'en'
  const name = options?.localizedName || tool.name
  const baseDescription = options?.localizedDescription || tool.description
  const titleSuffix = options?.titleSuffix || 'Free, No Upload Required'
  const browserBasedNote =
    options?.browserBasedNote || '100% browser-based — your files never leave your device.'
  const description = tool.isClientSide
    ? `${baseDescription} ${browserBasedNote}`
    : baseDescription
  const ogLocale = getOgLocale(locale)
  const url = getLocalizedUrl(`/tools/${tool.slug}`, locale as Locale)
  const ogImage = getOgImageUrl({
    title: name,
    subtitle: description.slice(0, 80),
    type: 'tool',
  })
  return {
    title: `${name} — ${titleSuffix} | ${SITE_NAME}`,
    description,
    keywords: tool.keywords.join(', '),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      title: `${name} - ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: ogLocale,
      alternateLocale: getAlternateOgLocales(locale),
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

export function generateArticleMetadata({
  title,
  description,
  slug,
  date,
  category,
  locale,
}: {
  title: string
  description: string
  slug: string
  date: string
  category: string
  locale?: string
}): Metadata {
  const resolvedLocale = (locale || defaultLocale) as Locale
  const url = getLocalizedUrl(`/info/${slug}`, resolvedLocale)
  const ogLocale = getOgLocale(resolvedLocale)
  const ogImage = getOgImageUrl({
    title,
    subtitle: description.slice(0, 80),
    type: 'news',
  })
  return {
    title: `${title} - ${SITE_NAME}`,
    description,
    keywords: `${category}, xəbərlər, azərbaycan, ${title.toLowerCase().split(' ').slice(0, 5).join(', ')}`,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: ogLocale,
      alternateLocale: getAlternateOgLocales(resolvedLocale),
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

export function generateBlogPostMetadata({
  title,
  description,
  slug,
  date,
  locale,
}: {
  title: string
  description: string
  slug: string
  date: string
  locale?: string
}): Metadata {
  const resolvedLocale = (locale || defaultLocale) as Locale
  const url = getLocalizedUrl(`/blog/${slug}`, resolvedLocale)
  const ogLocale = getOgLocale(resolvedLocale)
  const ogImage = getOgImageUrl({
    title,
    subtitle: description.slice(0, 80),
    type: 'blog',
  })
  return {
    title: `${title} - ${SITE_NAME} Blog`,
    description,
    keywords: `${title.toLowerCase().split(' ').slice(0, 5).join(', ')}, online tools, free tools`,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: ogLocale,
      alternateLocale: getAlternateOgLocales(resolvedLocale),
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
