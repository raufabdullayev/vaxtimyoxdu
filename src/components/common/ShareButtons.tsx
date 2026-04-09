'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import {
  MessageCircle,
  Send,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check,
  Share2,
} from 'lucide-react'

interface ShareButtonsProps {
  /** The full canonical URL of the page to share */
  url: string
  /** The title of the content being shared */
  title: string
  /** A short description for share messages */
  description?: string
  /** Slug identifier for analytics tracking (e.g. tool slug or blog slug) */
  slug?: string
}

interface SharePlatform {
  name: string
  icon: React.ReactNode
  colorClass: string
  hoverBg: string
  getUrl: (url: string, title: string, description: string) => string
  utmMedium: string
}

function buildShareUrl(
  baseUrl: string,
  utmMedium: string,
  campaign: string
): string {
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}utm_source=share&utm_medium=${utmMedium}&utm_campaign=${campaign}`
}

function trackShareClick(platform: string, shareUrl: string, slug?: string) {
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: 'share_click',
      event_data: { platform, toolSlug: slug, url: shareUrl },
    }),
  }).catch(() => {})
}

export default function ShareButtons({
  url,
  title,
  description = '',
  slug,
}: ShareButtonsProps) {
  const t = useTranslations('share')
  const [copied, setCopied] = useState(false)

  const platforms: SharePlatform[] = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="h-4 w-4" />,
      colorClass: 'text-[#25D366]',
      hoverBg: 'hover:bg-[#25D366]/10',
      getUrl: (shareUrl, shareTitle) => {
        const trackedUrl = buildShareUrl(shareUrl, 'whatsapp', 'tool_share')
        return `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${trackedUrl}`)}`
      },
      utmMedium: 'whatsapp',
    },
    {
      name: 'Telegram',
      icon: <Send className="h-4 w-4" />,
      colorClass: 'text-[#0088cc]',
      hoverBg: 'hover:bg-[#0088cc]/10',
      getUrl: (shareUrl, shareTitle) => {
        const trackedUrl = buildShareUrl(shareUrl, 'telegram', 'tool_share')
        return `https://t.me/share/url?url=${encodeURIComponent(trackedUrl)}&text=${encodeURIComponent(shareTitle)}`
      },
      utmMedium: 'telegram',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      colorClass: 'text-foreground',
      hoverBg: 'hover:bg-foreground/10',
      getUrl: (shareUrl, shareTitle) => {
        const trackedUrl = buildShareUrl(shareUrl, 'twitter', 'tool_share')
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(trackedUrl)}&text=${encodeURIComponent(shareTitle)}`
      },
      utmMedium: 'twitter',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      colorClass: 'text-[#1877F2]',
      hoverBg: 'hover:bg-[#1877F2]/10',
      getUrl: (shareUrl) => {
        const trackedUrl = buildShareUrl(shareUrl, 'facebook', 'tool_share')
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trackedUrl)}`
      },
      utmMedium: 'facebook',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      colorClass: 'text-[#0A66C2]',
      hoverBg: 'hover:bg-[#0A66C2]/10',
      getUrl: (shareUrl, shareTitle) => {
        const trackedUrl = buildShareUrl(shareUrl, 'linkedin', 'tool_share')
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackedUrl)}`
      },
      utmMedium: 'linkedin',
    },
  ]

  const handleCopyLink = useCallback(async () => {
    const trackedUrl = buildShareUrl(url, 'copy_link', 'tool_share')
    trackShareClick('copy_link', url, slug)
    try {
      await navigator.clipboard.writeText(trackedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = trackedUrl
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [url, slug])

  return (
    <div className="mt-8 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm font-medium text-muted-foreground">
          {t('title')}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.getUrl(url, title, description)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShareClick(platform.name.toLowerCase(), url, slug)}
            aria-label={t('shareOn', { platform: platform.name })}
            className={`
              inline-flex items-center gap-2 rounded-lg border border-border/50
              bg-card px-3 py-2 text-sm font-medium
              transition-all duration-200 ease-out
              hover:scale-105 hover:shadow-md hover:border-border
              active:scale-95
              ${platform.colorClass} ${platform.hoverBg}
            `}
          >
            {platform.icon}
            <span className="hidden sm:inline">{platform.name}</span>
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? t('copied') : t('copyLink')}
          className={`
            inline-flex items-center gap-2 rounded-lg border border-border/50
            bg-card px-3 py-2 text-sm font-medium
            transition-all duration-200 ease-out
            hover:scale-105 hover:shadow-md hover:border-border
            active:scale-95
            ${copied ? 'text-green-500 border-green-500/30 bg-green-500/5' : 'text-muted-foreground hover:bg-muted/50'}
          `}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span className="hidden sm:inline">{t('copied')}</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('copyLink')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
