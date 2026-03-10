'use client'

import { useEffect, useRef } from 'react'

type AdFormat = 'banner' | 'sidebar' | 'in-article'

interface AdBannerProps {
  slot: string
  format?: AdFormat
  className?: string
}

const AD_FORMAT_CONFIG: Record<AdFormat, { style: React.CSSProperties; format: string; layout?: string }> = {
  banner: {
    style: { display: 'inline-block', width: '728px', height: '90px', maxWidth: '100%' },
    format: 'horizontal',
  },
  sidebar: {
    style: { display: 'inline-block', width: '300px', height: '250px' },
    format: 'rectangle',
  },
  'in-article': {
    style: { display: 'block', textAlign: 'center' as const },
    format: 'fluid',
    layout: 'in-article',
  },
}

// Reserve space for each ad format to prevent CLS when ads load.
// These min-heights match the expected ad sizes so the layout does not shift.
const AD_MIN_HEIGHT: Record<AdFormat, string> = {
  banner: 'min-h-[90px]',
  sidebar: 'min-h-[250px]',
  'in-article': 'min-h-[120px]',
}

export default function AdBanner({ slot, format = 'banner', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isAdPushed = useRef(false)
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    if (!adsenseId || !isProduction) return
    if (isAdPushed.current) return

    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []
      adsbygoogle.push({})
      isAdPushed.current = true
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [adsenseId, isProduction])

  const minHeight = AD_MIN_HEIGHT[format]

  // In development or without AdSense ID, show a placeholder
  if (!adsenseId || !isProduction) {
    return (
      <div
        className={`bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground ${minHeight} ${className}`}
        data-ad-slot={slot}
        data-ad-format={format}
        role="presentation"
        aria-hidden="true"
      >
        <span className="py-4">Ad Placeholder ({format})</span>
      </div>
    )
  }

  const config = AD_FORMAT_CONFIG[format]

  return (
    <div
      className={`ad-container overflow-hidden ${minHeight} ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
        {...(config.layout ? { 'data-ad-layout': config.layout } : {})}
      />
    </div>
  )
}
