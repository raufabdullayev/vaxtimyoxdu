'use client'

import { useLocale } from 'next-intl'

const trustText: Record<string, string> = {
  az: 'Azərbaycanda hazırlanıb',
  en: 'Made in Azerbaijan',
  tr: "Azerbaycan'da yapıldı",
  ru: 'Сделано в Азербайджане',
}

export default function TrustBadge() {
  const locale = useLocale()
  const text = trustText[locale] || trustText.az

  return (
    <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
      <span aria-hidden="true">&#127462;&#127487;</span>
      <span>{text}</span>
    </div>
  )
}
