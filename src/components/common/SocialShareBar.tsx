'use client'

import { useState, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
  MessageCircle,
  Send,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check,
} from 'lucide-react'

interface SocialShareBarProps {
  path: string
  title: string
  description?: string
}

function buildShareUrl(
  baseUrl: string,
  utmMedium: string,
  campaign: string
): string {
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}utm_source=share&utm_medium=${utmMedium}&utm_campaign=${campaign}`
}

export default function SocialShareBar({
  path,
  title,
  description = '',
}: SocialShareBarProps) {
  const t = useTranslations('share')
  const locale = useLocale()
  const [copied, setCopied] = useState(false)

  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://vaxtimyoxdu.com'
  const localePath = locale === 'az' ? '' : `/${locale}`
  const fullUrl = `${base}${localePath}${path}`

  const getShareMessage = (trackedUrl: string) =>
    t('shareMessage', { title, url: trackedUrl })

  const platforms = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      color: 'hover:text-foreground hover:bg-foreground/10',
      getUrl: () => {
        const trackedUrl = buildShareUrl(fullUrl, 'twitter', 'article_share')
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage(trackedUrl))}`
      },
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10',
      getUrl: () => {
        const trackedUrl = buildShareUrl(fullUrl, 'facebook', 'article_share')
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trackedUrl)}`
      },
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10',
      getUrl: () => {
        const trackedUrl = buildShareUrl(fullUrl, 'linkedin', 'article_share')
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackedUrl)}`
      },
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="h-4 w-4" />,
      color: 'hover:text-[#25D366] hover:bg-[#25D366]/10',
      getUrl: () => {
        const trackedUrl = buildShareUrl(fullUrl, 'whatsapp', 'article_share')
        return `https://wa.me/?text=${encodeURIComponent(getShareMessage(trackedUrl))}`
      },
    },
    {
      name: 'Telegram',
      icon: <Send className="h-4 w-4" />,
      color: 'hover:text-[#0088cc] hover:bg-[#0088cc]/10',
      getUrl: () => {
        const trackedUrl = buildShareUrl(fullUrl, 'telegram', 'article_share')
        return `https://t.me/share/url?url=${encodeURIComponent(trackedUrl)}&text=${encodeURIComponent(getShareMessage(trackedUrl))}`
      },
    },
  ]

  const handleCopy = useCallback(async () => {
    const trackedUrl = buildShareUrl(fullUrl, 'copy_link', 'article_share')
    try {
      await navigator.clipboard.writeText(trackedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
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
  }, [fullUrl])

  return (
    <div className="hidden lg:flex fixed left-[max(1rem,calc((100vw-48rem)/2-4rem))] top-1/3 z-40 flex-col gap-2">
      {platforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.getUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('shareOn', { platform: platform.name })}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full
            border border-border/50 bg-card text-muted-foreground
            transition-all duration-200
            hover:scale-110 hover:shadow-md hover:border-border
            ${platform.color}
          `}
        >
          {platform.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? t('copied') : t('copyLink')}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full
          border border-border/50 bg-card
          transition-all duration-200
          hover:scale-110 hover:shadow-md hover:border-border
          ${copied ? 'text-green-500 border-green-500/30 bg-green-500/5' : 'text-muted-foreground hover:bg-muted/50'}
        `}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
