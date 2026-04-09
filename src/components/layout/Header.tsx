import { Link } from '@/i18n/navigation'
import { Zap } from 'lucide-react'
import HeaderClient from './HeaderClient'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <HeaderClient>
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
          <span>Vaxtim <span className="text-primary">Yoxdu</span></span>
        </Link>
      </HeaderClient>
    </header>
  )
}
