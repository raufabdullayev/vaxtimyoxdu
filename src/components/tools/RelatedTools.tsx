import Link from 'next/link'
import { Tool } from '@/types/tool'
import { getToolsByCategory } from '@/lib/tools/registry'

interface RelatedToolsProps {
  currentTool: Tool
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
  const categoryTools = getToolsByCategory(currentTool.category)
  const related = categoryTools
    .filter((t) => t.slug !== currentTool.slug)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-xl border bg-card p-5 hover:shadow-lg hover:border-primary/50 transition-all duration-200"
          >
            <div className="text-2xl mb-2">{tool.icon}</div>
            <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tool.shortDescription}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {tool.isAI && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  AI-Powered
                </span>
              )}
              {tool.isClientSide && (
                <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">
                  Client-side
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
