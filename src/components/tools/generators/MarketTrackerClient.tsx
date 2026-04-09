'use client'

import dynamic from 'next/dynamic'

const MarketTracker = dynamic(
  () => import('./MarketTracker'),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        {/* Skeleton header controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 rounded-lg bg-muted animate-pulse" />
            <div className="h-5 w-28 rounded bg-muted animate-pulse" />
          </div>
        </div>
        {/* Skeleton price cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-20" />
                  <div className="h-3 bg-muted rounded w-12" />
                </div>
              </div>
              <div className="h-6 bg-muted rounded w-28 mb-2" />
              <div className="h-4 bg-muted rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    ),
  }
)

export default function MarketTrackerClient() {
  return <MarketTracker />
}
