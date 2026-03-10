/**
 * Supabase database type definitions for Vaxtim Yoxdu.
 *
 * These types mirror the tables defined in supabase/migrations/001_initial_schema.sql.
 * Keep them in sync whenever the schema changes.
 *
 * IMPORTANT: Row, Insert, and Update types are declared as `type` aliases
 * (not `interface`) because the Supabase SDK's generic constraints require
 * types that are structurally compatible with `Record<string, unknown>`.
 * TypeScript interfaces do not satisfy implicit index signatures in the
 * same way that type aliases do.
 */

// ---------------------------------------------------------------------------
// newsletter_subscribers
// ---------------------------------------------------------------------------

/** Row as returned from a SELECT on newsletter_subscribers. */
export type NewsletterSubscriber = {
  id: string // uuid, primary key
  email: string
  subscribed_at: string // ISO-8601 timestamp
  locale: string | null // e.g. 'az', 'en', 'tr', 'ru'
  source: string | null // e.g. 'footer', 'popup', 'blog'
  is_active: boolean
}

/** Payload accepted by an INSERT into newsletter_subscribers. */
export type NewsletterSubscriberInsert = {
  email: string
  locale?: string | null
  source?: string | null
}

/** Payload accepted by an UPDATE on newsletter_subscribers. */
export type NewsletterSubscriberUpdate = {
  email?: string
  locale?: string | null
  source?: string | null
  is_active?: boolean
}

// ---------------------------------------------------------------------------
// analytics_events
// ---------------------------------------------------------------------------

/** Row as returned from a SELECT on analytics_events. */
export type AnalyticsEvent = {
  id: string // uuid, primary key
  event_type: string // e.g. 'page_view', 'tool_use', 'newsletter_subscribe'
  event_data: Record<string, unknown> | null // arbitrary JSON
  page_path: string | null // e.g. '/tools/json-formatter'
  locale: string | null
  created_at: string // ISO-8601 timestamp
}

/** Payload accepted by an INSERT into analytics_events. */
export type AnalyticsEventInsert = {
  event_type: string
  event_data?: Record<string, unknown> | null
  page_path?: string | null
  locale?: string | null
}

// ---------------------------------------------------------------------------
// Supabase generated-style Database type (subset)
// ---------------------------------------------------------------------------

/**
 * Simplified Database type compatible with createClient<Database>().
 *
 * This gives us end-to-end type safety on .from('table') calls without
 * requiring the full Supabase CLI codegen step.
 */
export type Database = {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: NewsletterSubscriber
        Insert: NewsletterSubscriberInsert
        Update: NewsletterSubscriberUpdate
        Relationships: []
      }
      analytics_events: {
        Row: AnalyticsEvent
        Insert: AnalyticsEventInsert
        Update: Partial<AnalyticsEventInsert>
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
  }
}
