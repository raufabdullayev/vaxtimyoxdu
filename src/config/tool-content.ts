/**
 * Tool content configuration for the top 20 tools.
 * Rich content (howToUse, whyUse, tips, FAQs) is stored in translation files.
 * This file lists which tools have rich content available and how many FAQs each has.
 */

export interface ToolContentConfig {
  slug: string
  faqCount: number // number of FAQs in translation files
  hasRichContent: boolean
}

/**
 * Top 20 tools with rich SEO content.
 * The actual text lives in /src/messages/{locale}.json under tools.toolContent.{slug}
 */
export const toolsWithRichContent: ToolContentConfig[] = [
  { slug: 'json-formatter', faqCount: 7, hasRichContent: true },
  { slug: 'image-compress', faqCount: 6, hasRichContent: true },
  { slug: 'pdf-merge', faqCount: 6, hasRichContent: true },
  { slug: 'qr-code-generator', faqCount: 7, hasRichContent: true },
  { slug: 'password-generator', faqCount: 7, hasRichContent: true },
  { slug: 'color-picker', faqCount: 6, hasRichContent: true },
  { slug: 'base64-encode-decode', faqCount: 6, hasRichContent: true },
  { slug: 'word-counter', faqCount: 6, hasRichContent: true },
  { slug: 'lorem-ipsum-generator', faqCount: 6, hasRichContent: true },
  { slug: 'uuid-generator', faqCount: 6, hasRichContent: true },
  { slug: 'json-to-csv', faqCount: 6, hasRichContent: true },
  { slug: 'markdown-to-html', faqCount: 6, hasRichContent: true },
  { slug: 'html-minifier', faqCount: 6, hasRichContent: true },
  { slug: 'css-minifier', faqCount: 6, hasRichContent: true },
  { slug: 'text-to-speech', faqCount: 6, hasRichContent: true },
  { slug: 'pdf-compress', faqCount: 6, hasRichContent: true },
  { slug: 'image-convert', faqCount: 6, hasRichContent: true },
  { slug: 'regex-tester', faqCount: 7, hasRichContent: true },
  { slug: 'hash-generator', faqCount: 6, hasRichContent: true },
  { slug: 'url-encode-decode', faqCount: 6, hasRichContent: true },
]

export function getToolContentConfig(slug: string): ToolContentConfig | undefined {
  return toolsWithRichContent.find((t) => t.slug === slug)
}

export function hasRichContent(slug: string): boolean {
  return toolsWithRichContent.some((t) => t.slug === slug)
}
