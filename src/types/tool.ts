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
  /** Per-locale title override — bypasses factory suffix composition when set */
  metaTitle?: Partial<Record<string, string>>
  /** Per-locale description override — bypasses factory browserBasedNote appending when set */
  metaDescription?: Partial<Record<string, string>>
}
