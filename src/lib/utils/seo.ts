import { Metadata } from 'next'
import { Tool } from '@/types/tool'

const SITE_URL = 'https://vaxtimyoxdu.com'
const SITE_NAME = 'Vaxtım Yoxdu'

export function generateToolMetadata(tool: Tool): Metadata {
  return {
    title: `${tool.name} - Free Online Tool | ${SITE_NAME}`,
    description: tool.description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: `${tool.name} - ${SITE_NAME}`,
      description: tool.shortDescription,
      url: `${SITE_URL}/tools/${tool.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - ${SITE_NAME}`,
      description: tool.shortDescription,
    },
    alternates: {
      canonical: `${SITE_URL}/tools/${tool.slug}`,
    },
  }
}

export function generateBaseMetadata(): Metadata {
  return {
    title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
    description:
      'Vaxtınız yoxdursa, biz varıq. Günlük xəbər xülasələri, pulsuz AI alətləri, PDF birləşdirici, şəkil sıxma, QR kod yaradıcı və daha çox.',
    keywords:
      'vaxtım yoxdu, xəbərlər, online tools, ai tools, pdf merger, image compressor, qr code generator',
    openGraph: {
      title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
      description: 'Vaxtınız yoxdursa, biz varıq. Qısa xəbərlər və pulsuz alətlər.',
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    metadataBase: new URL(SITE_URL),
  }
}
