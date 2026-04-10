'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import DOMPurify from 'dompurify'

export default function WordToPdf() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.wordToPdf')
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const printFrameRef = useRef<HTMLIFrameElement | null>(null)

  const validateFile = (f: File): boolean => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!validTypes.includes(f.type) && !f.name.endsWith('.docx')) {
      setError(t('onlyDocxAllowed'))
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
    setHtmlContent('')
    if (validateFile(selected)) setFile(selected)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    setError('')
    setDone(false)
    setHtmlContent('')
    if (validateFile(dropped)) setFile(dropped)
  }

  const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
        'ul', 'ol', 'li', 'a', 'img', 'strong', 'em', 'b', 'i', 'u',
        'del', 'code', 'pre', 'blockquote',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'span', 'div', 'sup', 'sub',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'colspan', 'rowspan'],
      ALLOW_DATA_ATTR: false,
    })
  }

  const convert = async () => {
    if (!file) return

    setConverting(true)
    setError('')
    setDone(false)

    try {
      const mammoth = await import('mammoth')
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
      if (!result.value || result.value.trim().length === 0) {
        setError(t('emptyDocument'))
        return
      }
      setHtmlContent(sanitizeHtml(result.value))
      setDone(true)
    } catch {
      setError(t('convertError'))
    } finally {
      setConverting(false)
    }
  }

  const downloadPdf = () => {
    if (!htmlContent) return

    const baseName = file?.name?.replace(/\.docx$/i, '') || 'document'

    const printHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${DOMPurify.sanitize(baseName)}</title>
<style>
  @page { margin: 2cm; }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.6;
    color: #000;
    max-width: 100%;
  }
  p { margin: 0 0 0.5em 0; }
  h1 { font-size: 24pt; margin: 0.5em 0; }
  h2 { font-size: 20pt; margin: 0.5em 0; }
  h3 { font-size: 16pt; margin: 0.5em 0; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #999; padding: 6px 10px; text-align: left; }
  th { background: #f0f0f0; font-weight: bold; }
  img { max-width: 100%; height: auto; }
  ul, ol { margin: 0.5em 0; padding-left: 2em; }
  li { margin: 0.2em 0; }
  strong, b { font-weight: bold; }
  em, i { font-style: italic; }
</style>
</head>
<body>${htmlContent}</body>
</html>`

    // Remove old iframe if it exists
    if (printFrameRef.current) {
      document.body.removeChild(printFrameRef.current)
      printFrameRef.current = null
    }

    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.left = '-9999px'
    iframe.style.top = '-9999px'
    iframe.style.width = '0'
    iframe.style.height = '0'
    document.body.appendChild(iframe)
    printFrameRef.current = iframe

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc) {
      setError(t('convertError'))
      return
    }

    iframeDoc.open()
    iframeDoc.write(printHtml)
    iframeDoc.close()

    // Wait for content to render then trigger print dialog
    setTimeout(() => {
      iframe.contentWindow?.print()
    }, 300)
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
    setHtmlContent('')
    if (printFrameRef.current) {
      document.body.removeChild(printFrameRef.current)
      printFrameRef.current = null
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('selectDocx')}</label>
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
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-sm font-medium">{t('clickToSelectDocx')}</p>
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
          {converting ? tc('processing') : t('convertToPdf')}
        </button>

        {done && (
          <button
            onClick={downloadPdf}
            className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            {t('savePdf')}
          </button>
        )}
      </div>

      {done && (
        <>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm">
            {t('convertSuccess')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('preview')}</label>
            <div
              className="border rounded-lg p-6 bg-white dark:bg-gray-950 text-black dark:text-gray-200 max-h-96 overflow-y-auto prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </>
      )}
    </div>
  )
}
