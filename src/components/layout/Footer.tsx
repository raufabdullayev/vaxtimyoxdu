'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import dynamic from 'next/dynamic'
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'

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

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('common.nav')

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          <div>
            <h4 className="font-semibold text-sm mb-3">{t('toolsSection')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/ai-text-rewriter" className="hover:text-foreground">AI Text Rewriter</Link></li>
              <li><Link href="/tools/ai-grammar-checker" className="hover:text-foreground">Grammar Checker</Link></li>
              <li><Link href="/tools/image-compress" className="hover:text-foreground">Image Compressor</Link></li>
              <li><Link href="/tools/pdf-merge" className="hover:text-foreground">PDF Merge</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-foreground">JSON Formatter</Link></li>
              <li><Link href="/tools/qr-code-generator" className="hover:text-foreground">QR Code Generator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">{t('sectionsTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/info" className="hover:text-foreground">{nav('news')}</Link></li>
              <li><Link href="/tools" className="hover:text-foreground">{nav('tools')}</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">{nav('blog')}</Link></li>
              <li><Link href="/about" className="hover:text-foreground">{nav('about')}</Link></li>
            </ul>
          </div>
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
