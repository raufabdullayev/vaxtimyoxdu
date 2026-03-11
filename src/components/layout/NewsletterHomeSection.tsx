'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Mail, Loader2, CheckCircle2, Sparkles } from 'lucide-react'
import {
  useNewsletterSubscribe,
  isSubscribed,
} from '@/hooks/useNewsletterSubscribe'

/**
 * Prominent newsletter section for the homepage.
 * Features a compelling value proposition with bullet points of what subscribers get.
 */
export default function NewsletterHomeSection() {
  const t = useTranslations('newsletterHome')
  const ft = useTranslations('footer.newsletter')
  const locale = useLocale()

  const { email, setEmail, error, status, handleSubmit } =
    useNewsletterSubscribe({
      source: 'homepage',
      locale,
      translations: {
        errorEmpty: ft('errorEmpty'),
        errorInvalid: ft('errorInvalid'),
        errorDuplicate: ft('errorDuplicate'),
        errorGeneral: ft('errorGeneral'),
      },
    })

  const alreadySubscribed =
    typeof window !== 'undefined' && isSubscribed()

  return (
    <section className="mt-16 mb-4">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card to-primary/10 p-8 sm:p-10">
        {alreadySubscribed || status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <p className="text-xl font-semibold text-foreground">
              {ft('success')}
            </p>
          </div>
        ) : (
          <>
            {/* Heading */}
            <div className="mb-6 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Newsletter</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t('title')}
              </h2>
              <p className="mt-2 text-muted-foreground">{t('description')}</p>
            </div>

            {/* Bullet points */}
            <ul className="mb-6 space-y-2">
              {(['bullet1', 'bullet2', 'bullet3'] as const).map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3 sm:flex-row"
              aria-busy={status === 'loading'}
            >
              <label htmlFor="home-newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="home-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ft('placeholder')}
                autoComplete="email"
                disabled={status === 'loading'}
                className="min-w-0 flex-1 rounded-lg border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                aria-describedby={
                  error ? 'home-newsletter-error' : undefined
                }
                aria-invalid={error ? 'true' : undefined}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    {ft('sending')}
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {ft('subscribe')}
                  </>
                )}
              </button>
            </form>

            {error && (
              <p
                id="home-newsletter-error"
                role="alert"
                className="mt-2 text-center text-xs text-destructive"
              >
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
