'use client'

import { useState, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { Share2, Check } from 'lucide-react'

const timeSavedEstimates: Record<string, number> = {
  'pdf-merge': 120,
  'pdf-split': 90,
  'pdf-compress': 60,
  'image-compress': 60,
  'image-convert': 45,
  'image-resize': 45,
  'image-crop': 30,
  'qr-code-generator': 30,
  'json-formatter': 20,
  'base64-encode-decode': 15,
  'hash-generator': 20,
  'password-generator': 15,
  'uuid-generator': 10,
  'color-picker': 20,
  'word-counter': 15,
  'case-converter': 10,
  'slug-generator': 10,
  'text-diff': 30,
  'regex-tester': 30,
  'csv-to-json': 30,
  'json-to-csv': 30,
  'markdown-preview': 20,
  'invoice-generator': 180,
  'favicon-generator': 60,
  'svg-to-png': 30,
  'barcode-generator': 30,
  'loan-calculator': 60,
  'currency-converter': 20,
}

const DEFAULT_SECONDS = 30

const labels: Record<string, { saved: string; share: string; copied: string; shareText: string }> = {
  az: {
    saved: '~{seconds} saniyə qənaət etdiniz!',
    share: 'Paylaş',
    copied: 'Kopyalandı!',
    shareText: 'vaxtimyoxdu.com ilə {seconds} saniyə qənaət etdim!',
  },
  en: {
    saved: '~{seconds} seconds saved!',
    share: 'Share',
    copied: 'Copied!',
    shareText: 'I saved {seconds} seconds with vaxtimyoxdu.com!',
  },
  tr: {
    saved: '~{seconds} saniye tasarruf ettiniz!',
    share: 'Paylaş',
    copied: 'Kopyalandı!',
    shareText: 'vaxtimyoxdu.com ile {seconds} saniye tasarruf ettim!',
  },
  ru: {
    saved: '~{seconds} секунд сэкономлено!',
    share: 'Поделиться',
    copied: 'Скопировано!',
    shareText: 'Я сэкономил(а) {seconds} секунд с vaxtimyoxdu.com!',
  },
}

interface TimeSavedProps {
  toolSlug: string
  visible?: boolean
}

export default function TimeSaved({ toolSlug, visible = false }: TimeSavedProps) {
  const locale = useLocale()
  const [copied, setCopied] = useState(false)
  const seconds = timeSavedEstimates[toolSlug] || DEFAULT_SECONDS
  const l = labels[locale] || labels.az

  const handleShare = useCallback(async () => {
    const text = l.shareText.replace('{seconds}', String(seconds))
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [l.shareText, seconds])

  if (!visible) return null

  return (
    <div className="mt-4 flex items-center justify-between rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3 text-sm">
      <span className="font-medium text-green-700 dark:text-green-400">
        &#9889; {l.saved.replace('{seconds}', String(seconds))}
      </span>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 active:bg-green-800"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            {l.copied}
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" />
            {l.share}
          </>
        )}
      </button>
    </div>
  )
}
