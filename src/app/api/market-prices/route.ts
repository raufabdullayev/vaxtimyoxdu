import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

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

// ---------------------------------------------------------------------------
// 3-tier cache: CDN edge (s-maxage=5) -> L1 in-memory -> L2 Redis -> upstream
// ---------------------------------------------------------------------------

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null

const CACHE_KEY = 'market-prices:v1'
const LOCK_KEY = 'market-prices:lock:v1'
const CACHE_TTL_SEC = 6
const LOCK_TTL_SEC = 8

// L1: in-memory per-instance cache (no Redis call when hit)
let memCache: MarketPricesResponse | null = null
let memCacheExpiresAt = 0

// Single CoinGecko call covering BTC, ETH and gold (tether-gold). Splitting one
// request into crypto[] + gold halves CoinGecko hits versus two separate calls,
// which matters under the 5s refresh cadence and the tight free-tier limit.
// On any failure both crypto and gold degrade together (empty / null), matching
// the previous per-fetch try/catch graceful-degradation behavior.
async function fetchCryptoAndGold(): Promise<{
  crypto: MarketPrice[]
  gold: MarketPrice | null
}> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether-gold&vs_currencies=usd&include_24hr_change=true',
      { signal: AbortSignal.timeout(4000) }
    )

    if (!res.ok) throw new Error(`CoinGecko API error: ${res.status}`)

    const data: CoinGeckoResponse = await res.json()

    const crypto: MarketPrice[] = []

    if (data.bitcoin) {
      crypto.push({
        symbol: 'BTC',
        name: 'Bitcoin',
        price: data.bitcoin.usd,
        change24h: data.bitcoin.usd_24h_change ?? 0,
        icon: 'BTC',
        category: 'crypto',
      })
    }

    if (data.ethereum) {
      crypto.push({
        symbol: 'ETH',
        name: 'Ethereum',
        price: data.ethereum.usd,
        change24h: data.ethereum.usd_24h_change ?? 0,
        icon: 'ETH',
        category: 'crypto',
      })
    }

    const gold: MarketPrice | null = data['tether-gold']
      ? {
          symbol: 'GOLD',
          name: 'Gold',
          price: data['tether-gold'].usd,
          change24h: data['tether-gold'].usd_24h_change ?? 0,
          icon: 'GOLD',
          category: 'commodity',
        }
      : null

    return { crypto, gold }
  } catch {
    return { crypto: [], gold: null }
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
  const [cryptoAndGold, oilAndSP] = await Promise.all([
    fetchCryptoAndGold(),
    fetchOilAndSP500(),
  ])

  const { crypto: cryptoPrices, gold: goldPrice } = cryptoAndGold

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

// Build the empty payload at request time so updatedAt reflects when the error
// occurred, not the serverless cold-start time (which can be hours stale on a
// warm instance).
const emptyResponse = (): MarketPricesResponse => ({
  prices: [],
  updatedAt: new Date().toISOString(),
})

/**
 * 2-tier cache lookup with thundering-herd protection.
 *
 * 1. L1 (in-memory per-instance) — zero network cost, expires after 6s.
 * 2. L2 (Upstash Redis) — shared across all Vercel function instances. Same 6s TTL.
 * 3. Upstream (CoinGecko + Yahoo) — only one instance fetches at a time
 *    via SET NX EX 8 lock. Other instances wait briefly and re-read Redis.
 *
 * Designed to stay within Upstash free tier (10K cmd/day):
 * - CDN absorbs ~95% of user requests (Cache-Control: s-maxage=5, SWR=10).
 * - L1 absorbs cross-region instance reuse.
 * - Redis is hit only when L1 expires (every 6s per warm instance).
 */
async function getCachedOrFetch(): Promise<MarketPricesResponse> {
  const now = Date.now()

  // L1 check
  if (memCache && now < memCacheExpiresAt) {
    return memCache
  }

  // L2 check (Redis)
  if (redis) {
    try {
      const cached = await redis.get<MarketPricesResponse>(CACHE_KEY)
      if (cached) {
        memCache = cached
        memCacheExpiresAt = Date.now() + CACHE_TTL_SEC * 1000
        return cached
      }
    } catch {
      // Redis read failed -- proceed to upstream
    }
  }

  // L3 fetch path: try acquire lock first to prevent thundering herd
  let gotLock = false
  if (redis) {
    try {
      const lockResult = await redis.set(LOCK_KEY, '1', {
        nx: true,
        ex: LOCK_TTL_SEC,
      })
      gotLock = lockResult === 'OK'
    } catch {
      gotLock = false
    }
  }

  if (!gotLock && redis) {
    // Another instance has the lock -- wait briefly, then try Redis again
    await new Promise((r) => setTimeout(r, 300))
    try {
      const retry = await redis.get<MarketPricesResponse>(CACHE_KEY)
      if (retry) {
        memCache = retry
        memCacheExpiresAt = Date.now() + CACHE_TTL_SEC * 1000
        return retry
      }
    } catch {
      // proceed to upstream as last resort
    }
  }

  try {
    const data = await fetchAllPrices()
    if (redis) {
      try {
        await redis.set(CACHE_KEY, data, { ex: CACHE_TTL_SEC })
      } catch {
        // Redis write failed -- still return data (in-memory only)
      }
      if (gotLock) {
        try {
          await redis.del(LOCK_KEY)
        } catch {
          // ignore -- lock will expire naturally
        }
      }
    }
    memCache = data
    memCacheExpiresAt = Date.now() + CACHE_TTL_SEC * 1000
    return data
  } catch (e) {
    // Release lock on error so the next request can retry immediately
    if (redis && gotLock) {
      try {
        await redis.del(LOCK_KEY)
      } catch {
        // ignore
      }
    }
    // Return stale memCache if available (better than throwing)
    if (memCache) return memCache
    throw e
  }
}

export async function GET() {
  // Wrap the entire cache+fetch flow in a try/catch so this route NEVER throws.
  // A thrown error during SSR would cascade and break hydration for every
  // component on the page.
  let data: MarketPricesResponse
  let cacheStatus: 'HIT' | 'MISS'

  // Capture L1 state BEFORE the call so we can report HIT/MISS correctly.
  const wasL1Hit = memCache !== null && Date.now() < memCacheExpiresAt

  try {
    data = await getCachedOrFetch()
    cacheStatus = wasL1Hit ? 'HIT' : 'MISS'
  } catch {
    return NextResponse.json(emptyResponse(), {
      headers: {
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
        'X-Cache': 'EMPTY',
      },
    })
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
      'X-Cache': cacheStatus,
    },
  })
}
