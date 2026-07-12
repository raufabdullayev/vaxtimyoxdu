/**
 * Deterministic comparator matching the SQL `ORDER BY <count> DESC, <key> ASC`
 * used by analytics_aggregates() (supabase/migrations/002). Applying it to the
 * JS fallback in the analytics stats route keeps tie ordering aligned with the
 * Postgres fast path, so the dashboard shows the same rows regardless of which
 * path served the request. Uses a plain code-point comparison (not
 * localeCompare) to stay close to Postgres's default collation.
 */
export function byCountThenKey<T>(
  getCount: (row: T) => number,
  getKey: (row: T) => string
): (a: T, b: T) => number {
  return (a, b) => {
    const diff = getCount(b) - getCount(a)
    if (diff !== 0) return diff
    const ka = getKey(a)
    const kb = getKey(b)
    return ka < kb ? -1 : ka > kb ? 1 : 0
  }
}
