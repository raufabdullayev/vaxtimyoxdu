import { tools, categories } from '@/config/tools'
import { blogPosts } from '@/data/blog-posts'
import type { Tool, ToolCategory } from '@/types/tool'

/**
 * Popular tools ordered by general usefulness / search demand.
 * Used on the 404 page and in the footer for internal linking.
 */
export const popularToolSlugs: string[] = [
  'ai-text-rewriter',
  'json-formatter',
  'image-compress',
  'pdf-merge',
  'qr-code-generator',
  'password-generator',
  'color-picker',
  'word-counter',
  'base64-encode-decode',
  'uuid-generator',
]

/**
 * Returns the top N popular tools (with full tool data).
 */
export function getPopularTools(count = 10): Tool[] {
  return popularToolSlugs
    .slice(0, count)
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is Tool => t !== undefined)
}

/**
 * Returns all tool categories with their keys and metadata.
 */
export function getToolCategories(): { key: ToolCategory; name: string; description: string }[] {
  return (Object.entries(categories) as [ToolCategory, { name: string; description: string }][]).map(
    ([key, meta]) => ({
      key,
      name: meta.name,
      description: meta.description,
    })
  )
}

/**
 * Category-to-news mapping. Maps news article categories to tool categories
 * that are likely relevant. This enables cross-linking from news articles
 * to related tools.
 */
const newsCategoryToToolCategory: Record<string, ToolCategory[]> = {
  'Texnologiya': ['ai', 'dev'],
  'Technology': ['ai', 'dev'],
  'Biznes': ['generators', 'pdf'],
  'Business': ['generators', 'pdf'],
  'Elm': ['dev', 'generators'],
  'Science': ['dev', 'generators'],
  'Təhsil': ['ai', 'text'],
  'Education': ['ai', 'text'],
  'İqtisadiyyat': ['generators', 'pdf'],
  'Economy': ['generators', 'pdf'],
  'Sağlamlıq': ['ai', 'text'],
  'Health': ['ai', 'text'],
  'Mədəniyyət': ['image', 'generators'],
  'Culture': ['image', 'generators'],
  'Səyahət': ['generators', 'image'],
  'Travel': ['generators', 'image'],
  'İdman': ['generators', 'text'],
  'Sports': ['generators', 'text'],
  'Dünya': ['ai', 'dev'],
  'World': ['ai', 'dev'],
}

/**
 * Given a news article category, returns a list of relevant tools (up to `count`).
 */
export function getToolsForNewsCategory(category: string, count = 4): Tool[] {
  const toolCategories = newsCategoryToToolCategory[category]
  if (!toolCategories) {
    // Fallback: return popular tools
    return getPopularTools(count)
  }

  const relevant: Tool[] = []
  for (const tc of toolCategories) {
    const catTools = tools.filter((t) => t.category === tc)
    for (const tool of catTools) {
      if (!relevant.some((r) => r.slug === tool.slug)) {
        relevant.push(tool)
      }
      if (relevant.length >= count) break
    }
    if (relevant.length >= count) break
  }

  return relevant.slice(0, count)
}

/**
 * Given a tool slug, returns blog posts that reference it in their relatedTools.
 * This enables cross-linking from tool pages back to blog posts.
 */
export function getBlogPostsForTool(toolSlug: string, count = 3): { slug: string; title: string; date: string }[] {
  return Object.entries(blogPosts)
    .filter(([, post]) => post.relatedTools.includes(toolSlug))
    .slice(0, count)
    .map(([slug, post]) => ({
      slug,
      title: post.title,
      date: post.date,
    }))
}

/**
 * Given a tool category, returns blog posts that mention tools in that category.
 */
export function getBlogPostsForCategory(category: ToolCategory, count = 3): { slug: string; title: string; date: string }[] {
  const categorySlugs = tools.filter((t) => t.category === category).map((t) => t.slug)
  const seen = new Set<string>()
  const results: { slug: string; title: string; date: string }[] = []

  for (const [slug, post] of Object.entries(blogPosts)) {
    if (seen.has(slug)) continue
    const hasMatch = post.relatedTools.some((rt) => categorySlugs.includes(rt))
    if (hasMatch) {
      seen.add(slug)
      results.push({ slug, title: post.title, date: post.date })
    }
    if (results.length >= count) break
  }

  return results
}
