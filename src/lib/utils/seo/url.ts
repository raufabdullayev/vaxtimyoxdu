import { locales, defaultLocale, Locale } from '@/i18n/config'

export const SITE_URL = 'https://vaxtimyoxdu.com'
export const SITE_NAME = 'Vaxtim Yoxdu'

/**
 * Returns the brand name with correct diacritics per locale.
 * AZ uses `Vaxtım Yoxdu` (dotless ı); all others use `Vaxtim Yoxdu`.
 */
export function getSiteName(locale?: string): string {
  return locale === 'az' ? 'Vaxtım Yoxdu' : 'Vaxtim Yoxdu'
}

/**
 * Build a locale-prefixed absolute URL.
 *
 * The default locale (az) has no prefix; others get /{locale}/path.
 *
 * Root-path special case: for the default locale we keep the canonical
 * trailing slash (`https://vaxtimyoxdu.com/`), but for non-default locales
 * we return `https://vaxtimyoxdu.com/{locale}` WITHOUT a trailing slash —
 * Next.js (trailingSlash: false) 308-redirects `/en/` → `/en`, so any
 * hreflang or canonical pointing at `/en/` eats a redirect.
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (cleanPath === '/') {
    return locale === defaultLocale
      ? `${SITE_URL}/`
      : `${SITE_URL}/${locale}`
  }
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
