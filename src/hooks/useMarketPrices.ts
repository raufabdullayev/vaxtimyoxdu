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

const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

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

  useEffect(() => {
    fetchPrices()

    intervalRef.current = setInterval(fetchPrices, REFRESH_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
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
