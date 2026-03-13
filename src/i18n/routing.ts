import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  // The default locale does not get a prefix — vaxtimyoxdu.com stays as-is
  // for SEO continuity with existing indexed pages.
  localePrefix: 'as-needed',
  // Disable Accept-Language header and cookie-based locale detection.
  // Without this, browsers sending e.g. Accept-Language: en get 307-redirected
  // from /blog to /en/blog, which breaks URL consistency and can confuse
  // search engines. Users switch language explicitly via the LanguageSelector.
  localeDetection: false,
})
