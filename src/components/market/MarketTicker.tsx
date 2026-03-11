'use client'

import { useMarketPrices } from '@/hooks/useMarketPrices'
import { Link } from '@/i18n/navigation'

function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })
}

function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

function getSymbolIcon(symbol: string): string {
  const icons: Record<string, string> = {
    BTC: '\u20BF',
    ETH: '\u039E',
    GOLD: '\uD83E\uDD47',
    OIL: '\uD83D\uDEE2\uFE0F',
    SPX: '\uD83D\uDCC8',
  }
  return icons[symbol] || '\uD83D\uDCB0'
}

function TickerSkeleton() {
  return (
    <div className="flex items-center gap-6 overflow-hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 animate-pulse shrink-0">
          <div className="w-5 h-5 rounded-full bg-muted" />
          <div className="h-4 bg-muted rounded w-8" />
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-3 bg-muted rounded w-12" />
        </div>
      ))}
    </div>
  )
}

export default function MarketTicker() {
  const { prices, isLoading, error } = useMarketPrices()

  if (error && prices.length === 0) return null

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
          {isLoading && prices.length === 0 ? (
            <TickerSkeleton />
          ) : (
            <div className="flex items-center gap-5 min-w-max">
              {prices.map((p) => {
                const isPositive = p.change24h >= 0
                return (
                  <div
                    key={p.symbol}
                    className="flex items-center gap-2 shrink-0 text-sm"
                  >
                    <span className="text-base" aria-hidden="true">
                      {getSymbolIcon(p.symbol)}
                    </span>
                    <span className="font-medium text-muted-foreground text-xs">
                      {p.symbol}
                    </span>
                    <span className="font-mono font-semibold">
                      ${formatPrice(p.price)}
                    </span>
                    <span
                      className={`font-mono text-xs font-medium ${
                        isPositive ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    >
                      {isPositive ? '\u25B2' : '\u25BC'}
                      {formatChange(p.change24h)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <Link
          href="/tools/market-tracker"
          className="shrink-0 ml-4 text-xs text-primary hover:underline whitespace-nowrap"
        >
          View all &rarr;
        </Link>
      </div>
    </div>
  )
}
