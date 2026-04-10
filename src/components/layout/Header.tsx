import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { Zap } from 'lucide-react'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const t = await getTranslations('common')
  const siteName = t('siteName')
  const [first, ...rest] = siteName.split(' ')
  const lastWord = rest.join(' ')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex flex-wrap items-center justify-between h-14 px-4">
        <HeaderClient>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
            <span>{first} <span className="text-primary">{lastWord}</span></span>
          </Link>
        </HeaderClient>
      </div>
    </header>
  )
}
