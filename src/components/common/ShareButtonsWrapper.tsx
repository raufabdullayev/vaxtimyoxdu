'use client'

import { useLocale } from 'next-intl'
import ShareButtons from './ShareButtons'

interface ShareButtonsWrapperProps {
  /** Path segment such as /tools/json-formatter */
  path: string
  title: string
  description?: string
}

/**
 * Wrapper that resolves the full canonical URL on the client side
 * (where window.location.origin is available) and passes it to ShareButtons.
 * Falls back to the production domain during SSR / static build.
 */
export default function ShareButtonsWrapper({
  path,
  title,
  description,
}: ShareButtonsWrapperProps) {
  const locale = useLocale()
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://vaxtimyoxdu.com'

  // For the default locale (az) no prefix is added; for others add /en, /tr, /ru
  const localePath = locale === 'az' ? '' : `/${locale}`
  const fullUrl = `${base}${localePath}${path}`

  // Extract slug from path for analytics (e.g. /tools/json-formatter -> json-formatter)
  const slug = path.split('/').filter(Boolean).pop()

  return (
    <ShareButtons url={fullUrl} title={title} description={description} slug={slug} />
  )
}
