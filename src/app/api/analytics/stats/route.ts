import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase/client'
import { createRateLimiter } from '@/lib/rate-limiter'

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
 * Response shape:
 * {
 *   page_views: { last_24h, last_7d, last_30d },
 *   tool_uses: { last_24h, last_7d, last_30d },
 *   popular_tools: [{ tool, count }],
 *   visitors_by_locale: [{ locale, count }],
 *   top_pages: [{ page_path, count }]
 * }
 */

const checkRateLimit = createRateLimiter({
  limit: 10,
  window: '1 m',
  prefix: 'rl:analytics-stats',
})

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
    // ── Gather stats in parallel ──
    const [
      pageViews24h,
      pageViews7d,
      pageViews30d,
      toolUses24h,
      toolUses7d,
      toolUses30d,
      popularToolsResult,
      localeResult,
      topPagesResult,
      shareClicksResult,
      toolCompletesResult,
      errorsResult,
    ] = await Promise.all([
      // Page views
      countEvents(supabase, 'page_view', 24),
      countEvents(supabase, 'page_view', 24 * 7),
      countEvents(supabase, 'page_view', 24 * 30),

      // Tool uses
      countEvents(supabase, 'tool_use', 24),
      countEvents(supabase, 'tool_use', 24 * 7),
      countEvents(supabase, 'tool_use', 24 * 30),

      // Popular tools (within selected range)
      supabase
        .from('analytics_events')
        .select('event_data')
        .eq('event_type', 'tool_use')
        .gte('created_at', sinceDate)
        .limit(10000),

      // Visitors by locale (within selected range)
      supabase
        .from('analytics_events')
        .select('locale')
        .eq('event_type', 'page_view')
        .gte('created_at', sinceDate)
        .limit(10000),

      // Top pages (within selected range)
      supabase
        .from('analytics_events')
        .select('page_path')
        .eq('event_type', 'page_view')
        .gte('created_at', sinceDate)
        .limit(10000),

      // Share clicks (within selected range)
      supabase
        .from('analytics_events')
        .select('event_data')
        .eq('event_type', 'share_click')
        .gte('created_at', sinceDate)
        .limit(10000),

      // Tool completions (within selected range)
      supabase
        .from('analytics_events')
        .select('event_data')
        .eq('event_type', 'tool_complete')
        .gte('created_at', sinceDate)
        .limit(10000),

      // 404 errors (within selected range)
      supabase
        .from('analytics_events')
        .select('page_path, created_at')
        .eq('event_type', '404_error')
        .gte('created_at', sinceDate)
        .order('created_at', { ascending: false })
        .limit(50),
    ])

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
    const popular_tools = Array.from(toolCounts.entries())
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)

    // ── Aggregate locale distribution ──
    const localeCounts = new Map<string, number>()
    if (localeResult.data) {
      for (const row of localeResult.data) {
        const locale = (row.locale as string) ?? 'unknown'
        localeCounts.set(locale, (localeCounts.get(locale) ?? 0) + 1)
      }
    }
    const visitors_by_locale = Array.from(localeCounts.entries())
      .map(([locale, count]) => ({ locale, count }))
      .sort((a, b) => b.count - a.count)

    // ── Aggregate top pages ──
    const pageCounts = new Map<string, number>()
    if (topPagesResult.data) {
      for (const row of topPagesResult.data) {
        const path = (row.page_path as string) ?? 'unknown'
        pageCounts.set(path, (pageCounts.get(path) ?? 0) + 1)
      }
    }
    const top_pages = Array.from(pageCounts.entries())
      .map(([page_path, count]) => ({ page_path, count }))
      .sort((a, b) => b.count - a.count)
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
    const share_clicks = Array.from(sharePlatformCounts.entries())
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count)

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
    const tool_completions = Array.from(toolCompleteCounts.entries())
      .map(([tool, completions]) => {
        const uses = toolCounts.get(tool) ?? 0
        const rate = uses > 0 ? Math.round((completions / uses) * 100) : 0
        return { tool, completions, uses, rate }
      })
      .sort((a, b) => b.completions - a.completions)
      .slice(0, 20)

    // ── 404 errors ──
    const errors_404 = (errorsResult.data ?? []).map((row) => ({
      page_path: (row.page_path as string) ?? 'unknown',
      created_at: row.created_at as string,
    }))

    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('[Analytics Stats] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
