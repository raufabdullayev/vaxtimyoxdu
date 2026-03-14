import { SITE_URL } from './url'

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

export function getOgImageUrl(params: {
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
