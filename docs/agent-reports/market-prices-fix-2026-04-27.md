# Market Prices Fix — 2026-04-27

**Commit:** `484da0a` (fix(market-prices): replace broken CoinGecko IDs with Yahoo Finance for Oil + SP500)
**Trigger:** CEO request after S39 news refresh: "qızıl btc və s. qiymətlərini də yenilə"
**Investigation finding:** Real bug, not just stale cache

---

## Bug Summary

| Symbol | Old behavior (CoinGecko) | Issue |
|--------|--------------------------|-------|
| BTC | $77,878 (live) | ✅ correct |
| ETH | $2,319 (live) | ✅ correct |
| GOLD | $4,693 (live, via tether-gold/PAXG) | ✅ correct |
| OIL | **$0.00000459** | ❌ `oilcoin` is a crypto token, NOT Brent crude |
| SPX | **missing entirely** | ❌ `sp500` ID does not exist on CoinGecko |

OIL was filtered out by the `p.price > 0` predicate effectively masking the issue, but with the crypto-token price showing instead of real oil. SPX never appeared because of the same filter (price=0).

## Fix

**File:** `src/app/api/market-prices/route.ts`

**Change:** Replaced `fetchOilAndSP500()` to use Yahoo Finance public unofficial API.

```typescript
async function fetchOilFromYahoo(): Promise<MarketPrice | null> {
  // GET https://query1.finance.yahoo.com/v8/finance/chart/BZ=F
  // Headers: User-Agent: Mozilla/5.0 (compatible; VaxtimYoxdu/1.0)
  // Parse: chart.result[0].meta.regularMarketPrice + chartPreviousClose
  // Returns: MarketPrice with symbol='OIL', name='Oil (Brent)', category='commodity'
  // Returns null on failure (graceful degradation)
}

async function fetchSP500FromYahoo(): Promise<MarketPrice | null> {
  // GET https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC
  // Same pattern, symbol='SPX', name='S&P 500', category='index'
}
```

**Why Yahoo Finance:**
- Free, no API key required, no rate limits
- Reliable for popular instruments (BZ=F oil, ^GSPC SP500, ^DJI Dow, etc.)
- User-Agent header required (Yahoo blocks default fetch UA)
- 5s timeout (same as existing CoinGecko calls)
- Each fetcher independent (Promise.all, one failure doesn't kill the other)

## Production Verification (2026-04-27 11:04 UTC)

| Symbol | Price | 24h Change | Status |
|--------|-------|-----------|--------|
| BTC | $77,854.00 | -0.23% | ✅ |
| ETH | $2,320.98 | -0.54% | ✅ |
| GOLD | $4,692.38 | -0.01% | ✅ |
| **OIL** | **$100.55** | **+1.43%** | **✅ FIXED** |
| **SPX** | **$7,165.08** | **+0.80%** | **✅ FIXED** |

`updatedAt`: 2026-04-27T11:04:12.336Z (fresh)

OIL price ~$100/barrel matches the broader market context (Brent crude has been ~$108/barrel during the Iran war + Hormuz blockade, with some recent softening on diplomatic developments).

SPX ~$7,165 reflects the modern S&P 500 level (the S&P broke 6000 in 2024 and has continued rising).

## Architecture Notes

- **Cache:** 5-min in-memory cache (`CACHE_TTL = 5 * 60 * 1000`) — first request hits Yahoo, subsequent requests within 5 min return cached. Same-server (per Vercel function instance), so different instances may have separate caches.
- **Fallback:** If Yahoo fails for either symbol, the fetcher returns null → `fetchAllPrices` filter `p.price > 0` cleans up. UI shows fewer cards but no broken prices.
- **No new dependencies:** uses native `fetch`, no SDKs.

## Rollback

If Yahoo Finance becomes unreliable, simplest rollback options:
1. Revert commit `484da0a` (back to broken CoinGecko, but production was already broken so this is no worse)
2. Add a try/catch wrapping `fetchOilAndSP500` calls in `fetchAllPrices` to drop both symbols on any failure
3. Use a paid alternative (alphavantage.co requires free API key, twelvedata.com has free tier)

## Verdict

✅ **DEPLOY SUCCESS** — All 5 instruments (BTC, ETH, GOLD, OIL, SPX) now showing realistic, fresh prices.
