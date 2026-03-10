export default function ToolLoading() {
  return (
    <div className="container py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-64 bg-muted rounded-lg mt-6" />
      </div>
    </div>
  )
}
