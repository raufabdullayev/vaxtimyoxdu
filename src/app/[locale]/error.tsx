'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('errors')
  useEffect(() => { console.error('Application error:', error) }, [error])

  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl font-bold text-destructive mb-4">{t('generalError')}</p>
      <h1 className="text-2xl font-bold mb-2">{t('generalErrorTitle')}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">{t('generalErrorDescription')}</p>
      <button onClick={reset} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">{t('retry')}</button>
    </div>
  )
}
