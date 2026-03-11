'use client'

import { useTranslations } from 'next-intl'

/**
 * A small, subtle branding footer text that appears in tool result areas.
 * When users copy tool results, this text will be included as attribution.
 */
export default function PoweredByBrand() {
  const t = useTranslations('share')

  return (
    <p
      className="mt-3 pt-2 border-t border-border/30 text-[10px] text-muted-foreground/50 text-right select-all"
      aria-hidden="true"
    >
      {t('poweredBy')}
    </p>
  )
}
