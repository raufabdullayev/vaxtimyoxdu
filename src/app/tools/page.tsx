import { Metadata } from 'next'
import { tools, categories } from '@/config/tools'
import ToolCard from '@/components/tools/ToolCard'
import { ToolCategory } from '@/types/tool'

export const metadata: Metadata = {
  title: 'Pulsuz Onlayn Aletler - Vaxtim Yoxdu',
  description: 'Pulsuz AI onlayn aletler. PDF birlesdirici, sekil sixma, metn yeniden yazma, JSON formatter, QR kod yaradici ve daha cox.',
  keywords: 'pulsuz online aletler, ai tools, pdf merger, image compressor, json formatter, qr code generator, online tools',
  openGraph: {
    title: 'Pulsuz Onlayn Aletler - Vaxtim Yoxdu',
    description: 'Pulsuz AI onlayn aletler. PDF birlesdirici, sekil sixma, metn yeniden yazma ve daha cox.',
    url: 'https://vaxtimyoxdu.com/tools',
    siteName: 'Vaxtim Yoxdu',
    type: 'website',
    locale: 'az_AZ',
    images: [
      {
        url: 'https://vaxtimyoxdu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vaxtim Yoxdu - Pulsuz Onlayn Aletler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulsuz Onlayn Aletler - Vaxtim Yoxdu',
    description: 'Pulsuz AI onlayn aletler. PDF birlesdirici, sekil sixma, metn yeniden yazma ve daha cox.',
    images: ['https://vaxtimyoxdu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://vaxtimyoxdu.com/tools',
    languages: {
      'az': 'https://vaxtimyoxdu.com/tools',
      'en': 'https://vaxtimyoxdu.com/tools',
    },
  },
}

export default function ToolsPage() {
  const groupedTools = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = []
      acc[tool.category].push(tool)
      return acc
    },
    {} as Record<string, typeof tools>
  )

  return (
    <div className="container py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Pulsuz Onlayn Alətlər
          <span className="text-primary"> AI ilə</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          PDF birləşdirici, şəkil alətləri, mətn yenidən yazma, JSON formatter və daha çox.
          Qeydiyyat lazım deyil. Sürətli, pulsuz və təhlükəsiz.
        </p>
      </section>

      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-2">
            {categories[category as ToolCategory]?.name || category}
          </h2>
          <p className="text-muted-foreground mb-4">
            {categories[category as ToolCategory]?.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
