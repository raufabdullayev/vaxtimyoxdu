'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import dynamic from 'next/dynamic'
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'
import { popularToolSlugs } from '@/lib/utils/cross-links'
import { categories } from '@/config/tools'
import type { ToolCategory } from '@/types/tool'

// Newsletter is in the footer (below the fold on every page), so it should
// never block the initial page load. Loading it lazily saves ~3-5 KB from
// the critical bundle and avoids hydrating form state until needed.
const Newsletter = dynamic(() => import('./Newsletter'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[72px]" aria-hidden="true" />
  ),
})

const socialLinks = [
  {
    href: 'https://github.com/vaxtimyoxdu',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://x.com/vaxtimyoxdu',
    label: 'Twitter',
    icon: Twitter,
  },
  {
    href: 'https://instagram.com/vaxtimyoxdu',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://linkedin.com/company/vaxtimyoxdu',
    label: 'LinkedIn',
    icon: Linkedin,
  },
]

/** Top 8 popular tools shown in the footer for internal linking. */
const footerPopularToolSlugs = popularToolSlugs.slice(0, 8)

/** English fallback names (used only when translation is unavailable). */
const toolEnglishNames: Record<string, string> = {
  'ai-text-rewriter': 'AI Text Rewriter',
  'json-formatter': 'JSON Formatter',
  'image-compress': 'Image Compressor',
  'pdf-merge': 'PDF Merge',
  'qr-code-generator': 'QR Code Generator',
  'password-generator': 'Password Generator',
  'color-picker': 'Color Picker',
  'word-counter': 'Word Counter',
  'base64-encode-decode': 'Base64 Encode/Decode',
  'uuid-generator': 'UUID Generator',
}

/** Category keys in display order. */
const categoryOrder: ToolCategory[] = ['ai', 'pdf', 'image', 'dev', 'generators', 'text']

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('common.nav')
  const toolsT = useTranslations('tools')

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-3">Vaxtim Yoxdu</h3>
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">{t('followUs')}</p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Popular tools column */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm mb-3">{t('popularToolsSection')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerPopularToolSlugs.map((slug) => {
                let displayName = toolEnglishNames[slug] || slug
                try {
                  const nameKey = `toolNames.${slug}.name` as Parameters<typeof toolsT>[0]
                  const translated = toolsT(nameKey)
                  if (translated && translated !== nameKey) {
                    displayName = translated
                  }
                } catch {
                  // fallback to English
                }
                return (
                  <li key={slug}>
                    <Link href={`/tools/${slug}`} className="hover:text-foreground transition-colors">
                      {displayName}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Categories column */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm mb-3">{t('categoriesSection')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categoryOrder.map((catKey) => {
                let displayName = categories[catKey]?.name || catKey
                try {
                  const nameKey = `categories.${catKey}` as Parameters<typeof toolsT>[0]
                  const translated = toolsT(nameKey)
                  if (translated && translated !== nameKey) {
                    displayName = translated
                  }
                } catch {
                  // fallback to English
                }
                return (
                  <li key={catKey}>
                    <Link href="/tools" className="hover:text-foreground transition-colors">
                      {displayName}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Sections column */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{t('sectionsTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/info" className="hover:text-foreground">{nav('news')}</Link></li>
              <li><Link href="/tools" className="hover:text-foreground">{nav('tools')}</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">{nav('blog')}</Link></li>
              <li><Link href="/about" className="hover:text-foreground">{nav('about')}</Link></li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{t('legalTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">{nav('privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">{nav('terms')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <div className="mx-auto max-w-md">
            <Newsletter />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Vaxtim Yoxdu. {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
