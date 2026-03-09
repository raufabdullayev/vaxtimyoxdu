import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { tools } from '@/config/tools'
import { getToolBySlug } from '@/lib/tools/registry'
import { generateToolMetadata, generateToolJsonLd } from '@/lib/utils/seo'
import ToolTemplate from '@/components/tools/ToolTemplate'

const toolComponents: Record<string, React.ComponentType> = {
  'qr-code-generator': dynamic(() => import('@/components/tools/generators/QrCodeGenerator')),
  'json-formatter': dynamic(() => import('@/components/tools/dev/JsonFormatter')),
  'word-counter': dynamic(() => import('@/components/tools/WordCounter')),
  'base64-encode-decode': dynamic(() => import('@/components/tools/dev/Base64Codec')),
  'color-picker': dynamic(() => import('@/components/tools/generators/ColorPicker')),
  'lorem-ipsum-generator': dynamic(() => import('@/components/tools/generators/LoremIpsum')),
  'ai-text-rewriter': dynamic(() => import('@/components/tools/ai/TextRewriter')),
  'ai-text-summarizer': dynamic(() => import('@/components/tools/ai/TextSummarizer')),
  'ai-grammar-checker': dynamic(() => import('@/components/tools/ai/GrammarChecker')),
  'regex-tester': dynamic(() => import('@/components/tools/dev/RegexTester')),
  'hash-generator': dynamic(() => import('@/components/tools/dev/HashGenerator')),
  'image-compress': dynamic(() => import('@/components/tools/image/ImageCompress')),
  'image-convert': dynamic(() => import('@/components/tools/image/ImageConvert')),
  'pdf-merge': dynamic(() => import('@/components/tools/pdf/PdfMerge')),
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolTemplate tool={tool}>
        <Component />
      </ToolTemplate>
    </>
  )
}
