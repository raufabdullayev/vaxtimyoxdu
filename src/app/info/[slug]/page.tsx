import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { generateArticleMetadata, generateNewsArticleJsonLd } from '@/lib/utils/seo'

const articles: Record<string, { title: string; date: string; category: string; content: string }> = {
  'texnologiya-suni-zekanin-yeni-dovru': {
    title: 'Süni zəkanın yeni dövrü: 2026-da nələr dəyişir?',
    date: '2026-02-28',
    category: 'Texnologiya',
    content: `Süni zəka texnologiyaları 2026-cı ildə yeni mərhələyə qədəm qoyub. Böyük dil modelləri artıq sadəcə mətn yaratmaqla kifayətlənmir — kod yazır, təhlil aparır, qərarlar qəbul edir.

## Əsas tendensiyalar

- **Multimodal modellər** — şəkil, video və səsi eyni anda emal edən sistemlər geniş yayılıb
- **Agent əsaslı AI** — süni zəka artıq müstəqil tapşırıqlar yerinə yetirir
- **Yerli modellər** — kiçik, sürətli modellər fərdi cihazlarda işləyir

## Azərbaycanda vəziyyət

Yerli şirkətlər süni zəkanı müştəri xidmətlərində, maliyyə təhlilində və təhsildə tətbiq etməyə başlayıb. Dövlət qurumları da rəqəmsallaşma prosesində AI-dan istifadəni artırır.

Mütəxəssislər proqnozlaşdırır ki, 2027-ci ilə qədər Azərbaycanda hər 3 şirkətdən biri süni zəka həllərindən istifadə edəcək.`,
  },
  'iqtisadiyyat-manat-mohkemlenmesi': {
    title: 'Manatın möhkəmlənməsi: iqtisadiyyata təsiri necədir?',
    date: '2026-02-27',
    category: 'İqtisadiyyat',
    content: `Son aylarda Azərbaycan manatının xarici valyutalara qarşı mövqeyi möhkəmlənib. Bu tendensiya həm müsbət, həm də mənfi nəticələr doğurur.

## Müsbət təsirlər

- **İdxal ucuzlaşır** — xaricdən gətirilən malların qiyməti aşağı düşür
- **İnflyasiya azalır** — ərzaq məhsullarının qiymətləri stabilləşir
- **İstehlakçı güvəni artır** — vətəndaşlar daha çox xərcləyir

## Mənfi təsirlər

- **İxrac çətinləşir** — yerli məhsullar xarici bazarda bahalı olur
- **Turizm gəlirləri azala bilər** — ölkə turistlər üçün nisbətən bahalı olur

Mərkəzi Bank açıqlamasında bildirib ki, monetar siyasət dəyişikliklər üçün hazırdır və bazar sabitliyi prioritet olaraq qalır.`,
  },
  'idman-premyer-liqa': {
    title: 'Premyer Liqa mövsümü: hansı komanda favoritdir?',
    date: '2026-02-26',
    category: 'İdman',
    content: `Azərbaycan Premyer Liqasında mövsümün ikinci yarısı başlayıb. Turnir cədvəlində maraqlı rəqabət davam edir.

## Cədvəlin başında

Liderlər arasında fərq minimaldır. İlk üç komanda arasında cəmi 4 xal fərq var.

## Diqqətə çarpan statistikalar

- **Ən çox qol vuran komanda** — mövsüm boyu 38 qol
- **Ən az qol buraxan müdafiə** — cəmi 12 qol buraxıb
- **Ən yaxşı bombardir** — 14 qolla lider

## Mövsümün sürprizləri

Bu mövsüm bir neçə gənc futbolçu özünü göstərib. Yerli akademiyalardan yetişən oyunçuların sayı artıb ki, bu da Azərbaycan futbolunun gələcəyi üçün ümidvericidir.

Mütəxəssislər hesab edir ki, mövsümün sonuna qədər çempionluq mübarizəsi davam edəcək.`,
  },
  'tehsil-yeni-islahatlar': {
    title: 'Yeni təhsil islahatları: nələr dəyişəcək?',
    date: '2026-02-25',
    category: 'Təhsil',
    content: `Təhsil Nazirliyi 2026-cı il üçün yeni islahat paketini açıqlayıb. Dəyişikliklər həm orta, həm də ali təhsil səviyyəsini əhatə edir.

## Əsas dəyişikliklər

- **Rəqəmsal təhsil platforması** — bütün məktəblər vahid onlayn sistemə qoşulacaq
- **STEM fənlərinə diqqət** — riyaziyyat və texnologiya fənləri üzrə yeni kurikulumlar
- **Müəllim hazırlığı** — pedaqoji kadrların ixtisasartırma proqramları genişlənir
- **Xarici dil tədrisi** — ikinci xarici dil məktəblərdə məcburi olacaq

## Ali təhsildə dəyişikliklər

Universitetlərdə beynəlxalq akkreditasiya prosesi sürətləndiriləcək. Bundan əlavə, tələbə mübadiləsi proqramları genişləndiriləcək.

Təhsil naziri bildirib ki, islahatların tam tətbiqi 2028-ci ilədək başa çatacaq. Ekspertlər hesab edir ki, bu dəyişikliklər Azərbaycanın təhsil sistemini regional liderlərlə eyni səviyyəyə gətirə bilər.`,
  },
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug]
  if (!article) return {}

  const description = article.content.slice(0, 160).replace(/[#\n*-]/g, '').trim()

  return generateArticleMetadata({
    title: article.title,
    description,
    slug: params.slug,
    date: article.date,
    category: article.category,
  })
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]
  if (!article) notFound()

  const description = article.content.slice(0, 160).replace(/[#\n*-]/g, '').trim()

  const jsonLd = generateNewsArticleJsonLd({
    title: article.title,
    description,
    slug: params.slug,
    date: article.date,
    category: article.category,
  })

  return (
    <div className="container py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/info" className="text-sm text-primary hover:underline mb-4 inline-block">&larr; Xəbərlərə qayıt</Link>
      <div className="flex items-center gap-3 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {article.category}
        </span>
        <time className="text-sm text-muted-foreground">{article.date}</time>
      </div>
      <h1 className="text-3xl font-bold mt-2 mb-8">{article.title}</h1>
      <div className="prose prose-sm max-w-none">
        {article.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={i} className="text-xl font-semibold mt-8 mb-3 text-foreground">
                {paragraph.replace('## ', '')}
              </h2>
            )
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={i} className="list-disc pl-6 space-y-1 text-muted-foreground">
                {paragraph.split('\n').map((item, j) => (
                  <li key={j}>{item.replace(/^- \*\*(.+?)\*\*/, '$1').replace('- ', '')}</li>
                ))}
              </ul>
            )
          }
          return (
            <p key={i} className="text-muted-foreground mb-4">{paragraph}</p>
          )
        })}
      </div>
    </div>
  )
}
