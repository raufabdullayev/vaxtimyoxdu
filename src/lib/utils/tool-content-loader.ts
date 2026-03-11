/**
 * Utility to load rich tool content (howToUse, whyUse, tips, FAQs) for the top 20 tools.
 * Content is stored in separate JSON files per locale in /src/config/tool-content-{locale}.json
 */

import { hasRichContent } from '@/config/tool-content'

// Import content JSON files statically so they are bundled correctly
import contentEn from '@/config/tool-content-en.json'
import contentAz from '@/config/tool-content-az.json'
import contentTr from '@/config/tool-content-tr.json'
import contentRu from '@/config/tool-content-ru.json'

interface ToolContentData {
  sectionTitles: {
    howToUse: string
    whyUse: string
    tips: string
    faq: string
  }
  [slug: string]: {
    howToUse: string[]
    whyUse: string[]
    tips: string[]
    faqs: { question: string; answer: string }[]
  } | { howToUse: string; whyUse: string; tips: string; faq: string }
}

const contentMap: Record<string, ToolContentData> = {
  en: contentEn as unknown as ToolContentData,
  az: contentAz as unknown as ToolContentData,
  tr: contentTr as unknown as ToolContentData,
  ru: contentRu as unknown as ToolContentData,
}

export interface ToolRichContent {
  sectionTitles: {
    howToUse: string
    whyUse: string
    tips: string
    faq: string
  }
  howToUse: string[]
  whyUse: string[]
  tips: string[]
  faqs: { question: string; answer: string }[]
}

/**
 * Load rich content for a specific tool and locale.
 * Returns null if the tool does not have rich content or the locale is not available.
 */
export function getToolRichContent(slug: string, locale: string): ToolRichContent | null {
  if (!hasRichContent(slug)) {
    return null
  }

  const content = contentMap[locale] || contentMap['en']
  if (!content) {
    return null
  }

  const toolData = content[slug]
  if (!toolData || !('howToUse' in toolData) || !Array.isArray((toolData as { howToUse: string[] }).howToUse)) {
    return null
  }

  const typedData = toolData as {
    howToUse: string[]
    whyUse: string[]
    tips: string[]
    faqs: { question: string; answer: string }[]
  }

  return {
    sectionTitles: content.sectionTitles as {
      howToUse: string
      whyUse: string
      tips: string
      faq: string
    },
    howToUse: typedData.howToUse,
    whyUse: typedData.whyUse,
    tips: typedData.tips,
    faqs: typedData.faqs,
  }
}

/**
 * Get just the FAQs for a tool in a specific locale.
 * Used by the SEO module to generate FAQ JSON-LD.
 */
export function getToolFaqs(slug: string, locale: string): { question: string; answer: string }[] | null {
  const content = getToolRichContent(slug, locale)
  if (!content) {
    return null
  }
  return content.faqs
}
