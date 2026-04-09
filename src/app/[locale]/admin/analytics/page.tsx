'use client'

import { useState, useEffect, useCallback } from 'react'

interface StatsData {
  generated_at: string
  page_views: { last_24h: number; last_7d: number; last_30d: number }
  tool_uses: { last_24h: number; last_7d: number; last_30d: number }
  popular_tools: Array<{ tool: string; count: number }>
  visitors_by_locale: Array<{ locale: string; count: number }>
  top_pages: Array<{ page_path: string; count: number }>
}

export default function AnalyticsDashboard() {
  const [apiKey, setApiKey] = useState('')
  const [stats, setStats] = useState<StatsData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchStats = useCallback(async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/analytics/stats', {
        headers: { 'x-api-key': apiKey.trim() },
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || `Error ${res.status}`)
        setStats(null)
        return
      }
      const data: StatsData = await res.json()
      setStats(data)
    } catch {
      setError('Failed to fetch analytics data')
    } finally {
      setLoading(false)
    }
  }, [apiKey])

  // Auto-fetch when key is entered and Enter is pressed
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('analytics_api_key') : null
    if (saved) setApiKey(saved)
  }, [])

  const handleKeySubmit = () => {
    if (apiKey.trim()) {
      sessionStorage.setItem('analytics_api_key', apiKey.trim())
      fetchStats()
    }
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* API Key input */}
      <div className="flex gap-3 mb-8">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleKeySubmit()}
          placeholder="Enter analytics API key"
          className="flex-1 rounded-lg border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          onClick={handleKeySubmit}
          disabled={loading}
          className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {stats && (
        <>
          <p className="text-xs text-muted-foreground mb-6">
            Generated at: {new Date(stats.generated_at).toLocaleString()}
          </p>

          {/* Page Views & Tool Uses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatCard title="Page Views" data={stats.page_views} />
            <StatCard title="Tool Uses" data={stats.tool_uses} />
          </div>

          {/* Top 10 Tools */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Top 10 Tools by Usage</h2>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">#</th>
                    <th className="text-left px-4 py-2 font-medium">Tool</th>
                    <th className="text-right px-4 py-2 font-medium">Uses</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popular_tools.slice(0, 10).map((tool, i) => (
                    <tr key={tool.tool} className="border-t">
                      <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-2">{tool.tool}</td>
                      <td className="px-4 py-2 text-right font-mono">{tool.count.toLocaleString()}</td>
                    </tr>
                  ))}
                  {stats.popular_tools.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-4 text-center text-muted-foreground">
                        No data yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visitors by Locale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-3">Visitors by Locale</h2>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium">Locale</th>
                      <th className="text-right px-4 py-2 font-medium">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.visitors_by_locale.map((item) => (
                      <tr key={item.locale} className="border-t">
                        <td className="px-4 py-2 uppercase">{item.locale}</td>
                        <td className="px-4 py-2 text-right font-mono">{item.count.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Pages */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Top Pages</h2>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium">Page</th>
                      <th className="text-right px-4 py-2 font-medium">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.top_pages.slice(0, 10).map((page) => (
                      <tr key={page.page_path} className="border-t">
                        <td className="px-4 py-2 truncate max-w-[200px]" title={page.page_path}>
                          {page.page_path}
                        </td>
                        <td className="px-4 py-2 text-right font-mono">{page.count.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({
  title,
  data,
}: {
  title: string
  data: { last_24h: number; last_7d: number; last_30d: number }
}) {
  return (
    <div className="rounded-lg border p-5">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-bold">{data.last_24h.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Last 24h</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{data.last_7d.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Last 7 days</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{data.last_30d.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </div>
      </div>
    </div>
  )
}
