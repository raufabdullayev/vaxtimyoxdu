export default function ToolLoading() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Main content area */}
        <div className="space-y-6">
          {/* Tool icon + title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-7 w-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-72 bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Tool content area */}
          <div className="rounded-lg border p-6 space-y-4">
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            <div className="h-40 bg-muted rounded-lg animate-pulse" />
            <div className="flex gap-3">
              <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
              <div className="h-10 w-28 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Description area */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-4">
          <div className="rounded-lg border p-4 space-y-3">
            <div className="h-5 w-24 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <div className="h-5 w-28 bg-muted rounded animate-pulse" />
            <div className="h-20 bg-muted rounded animate-pulse" />
          </div>
        </aside>
      </div>
    </div>
  )
}
