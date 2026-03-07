export type ToolCategory = 'pdf' | 'image' | 'ai' | 'dev' | 'generators' | 'text'

export interface Tool {
  slug: string
  name: string
  description: string
  shortDescription: string
  category: ToolCategory
  icon: string
  isAI: boolean
  isClientSide: boolean
  keywords: string[]
}
