'use client'

import { useEffect } from 'react'
import './globals.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="az">
      <body className="m-0 font-sans">
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50">
          <p className="text-7xl md:text-8xl font-bold text-primary/20 mb-2 leading-none select-none">
            Xeta
          </p>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            Bir xeta bas verdi
          </h1>
          <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
            Gozlenilmeyen xeta bas verdi. Zehmet olmasa yeniden cehd edin.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-primary text-white border-none rounded-lg font-medium text-base cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Yeniden cehd et
          </button>
        </div>
      </body>
    </html>
  )
}
