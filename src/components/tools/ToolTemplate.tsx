import { Tool } from '@/types/tool'
import LazyAdBanner from '@/components/layout/LazyAdBanner'
import PoweredByBrand from '@/components/common/PoweredByBrand'

interface ToolTemplateProps {
  tool: Tool
  children: React.ReactNode
  aboutTitle?: string
}

export default function ToolTemplate({ tool, children, aboutTitle }: ToolTemplateProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">{tool.icon}</span>
          <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
        </div>
        <p className="text-muted-foreground">{tool.shortDescription}</p>
      </div>

      <LazyAdBanner slot="tool-top" format="banner" className="mb-6" />

      <div className="rounded-xl border bg-card p-4 md:p-6">
        {children}
        <PoweredByBrand />
      </div>

      <LazyAdBanner slot="tool-bottom" format="in-article" className="mt-6" />

      <div className="mt-8 prose prose-sm max-w-none">
        <h2 className="text-xl font-semibold mb-3">{aboutTitle || `About ${tool.name}`}</h2>
        <p className="text-muted-foreground">{tool.description}</p>
      </div>
    </div>
  )
}
