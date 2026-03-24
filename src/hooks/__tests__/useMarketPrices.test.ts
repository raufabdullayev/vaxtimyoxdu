import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useMarketPrices } from '../useMarketPrices'

const mockPricesResponse = {
  prices: [
    { symbol: 'BTC', name: 'Bitcoin', price: 65000, change24h: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', price: 3500, change24h: -1.2 },
  ],
  updatedAt: '2024-03-20T12:00:00Z',
}

describe('useMarketPrices', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPricesResponse),
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('starts with loading state', () => {
    const { result } = renderHook(() => useMarketPrices())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.prices).toEqual([])
    expect(result.current.updatedAt).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('fetches prices on mount', async () => {
    const { result } = renderHook(() => useMarketPrices())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/market-prices')
    expect(result.current.prices).toHaveLength(2)
    expect(result.current.prices[0].symbol).toBe('BTC')
    expect(result.current.updatedAt).toBe('2024-03-20T12:00:00Z')
  })

  it('sets error state on fetch failure', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useMarketPrices())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('Network error')
    expect(result.current.prices).toEqual([])
  })

  it('sets error state on non-ok response', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    })

    const { result } = renderHook(() => useMarketPrices())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('HTTP 500')
  })

  it('provides a refetch function', async () => {
    const { result } = renderHook(() => useMarketPrices())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(global.fetch).toHaveBeenCalledTimes(1)

    await act(async () => {
      result.current.refetch()
    })

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  it('handles non-Error exceptions gracefully', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce('string error')

    const { result } = renderHook(() => useMarketPrices())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('Failed to fetch prices')
  })
})
