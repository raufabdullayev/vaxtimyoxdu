import Link from 'next/link'
import Newsletter from './Newsletter'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-3">Vaxtım Yoxdu</h3>
            <p className="text-sm text-muted-foreground">
              Qısa xəbərlər və pulsuz onlayn alətlər. Qeydiyyat lazım deyil.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Alətlər</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/ai-text-rewriter" className="hover:text-foreground">AI Text Rewriter</Link></li>
              <li><Link href="/tools/ai-grammar-checker" className="hover:text-foreground">Grammar Checker</Link></li>
              <li><Link href="/tools/image-compress" className="hover:text-foreground">Image Compressor</Link></li>
              <li><Link href="/tools/pdf-merge" className="hover:text-foreground">PDF Merge</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-foreground">JSON Formatter</Link></li>
              <li><Link href="/tools/qr-code-generator" className="hover:text-foreground">QR Code Generator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Bölmələr</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/info" className="hover:text-foreground">Xəbərlər</Link></li>
              <li><Link href="/tools" className="hover:text-foreground">Alətlər</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="/about" className="hover:text-foreground">Haqqımızda</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Hüquqi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Məxfilik Siyasəti</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">İstifadə Şərtləri</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <div className="mx-auto max-w-md">
            <Newsletter />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Vaxtım Yoxdu. Bütün hüquqlar qorunur.
        </div>
      </div>
    </footer>
  )
}
