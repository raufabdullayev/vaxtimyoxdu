import { Tool } from '@/types/tool'
import { Locale } from '@/i18n/config'
import { getToolFaqs, getToolRichContent } from '@/lib/utils/tool-content-loader'
import { SITE_URL, SITE_NAME, getLocalizedUrl } from './url'
import { getOgImageUrl } from './og'

/**
 * Map tool category to a schema.org applicationCategory value.
 * https://schema.org/SoftwareApplication lists suggested values.
 */
function getApplicationCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    ai: 'UtilitiesApplication',
    pdf: 'UtilitiesApplication',
    image: 'MultimediaApplication',
    dev: 'DeveloperApplication',
    generators: 'UtilitiesApplication',
    text: 'UtilitiesApplication',
  }
  return categoryMap[category] || 'UtilitiesApplication'
}

export function generateToolJsonLd(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
) {
  const locale = options?.locale || 'en'
  const name = options?.localizedName || tool.name
  const description = options?.localizedDescription || tool.description
  const url = getLocalizedUrl(`/tools/${tool.slug}`, locale as Locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: getApplicationCategory(tool.category),
    operatingSystem: 'Web Browser',
    inLanguage: locale,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  }
}

/**
 * Generate HowTo JSON-LD schema for a tool page.
 * Provides a generic 3-step "how to use" guide for every tool.
 */
export function generateToolHowToJsonLd(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
) {
  const locale = options?.locale || 'en'
  const name = options?.localizedName || tool.name
  const url = getLocalizedUrl(`/tools/${tool.slug}`, locale as Locale)

  // Try to use rich content steps from content files (top 20 tools)
  const richContent = getToolRichContent(tool.slug, locale)
  if (richContent && richContent.howToUse.length > 0) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `${richContent.sectionTitles.howToUse} - ${name}`,
      description: richContent.howToUse[0],
      totalTime: 'PT2M',
      tool: {
        '@type': 'HowToTool',
        name: 'Web Browser',
      },
      step: richContent.howToUse.map((stepText, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: `Step ${index + 1}`,
        text: stepText,
        url: url,
      })),
    }
  }

  // Fallback: generic steps based on tool type
  let step1Text: string
  let step2Text: string
  let step3Text: string

  if (tool.category === 'pdf') {
    step1Text = `Open the ${name} tool and upload your PDF file(s) by clicking the upload area or dragging and dropping.`
    step2Text = `Configure the settings as needed (page ranges, quality, output options) and click the process button.`
    step3Text = `Download the resulting PDF file to your device. All processing happens in your browser -- your files are never uploaded to a server.`
  } else if (tool.category === 'image') {
    step1Text = `Open the ${name} tool and upload your image by clicking the upload area or dragging and dropping. Supports JPEG, PNG, and WebP formats.`
    step2Text = `Adjust the settings (dimensions, quality, format) to match your needs and apply the changes.`
    step3Text = `Preview the result and download the processed image. All processing is done client-side in your browser.`
  } else if (tool.isAI) {
    step1Text = `Open the ${name} tool and enter or paste your text into the input area.`
    step2Text = `Select the desired options (tone, length, style) and click the process button to let the AI analyze your text.`
    step3Text = `Review the AI-generated result and copy it to your clipboard or make further adjustments as needed.`
  } else {
    step1Text = `Open the ${name} tool and enter or paste your input data into the provided field.`
    step2Text = `Configure any available options or settings, then click the process or convert button.`
    step3Text = `Copy the result to your clipboard or download the output. The tool processes everything instantly in your browser.`
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${name}`,
    description: `Step-by-step guide on how to use the free online ${name} tool.`,
    totalTime: 'PT1M',
    tool: {
      '@type': 'HowToTool',
      name: 'Web Browser',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Open the tool and provide input',
        text: step1Text,
        url: url,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Configure settings and process',
        text: step2Text,
        url: url,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get your result',
        text: step3Text,
        url: url,
      },
    ],
  }
}

export function generateToolFaqJsonLd(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
) {
  const locale = options?.locale || 'en'

  // Try to use rich FAQs from content files first (top 20 tools)
  const richFaqs = getToolFaqs(tool.slug, locale)
  const faqs = richFaqs || generateToolFaqs(tool, options)

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

function generateToolFaqs(
  tool: Tool,
  options?: { locale?: string; localizedName?: string; localizedDescription?: string }
): { question: string; answer: string }[] {
  const name = options?.localizedName || tool.name
  const description = options?.localizedDescription || tool.description
  const shortDesc = options?.localizedDescription || tool.shortDescription
  const faqs: { question: string; answer: string }[] = []

  // FAQ 1: What is this tool and what does it do?
  faqs.push({
    question: `What is ${name} and what does it do?`,
    answer: `${name} is a free online tool that lets you ${shortDesc.toLowerCase()}. ${description}`,
  })

  // FAQ 2: Privacy/processing question based on tool type
  if (tool.isClientSide) {
    faqs.push({
      question: `Is ${name} safe to use? Are my files uploaded to a server?`,
      answer: `Yes, ${name} is completely safe to use. This tool processes everything directly in your browser using client-side technology. Your data never leaves your device -- nothing is uploaded to any server. This ensures complete privacy and security for all your files and data.`,
    })
  } else if (tool.isAI) {
    faqs.push({
      question: `How does the AI in ${name} work?`,
      answer: `${name} uses advanced AI language models to ${shortDesc.toLowerCase()}. The AI analyzes your input text, understands context and meaning, and generates high-quality results. The tool is free to use with no account required.`,
    })
  } else {
    faqs.push({
      question: `Is ${name} free to use?`,
      answer: `Yes, ${name} is completely free to use with no hidden fees, no account required, and no usage limits. Simply open the tool and start working immediately.`,
    })
  }

  // FAQ 3: Practical usage question based on category and keywords
  const categoryQuestions: Record<string, { question: string; answer: string }> = {
    ai: {
      question: `Do I need to create an account to use ${name}?`,
      answer: `No, you do not need to create an account or sign up to use ${name}. The tool is available immediately -- just open the page and start using it. There are no word limits, no daily caps, and no hidden restrictions.`,
    },
    pdf: {
      question: `What file formats does ${name} support?`,
      answer: `${name} supports standard PDF files. You can work with PDFs of any size directly in your browser. The tool handles multi-page documents and preserves the quality of your original files throughout the process.`,
    },
    image: {
      question: `What image formats does ${name} support?`,
      answer: `${name} supports all major image formats including JPEG, PNG, and WebP. You can process images of any size directly in your browser without installing any software. The tool maintains optimal quality while performing the requested operation.`,
    },
    dev: {
      question: `Can I use ${name} on any device or browser?`,
      answer: `Yes, ${name} works on any modern web browser including Chrome, Firefox, Safari, and Edge on desktop, tablet, and mobile devices. No installation or plugins are required -- it runs entirely in your browser.`,
    },
    generators: {
      question: `Can I customize the output of ${name}?`,
      answer: `Yes, ${name} offers various customization options to tailor the output to your specific needs. You can adjust settings and parameters to get exactly the result you want. All processing happens in your browser for instant results.`,
    },
    text: {
      question: `Can I use ${name} for large documents?`,
      answer: `Yes, ${name} handles text of any length. Whether you are working with a short paragraph or a lengthy document, the tool processes your text instantly in your browser with no size limitations.`,
    },
  }

  const categoryFaq = categoryQuestions[tool.category]
  if (categoryFaq) {
    faqs.push(categoryFaq)
  }

  return faqs
}

export function generateNewsArticleJsonLd({
  title,
  description,
  slug,
  date,
  category,
  locale = 'az',
}: {
  title: string
  description: string
  slug: string
  date: string
  category: string
  locale?: string
}) {
  const url = getLocalizedUrl(`/info/${slug}`, locale as Locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    url,
    datePublished: date,
    dateModified: date,
    articleSection: category,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: getOgImageUrl({
      title,
      subtitle: description.slice(0, 80),
      type: 'news',
    }),
  }
}

export function generateBlogArticleJsonLd({
  title,
  description,
  slug,
  date,
  locale = 'en',
}: {
  title: string
  description: string
  slug: string
  date: string
  locale?: string
}) {
  const url = getLocalizedUrl(`/blog/${slug}`, locale as Locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: date,
    dateModified: date,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: getOgImageUrl({
      title,
      subtitle: description.slice(0, 80),
      type: 'blog',
    }),
  }
}
