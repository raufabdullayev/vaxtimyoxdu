import { Tool } from '@/types/tool'
import AdBanner from '@/components/layout/AdBanner'

interface ToolTemplateProps {
  tool: Tool
  children: React.ReactNode
}

export default function ToolTemplate({ tool, children }: ToolTemplateProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{tool.icon}</span>
          <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
        </div>
        <p className="text-muted-foreground">{tool.shortDescription}</p>
      </div>

      <AdBanner slot="tool-top" format="banner" className="mb-6" />

      <div className="rounded-xl border bg-card p-4 md:p-6">{children}</div>

      <AdBanner slot="tool-bottom" format="in-article" className="mt-6" />

      <div className="mt-8 prose prose-sm max-w-none">
        <h2 className="text-xl font-semibold mb-3">About {tool.name}</h2>
        <p className="text-muted-foreground">{tool.description}</p>
      </div>
    </div>
  )
}
