'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function PdfSplit() {
  const t = useTranslations('toolUI.pdfTools')
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [pageRange, setPageRange] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultBlobRef = useRef<Blob | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      const { PDFDocument } = await import('pdf-lib')
      const bytes = await selected.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const count = pdf.getPageCount()
      setPageCount(count)
      setPageRange(`1-${count}`)
    } catch {
      setError(t('failedReadPdf'))
      setFile(null)
      setPageCount(0)
    }
  }

  const parsePageRange = (input: string, total: number): number[] => {
    const pages = new Set<number>()
    const parts = input.split(',').map((s) => s.trim()).filter(Boolean)

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim())
        const start = parseInt(startStr, 10)
        const end = parseInt(endStr, 10)
        if (isNaN(start) || isNaN(end) || start < 1 || end > total || start > end) {
          throw new Error(t('pageRangeInvalid', { range: part, total }))
        }
        for (let i = start; i <= end; i++) {
          pages.add(i - 1)
        }
      } else {
        const num = parseInt(part, 10)
        if (isNaN(num) || num < 1 || num > total) {
          throw new Error(t('pageNumberInvalid', { page: part, total }))
        }
        pages.add(num - 1)
      }
    }

    return Array.from(pages).sort((a, b) => a - b)
  }

  const split = async () => {
    if (!file) {
      setError(t('pleaseSelectPdf'))
      return
    }
    if (!pageRange.trim()) {
      setError(t('enterPageRange'))
      return
    }

    setProcessing(true)
    setError('')
    setDone(false)

    try {
      const indices = parsePageRange(pageRange, pageCount)
      if (indices.length === 0) {
        setError(t('noValidPages'))
        setProcessing(false)
        return
      }

      const { PDFDocument } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(bytes)
      const newPdf = await PDFDocument.create()

      const copiedPages = await newPdf.copyPages(sourcePdf, indices)
      copiedPages.forEach((page) => newPdf.addPage(page))

      const resultBytes = await newPdf.save()
      resultBlobRef.current = new Blob([new Uint8Array(resultBytes) as BlobPart], {
        type: 'application/pdf',
      })
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : t('failedSplit'))
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!resultBlobRef.current || !file) return
    const url = URL.createObjectURL(resultBlobRef.current)
    const a = document.createElement('a')
    a.href = url
    a.download = `split-${file.name}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

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
              <span className="text-muted-foreground ml-2">
                ({formatSize(file.size)} &middot; {t('pagesCount', { count: pageCount })})
              </span>
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">{t('clickToSelectPdf')}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('maxFileSize')}</p>
            </div>
          )}
        </div>
      </div>

      {file && pageCount > 0 && (
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('pageRangeLabel', { total: pageCount })}
          </label>
          <input
            type="text"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('pageRangePlaceholder')}
            value={pageRange}
            onChange={(e) => {
              setPageRange(e.target.value)
              setDone(false)
            }}
            aria-label={t('pageRangeAria')}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {t('pageRangeHint')}
          </p>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          onClick={split}
          disabled={!file || processing}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {processing ? t('extracting') : t('extractPages')}
        </button>

        {done && (
          <button
            onClick={download}
            className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            {t('downloadPdf')}
          </button>
        )}
      </div>

      {done && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm">
          {t('pagesExtractedSuccess')}
        </div>
      )}
    </div>
  )
}
