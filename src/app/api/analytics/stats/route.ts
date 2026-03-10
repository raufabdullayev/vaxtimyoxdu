import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase/client'

/**
 * GET /api/analytics/stats
 *
 * Returns aggregated analytics data. Protected by an API key passed
 * via the `x-api-key` header or `api_key` query parameter.
 *
 * The API key is read from the ANALYTICS_API_KEY environment variable.
 * If the env var is not set, the endpoint returns 503 Service Unavailable.
 *
 * Response shape:
 * {
 *   visitors: { last_24h, last_7d, last_30d },
 *   page_views: { last_24h, last_7d, last_30d },
 *   popular_tools: [{ tool, count }],
 *   visitors_by_locale: [{ locale, count }],
 *   top_pages: [{ page_path, count }]
 * }
 */

function isAuthorized(req: NextRequest): boolean {
  const apiKey = process.env.ANALYTICS_API_KEY
  if (!apiKey) return false

  const headerKey = req.headers.get('x-api-key')
  if (headerKey === apiKey) return true

  const urlKey = req.nextUrl.searchParams.get('api_key')
  if (urlKey === apiKey) return true

  return false
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
    ] = await Promise.all([
      // Page views
      countEvents(supabase, 'page_view', 24),
      countEvents(supabase, 'page_view', 24 * 7),
      countEvents(supabase, 'page_view', 24 * 30),

      // Tool uses
      countEvents(supabase, 'tool_use', 24),
      countEvents(supabase, 'tool_use', 24 * 7),
      countEvents(supabase, 'tool_use', 24 * 30),

      // Popular tools (last 30 days, top 20)
      supabase
        .from('analytics_events')
        .select('event_data')
        .eq('event_type', 'tool_use')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .limit(10000),

      // Visitors by locale (last 30 days)
      supabase
        .from('analytics_events')
        .select('locale')
        .eq('event_type', 'page_view')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .limit(10000),

      // Top pages (last 30 days)
      supabase
        .from('analytics_events')
        .select('page_path')
        .eq('event_type', 'page_view')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .limit(10000),
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

    return NextResponse.json({
      generated_at: new Date().toISOString(),
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
    })
  } catch (error) {
    console.error('[Analytics Stats] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
