'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function PdfCompress() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.pdfTools')
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultBlobRef = useRef<Blob | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (selected.type !== 'application/pdf') {
      setError(t('onlyPdfAllowed'))
      return
    }
    if (selected.size > 50 * 1024 * 1024) {
      setError(t('fileTooLarge'))
      return
    }

    setError('')
    setDone(false)
    setFile(selected)
    setOriginalSize(selected.size)
    setCompressedSize(0)
  }

  const compress = async () => {
    if (!file) {
      setError(t('pleaseSelectPdf'))
      return
    }

    setProcessing(true)
    setError('')
    setDone(false)

    try {
      const { PDFDocument } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(bytes)

      // Create new PDF, copy pages (strips unused objects)
      const newPdf = await PDFDocument.create()
      const indices = sourcePdf.getPageIndices()
      const copiedPages = await newPdf.copyPages(sourcePdf, indices)
      copiedPages.forEach((page) => newPdf.addPage(page))

      // Remove metadata to reduce size
      newPdf.setTitle('')
      newPdf.setAuthor('')
      newPdf.setSubject('')
      newPdf.setKeywords([])
      newPdf.setProducer('')
      newPdf.setCreator('')

      const resultBytes = await newPdf.save()
      const blob = new Blob([new Uint8Array(resultBytes) as BlobPart], {
        type: 'application/pdf',
      })

      resultBlobRef.current = blob
      setCompressedSize(blob.size)
      setDone(true)
    } catch {
      setError(t('failedCompress'))
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!resultBlobRef.current || !file) return
    const url = URL.createObjectURL(resultBlobRef.current)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed-${file.name}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const savings =
    originalSize && compressedSize
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('selectPdf')}</label>
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click() } }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          {file ? (
            <p className="text-sm">
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground ml-2">({formatSize(originalSize)})</span>
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">{t('clickToSelectPdf')}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('maxFileSize')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">{t('howItWorks')}</p>
        <ul className="list-disc list-inside space-y-1">
          <li>{t('howItWorks1')}</li>
          <li>{t('howItWorks2')}</li>
          <li>{t('howItWorks3')}</li>
        </ul>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <button
        onClick={compress}
        disabled={!file || processing}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {processing ? t('compressing') : tc('compressPdf')}
      </button>

      {done && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t('original')}</p>
              <p className="font-medium text-sm">{formatSize(originalSize)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t('compressed')}</p>
              <p className="font-medium text-sm">{formatSize(compressedSize)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t('saved')}</p>
              <p className={`font-medium text-sm ${savings > 0 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                {savings > 0 ? `${savings}%` : t('noReduction')}
              </p>
            </div>
          </div>

          <button
            onClick={download}
            className="w-full sm:w-auto px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            {t('downloadCompressed')}
          </button>

          {savings <= 0 && (
            <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 text-sm">
              {t('alreadyOptimized')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
