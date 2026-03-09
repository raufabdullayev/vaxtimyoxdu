import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">Sehife tapilmadi</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Axtardiginiz sehife movcud deyil ve ya kocurulub.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">Ana Sehife</Link>
        <Link href="/tools" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors">Aletler</Link>
        <Link href="/info" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors">Xeberler</Link>
      </div>
    </div>
  )
}
