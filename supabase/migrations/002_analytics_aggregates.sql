-- ============================================================================
-- Vaxtim Yoxdu - Analytics Aggregation Function
-- ============================================================================
-- Run this in Supabase Dashboard -> SQL Editor (same as 001_initial_schema.sql).
--
-- Purpose: push the 5 group-by aggregations used by GET /api/analytics/stats
-- into Postgres. Previously the API route fetched up to 10,000 rows PER metric
-- (popular_tools, visitors_by_locale, top_pages, share_clicks, tool_completions)
-- and aggregated them in JS. This function returns one compact JSON object so
-- the route transfers ~tens of rows instead of tens of thousands.
--
-- The output JSON shape matches the route's existing response EXACTLY, so the
-- API route uses this when available and transparently falls back to the old
-- in-JS aggregation if the function is absent (e.g. before this migration runs).
--
-- Uses the existing idx_analytics_events_type_created (event_type, created_at)
-- index for the WHERE filters; no new index required.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.analytics_aggregates(
  p_since timestamptz,
  p_limit int DEFAULT 20
)
RETURNS jsonb
LANGUAGE sql
STABLE
SET search_path = ''  -- security: pin search_path (all refs are public.* or pg_catalog built-ins)
AS $$
  SELECT jsonb_build_object(
    -- popular_tools: tool_use events grouped by event_data->>'tool', top p_limit
    'popular_tools', COALESCE((
      SELECT jsonb_agg(row_to_json(t))
      FROM (
        SELECT event_data->>'tool' AS tool, count(*)::int AS count
        FROM public.analytics_events
        WHERE event_type = 'tool_use'
          AND created_at >= p_since
          AND event_data->>'tool' IS NOT NULL
        GROUP BY 1
        ORDER BY 2 DESC, 1 ASC
        LIMIT p_limit
      ) t
    ), '[]'::jsonb),

    -- visitors_by_locale: page_view events grouped by locale (null -> 'unknown'), all
    'visitors_by_locale', COALESCE((
      SELECT jsonb_agg(row_to_json(t))
      FROM (
        SELECT COALESCE(locale, 'unknown') AS locale, count(*)::int AS count
        FROM public.analytics_events
        WHERE event_type = 'page_view'
          AND created_at >= p_since
        GROUP BY 1
        ORDER BY 2 DESC, 1 ASC
      ) t
    ), '[]'::jsonb),

    -- top_pages: page_view events grouped by page_path (null -> 'unknown'), top p_limit
    'top_pages', COALESCE((
      SELECT jsonb_agg(row_to_json(t))
      FROM (
        SELECT COALESCE(page_path, 'unknown') AS page_path, count(*)::int AS count
        FROM public.analytics_events
        WHERE event_type = 'page_view'
          AND created_at >= p_since
        GROUP BY 1
        ORDER BY 2 DESC, 1 ASC
        LIMIT p_limit
      ) t
    ), '[]'::jsonb),

    -- share_clicks: share_click events grouped by event_data->>'platform', all
    'share_clicks', COALESCE((
      SELECT jsonb_agg(row_to_json(t))
      FROM (
        SELECT event_data->>'platform' AS platform, count(*)::int AS count
        FROM public.analytics_events
        WHERE event_type = 'share_click'
          AND created_at >= p_since
          AND event_data->>'platform' IS NOT NULL
        GROUP BY 1
        ORDER BY 2 DESC, 1 ASC
      ) t
    ), '[]'::jsonb),

    -- tool_completions: tool_complete grouped by toolSlug|tool, joined with tool_use
    -- counts for the completion rate; top p_limit by completions
    'tool_completions', COALESCE((
      SELECT jsonb_agg(row_to_json(t))
      FROM (
        SELECT
          c.tool AS tool,
          c.completions::int AS completions,
          COALESCE(u.uses, 0)::int AS uses,
          CASE WHEN COALESCE(u.uses, 0) > 0
            THEN round((c.completions::numeric / u.uses) * 100)::int
            ELSE 0 END AS rate
        FROM (
          SELECT COALESCE(event_data->>'toolSlug', event_data->>'tool') AS tool,
                 count(*) AS completions
          FROM public.analytics_events
          WHERE event_type = 'tool_complete'
            AND created_at >= p_since
            AND COALESCE(event_data->>'toolSlug', event_data->>'tool') IS NOT NULL
          GROUP BY 1
        ) c
        LEFT JOIN (
          SELECT event_data->>'tool' AS tool, count(*) AS uses
          FROM public.analytics_events
          WHERE event_type = 'tool_use'
            AND created_at >= p_since
            AND event_data->>'tool' IS NOT NULL
          GROUP BY 1
        ) u ON u.tool = c.tool
        ORDER BY c.completions DESC, c.tool ASC
        LIMIT p_limit
      ) t
    ), '[]'::jsonb)
  );
$$;

-- The API route authenticates with the service role key; grant it execute.
GRANT EXECUTE ON FUNCTION public.analytics_aggregates(timestamptz, int) TO service_role;

-- ----------------------------------------------------------------------------
-- Done. After running this, GET /api/analytics/stats automatically switches to
-- the fast single-call path (no redeploy needed).
-- ----------------------------------------------------------------------------
