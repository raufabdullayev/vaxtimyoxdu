'use client'

import { useState, useRef } from 'react'

export default function PdfMerge() {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mergedBlobRef = useRef<Blob | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected) return
    setError('')
    setDone(false)

    const newFiles: File[] = []
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].type !== 'application/pdf') {
        setError('Only PDF files are allowed')
        return
      }
      if (selected[i].size > 50 * 1024 * 1024) {
        setError('Each file must be under 50MB')
        return
      }
      newFiles.push(selected[i])
    }
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setDone(false)
  }

  const moveFile = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= files.length) return
    const updated = [...files]
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp
    setFiles(updated)
    setDone(false)
  }

  const merge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files')
      return
    }

    setMerging(true)
    setError('')
    setDone(false)

    try {
      const { PDFDocument } = await import('pdf-lib')
      const mergedPdf = await PDFDocument.create()

      for (const file of files) {
        const bytes = await file.arrayBuffer()
        const pdf = await PDFDocument.load(bytes)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedBytes = await mergedPdf.save()
      mergedBlobRef.current = new Blob([new Uint8Array(mergedBytes) as BlobPart], { type: 'application/pdf' })
      setDone(true)
    } catch (e) {
      setError('Failed to merge PDFs. Please make sure all files are valid PDFs.')
    } finally {
      setMerging(false)
    }
  }

  const download = () => {
    if (!mergedBlobRef.current) return
    const url = URL.createObjectURL(mergedBlobRef.current)
    const a = document.createElement('a')
    a.href = url
    a.download = 'merged.pdf'
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
        <label className="block text-sm font-medium mb-1">Select PDF Files</label>
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-sm font-medium">Click to add PDF files</p>
          <p className="text-xs text-muted-foreground mt-1">Select multiple PDFs (max 50MB each)</p>
        </div>
      </div>

      {files.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block">Files to Merge ({files.length})</label>
          <div className="rounded-lg border divide-y">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-muted-foreground shrink-0">{i + 1}.</span>
                  <span className="truncate">{file.name}</span>
                  <span className="text-muted-foreground text-xs shrink-0">({formatSize(file.size)})</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveFile(i, -1)}
                    disabled={i === 0}
                    className="p-1 hover:bg-accent rounded disabled:opacity-30"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveFile(i, 1)}
                    disabled={i === files.length - 1}
                    className="p-1 hover:bg-accent rounded disabled:opacity-30"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeFile(i)}
                    className="p-1 hover:bg-destructive/10 text-destructive rounded ml-1"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          onClick={merge}
          disabled={files.length < 2 || merging}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {merging ? 'Merging...' : 'Merge PDFs'}
        </button>

        {done && (
          <button
            onClick={download}
            className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Download Merged PDF
          </button>
        )}
      </div>

      {done && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm">
          PDFs merged successfully! Click &ldquo;Download Merged PDF&rdquo; to save.
        </div>
      )}
    </div>
  )
}
