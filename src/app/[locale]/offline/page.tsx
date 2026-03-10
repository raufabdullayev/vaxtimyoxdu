'use client'

import { WifiOff, RefreshCw } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-bold mb-2">
        Internet baglantiniz yoxdur
      </h1>

      <p className="text-muted-foreground mb-8 max-w-md">
        Bu sehifeni gostermek ucun internet baglantisi lazimdir.
        Zehmət olmasa baglantinizi yoxlayin ve yeniden cehd edin.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Yeniden cehd et
        </button>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">
        Eger problem davam edirse, internet provayderinizle elaqe saxlayin.
      </p>
    </div>
  )
}
