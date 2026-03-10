import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  // The default locale does not get a prefix — vaxtimyoxdu.com stays as-is
  // for SEO continuity with existing indexed pages.
  localePrefix: 'as-needed',
})
