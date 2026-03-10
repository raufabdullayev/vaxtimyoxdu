/**
 * Lightweight analytics helper that writes events to the Supabase
 * analytics_events table.
 *
 * All functions are designed as "fire and forget" -- they never throw,
 * never block the caller, and silently degrade when Supabase is not
 * configured or unavailable.
 */

import { getSupabaseServer, isSupabaseConfigured } from './client'
import type { AnalyticsEventInsert } from './types'

/**
 * Track an analytics event.
 *
 * This function returns immediately.  The actual database write happens
 * asynchronously and errors are logged but never propagated.
 *
 * @param eventType  - Short identifier, e.g. 'page_view', 'tool_use',
 *                     'newsletter_subscribe'.
 * @param eventData  - Arbitrary JSON payload with event-specific details.
 * @param pagePath   - The page path where the event occurred.
 * @param locale     - The active locale (az, en, tr, ru).
 *
 * @example
 *   trackEvent('tool_use', { tool: 'json-formatter' }, '/tools/json-formatter', 'en')
 */
export function trackEvent(
  eventType: string,
  eventData?: Record<string, unknown> | null,
  pagePath?: string | null,
  locale?: string | null
): void {
  // Bail out synchronously when Supabase is not available.
  if (!isSupabaseConfigured) {
    return
  }

  // Fire and forget -- wrap the async work in an IIFE so the caller
  // is never blocked and never receives an unhandled rejection.
  void (async () => {
    try {
      const supabase = getSupabaseServer()
      if (!supabase) return

      const row: AnalyticsEventInsert = {
        event_type: eventType,
        event_data: eventData ?? null,
        page_path: pagePath ?? null,
        locale: locale ?? null,
      }

      const { error } = await supabase
        .from('analytics_events')
        .insert(row)

      if (error) {
        console.error('[Analytics] Failed to track event:', error.message)
      }
    } catch (err) {
      // Network failure, cold start edge case, etc. -- log and move on.
      console.error('[Analytics] Unexpected error:', err)
    }
  })()
}

/**
 * Track a newsletter subscription event.
 *
 * Convenience wrapper around `trackEvent` that standardizes the event
 * shape for newsletter sign-ups.
 */
export function trackNewsletterSubscribe(
  email: string,
  locale?: string | null,
  source?: string | null
): void {
  trackEvent(
    'newsletter_subscribe',
    {
      // Store a hash-like prefix for debugging, not the full email.
      email_prefix: email.split('@')[0]?.slice(0, 3) ?? '',
      email_domain: email.split('@')[1] ?? '',
      source: source ?? 'unknown',
    },
    null,
    locale
  )
}

/**
 * Track a tool usage event.
 *
 * Convenience wrapper for recording which tools are used most often.
 */
export function trackToolUse(
  toolSlug: string,
  pagePath: string,
  locale?: string | null
): void {
  trackEvent('tool_use', { tool: toolSlug }, pagePath, locale)
}
