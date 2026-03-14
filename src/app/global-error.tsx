'use client'

import { useEffect } from 'react'

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
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fafafa',
          }}
        >
          <p
            style={{
              fontSize: '5rem',
              fontWeight: 'bold',
              color: 'rgba(124, 58, 237, 0.2)',
              marginBottom: '0.5rem',
              lineHeight: 1,
            }}
          >
            Xeta
          </p>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#111',
            }}
          >
            Bir xeta bas verdi
          </h1>
          <p
            style={{
              color: '#666',
              marginBottom: '2rem',
              maxWidth: '28rem',
              lineHeight: 1.6,
            }}
          >
            Gozlenilmeyen xeta bas verdi. Zehmet olmasa yeniden cehd edin.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.625rem 1.5rem',
              backgroundColor: '#7c3aed',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 500,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Yeniden cehd et
          </button>
        </div>
      </body>
    </html>
  )
}
