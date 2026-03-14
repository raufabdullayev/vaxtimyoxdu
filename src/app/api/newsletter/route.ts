import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServer, isSupabaseConfigured } from '@/lib/supabase/client'
import { trackNewsletterSubscribe } from '@/lib/supabase/analytics'
import { createRateLimiter } from '@/lib/rate-limiter'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const checkRateLimit = createRateLimiter({
  limit: 5,
  window: '1 h',
  prefix: 'rl:newsletter',
})

// In-memory set used for deduplication when Supabase is not configured.
// In production with Supabase enabled, the unique constraint on the email
// column handles duplicates.  This set still provides a fast pre-check to
// avoid unnecessary DB round-trips within a single serverless instance.
const subscribedEmails = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    // ------------------------------------------------------------------
    // 0. Rate limiting (5 requests per hour per IP)
    // ------------------------------------------------------------------
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const { allowed, retryAfter } = await checkRateLimit(ip)

    if (!allowed) {
      const headers: Record<string, string> = {}
      if (retryAfter) headers['Retry-After'] = String(retryAfter)
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      )
    }

    // ------------------------------------------------------------------
    // 1. Parse & validate request body
    // ------------------------------------------------------------------
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { email, locale, source } = body as {
      email?: string
      locale?: string
      source?: string
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()

    if (!EMAIL_REGEX.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // ------------------------------------------------------------------
    // 2. Quick in-memory dedup (works with or without Supabase)
    // ------------------------------------------------------------------
    if (subscribedEmails.has(trimmed)) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

    // ------------------------------------------------------------------
    // 3. Persist to Supabase (if configured)
    // ------------------------------------------------------------------
    const supabase = getSupabaseServer()

    if (supabase) {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: trimmed,
          locale: typeof locale === 'string' ? locale : null,
          source: typeof source === 'string' ? source : null,
        })

      if (error) {
        // Postgres unique violation code = 23505
        if (error.code === '23505') {
          subscribedEmails.add(trimmed) // cache for future in-memory checks
          return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
        }

        // Any other DB error -- log it but don't crash the endpoint.
        console.error('[Newsletter] Supabase insert error:', error.message)
        // Fall through -- we still record the email in memory so the user
        // gets a success response rather than a confusing error.
      }
    } else if (!isSupabaseConfigured) {
      console.warn(
        '[Newsletter] Supabase not configured. Subscriber recorded in-memory only:',
        trimmed
      )
    }

    // ------------------------------------------------------------------
    // 4. Update in-memory set & track analytics event
    // ------------------------------------------------------------------
    subscribedEmails.add(trimmed)

    // Fire-and-forget analytics (non-blocking)
    trackNewsletterSubscribe(
      trimmed,
      typeof locale === 'string' ? locale : null,
      typeof source === 'string' ? source : null
    )

    console.log(`[Newsletter] New subscriber: ${trimmed}`)

    return NextResponse.json({ success: true, message: 'Successfully subscribed' })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
