'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Mail, Loader2 } from 'lucide-react'
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe'

export default function Newsletter() {
  const t = useTranslations('footer.newsletter')
  const locale = useLocale()

  const { email, setEmail, error, status, handleSubmit } =
    useNewsletterSubscribe({
      source: 'footer',
      locale,
      translations: {
        errorEmpty: t('errorEmpty'),
        errorInvalid: t('errorInvalid'),
        errorDuplicate: t('errorDuplicate'),
        errorGeneral: t('errorGeneral'),
      },
    })

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm text-primary">
        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{t('success')}</span>
      </div>
    )
  }

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Mail className="h-4 w-4" aria-hidden="true" />
        {t('title')}
      </h4>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex gap-2"
        aria-busy={status === 'loading'}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          {t('emailLabel')}
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          autoComplete="email"
          disabled={status === 'loading'}
          className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          aria-describedby={error ? 'newsletter-error' : undefined}
          aria-invalid={error ? 'true' : undefined}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {status === 'loading' && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          {status === 'loading' ? t('sending') : t('subscribe')}
        </button>
      </form>
      {error && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  )
}
