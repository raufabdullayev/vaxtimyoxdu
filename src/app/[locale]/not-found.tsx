import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('errors')

  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">{t('notFound')}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {t('notFoundDescription')}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">{t('notFoundHome')}</Link>
        <Link href="/tools" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors">{t('notFoundTools')}</Link>
        <Link href="/info" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors">{t('notFoundNews')}</Link>
      </div>
    </div>
  )
}
