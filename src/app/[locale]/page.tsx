import Link from 'next/link'
import { Zap, Newspaper, Wrench } from 'lucide-react'
import LazyAdBanner from '@/components/layout/LazyAdBanner'

export const metadata = {
  alternates: {
    canonical: 'https://vaxtimyoxdu.com',
  },
}

export default function HomePage() {
  return (
    <div className="container py-12 md:py-20">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <Zap className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Vaxtım <span className="text-primary">Yoxdu</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Vaxtınız yoxdursa, biz varıq. Qısa xəbərlər və pulsuz onlayn alətlər.
        </p>
      </section>

      {/* Two columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Info Card */}
        <Link
          href="/info"
          className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary transition-all hover:shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Xəbərlər</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Günlük vacib xəbərlərin qısa xülasəsi. İqtisadiyyat, texnologiya, təhsil, idman — hər şeyi bir baxışda.
          </p>
          <div className="flex items-center gap-2 text-primary font-medium">
            <span>Xəbərləri oxu</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        </Link>

        {/* Tools Card */}
        <Link
          href="/tools"
          className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary transition-all hover:shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Alətlər</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Pulsuz AI onlayn alətlər. Mətn yenidən yazma, qrammatika yoxlama, PDF birləşdirmə, şəkil sıxma və daha çox.
          </p>
          <div className="flex items-center gap-2 text-primary font-medium">
            <span>Alətlərə bax</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        </Link>
      </section>

      {/* Ad */}
      <div className="max-w-4xl mx-auto mt-12">
        <LazyAdBanner slot="homepage-mid" format="banner" />
      </div>

      {/* Stats */}
      <section className="mt-16 text-center">
        <div className="grid grid-cols-3 max-w-lg mx-auto gap-8">
          <div>
            <p className="text-3xl font-bold text-primary">45</p>
            <p className="text-sm text-muted-foreground">Pulsuz Alət</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">Qeydiyyat</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground">Əlçatanlıq</p>
          </div>
        </div>
      </section>
    </div>
  )
}
