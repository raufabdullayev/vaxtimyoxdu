'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useMarketPrices } from '@/hooks/useMarketPrices'

// ---------- helpers ----------

function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  if (price >= 1) {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })
  }
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  })
}

function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

function getAssetIcon(symbol: string): string {
  const icons: Record<string, string> = {
    BTC: '\u20BF',  // Bitcoin symbol
    ETH: '\u039E',  // Xi symbol for Ethereum
    GOLD: '\uD83E\uDD47', // gold medal
    OIL: '\uD83D\uDEE2\uFE0F', // oil drum
    SPX: '\uD83D\uDCC8', // chart
  }
  return icons[symbol] || '\uD83D\uDCB0'
}

function getAssetColor(symbol: string): string {
  const colors: Record<string, string> = {
    BTC: '#F7931A',
    ETH: '#627EEA',
    GOLD: '#FFD700',
    OIL: '#1E3A5F',
    SPX: '#00C853',
  }
  return colors[symbol] || '#8B5CF6'
}

function timeAgo(isoStr: string): string {
  const diff = Date.now() - new Date(isoStr).getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}

// ---------- sub-components ----------

function PriceCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-muted" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-3 bg-muted rounded w-12" />
        </div>
      </div>
      <div className="h-6 bg-muted rounded w-28 mb-2" />
      <div className="h-4 bg-muted rounded w-16" />
    </div>
  )
}

function MiniBar({ change }: { change: number }) {
  const width = Math.min(Math.abs(change) * 10, 100)
  const isPositive = change >= 0

  return (
    <div className="w-full h-1.5 rounded-full bg-muted/50 overflow-hidden mt-2">
      <div
        className={`h-full rounded-full transition-all duration-700 ${
          isPositive ? 'bg-emerald-500' : 'bg-red-500'
        }`}
        style={{ width: `${Math.max(width, 4)}%` }}
      />
    </div>
  )
}

interface PriceCardProps {
  symbol: string
  name: string
  price: number
  change24h: number
  previousPrice: number | undefined
}

function PriceCard({ symbol, name, price, change24h, previousPrice }: PriceCardProps) {
  const isPositive = change24h >= 0
  const [flash, setFlash] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    if (previousPrice !== undefined && previousPrice !== price) {
      setFlash(price > previousPrice ? 'up' : 'down')
      const timer = setTimeout(() => setFlash(null), 1200)
      return () => clearTimeout(timer)
    }
  }, [price, previousPrice])

  const flashClass =
    flash === 'up'
      ? 'ring-2 ring-emerald-500/50'
      : flash === 'down'
        ? 'ring-2 ring-red-500/50'
        : ''

  return (
    <div
      className={`rounded-xl border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg ${flashClass}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: getAssetColor(symbol) + '20', color: getAssetColor(symbol) }}
        >
          {getAssetIcon(symbol)}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <span className="text-xs text-muted-foreground">{symbol}</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-1">
        <span className="text-xl font-bold font-mono tracking-tight">
          ${formatPrice(price)}
        </span>
      </div>

      {/* Change */}
      <div className="flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-0.5 text-sm font-medium ${
            isPositive ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          <span className="text-xs">{isPositive ? '\u25B2' : '\u25BC'}</span>
          {formatChange(change24h)}
        </span>
        <span className="text-xs text-muted-foreground">24h</span>
      </div>

      {/* Mini bar */}
      <MiniBar change={change24h} />
    </div>
  )
}

// ---------- converter ----------

const AZN_RATE = 1.7 // approximate AZN/USD rate

interface ConverterProps {
  prices: { symbol: string; name: string; price: number }[]
}

function PriceConverter({ prices }: ConverterProps) {
  const [fromAsset, setFromAsset] = useState('BTC')
  const [amount, setAmount] = useState('1')
  const [toCurrency, setToCurrency] = useState<'USD' | 'AZN' | 'EUR'>('USD')

  const result = useMemo(() => {
    const rates: Record<string, number> = {
      USD: 1,
      AZN: AZN_RATE,
      EUR: 0.92,
    }
    const asset = prices.find((p) => p.symbol === fromAsset)
    if (!asset) return null
    const num = parseFloat(amount)
    if (isNaN(num) || num < 0) return null
    const usdValue = num * asset.price
    return usdValue * rates[toCurrency]
  }, [fromAsset, amount, toCurrency, prices])

  if (prices.length === 0) return null

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span className="text-base">&#x1F4B1;</span>
        Price Converter
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Amount + Asset */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="any"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1"
              aria-label="Amount"
            />
          </div>
        </div>

        {/* From asset */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Asset</label>
          <select
            value={fromAsset}
            onChange={(e) => setFromAsset(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="From asset"
          >
            {prices.map((p) => (
              <option key={p.symbol} value={p.symbol}>
                {p.symbol} - {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* To currency */}
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Currency</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as 'USD' | 'AZN' | 'EUR')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="To currency"
          >
            <option value="USD">USD ($)</option>
            <option value="AZN">AZN (&#x20BC;)</option>
            <option value="EUR">EUR (&euro;)</option>
          </select>
        </div>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="mt-4 p-3 rounded-lg bg-muted/50 text-center">
          <span className="text-sm text-muted-foreground">
            {amount} {fromAsset} =
          </span>
          <br />
          <span className="text-2xl font-bold font-mono">
            {toCurrency === 'AZN' && '\u20BC'}
            {toCurrency === 'USD' && '$'}
            {toCurrency === 'EUR' && '\u20AC'}
            {result.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      )}
    </div>
  )
}

// ---------- main component ----------

export default function MarketTracker() {
  const { prices, updatedAt, isLoading, error, refetch, previousPrices } = useMarketPrices()
  const [autoRefresh, setAutoRefresh] = useState(true)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [countdown, setCountdown] = useState(5)

  // Countdown timer (resets when the data updates so the UI stays in sync
  // with the underlying 5-second polling cadence in useMarketPrices)
  useEffect(() => {
    if (!autoRefresh) {
      if (countdownRef.current) clearInterval(countdownRef.current)
      return
    }

    setCountdown(5)
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 5
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [autoRefresh, updatedAt])

  const formatCountdown = (s: number) => `${s}s`

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refetch()
              setCountdown(5)
            }}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border hover:bg-accent transition-colors disabled:opacity-50"
            aria-label="Refresh prices"
          >
            <svg
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>

          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-500 text-primary focus:ring-primary"
            />
            Auto-refresh
          </label>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {autoRefresh && (
            <span className="font-mono">Next: {formatCountdown(countdown)}</span>
          )}
          {updatedAt && <span>Updated {timeAgo(updatedAt)}</span>}
        </div>
      </div>

      {/* Error state */}
      {error && prices.length === 0 && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
          <p className="text-sm text-red-400 mb-2">Failed to load market data</p>
          <button
            onClick={refetch}
            className="text-sm text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Price grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && prices.length === 0
          ? Array.from({ length: 4 }).map((_, i) => <PriceCardSkeleton key={i} />)
          : prices.map((p) => (
              <PriceCard
                key={p.symbol}
                symbol={p.symbol}
                name={p.name}
                price={p.price}
                change24h={p.change24h}
                previousPrice={previousPrices.get(p.symbol)}
              />
            ))}
      </div>

      {/* Show stale data warning */}
      {error && prices.length > 0 && (
        <p className="text-xs text-amber-400 text-center">
          Showing cached data. Live prices will update shortly.
        </p>
      )}

      {/* Converter */}
      {prices.length > 0 && <PriceConverter prices={prices} />}

      {/* Market summary */}
      {prices.length > 0 && <MarketSummary prices={prices} />}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Prices are provided by CoinGecko and are delayed. This data is for informational purposes only
        and should not be considered financial advice. Always do your own research.
      </p>
    </div>
  )
}

// ---------- summary ----------

function MarketSummary({ prices }: { prices: { symbol: string; name: string; price: number; change24h: number }[] }) {
  const bestPerformer = prices.reduce((best, p) =>
    p.change24h > best.change24h ? p : best
  , prices[0])

  const worstPerformer = prices.reduce((worst, p) =>
    p.change24h < worst.change24h ? p : worst
  , prices[0])

  const avgChange = prices.reduce((sum, p) => sum + p.change24h, 0) / prices.length

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span className="text-base">&#x1F4CA;</span>
        Market Summary
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="p-3 rounded-lg bg-muted/50">
          <span className="text-xs text-muted-foreground block mb-1">Best Performer (24h)</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{bestPerformer?.name}</span>
            <span className="text-emerald-500 font-mono text-xs">
              {formatChange(bestPerformer?.change24h ?? 0)}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <span className="text-xs text-muted-foreground block mb-1">Worst Performer (24h)</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{worstPerformer?.name}</span>
            <span className="text-red-500 font-mono text-xs">
              {formatChange(worstPerformer?.change24h ?? 0)}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <span className="text-xs text-muted-foreground block mb-1">Average Change</span>
          <span
            className={`font-mono font-semibold ${
              avgChange >= 0 ? 'text-emerald-500' : 'text-red-500'
            }`}
          >
            {formatChange(avgChange)}
          </span>
        </div>
      </div>
    </div>
  )
}
