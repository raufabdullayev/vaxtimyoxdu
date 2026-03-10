import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { tools } from '@/config/tools'
import { getToolBySlug } from '@/lib/tools/registry'
import { generateToolMetadata, generateToolJsonLd, generateToolFaqJsonLd } from '@/lib/utils/seo'
import ToolTemplate from '@/components/tools/ToolTemplate'
import Breadcrumb from '@/components/layout/Breadcrumb'
import RelatedTools from '@/components/tools/RelatedTools'

const toolComponents: Record<string, React.ComponentType> = {
  // AI Tools
  'ai-text-rewriter': dynamic(() => import('@/components/tools/ai/TextRewriter')),
  'ai-text-summarizer': dynamic(() => import('@/components/tools/ai/TextSummarizer')),
  'ai-grammar-checker': dynamic(() => import('@/components/tools/ai/GrammarChecker')),
  // PDF Tools
  'pdf-merge': dynamic(() => import('@/components/tools/pdf/PdfMerge')),
  // Image Tools
  'image-compress': dynamic(() => import('@/components/tools/image/ImageCompress')),
  'image-convert': dynamic(() => import('@/components/tools/image/ImageConvert')),
  // Developer Tools
  'json-formatter': dynamic(() => import('@/components/tools/dev/JsonFormatter')),
  'base64-encode-decode': dynamic(() => import('@/components/tools/dev/Base64Codec')),
  'regex-tester': dynamic(() => import('@/components/tools/dev/RegexTester')),
  'hash-generator': dynamic(() => import('@/components/tools/dev/HashGenerator')),
  'url-encode-decode': dynamic(() => import('@/components/tools/dev/UrlCodec')),
  'jwt-decoder': dynamic(() => import('@/components/tools/dev/JwtDecoder')),
  'markdown-preview': dynamic(() => import('@/components/tools/dev/MarkdownPreview')),
  'timestamp-converter': dynamic(() => import('@/components/tools/dev/TimestampConverter')),
  'css-minifier': dynamic(() => import('@/components/tools/dev/CssMinifier')),
  'number-base-converter': dynamic(() => import('@/components/tools/dev/NumberBaseConverter')),
  'csv-to-json': dynamic(() => import('@/components/tools/dev/CsvToJson')),
  'cron-parser': dynamic(() => import('@/components/tools/dev/CronParser')),
  // Generators
  'qr-code-generator': dynamic(() => import('@/components/tools/generators/QrCodeGenerator')),
  'color-picker': dynamic(() => import('@/components/tools/generators/ColorPicker')),
  'lorem-ipsum-generator': dynamic(() => import('@/components/tools/generators/LoremIpsum')),
  'password-generator': dynamic(() => import('@/components/tools/generators/PasswordGenerator')),
  'uuid-generator': dynamic(() => import('@/components/tools/generators/UuidGenerator')),
  'meta-tag-generator': dynamic(() => import('@/components/tools/generators/MetaTagGenerator')),
  'aspect-ratio-calculator': dynamic(() => import('@/components/tools/generators/AspectRatioCalc')),
  // Text Tools
  'word-counter': dynamic(() => import('@/components/tools/WordCounter')),
  'case-converter': dynamic(() => import('@/components/tools/text/CaseConverter')),
  'slug-generator': dynamic(() => import('@/components/tools/text/SlugGenerator')),
  'text-diff': dynamic(() => import('@/components/tools/text/TextDiff')),
  'html-entity-codec': dynamic(() => import('@/components/tools/text/HtmlEntityCodec')),
}

export async function generateStaticParams() {
  return tools
    .filter((t) => toolComponents[t.slug])
    .map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}
  return generateToolMetadata(tool)
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const Component = toolComponents[tool.slug]
  if (!Component) notFound()

  const jsonLd = generateToolJsonLd(tool)
  const faqJsonLd = generateToolFaqJsonLd(tool)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: 'Ana s\u0259hif\u0259', href: '/' },
          { label: 'Al\u0259tl\u0259r', href: '/tools' },
          { label: tool.name },
        ]}
      />
      <ToolTemplate tool={tool}>
        <Component />
      </ToolTemplate>
      <RelatedTools currentTool={tool} />
    </>
  )
}
