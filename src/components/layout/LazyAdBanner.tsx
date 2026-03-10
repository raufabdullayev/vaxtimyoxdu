'use client'

import dynamic from 'next/dynamic'

// Dynamically import AdBanner with SSR disabled.
// Ads are never rendered server-side and should not block the initial HTML.
// This reduces the initial JS bundle and prevents CLS from ad containers
// that render differently on server vs client.
const AdBanner = dynamic(() => import('./AdBanner'), {
  ssr: false,
  loading: () => null,
})

type AdFormat = 'banner' | 'sidebar' | 'in-article'

interface LazyAdBannerProps {
  slot: string
  format?: AdFormat
  className?: string
}

export default function LazyAdBanner({ slot, format = 'banner', className = '' }: LazyAdBannerProps) {
  return <AdBanner slot={slot} format={format} className={className} />
}
