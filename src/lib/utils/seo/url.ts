import { locales, defaultLocale, Locale } from '@/i18n/config'

export const SITE_URL = 'https://vaxtimyoxdu.com'
export const SITE_NAME = 'Vaxtim Yoxdu'

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
