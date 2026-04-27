import { NextResponse } from 'next/server'

export interface MarketPrice {
  symbol: string
  name: string
  price: number
  change24h: number
  icon: string
  category: 'crypto' | 'commodity' | 'index'
}

export interface MarketPricesResponse {
  prices: MarketPrice[]
  updatedAt: string
}

interface CoinGeckoResponse {
  [key: string]: {
    usd: number
    usd_24h_change?: number
  }
}

let cachedData: MarketPricesResponse | null = null
let cacheTimestamp = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function fetchCryptoPrices(): Promise<MarketPrice[]> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
      { signal: AbortSignal.timeout(4000) }
    )

    if (!res.ok) throw new Error(`CoinGecko API error: ${res.status}`)

    const data: CoinGeckoResponse = await res.json()

    const prices: MarketPrice[] = []

    if (data.bitcoin) {
      prices.push({
        symbol: 'BTC',
        name: 'Bitcoin',
        price: data.bitcoin.usd,
        change24h: data.bitcoin.usd_24h_change ?? 0,
        icon: 'BTC',
        category: 'crypto',
      })
    }

    if (data.ethereum) {
      prices.push({
        symbol: 'ETH',
        name: 'Ethereum',
        price: data.ethereum.usd,
        change24h: data.ethereum.usd_24h_change ?? 0,
        icon: 'ETH',
        category: 'crypto',
      })
    }

    return prices
  } catch {
    return []
  }
}

async function fetchGoldPrice(): Promise<MarketPrice | null> {
  try {
    // Using a free metals API (no key required)
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd&include_24hr_change=true',
      { signal: AbortSignal.timeout(4000) }
    )

    if (!res.ok) throw new Error(`Gold API error: ${res.status}`)

    const data: CoinGeckoResponse = await res.json()

    if (data['tether-gold']) {
      return {
        symbol: 'GOLD',
        name: 'Gold',
        price: data['tether-gold'].usd,
        change24h: data['tether-gold'].usd_24h_change ?? 0,
        icon: 'GOLD',
        category: 'commodity',
      }
    }

    return null
  } catch {
    return null
  }
}

interface YahooChartResponse {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number
        chartPreviousClose?: number
        previousClose?: number
      }
    }>
    error?: unknown
  }
}

async function fetchOilFromYahoo(): Promise<MarketPrice | null> {
  try {
    const res = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/BZ=F',
      {
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VaxtimYoxdu/1.0)' },
      }
    )
    if (!res.ok) throw new Error(`Yahoo Oil API error: ${res.status}`)
    const data: YahooChartResponse = await res.json()
    const meta = data?.chart?.result?.[0]?.meta
    if (!meta?.regularMarketPrice) return null
    const price = meta.regularMarketPrice
    const prev = meta.chartPreviousClose ?? meta.previousClose ?? price
    const change24h = prev > 0 ? ((price - prev) / prev) * 100 : 0
    return {
      symbol: 'OIL',
      name: 'Oil (Brent)',
      price,
      change24h,
      icon: 'OIL',
      category: 'commodity',
    }
  } catch {
    return null
  }
}

async function fetchSP500FromYahoo(): Promise<MarketPrice | null> {
  try {
    const res = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC',
      {
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VaxtimYoxdu/1.0)' },
      }
    )
    if (!res.ok) throw new Error(`Yahoo SP500 API error: ${res.status}`)
    const data: YahooChartResponse = await res.json()
    const meta = data?.chart?.result?.[0]?.meta
    if (!meta?.regularMarketPrice) return null
    const price = meta.regularMarketPrice
    const prev = meta.chartPreviousClose ?? meta.previousClose ?? price
    const change24h = prev > 0 ? ((price - prev) / prev) * 100 : 0
    return {
      symbol: 'SPX',
      name: 'S&P 500',
      price,
      change24h,
      icon: 'SPX',
      category: 'index',
    }
  } catch {
    return null
  }
}

async function fetchOilAndSP500(): Promise<MarketPrice[]> {
  const [oil, sp500] = await Promise.all([
    fetchOilFromYahoo(),
    fetchSP500FromYahoo(),
  ])
  return [oil, sp500].filter((p): p is MarketPrice => p !== null)
}

async function fetchAllPrices(): Promise<MarketPricesResponse> {
  // Fetch all data sources in parallel
  const [cryptoPrices, goldPrice, oilAndSP] = await Promise.all([
    fetchCryptoPrices(),
    fetchGoldPrice(),
    fetchOilAndSP500(),
  ])

  const prices: MarketPrice[] = [
    ...cryptoPrices,
    ...(goldPrice ? [goldPrice] : []),
    ...oilAndSP,
  ]

  // If some prices are missing, add them with sensible indicators
  const hasGold = prices.some((p) => p.symbol === 'GOLD')
  const hasOil = prices.some((p) => p.symbol === 'OIL')

  if (!hasGold) {
    // Gold price fallback - approximate latest known price
    prices.push({
      symbol: 'GOLD',
      name: 'Gold',
      price: 0,
      change24h: 0,
      icon: 'GOLD',
      category: 'commodity',
    })
  }

  if (!hasOil) {
    // Oil price fallback
    prices.push({
      symbol: 'OIL',
      name: 'Oil (Brent)',
      price: 0,
      change24h: 0,
      icon: 'OIL',
      category: 'commodity',
    })
  }

  // Sort: BTC, ETH, GOLD, OIL, SPX
  const order = ['BTC', 'ETH', 'GOLD', 'OIL', 'SPX']
  prices.sort((a, b) => {
    const ia = order.indexOf(a.symbol)
    const ib = order.indexOf(b.symbol)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })

  return {
    prices: prices.filter((p) => p.price > 0),
    updatedAt: new Date().toISOString(),
  }
}

const EMPTY_RESPONSE: MarketPricesResponse = {
  prices: [],
  updatedAt: new Date().toISOString(),
}

export async function GET() {
  const now = Date.now()

  // Return cached data if still fresh
  if (cachedData && now - cacheTimestamp < CACHE_TTL) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'X-Cache': 'HIT',
      },
    })
  }

  // Wrap the entire fetch in a try/catch so this route NEVER throws.
  // A thrown error during SSR would cascade and break hydration for
  // every component on the page.
  let data: MarketPricesResponse
  try {
    data = await fetchAllPrices()
  } catch {
    // If fetchAllPrices throws, prefer stale cache over an error response
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=60',
          'X-Cache': 'STALE',
        },
      })
    }

    // Absolute last resort: return a valid (empty) response rather than
    // an error status that would cause the client hook to throw
    return NextResponse.json(EMPTY_RESPONSE, {
      headers: {
        'Cache-Control': 'public, s-maxage=30',
        'X-Cache': 'EMPTY',
      },
    })
  }

  // Update cache
  cachedData = data
  cacheTimestamp = now

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      'X-Cache': 'MISS',
    },
  })
}
