'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { MarketPrice, MarketPricesResponse } from '@/app/api/market-prices/route'

export interface UseMarketPricesResult {
  prices: MarketPrice[]
  updatedAt: string | null
  isLoading: boolean
  error: string | null
  refetch: () => void
  previousPrices: Map<string, number>
}

const REFRESH_INTERVAL = 5 * 1000 // 5 seconds

export function useMarketPrices(): UseMarketPricesResult {
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const previousPricesRef = useRef<Map<string, number>>(new Map())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchPrices = useCallback(async () => {
    try {
      setError(null)
      const res = await fetch('/api/market-prices')

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data: MarketPricesResponse = await res.json()

      // Store previous prices for animation comparison
      setPrices((prev) => {
        const prevMap = new Map<string, number>()
        prev.forEach((p) => prevMap.set(p.symbol, p.price))
        previousPricesRef.current = prevMap
        return data.prices
      })
      setUpdatedAt(data.updatedAt)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Polling effect with page-visibility pause: stops polling when the tab is
  // hidden so background tabs do not burn CDN/Redis quota for nothing.
  useEffect(() => {
    fetchPrices()

    function startPolling() {
      if (intervalRef.current) return
      intervalRef.current = setInterval(fetchPrices, REFRESH_INTERVAL)
    }

    function stopPolling() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    function handleVisibility() {
      if (typeof document === 'undefined') return
      if (document.hidden) {
        stopPolling()
      } else {
        // Refetch immediately when tab becomes visible -- user has been gone
        // long enough that the data is likely stale.
        fetchPrices()
        startPolling()
      }
    }

    if (typeof document !== 'undefined' && !document.hidden) {
      startPolling()
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibility)
    }

    return () => {
      stopPolling()
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibility)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    prices,
    updatedAt,
    isLoading,
    error,
    refetch: fetchPrices,
    previousPrices: previousPricesRef.current,
  }
}
