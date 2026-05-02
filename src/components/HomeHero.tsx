import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowRight, Wrench, Languages, Sparkles, Newspaper, Check } from 'lucide-react'

export default function HomeHero() {
  const t = useTranslations('hero')

  const stats = [
    {
      value: '111+',
      label: t('statTools'),
      icon: Wrench,
    },
    {
      value: '4',
      label: t('statLanguages'),
      icon: Languages,
    },
    {
      value: '0₼',
      label: t('statCost'),
      icon: Sparkles,
    },
  ]

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-20 lg:py-24"
    >
      <div className="grid items-center gap-10 md:grid-cols-5 md:gap-16">
        {/* ---------------- Left column (60%) ---------------- */}
        <div className="md:col-span-3">
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-6xl"
          >
            <span className="text-amber-500 dark:text-amber-400">
              {t('headlineAccent')}
            </span>{' '}
            {t('headlineRest')}
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-xl">
            {t('subhead')}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="group inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(230,138,0,0.55)] transition hover:bg-amber-600 hover:shadow-[0_10px_30px_-6px_rgba(230,138,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 active:translate-y-px dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300 dark:focus-visible:ring-offset-neutral-950"
            >
              {t('ctaPrimary')}
              <ArrowRight
                aria-hidden="true"
                className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.25}
              />
            </Link>

            <Link
              href="/info"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-transparent px-6 py-3.5 text-base font-semibold text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 active:translate-y-px dark:border-neutral-800 dark:text-neutral-50 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:focus-visible:ring-offset-neutral-950"
            >
              <Newspaper aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Trust strip */}
          <ul
            aria-label={t('trustLabel')}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400"
          >
            {[t('trustNoSignup'), t('trustLanguages'), t('trustFree')].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400"
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------- Right column (40%) ---------------- */}
        <aside aria-label={t('statsLabel')} className="md:col-span-2">
          <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 p-2 shadow-lg dark:border-neutral-800 dark:from-amber-500/10 dark:via-neutral-900 dark:to-amber-500/5">
            <div className="rounded-lg bg-white/70 backdrop-blur-sm dark:bg-neutral-900/70">
              <dl className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 px-6 py-6 transition-colors hover:bg-amber-500/5"
                  >
                    <div>
                      <dt className="sr-only">{label}</dt>
                      <dd>
                        <span className="block font-sans text-4xl font-bold leading-none tracking-[-0.035em] tabular-nums text-neutral-900 dark:text-neutral-50 sm:text-[44px]">
                          {value.includes('+') ? (
                            <>
                              {value.replace('+', '')}
                              <span className="text-amber-500 dark:text-amber-400">+</span>
                            </>
                          ) : value.startsWith('0') ? (
                            <span className="text-amber-500 dark:text-amber-400">{value}</span>
                          ) : (
                            value
                          )}
                        </span>
                        <span className="mt-2 block text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {label}
                        </span>
                      </dd>
                    </div>
                    <div
                      aria-hidden="true"
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
