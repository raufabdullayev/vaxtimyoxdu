'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'
import {
  useNewsletterSubscribe,
  isSubscribed,
} from '@/hooks/useNewsletterSubscribe'

type Variant = 'blog' | 'news' | 'tool'

interface NewsletterInlineCTAProps {
  /** Controls headline/description text. 'blog' for blog posts, 'news' for news articles. */
  variant: Variant
}

/**
 * Inline newsletter call-to-action designed to appear at the end of
 * blog posts and news articles. Uses the site's design language and
 * supports all 4 languages via next-intl.
 */
export default function NewsletterInlineCTA({
  variant,
}: NewsletterInlineCTAProps) {
  const t = useTranslations('newsletterCta')
  const locale = useLocale()

  const {
    email,
    setEmail,
    error,
    status,
    handleSubmit,
    isAlreadySubscribed,
  } = useNewsletterSubscribe({
    source: `inline-cta-${variant}`,
    locale,
    translations: {
      errorEmpty: t('errorEmpty'),
      errorInvalid: t('errorInvalid'),
      errorDuplicate: t('errorDuplicate'),
      errorGeneral: t('errorGeneral'),
    },
  })

  // If they subscribed via any other form on the site, show a brief thank-you
  // instead of the form to avoid annoying repeat prompts.
  if (isAlreadySubscribed && typeof window !== 'undefined' && isSubscribed()) {
    return (
      <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">{t('success')}</span>
        </div>
      </div>
    )
  }

  const titleKey = variant === 'blog' ? 'blogTitle' : variant === 'tool' ? 'toolTitle' : 'newsTitle'
  const descKey = variant === 'blog' ? 'blogDescription' : variant === 'tool' ? 'toolDescription' : 'newsDescription'
  const title = t(titleKey)
  const description = t(descKey)

  return (
    <div className="mt-12 rounded-xl border border-border/60 bg-gradient-to-br from-primary/5 via-card to-primary/5 p-6 sm:p-8">
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>
          <p className="text-base font-semibold text-foreground">
            {t('success')}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-5 text-center sm:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-foreground">
                {title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-3 sm:flex-row"
            aria-busy={status === 'loading'}
          >
            <label htmlFor={`cta-${variant}-email`} className="sr-only">
              Email
            </label>
            <input
              id={`cta-${variant}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('placeholder')}
              autoComplete="email"
              disabled={status === 'loading'}
              className="min-w-0 flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              aria-describedby={
                error ? `cta-${variant}-error` : undefined
              }
              aria-invalid={error ? 'true' : undefined}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  {t('sending')}
                </>
              ) : (
                t('subscribe')
              )}
            </button>
          </form>

          {error && (
            <p
              id={`cta-${variant}-error`}
              role="alert"
              className="mt-2 text-xs text-destructive"
            >
              {error}
            </p>
          )}
        </>
      )}
    </div>
  )
}
