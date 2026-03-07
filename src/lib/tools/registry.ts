import { tools } from '@/config/tools'
import { Tool, ToolCategory } from '@/types/tool'

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category)
}

export function getAllTools(): Tool[] {
  return tools
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase()
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q)) ||
      t.category.includes(q)
  )
}
