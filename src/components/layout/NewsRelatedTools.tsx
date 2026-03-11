import { Link } from '@/i18n/navigation'
import { getToolsForNewsCategory } from '@/lib/utils/cross-links'

interface NewsRelatedToolsProps {
  category: string
  title?: string
}

/**
 * Displays tools relevant to a news article's category. This creates
 * cross-links from news content to tool pages, improving internal linking
 * and helping users discover useful tools based on what they are reading.
 */
export default function NewsRelatedTools({ category, title = 'Try these tools' }: NewsRelatedToolsProps) {
  const tools = getToolsForNewsCategory(category, 4)

  if (tools.length === 0) return null

  return (
    <div className="mt-10 pt-6 border-t">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl flex-shrink-0">{tool.icon}</span>
            <div className="min-w-0">
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                {tool.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {tool.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
