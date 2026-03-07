'use client'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  // Placeholder for AdSense - will be activated when AdSense is approved
  return (
    <div
      className={`bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground ${className}`}
      data-ad-slot={slot}
      data-ad-format={format}
    >
      <span className="py-4">Advertisement</span>
    </div>
  )
}
