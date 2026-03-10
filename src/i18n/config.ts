export const locales = ['az', 'en', 'tr', 'ru'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'az'

export const localeNames: Record<Locale, string> = {
  az: 'AZ',
  en: 'EN',
  tr: 'TR',
  ru: 'RU',
}

export const localeFlags: Record<Locale, string> = {
  az: '\u{1F1E6}\u{1F1FF}',
  en: '\u{1F1EC}\u{1F1E7}',
  tr: '\u{1F1F9}\u{1F1F7}',
  ru: '\u{1F1F7}\u{1F1FA}',
}
