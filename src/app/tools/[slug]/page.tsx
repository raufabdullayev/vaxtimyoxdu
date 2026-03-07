import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { tools } from '@/config/tools'
import { getToolBySlug } from '@/lib/tools/registry'
import { generateToolMetadata } from '@/lib/utils/seo'
import ToolTemplate from '@/components/tools/ToolTemplate'
import QrCodeGenerator from '@/components/tools/generators/QrCodeGenerator'
import JsonFormatter from '@/components/tools/dev/JsonFormatter'
import WordCounter from '@/components/tools/WordCounter'
import Base64Codec from '@/components/tools/dev/Base64Codec'
import ColorPicker from '@/components/tools/generators/ColorPicker'
import LoremIpsum from '@/components/tools/generators/LoremIpsum'
import TextRewriter from '@/components/tools/ai/TextRewriter'
import TextSummarizer from '@/components/tools/ai/TextSummarizer'
import GrammarChecker from '@/components/tools/ai/GrammarChecker'
import RegexTester from '@/components/tools/dev/RegexTester'
import HashGenerator from '@/components/tools/dev/HashGenerator'
import ImageCompress from '@/components/tools/image/ImageCompress'
import ImageConvert from '@/components/tools/image/ImageConvert'
import PdfMerge from '@/components/tools/pdf/PdfMerge'

const toolComponents: Record<string, React.ComponentType> = {
  'qr-code-generator': QrCodeGenerator,
  'json-formatter': JsonFormatter,
  'word-counter': WordCounter,
  'base64-encode-decode': Base64Codec,
  'color-picker': ColorPicker,
  'lorem-ipsum-generator': LoremIpsum,
  'ai-text-rewriter': TextRewriter,
  'ai-text-summarizer': TextSummarizer,
  'ai-grammar-checker': GrammarChecker,
  'regex-tester': RegexTester,
  'hash-generator': HashGenerator,
  'image-compress': ImageCompress,
  'image-convert': ImageConvert,
  'pdf-merge': PdfMerge,
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

  return (
    <ToolTemplate tool={tool}>
      <Component />
    </ToolTemplate>
  )
}
