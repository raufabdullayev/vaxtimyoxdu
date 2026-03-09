import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Haqqımızda - Vaxtım Yoxdu',
  description: 'Vaxtım Yoxdu haqqında - Pulsuz AI onlayn alətlər platforması.',
  alternates: {
    canonical: 'https://vaxtimyoxdu.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Haqqimizda</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p className="text-lg font-medium text-foreground italic">
          &quot;Vaxtiniz yoxdursa, biz variq&quot;
        </p>
        <p>
          Vaxtim Yoxdu - Azerbaycan dilinde qisa xeber xulaseleri ve pulsuz onlayn aletler
          platformasidir. Meqsedimiz sizin vaxtiniza qenaet etmekdir: muhum xeberleri qisa ve
          aydin sekilde catdirmaq, eyni zamanda gundelik islerinizi asanlasdiracaq pulsuz aletler
          teklif etmek.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8">Missiyamiz</h2>
        <p>
          Biz inaniriq ki, keyfiyyetli melumat ve faydali aletler her kes ucun pulsuz ve asanliqla
          erisile bilen olmalidir. Qeydiyyat teleb olunmur, gizli odenisler yoxdur. Sadece ise
          yarayan guclu aletler ve vaxtiniza qenaet eden xeber xulaseleri.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8">Mexfilik</h2>
        <p>
          Aletlerimizin coxu birbase brauzerinizdede isleyir - melumatlariniz cihazinizdan cixmir.
          AI ile isleyen aletler ucun melumatlariniz tehlukesiz emala olunur ve hec vaxt saxlanmir.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8">Elaqe</h2>
        <p>
          Fikir ve teklileriniz var? Bize yazmaqdan cekinmeyin:{' '}
          <a href="mailto:hello@vaxtimyoxdu.com" className="text-primary hover:underline">
            hello@vaxtimyoxdu.com
          </a>
        </p>
      </div>
    </div>
  )
}
