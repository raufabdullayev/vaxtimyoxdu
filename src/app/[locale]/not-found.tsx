import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { getPopularTools, getToolCategories } from '@/lib/utils/cross-links'
import { categories } from '@/config/tools'
import type { ToolCategory } from '@/types/tool'

/** Category icon mapping for visual consistency in the 404 page. */
const categoryIcons: Record<ToolCategory, string> = {
  ai: '🤖',
  pdf: '📄',
  image: '🖼️',
  dev: '💻',
  generators: '⚙️',
  text: '📝',
}

export default function NotFound() {
  const t = useTranslations('errors')
  const toolsT = useTranslations('tools')
  const popularTools = getPopularTools(10)
  const toolCategories = getToolCategories()

  return (
    <div className="container py-12 md:py-20">
      {/* Hero section */}
      <div className="text-center mb-12">
        <p className="text-8xl md:text-9xl font-bold text-primary/20 mb-2 select-none">404</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{t('notFound')}</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-2">
          {t('notFoundDescription')}
        </p>
        <p className="text-sm text-muted-foreground/80">
          {t('notFoundSuggestion')}
        </p>
      </div>

      {/* Quick navigation buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <Link
          href="/"
          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {t('notFoundHome')}
        </Link>
        <Link
          href="/tools"
          className="px-5 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          {t('notFoundTools')}
        </Link>
        <Link
          href="/info"
          className="px-5 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          {t('notFoundNews')}
        </Link>
        <Link
          href="/blog"
          className="px-5 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          {t('notFoundBlog')}
        </Link>
      </div>

      {/* Popular tools section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">{t('notFoundPopularTools')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {popularTools.map((tool) => {
            let displayName = tool.name
            try {
              const nameKey = `toolNames.${tool.slug}.name` as Parameters<typeof toolsT>[0]
              const translated = toolsT(nameKey)
              if (translated && translated !== nameKey) {
                displayName = translated
              }
            } catch {
              // fallback to English
            }

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all group"
              >
                <span className="text-xl flex-shrink-0">{tool.icon}</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                  {displayName}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Tool categories section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-center">{t('notFoundCategories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {toolCategories.map((cat) => {
            let displayName = cat.name
            try {
              const nameKey = `categories.${cat.key}` as Parameters<typeof toolsT>[0]
              const translated = toolsT(nameKey)
              if (translated && translated !== nameKey) {
                displayName = translated
              }
            } catch {
              // fallback to English
            }

            return (
              <Link
                key={cat.key}
                href="/tools"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all group text-center"
              >
                <span className="text-2xl">{categoryIcons[cat.key]}</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {displayName}
                </span>
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t('notFoundBrowseAll')}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
