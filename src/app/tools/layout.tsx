import Sidebar from '@/components/layout/Sidebar'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-8">
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
        <Sidebar />
      </div>
    </div>
  )
}
