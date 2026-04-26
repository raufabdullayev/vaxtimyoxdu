export default function Loading() {
  return (
    <div className="container flex items-center justify-center py-24" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  )
}
