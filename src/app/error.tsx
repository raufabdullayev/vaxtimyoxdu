'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Application error:', error) }, [error])

  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl font-bold text-destructive mb-4">Xeta</p>
      <h1 className="text-2xl font-bold mb-2">Bir xeta bas verdi</h1>
      <p className="text-muted-foreground mb-8 max-w-md">Gozlenilmeyen xeta bas verdi. Zehmet olmasa yeniden cehd edin.</p>
      <button onClick={reset} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">Yeniden cehd et</button>
    </div>
  )
}
