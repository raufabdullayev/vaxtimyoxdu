import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { tools } from '@/config/tools'
import { getToolBySlug } from '@/lib/tools/registry'
import { generateToolMetadata, generateToolJsonLd, generateToolFaqJsonLd, generateToolHowToJsonLd, generateHreflangAlternates } from '@/lib/utils/seo'
import { getToolRichContent } from '@/lib/utils/tool-content-loader'
import ToolTemplate from '@/components/tools/ToolTemplate'
import ToolContentSection from '@/components/tools/ToolContentSection'
import ToolFaqSection from '@/components/tools/ToolFaqSection'
import Breadcrumb from '@/components/layout/Breadcrumb'
import RelatedTools from '@/components/tools/RelatedTools'
import RelatedBlogPosts from '@/components/tools/RelatedBlogPosts'
import ToolUseTrackerWrapper from '@/components/analytics/ToolUseTrackerWrapper'
import ShareButtonsWrapper from '@/components/common/ShareButtonsWrapper'

const toolComponents: Record<string, React.ComponentType> = {
  // AI Tools
  'ai-text-rewriter': dynamic(() => import('@/components/tools/ai/TextRewriter')),
  'ai-text-summarizer': dynamic(() => import('@/components/tools/ai/TextSummarizer')),
  'ai-grammar-checker': dynamic(() => import('@/components/tools/ai/GrammarChecker')),
  // PDF Tools
  'pdf-merge': dynamic(() => import('@/components/tools/pdf/PdfMerge')),
  'pdf-split': dynamic(() => import('@/components/tools/pdf/PdfSplit')),
  'pdf-compress': dynamic(() => import('@/components/tools/pdf/PdfCompress')),
  // Image Tools
  'image-compress': dynamic(() => import('@/components/tools/image/ImageCompress')),
  'image-convert': dynamic(() => import('@/components/tools/image/ImageConvert')),
  'image-resize': dynamic(() => import('@/components/tools/image/ImageResize')),
  'image-crop': dynamic(() => import('@/components/tools/image/ImageCrop')),
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
  'html-minifier': dynamic(() => import('@/components/tools/dev/HtmlMinifier')),
  'js-minifier': dynamic(() => import('@/components/tools/dev/JsMinifier')),
  'sql-formatter': dynamic(() => import('@/components/tools/dev/SqlFormatter')),
  'json-to-csv': dynamic(() => import('@/components/tools/dev/JsonToCsv')),
  'ip-address-info': dynamic(() => import('@/components/tools/dev/IpAddressInfo')),
  'json-to-yaml': dynamic(() => import('@/components/tools/dev/JsonToYaml')),
  'xml-formatter': dynamic(() => import('@/components/tools/dev/XmlFormatter')),
  'markdown-to-html': dynamic(() => import('@/components/tools/dev/MarkdownToHtml')),
  'yaml-to-json': dynamic(() => import('@/components/tools/dev/YamlToJson')),
  'http-status-codes': dynamic(() => import('@/components/tools/dev/HttpStatusCodes')),
  // Generators
  'qr-code-generator': dynamic(() => import('@/components/tools/generators/QrCodeGenerator')),
  'color-picker': dynamic(() => import('@/components/tools/generators/ColorPicker')),
  'lorem-ipsum-generator': dynamic(() => import('@/components/tools/generators/LoremIpsum')),
  'password-generator': dynamic(() => import('@/components/tools/generators/PasswordGenerator')),
  'uuid-generator': dynamic(() => import('@/components/tools/generators/UuidGenerator')),
  'meta-tag-generator': dynamic(() => import('@/components/tools/generators/MetaTagGenerator')),
  'aspect-ratio-calculator': dynamic(() => import('@/components/tools/generators/AspectRatioCalc')),
  'emoji-picker': dynamic(() => import('@/components/tools/generators/EmojiPicker')),
  'gradient-generator': dynamic(() => import('@/components/tools/generators/GradientGenerator')),
  'placeholder-image': dynamic(() => import('@/components/tools/generators/PlaceholderImage')),
  'favicon-generator': dynamic(() => import('@/components/tools/generators/FaviconGenerator')),
  'svg-to-png': dynamic(() => import('@/components/tools/generators/SvgToPng')),
  'unit-converter': dynamic(() => import('@/components/tools/generators/UnitConverter')),
  'invoice-generator': dynamic(() => import('@/components/tools/generators/InvoiceGenerator')),
  // Text Tools
  'word-counter': dynamic(() => import('@/components/tools/WordCounter')),
  'case-converter': dynamic(() => import('@/components/tools/text/CaseConverter')),
  'slug-generator': dynamic(() => import('@/components/tools/text/SlugGenerator')),
  'text-diff': dynamic(() => import('@/components/tools/text/TextDiff')),
  'html-entity-codec': dynamic(() => import('@/components/tools/text/HtmlEntityCodec')),
  'text-to-binary': dynamic(() => import('@/components/tools/text/TextToBinary')),
  'rot13-encoder': dynamic(() => import('@/components/tools/text/Rot13Encoder')),
  'pomodoro-timer': dynamic(() => import('@/components/tools/text/PomodoroTimer')),
  'text-to-speech': dynamic(() => import('@/components/tools/text/TextToSpeech')),
  'character-counter': dynamic(() => import('@/components/tools/text/CharacterCounter')),
  'find-and-replace': dynamic(() => import('@/components/tools/text/FindAndReplace')),
  'morse-code': dynamic(() => import('@/components/tools/text/MorseCode')),
  'random-text-generator': dynamic(() => import('@/components/tools/text/RandomTextGenerator')),
  'text-repeater': dynamic(() => import('@/components/tools/text/TextRepeater')),
  // Market Tracker
  'market-tracker': dynamic(() => import('@/components/tools/generators/MarketTracker')),
  // Phase 9 - New Tools
  'video-to-gif': dynamic(() => import('@/components/tools/generators/VideoToGif')),
  'color-palette-generator': dynamic(() => import('@/components/tools/generators/ColorPaletteGenerator')),
  'backlink-generator': dynamic(() => import('@/components/tools/generators/BacklinkGenerator')),
  'json-path-finder': dynamic(() => import('@/components/tools/dev/JsonPathFinder')),
  'chmod-calculator': dynamic(() => import('@/components/tools/dev/ChmodCalculator')),
  'markdown-table-generator': dynamic(() => import('@/components/tools/dev/MarkdownTableGenerator')),
  'regex-library': dynamic(() => import('@/components/tools/dev/RegexLibrary')),
  'image-to-base64': dynamic(() => import('@/components/tools/image/ImageToBase64')),
  'base64-to-image': dynamic(() => import('@/components/tools/image/Base64ToImage')),
  'text-truncator': dynamic(() => import('@/components/tools/text/TextTruncator')),
  // Phase 10 - P1 Tools
  'age-calculator': dynamic(() => import('@/components/tools/generators/AgeCalculator')),
  'bmi-calculator': dynamic(() => import('@/components/tools/generators/BmiCalculator')),
  'percentage-calculator': dynamic(() => import('@/components/tools/generators/PercentageCalculator')),
  'barcode-generator': dynamic(() => import('@/components/tools/generators/BarcodeGenerator')),
  'css-box-shadow-generator': dynamic(() => import('@/components/tools/generators/CssBoxShadowGenerator')),
  'hashtag-generator': dynamic(() => import('@/components/tools/text/HashtagGenerator')),
  // Phase 10 - P2 Tools
  'loan-calculator': dynamic(() => import('@/components/tools/generators/LoanCalculator')),
  'css-flexbox-generator': dynamic(() => import('@/components/tools/dev/CssFlexboxGenerator')),
  'json-to-typescript': dynamic(() => import('@/components/tools/dev/JsonToTypescript')),
  'css-grid-generator': dynamic(() => import('@/components/tools/dev/CssGridGenerator')),
  // Phase 11 - 24 New Tools
  'cron-builder': dynamic(() => import('@/components/tools/dev/CronBuilder')),
  'git-command-generator': dynamic(() => import('@/components/tools/dev/GitCommandGenerator')),
  'http-header-parser': dynamic(() => import('@/components/tools/dev/HttpHeaderParser')),
  'sql-to-mongodb': dynamic(() => import('@/components/tools/dev/SqlToMongodb')),
  'api-response-formatter': dynamic(() => import('@/components/tools/dev/ApiResponseFormatter')),
  'robots-txt-generator': dynamic(() => import('@/components/tools/generators/RobotsTxtGenerator')),
  'htaccess-generator': dynamic(() => import('@/components/tools/generators/HtaccessGenerator')),
  'privacy-policy-generator': dynamic(() => import('@/components/tools/generators/PrivacyPolicyGenerator')),
  'terms-of-service-generator': dynamic(() => import('@/components/tools/generators/TermsOfServiceGenerator')),
  'sitemap-generator': dynamic(() => import('@/components/tools/generators/SitemapGenerator')),
  'open-graph-generator': dynamic(() => import('@/components/tools/generators/OpenGraphGenerator')),
  'currency-converter': dynamic(() => import('@/components/tools/generators/CurrencyConverter')),
  'tax-calculator': dynamic(() => import('@/components/tools/generators/TaxCalculator')),
  'tip-calculator': dynamic(() => import('@/components/tools/generators/TipCalculator')),
  'compound-interest-calculator': dynamic(() => import('@/components/tools/generators/CompoundInterestCalculator')),
  'youtube-thumbnail-text': dynamic(() => import('@/components/tools/generators/YouTubeThumbnailText')),
  'readability-checker': dynamic(() => import('@/components/tools/text/ReadabilityChecker')),
  'lorem-ipsum-alternative': dynamic(() => import('@/components/tools/text/LoremIpsumAlternative')),
  'text-to-handwriting': dynamic(() => import('@/components/tools/text/TextToHandwriting')),
  'whitespace-remover': dynamic(() => import('@/components/tools/text/WhitespaceRemover')),
  'duplicate-line-remover': dynamic(() => import('@/components/tools/text/DuplicateLineRemover')),
  'twitter-char-counter': dynamic(() => import('@/components/tools/text/TwitterCharCounter')),
  'instagram-caption-generator': dynamic(() => import('@/components/tools/text/InstagramCaptionGenerator')),
  'stopwatch': dynamic(() => import('@/components/tools/text/Stopwatch')),
}

export async function generateStaticParams() {
  return tools
    .filter((t) => toolComponents[t.slug])
    .map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}

  const t = await getTranslations({ locale, namespace: 'tools' })

  // Attempt to read localized name and description; fall back to tool defaults
  let localizedName: string | undefined
  let localizedDescription: string | undefined
  try {
    const nameKey = `toolNames.${tool.slug}.name` as Parameters<typeof t>[0]
    const descKey = `toolNames.${tool.slug}.description` as Parameters<typeof t>[0]
    const translatedName = t(nameKey)
    const translatedDesc = t(descKey)
    // next-intl returns the key path when a translation is missing; detect that
    if (translatedName && translatedName !== nameKey) localizedName = translatedName
    if (translatedDesc && translatedDesc !== descKey) localizedDescription = translatedDesc
  } catch {
    // Translation not found for this tool slug -- fall back to English defaults
  }

  const localeOpts = {
    locale,
    localizedName,
    localizedDescription,
  }

  const metadata = generateToolMetadata(tool, localeOpts)
  const alternates = generateHreflangAlternates(`/tools/${tool.slug}`, locale)
  return { ...metadata, alternates }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('tools')
  const crossT = await getTranslations('crossLinks')

  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const Component = toolComponents[tool.slug]
  if (!Component) notFound()

  // Resolve localized tool name for JSON-LD and breadcrumb
  let localizedName: string | undefined
  let localizedDescription: string | undefined
  try {
    const nameKey = `toolNames.${tool.slug}.name` as Parameters<typeof t>[0]
    const descKey = `toolNames.${tool.slug}.description` as Parameters<typeof t>[0]
    const translatedName = t(nameKey)
    const translatedDesc = t(descKey)
    if (translatedName && translatedName !== nameKey) localizedName = translatedName
    if (translatedDesc && translatedDesc !== descKey) localizedDescription = translatedDesc
  } catch {
    // Fall back to English defaults
  }

  const localeOpts = {
    locale,
    localizedName,
    localizedDescription,
  }

  const jsonLd = generateToolJsonLd(tool, localeOpts)
  const faqJsonLd = generateToolFaqJsonLd(tool, localeOpts)
  const howToJsonLd = generateToolHowToJsonLd(tool, localeOpts)
  const displayName = localizedName || tool.name

  // Load rich content for top 20 tools
  const richContent = getToolRichContent(tool.slug, locale)

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Breadcrumb
        locale={locale}
        items={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('breadcrumbTools'), href: '/tools' },
          { label: displayName },
        ]}
      />
      <ToolTemplate tool={tool}>
        <Component />
      </ToolTemplate>
      <ToolUseTrackerWrapper slug={tool.slug} />
      {richContent && (
        <ToolContentSection
          howToUseTitle={richContent.sectionTitles.howToUse}
          howToUseSteps={richContent.howToUse}
          whyUseTitle={richContent.sectionTitles.whyUse}
          whyUseReasons={richContent.whyUse}
          tipsTitle={richContent.sectionTitles.tips}
          tips={richContent.tips}
        />
      )}
      {richContent && (
        <ToolFaqSection
          title={richContent.sectionTitles.faq}
          faqs={richContent.faqs}
        />
      )}
      <ShareButtonsWrapper
        path={`/tools/${tool.slug}`}
        title={displayName}
        description={localizedDescription || tool.shortDescription}
      />
      <RelatedTools currentTool={tool} />
      <RelatedBlogPosts toolSlug={tool.slug} title={crossT('relatedBlogPosts')} />
    </>
  )
}
