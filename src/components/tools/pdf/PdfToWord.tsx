'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function PdfToWord() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.pdfTools')
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const docxBlobRef = useRef<Blob | null>(null)

  const validateFile = (f: File): boolean => {
    if (f.type !== 'application/pdf') {
      setError(t('onlyPdfAllowed'))
      return false
    }
    if (f.size > 50 * 1024 * 1024) {
      setError(t('fileTooLarge'))
      return false
    }
    return true
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setError('')
    setDone(false)
    docxBlobRef.current = null
    if (validateFile(selected)) setFile(selected)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    setError('')
    setDone(false)
    docxBlobRef.current = null
    if (validateFile(dropped)) setFile(dropped)
  }

  const convert = async () => {
    if (!file) return

    setConverting(true)
    setError('')
    setDone(false)

    try {
      const { Document, Packer, Paragraph, TextRun, PageBreak } = await import('docx')

      const bytes = new Uint8Array(await file.arrayBuffer())
      const pageTexts = extractTextFromPdfBytes(bytes)

      // Build docx paragraphs from extracted text
      const children: InstanceType<typeof Paragraph>[] = []

      if (pageTexts.length === 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: t('scannedPdfNote'),
                size: 24,
                italics: true,
              }),
            ],
          })
        )
      } else {
        for (let i = 0; i < pageTexts.length; i++) {
          const text = pageTexts[i]
          const lines = text
            ? text.split(/\r?\n/).filter((l) => l.trim())
            : [`[${t('pageLabel')} ${i + 1} — ${t('noTextExtracted')}]`]

          for (const line of lines) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: line, size: 24 })],
                spacing: { after: 120 },
              })
            )
          }

          if (i < pageTexts.length - 1) {
            children.push(new Paragraph({ children: [new PageBreak()] }))
          }
        }
      }

      const doc = new Document({
        sections: [{ children }],
      })

      const docxBlob = await Packer.toBlob(doc)
      docxBlobRef.current = docxBlob
      setDone(true)
    } catch {
      setError(t('convertError'))
    } finally {
      setConverting(false)
    }
  }

  const download = () => {
    if (!docxBlobRef.current) return
    const url = URL.createObjectURL(docxBlobRef.current)
    const a = document.createElement('a')
    a.href = url
    const baseName = file?.name?.replace(/\.pdf$/i, '') || 'document'
    a.download = `${baseName}.docx`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const reset = () => {
    setFile(null)
    setError('')
    setDone(false)
    setConverting(false)
    docxBlobRef.current = null
    if (fileInputRef.current) fileInputRef.current.value = ''
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              fileInputRef.current?.click()
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-sm font-medium">{t('clickToSelectPdf')}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('maxFileSize')}</p>
        </div>
      </div>

      {file && (
        <div className="flex items-center justify-between p-3 rounded-lg border text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="truncate">{file.name}</span>
            <span className="text-muted-foreground text-xs shrink-0">
              ({formatSize(file.size)})
            </span>
          </div>
          <button
            onClick={reset}
            className="p-1 hover:bg-destructive/10 text-destructive rounded ml-2 shrink-0"
            title={tc('clear')}
          >
            ✕
          </button>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={convert}
          disabled={!file || converting}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {converting ? tc('processing') : t('convertToWord')}
        </button>

        {done && (
          <button
            onClick={download}
            className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            {tc('download')}
          </button>
        )}
      </div>

      {done && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm">
          {t('convertSuccess')}
        </div>
      )}
    </div>
  )
}

/**
 * Extract text from raw PDF bytes by scanning for text-showing operators
 * (Tj, TJ) in content streams. Returns an array of strings, one per page.
 */
function extractTextFromPdfBytes(bytes: Uint8Array): string[] {
  const raw = new TextDecoder('latin1').decode(bytes)
  const pages: string[] = []

  // Find all content streams between "stream" and "endstream"
  const streamPattern = /stream\r?\n([\s\S]*?)endstream/g
  let streamMatch: RegExpExecArray | null

  // Collect streams containing text operators
  const streams: string[] = []
  while ((streamMatch = streamPattern.exec(raw)) !== null) {
    const content = streamMatch[1]
    if (/Tj|TJ/.test(content)) {
      streams.push(content)
    }
  }

  // Count pages via /Type /Page (excluding /Pages)
  const pagePattern = /\/Type\s*\/Page(?!s)\b/g
  const pageMatches = raw.match(pagePattern)
  const pageCount = pageMatches ? pageMatches.length : Math.max(streams.length, 1)

  for (let i = 0; i < Math.max(pageCount, streams.length); i++) {
    const stream = streams[i] || ''
    let pageText = ''

    // Tj operator: (text) Tj
    const tjPattern = /\(([^)]*)\)\s*Tj/g
    let tjMatch: RegExpExecArray | null
    while ((tjMatch = tjPattern.exec(stream)) !== null) {
      pageText += decodePdfString(tjMatch[1]) + ' '
    }

    // TJ operator: [(text) kern (text)] TJ
    const tjArrayPattern = /\[([^\]]*)\]\s*TJ/g
    let tjArr: RegExpExecArray | null
    while ((tjArr = tjArrayPattern.exec(stream)) !== null) {
      const innerPattern = /\(([^)]*)\)/g
      let innerMatch: RegExpExecArray | null
      while ((innerMatch = innerPattern.exec(tjArr[1])) !== null) {
        pageText += decodePdfString(innerMatch[1])
      }
      pageText += ' '
    }

    pages.push(pageText.replace(/\s{3,}/g, '\n').trim())
  }

  // If no text found at all but pages exist, return empty per page
  if (pages.every((p) => !p) && pageCount > 0) {
    return Array.from({ length: pageCount }, () => '')
  }

  return pages.length > 0 ? pages : ['']
}

/** Decode PDF string escape sequences */
function decodePdfString(s: string): string {
  return s
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\')
}
