-- ============================================================================
-- Vaxtim Yoxdu - Initial Supabase Schema
-- ============================================================================
-- Run this in Supabase Dashboard -> SQL Editor to create the required tables.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. newsletter_subscribers
-- ---------------------------------------------------------------------------
-- Stores email addresses collected through the newsletter signup form.
-- The email column has a unique constraint to prevent duplicate entries.

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text        NOT NULL,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  locale      text,                         -- e.g. 'az', 'en', 'tr', 'ru'
  source      text,                         -- e.g. 'footer', 'popup', 'blog'
  is_active   boolean     NOT NULL DEFAULT true,

  CONSTRAINT newsletter_subscribers_email_unique UNIQUE (email)
);

-- Index for listing active subscribers ordered by sign-up date.
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active
  ON public.newsletter_subscribers (is_active, subscribed_at DESC);

-- Index for locale-based filtering (e.g. send AZ-only campaigns).
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_locale
  ON public.newsletter_subscribers (locale)
  WHERE is_active = true;

-- ---------------------------------------------------------------------------
-- 2. analytics_events
-- ---------------------------------------------------------------------------
-- Lightweight event store for tool usage, page views, and other metrics.
-- event_data is a JSONB column that can hold arbitrary key/value pairs
-- specific to each event type.

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type  text        NOT NULL,         -- e.g. 'page_view', 'tool_use'
  event_data  jsonb,                        -- flexible payload
  page_path   text,                         -- e.g. '/tools/json-formatter'
  locale      text,                         -- e.g. 'az', 'en', 'tr', 'ru'
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Index for querying events by type within a time range.
CREATE INDEX IF NOT EXISTS idx_analytics_events_type_created
  ON public.analytics_events (event_type, created_at DESC);

-- Index for querying events by page path (e.g. tool popularity).
CREATE INDEX IF NOT EXISTS idx_analytics_events_page
  ON public.analytics_events (page_path, created_at DESC)
  WHERE page_path IS NOT NULL;

-- GIN index on event_data for ad-hoc JSONB queries.
CREATE INDEX IF NOT EXISTS idx_analytics_events_data
  ON public.analytics_events USING gin (event_data)
  WHERE event_data IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. Row Level Security (RLS)
-- ---------------------------------------------------------------------------
-- Both tables are accessed through the service role key in API routes,
-- which bypasses RLS.  We enable RLS and add restrictive policies so that
-- the anon key (if ever exposed) cannot read or modify data.

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Service role always has full access; these policies block anon/authenticated.
-- If you need anon INSERT for client-side analytics in the future, add a
-- policy like:
--   CREATE POLICY "anon_insert_analytics" ON public.analytics_events
--     FOR INSERT TO anon WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- Done.
-- ---------------------------------------------------------------------------
