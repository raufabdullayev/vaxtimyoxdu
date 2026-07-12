import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase/client'
import type { AnalyticsAggregates } from '@/lib/supabase/types'
import { createRateLimiter } from '@/lib/rate-limiter'
import { byCountThenKey } from '@/lib/analytics/aggregate-sort'

/**
 * GET /api/analytics/stats
 *
 * Returns aggregated analytics data. Protected by an API key passed
 * via the `x-api-key` header only.
 *
 * The API key is read from the ANALYTICS_API_KEY environment variable.
 * If the env var is not set, the endpoint returns 401 Unauthorized.
 *
 * Rate limited to 10 requests/minute per API key to prevent resource exhaustion.
 *
 * The 5 group-by aggregations (popular_tools, visitors_by_locale, top_pages,
 * share_clicks, tool_completions) are computed in Postgres via the
 * analytics_aggregates() function (supabase/migrations/002) so we transfer
 * tens of rows instead of up to 10,000 per metric. If that function is not
 * present yet, the route transparently falls back to fetching rows and
 * aggregating in JS. The fallback mirrors the SQL ordering (count DESC, key
 * ASC) on a best-effort basis — exact tie order may differ slightly because JS
 * string comparison and the database collation are not guaranteed identical.
 * Very large windows are capped at FALLBACK_ROW_CAP rows and the truncation is
 * logged (the counts undercount until migration 002 is applied).
 *
 * Response shape:
 * {
 *   page_views: { last_24h, last_7d, last_30d },
 *   tool_uses: { last_24h, last_7d, last_30d },
 *   popular_tools: [{ tool, count }],
 *   visitors_by_locale: [{ locale, count }],
 *   top_pages: [{ page_path, count }],
 *   share_clicks: [{ platform, count }],
 *   tool_completions: [{ tool, completions, uses, rate }],
 *   errors_404: [{ page_path, created_at }]
 * }
 */

const checkRateLimit = createRateLimiter({
  limit: 10,
  window: '1 m',
  prefix: 'rl:analytics-stats',
})

/**
 * Row cap for the pre-migration JS aggregation fallback. Matches the fast
 * path closely enough for a dashboard, but very high-traffic windows can
 * exceed it — we warn when a query returns this many rows so the undercount
 * is observable rather than silent.
 */
const FALLBACK_ROW_CAP = 10000

function isAuthorized(req: NextRequest): boolean {
  const apiKey = process.env.ANALYTICS_API_KEY
  if (!apiKey) return false

  const headerKey = req.headers.get('x-api-key')
  if (!headerKey) return false

  try {
    return timingSafeEqual(
      Buffer.from(headerKey),
      Buffer.from(apiKey)
    )
  } catch {
    // timingSafeEqual throws if lengths don't match; return false for security
    return false
  }
}

/**
 * Count rows matching a given event_type within a time window.
 */
async function countEvents(
  supabase: NonNullable<ReturnType<typeof getSupabaseServer>>,
  eventType: string,
  sinceHours: number
): Promise<number> {
  const since = new Date(Date.now() - sinceHours * 60 * 60 * 1000).toISOString()

  const { count, error } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', eventType)
    .gte('created_at', since)

  if (error) {
    console.error(`[Analytics Stats] Count error (${eventType}, ${sinceHours}h):`, error.message)
    return 0
  }

  return count ?? 0
}

/**
 * Run the Postgres-side aggregation (migration 002). Returns null — so the
 * caller falls back to in-JS aggregation — when the client cannot make the
 * call (e.g. test mock without `.rpc`) or the function is not yet installed.
 */
async function getAggregates(
  supabase: NonNullable<ReturnType<typeof getSupabaseServer>>,
  since: string,
  limit: number
): Promise<AnalyticsAggregates | null> {
  if (typeof supabase.rpc !== 'function') return null

  try {
    const { data, error } = await supabase.rpc('analytics_aggregates', {
      p_since: since,
      p_limit: limit,
    })
    if (error) {
      // A real RPC error (e.g. function missing at the DB level, permissions
      // regression) should be visible — otherwise the route silently degrades
      // to the expensive JS path forever. The `typeof rpc` guard above already
      // keeps the expected "SDK/mock without .rpc" case quiet.
      console.warn('[Analytics Stats] RPC aggregate failed; using JS fallback:', error.message)
      return null
    }
    if (!data) return null
    return data as AnalyticsAggregates
  } catch (e) {
    console.warn(
      '[Analytics Stats] RPC aggregate threw; using JS fallback:',
      e instanceof Error ? e.message : e
    )
    return null
  }
}

export async function GET(req: NextRequest) {
  // ── Auth check ──
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Rate limit check (10 requests/minute per API key) ──
  // Use the API key itself as the rate limit key (different keys get separate buckets)
  const apiKey = req.headers.get('x-api-key') || 'unknown'
  const { allowed } = await checkRateLimit(apiKey)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // ── Supabase availability check ──
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { error: 'Analytics not configured (Supabase env vars missing)' },
      { status: 503 }
    )
  }

  const supabase = getSupabaseServer()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Failed to initialize Supabase client' },
      { status: 503 }
    )
  }

  // ── Parse date range from query params ──
  const { searchParams } = new URL(req.url)
  const rangeParam = searchParams.get('range') // '24h' | '7d' | '30d' | '90d'
  const rangeHours = rangeParam === '24h' ? 24
    : rangeParam === '90d' ? 24 * 90
    : rangeParam === '30d' ? 24 * 30
    : rangeParam === '7d' ? 24 * 7
    : 24 * 30 // default 30d
  const sinceDate = new Date(Date.now() - rangeHours * 60 * 60 * 1000).toISOString()

  try {
    // ── Counts (efficient head-count queries), recent 404s, and the
    //    group-by aggregations (Postgres function when available) in parallel ──
    const [
      pageViews24h,
      pageViews7d,
      pageViews30d,
      toolUses24h,
      toolUses7d,
      toolUses30d,
      errorsResult,
      aggregates,
    ] = await Promise.all([
      // Page views
      countEvents(supabase, 'page_view', 24),
      countEvents(supabase, 'page_view', 24 * 7),
      countEvents(supabase, 'page_view', 24 * 30),

      // Tool uses
      countEvents(supabase, 'tool_use', 24),
      countEvents(supabase, 'tool_use', 24 * 7),
      countEvents(supabase, 'tool_use', 24 * 30),

      // 404 errors (within selected range)
      supabase
        .from('analytics_events')
        .select('page_path, created_at')
        .eq('event_type', '404_error')
        .gte('created_at', sinceDate)
        .order('created_at', { ascending: false })
        .limit(50),

      // 5 group-by aggregations in one Postgres call (null -> JS fallback below)
      getAggregates(supabase, sinceDate, 20),
    ])

    let popular_tools: { tool: string; count: number }[]
    let visitors_by_locale: { locale: string; count: number }[]
    let top_pages: { page_path: string; count: number }[]
    let share_clicks: { platform: string; count: number }[]
    let tool_completions: { tool: string; completions: number; uses: number; rate: number }[]

    if (aggregates) {
      // ── Fast path: Postgres returned the aggregated arrays ──
      popular_tools = aggregates.popular_tools ?? []
      visitors_by_locale = aggregates.visitors_by_locale ?? []
      top_pages = aggregates.top_pages ?? []
      share_clicks = aggregates.share_clicks ?? []
      tool_completions = aggregates.tool_completions ?? []
    } else {
      // ── Fallback: fetch rows and aggregate in JS (pre-migration-002) ──
      const [
        popularToolsResult,
        localeResult,
        topPagesResult,
        shareClicksResult,
        toolCompletesResult,
      ] = await Promise.all([
        supabase
          .from('analytics_events')
          .select('event_data')
          .eq('event_type', 'tool_use')
          .gte('created_at', sinceDate)
          .limit(FALLBACK_ROW_CAP),
        supabase
          .from('analytics_events')
          .select('locale')
          .eq('event_type', 'page_view')
          .gte('created_at', sinceDate)
          .limit(FALLBACK_ROW_CAP),
        supabase
          .from('analytics_events')
          .select('page_path')
          .eq('event_type', 'page_view')
          .gte('created_at', sinceDate)
          .limit(FALLBACK_ROW_CAP),
        supabase
          .from('analytics_events')
          .select('event_data')
          .eq('event_type', 'share_click')
          .gte('created_at', sinceDate)
          .limit(FALLBACK_ROW_CAP),
        supabase
          .from('analytics_events')
          .select('event_data')
          .eq('event_type', 'tool_complete')
          .gte('created_at', sinceDate)
          .limit(FALLBACK_ROW_CAP),
      ])

      // ── Detect silent truncation: any query at the row cap undercounts ──
      const cappedMetrics = (
        [
          ['tool_use', popularToolsResult],
          ['page_view/locale', localeResult],
          ['page_view/path', topPagesResult],
          ['share_click', shareClicksResult],
          ['tool_complete', toolCompletesResult],
        ] as const
      )
        .filter(([, r]) => Array.isArray(r.data) && r.data.length >= FALLBACK_ROW_CAP)
        .map(([metric]) => metric)
      if (cappedMetrics.length > 0) {
        console.warn(
          `[Analytics Stats] JS fallback hit the ${FALLBACK_ROW_CAP}-row cap for [${cappedMetrics.join(', ')}]; ` +
            'these counts undercount this window. Apply migration 002 for exact Postgres-side aggregation.'
        )
      }

      // ── Aggregate popular tools ──
      const toolCounts = new Map<string, number>()
      if (popularToolsResult.data) {
        for (const row of popularToolsResult.data) {
          const tool = (row.event_data as Record<string, unknown> | null)?.tool
          if (typeof tool === 'string') {
            toolCounts.set(tool, (toolCounts.get(tool) ?? 0) + 1)
          }
        }
      }
      popular_tools = Array.from(toolCounts.entries())
        .map(([tool, count]) => ({ tool, count }))
        .sort(byCountThenKey((r) => r.count, (r) => r.tool))
        .slice(0, 20)

      // ── Aggregate locale distribution ──
      const localeCounts = new Map<string, number>()
      if (localeResult.data) {
        for (const row of localeResult.data) {
          const locale = (row.locale as string) ?? 'unknown'
          localeCounts.set(locale, (localeCounts.get(locale) ?? 0) + 1)
        }
      }
      visitors_by_locale = Array.from(localeCounts.entries())
        .map(([locale, count]) => ({ locale, count }))
        .sort(byCountThenKey((r) => r.count, (r) => r.locale))

      // ── Aggregate top pages ──
      const pageCounts = new Map<string, number>()
      if (topPagesResult.data) {
        for (const row of topPagesResult.data) {
          const path = (row.page_path as string) ?? 'unknown'
          pageCounts.set(path, (pageCounts.get(path) ?? 0) + 1)
        }
      }
      top_pages = Array.from(pageCounts.entries())
        .map(([page_path, count]) => ({ page_path, count }))
        .sort(byCountThenKey((r) => r.count, (r) => r.page_path))
        .slice(0, 20)

      // ── Aggregate share clicks by platform ──
      const sharePlatformCounts = new Map<string, number>()
      if (shareClicksResult.data) {
        for (const row of shareClicksResult.data) {
          const platform = (row.event_data as Record<string, unknown> | null)?.platform
          if (typeof platform === 'string') {
            sharePlatformCounts.set(platform, (sharePlatformCounts.get(platform) ?? 0) + 1)
          }
        }
      }
      share_clicks = Array.from(sharePlatformCounts.entries())
        .map(([platform, count]) => ({ platform, count }))
        .sort(byCountThenKey((r) => r.count, (r) => r.platform))

      // ── Aggregate tool completion rates ──
      // Note: tool_complete events use 'toolSlug' key, tool_use events use 'tool' key
      const toolCompleteCounts = new Map<string, number>()
      if (toolCompletesResult.data) {
        for (const row of toolCompletesResult.data) {
          const data = row.event_data as Record<string, unknown> | null
          const tool = data?.toolSlug ?? data?.tool
          if (typeof tool === 'string') {
            toolCompleteCounts.set(tool, (toolCompleteCounts.get(tool) ?? 0) + 1)
          }
        }
      }
      tool_completions = Array.from(toolCompleteCounts.entries())
        .map(([tool, completions]) => {
          const uses = toolCounts.get(tool) ?? 0
          const rate = uses > 0 ? Math.round((completions / uses) * 100) : 0
          return { tool, completions, uses, rate }
        })
        .sort(byCountThenKey((r) => r.completions, (r) => r.tool))
        .slice(0, 20)
    }

    // ── 404 errors ──
    const errors_404 = (errorsResult.data ?? []).map((row) => ({
      page_path: (row.page_path as string) ?? 'unknown',
      created_at: row.created_at as string,
    }))

    return NextResponse.json(
      {
        generated_at: new Date().toISOString(),
        range: rangeParam || '30d',
        page_views: {
          last_24h: pageViews24h,
          last_7d: pageViews7d,
          last_30d: pageViews30d,
        },
        tool_uses: {
          last_24h: toolUses24h,
          last_7d: toolUses7d,
          last_30d: toolUses30d,
        },
        popular_tools,
        visitors_by_locale,
        top_pages,
        share_clicks,
        tool_completions,
        errors_404,
      },
      {
        // Endpoint is API-key protected, so keep caching private (no shared/edge cache).
        // A short window collapses rapid dashboard polls without serving stale data for long.
        headers: { 'Cache-Control': 'private, max-age=30' },
      }
    )
  } catch (error) {
    console.error('[Analytics Stats] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
