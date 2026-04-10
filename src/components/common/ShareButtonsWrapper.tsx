'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import ShareButtons from './ShareButtons'

interface ShareButtonsWrapperProps {
  /** Path segment such as /tools/json-formatter */
  path: string
  title: string
  description?: string
}

const PRODUCTION_ORIGIN = 'https://vaxtimyoxdu.com'

export default function ShareButtonsWrapper({
  path,
  title,
  description,
}: ShareButtonsWrapperProps) {
  const locale = useLocale()
  const localePath = locale === 'az' ? '' : `/${locale}`

  const [origin, setOrigin] = useState(PRODUCTION_ORIGIN)

  useEffect(() => {
    if (window.location.origin !== PRODUCTION_ORIGIN) {
      setOrigin(window.location.origin)
    }
  }, [])

  const fullUrl = `${origin}${localePath}${path}`
  const slug = path.split('/').filter(Boolean).pop()

  return (
    <ShareButtons url={fullUrl} title={title} description={description} slug={slug} />
  )
}
