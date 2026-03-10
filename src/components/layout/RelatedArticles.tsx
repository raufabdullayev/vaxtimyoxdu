import { Link } from '@/i18n/navigation'

interface RelatedItem {
  slug: string
  title: string
  category: string
  date: string
}

interface RelatedArticlesProps {
  items: RelatedItem[]
  title?: string
}

export default function RelatedArticles({ items, title = 'Oxsar xerberler' }: RelatedArticlesProps) {
  if (items.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/info/${item.slug}`}
            className="p-4 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all"
          >
            <span className="text-xs font-medium text-primary">{item.category}</span>
            <p className="font-medium text-sm mt-1">{item.title}</p>
            <time className="text-xs text-muted-foreground mt-2 block">{item.date}</time>
          </Link>
        ))}
      </div>
    </div>
  )
}
