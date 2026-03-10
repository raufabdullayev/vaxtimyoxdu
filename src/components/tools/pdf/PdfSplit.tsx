'use client'

import { useState, useRef } from 'react'

export default function PdfSplit() {
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
      setError('Only PDF files are allowed')
      return
    }
    if (selected.size > 50 * 1024 * 1024) {
      setError('File must be under 50MB')
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
      setError('Failed to read PDF. The file may be corrupted or password-protected.')
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
          throw new Error(`Invalid range: ${part}. Pages must be between 1 and ${total}.`)
        }
        for (let i = start; i <= end; i++) {
          pages.add(i - 1)
        }
      } else {
        const num = parseInt(part, 10)
        if (isNaN(num) || num < 1 || num > total) {
          throw new Error(`Invalid page: ${part}. Pages must be between 1 and ${total}.`)
        }
        pages.add(num - 1)
      }
    }

    return Array.from(pages).sort((a, b) => a - b)
  }

  const split = async () => {
    if (!file) {
      setError('Please select a PDF file')
      return
    }
    if (!pageRange.trim()) {
      setError('Please enter a page range')
      return
    }

    setProcessing(true)
    setError('')
    setDone(false)

    try {
      const indices = parsePageRange(pageRange, pageCount)
      if (indices.length === 0) {
        setError('No valid pages selected')
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
      setError(e instanceof Error ? e.message : 'Failed to split PDF')
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
        <label className="block text-sm font-medium mb-1">Select PDF File</label>
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
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
                ({formatSize(file.size)} &middot; {pageCount} pages)
              </span>
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">Click to select a PDF file</p>
              <p className="text-xs text-muted-foreground mt-1">Max 50MB</p>
            </div>
          )}
        </div>
      </div>

      {file && pageCount > 0 && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Page Range (1-{pageCount})
          </label>
          <input
            type="text"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., 1-3, 5, 7-10"
            value={pageRange}
            onChange={(e) => {
              setPageRange(e.target.value)
              setDone(false)
            }}
            aria-label="Page range input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use commas and dashes. Examples: &quot;1-3&quot; or &quot;1,3,5-7&quot;
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
          {processing ? 'Extracting...' : 'Extract Pages'}
        </button>

        {done && (
          <button
            onClick={download}
            className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Download PDF
          </button>
        )}
      </div>

      {done && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm">
          Pages extracted successfully! Click &ldquo;Download PDF&rdquo; to save.
        </div>
      )}
    </div>
  )
}
