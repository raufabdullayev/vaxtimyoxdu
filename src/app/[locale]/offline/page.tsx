'use client'

import { useTranslations } from 'next-intl'
import { WifiOff, RefreshCw } from 'lucide-react'

export default function OfflinePage() {
  const t = useTranslations('offline')

  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-bold mb-2">
        {t('title')}
      </h1>

      <p className="text-muted-foreground mb-8 max-w-md">
        {t('description')}
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {t('retry')}
        </button>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">
        {t('hint')}
      </p>
    </div>
  )
}
