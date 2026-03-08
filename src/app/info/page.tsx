import { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '@/components/layout/AdBanner'

export const metadata: Metadata = {
  title: 'Xeberler - Vaxtim Yoxdu',
  description: 'Gunluk vacib xeberlerin qisa xulasesi. Iqtisadiyyat, texnologiya, tehsil, idman - her sheyi bir baxishda.',
  keywords: 'xeberler, azerbaycan, iqtisadiyyat, texnologiya, tehsil, idman, gunluk xeberler',
  openGraph: {
    title: 'Xeberler - Vaxtim Yoxdu',
    description: 'Gunluk vacib xeberlerin qisa xulasesi. Iqtisadiyyat, texnologiya, tehsil, idman.',
    url: 'https://vaxtimyoxdu.com/info',
    siteName: 'Vaxtim Yoxdu',
    type: 'website',
    locale: 'az_AZ',
    images: [
      {
        url: 'https://vaxtimyoxdu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vaxtim Yoxdu Xeberler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xeberler - Vaxtim Yoxdu',
    description: 'Gunluk vacib xeberlerin qisa xulasesi. Iqtisadiyyat, texnologiya, tehsil, idman.',
    images: ['https://vaxtimyoxdu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://vaxtimyoxdu.com/info',
    languages: {
      'az': 'https://vaxtimyoxdu.com/info',
      'en': 'https://vaxtimyoxdu.com/info',
    },
  },
}

const articles = [
  {
    slug: 'texnologiya-suni-zekanin-yeni-dovru',
    title: 'Süni zəkanın yeni dövrü: 2026-da nələr dəyişir?',
    summary: 'Süni zəka sahəsində 2026-cı ildə baş verən əsas dəyişikliklər və gələcək proqnozlar.',
    category: 'Texnologiya',
    date: '2026-02-28',
  },
  {
    slug: 'iqtisadiyyat-manat-mohkemlenmesi',
    title: 'Manatın möhkəmlənməsi: iqtisadiyyata təsiri necədir?',
    summary: 'Manatın son aylarda möhkəmlənməsinin ölkə iqtisadiyyatına müsbət və mənfi təsirləri.',
    category: 'İqtisadiyyat',
    date: '2026-02-27',
  },
  {
    slug: 'idman-premyer-liqa',
    title: 'Premyer Liqa mövsümü: hansı komanda favoritdir?',
    summary: 'Azərbaycan Premyer Liqasında mövsümün yarısı geridə qaldı. Komandaların hazırkı vəziyyəti.',
    category: 'İdman',
    date: '2026-02-26',
  },
  {
    slug: 'tehsil-yeni-islahatlar',
    title: 'Yeni təhsil islahatları: nələr dəyişəcək?',
    summary: '2026-cı ildə elan olunan təhsil islahatlarının əsas istiqamətləri və gözlənilən nəticələr.',
    category: 'Təhsil',
    date: '2026-02-25',
  },
]

const categoryColors: Record<string, string> = {
  'Texnologiya': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'İqtisadiyyat': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'İdman': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'Təhsil': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
}

export default function InfoPage() {
  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Xəbərlər</h1>
      <p className="text-muted-foreground mb-8">Qısa və dəqiq xəbərlər — vaxtınız yoxdursa, biz varıq.</p>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={article.slug}>
            <Link
              href={`/info/${article.slug}`}
              className="block rounded-xl border bg-card p-6 hover:border-primary transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[article.category] || 'bg-muted text-muted-foreground'}`}>
                  {article.category}
                </span>
                <time className="text-xs text-muted-foreground">{article.date}</time>
              </div>
              <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
              <p className="text-sm text-muted-foreground">{article.summary}</p>
            </Link>
            {index === 1 && <AdBanner slot="info-list-mid" format="in-article" className="my-4" />}
          </div>
        ))}
      </div>
    </div>
  )
}
