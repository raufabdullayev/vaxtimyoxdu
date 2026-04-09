import { NextRequest, NextResponse } from 'next/server'
import { trackEvent } from '@/lib/supabase/analytics'
import { createRateLimiter } from '@/lib/rate-limiter'

/**
 * POST /api/analytics/track
 *
 * Receives analytics events from client components and writes them to
 * Supabase via the service role key (server-side only).
 *
 * This endpoint exists because the Supabase service role key must never
 * be exposed to the browser.  Client components POST lightweight event
 * payloads here, and this handler delegates to trackEvent() which
 * performs a fire-and-forget insert.
 *
 * The endpoint always returns 204 No Content so the client is never
 * blocked waiting for the database write to complete.
 *
 * Rate limited to 100 requests/minute per IP to prevent abuse.
 */

const checkRateLimit = createRateLimiter({
  limit: 100,
  window: '1 m',
  prefix: 'rl:analytics-track',
})

/** Valid event types accepted by this endpoint. */
const ALLOWED_EVENT_TYPES = new Set([
  'page_view',
  'tool_use',
  'newsletter_subscribe',
  'share_click',
  'tool_complete',
  'scroll_depth',
  'search_query',
  'outbound_click',
  '404_error',
  'session_engagement',
])

/** Maximum length for string fields to prevent abuse. */
const MAX_FIELD_LENGTH = 500

function isValidString(value: unknown, maxLen = MAX_FIELD_LENGTH): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= maxLen
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check (100 requests/minute per IP)
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
    const { allowed, retryAfter } = await checkRateLimit(ip)

    if (!allowed) {
      const headers: Record<string, string> = {}
      if (retryAfter) headers['Retry-After'] = String(retryAfter)
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      )
    }

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      // Malformed JSON -- silently accept (analytics should never break the UX)
      return new NextResponse(null, { status: 204 })
    }

    const { event_type, event_data, page_path, locale } = body

    // Validate event_type
    if (!isValidString(event_type) || !ALLOWED_EVENT_TYPES.has(event_type)) {
      return new NextResponse(null, { status: 204 })
    }

    // Validate optional fields
    const sanitizedPagePath = isValidString(page_path) ? page_path : null
    const sanitizedLocale = isValidString(locale, 10) ? locale : null
    const sanitizedEventData =
      event_data && typeof event_data === 'object' && !Array.isArray(event_data)
        ? (event_data as Record<string, unknown>)
        : null

    // Fire-and-forget -- trackEvent handles its own error logging
    trackEvent(event_type, sanitizedEventData, sanitizedPagePath, sanitizedLocale)

    // Always return 204 immediately so the client is never blocked
    return new NextResponse(null, { status: 204 })
  } catch {
    // Never let analytics errors bubble up
    return new NextResponse(null, { status: 204 })
  }
}
