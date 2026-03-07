'use client'

import { useState, useRef } from 'react'

export default function ImageCompress() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null)
  const [quality, setQuality] = useState(70)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP)')
      return
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('File too large. Maximum size is 20MB.')
      return
    }

    setError('')
    setOriginalFile(file)
    setOriginalSize(file.size)
    setCompressedUrl(null)
    setCompressedSize(0)

    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
  }

  const compress = async () => {
    if (!originalFile) return
    setProcessing(true)
    setError('')

    try {
      const img = new Image()
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
      })
      img.src = URL.createObjectURL(originalFile)
      await loadPromise

      let width = img.naturalWidth
      let height = img.naturalHeight

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)

      const outputType = originalFile.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Compression failed'))),
          outputType,
          quality / 100
        )
      })

      setCompressedSize(blob.size)
      const url = URL.createObjectURL(blob)
      setCompressedUrl(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Compression failed')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!compressedUrl || !originalFile) return
    const a = document.createElement('a')
    a.href = compressedUrl
    const ext = originalFile.type === 'image/png' ? 'png' : 'jpg'
    a.download = `compressed-${originalFile.name.replace(/\.[^.]+$/, '')}.${ext}`
    a.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const savings = originalSize && compressedSize
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          {originalFile ? (
            <p className="text-sm">
              <span className="font-medium">{originalFile.name}</span>
              <span className="text-muted-foreground ml-2">({formatSize(originalSize)})</span>
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">Click to select an image</p>
              <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP (max 20MB)</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Quality: {quality}%</label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Width (px)</label>
          <select
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
          >
            <option value={640}>640px</option>
            <option value={1024}>1024px</option>
            <option value={1920}>1920px (Full HD)</option>
            <option value={3840}>3840px (4K)</option>
            <option value={99999}>Original</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <button
        onClick={compress}
        disabled={!originalFile || processing}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {processing ? 'Compressing...' : 'Compress Image'}
      </button>

      {compressedUrl && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Original</p>
              <p className="font-medium text-sm">{formatSize(originalSize)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Compressed</p>
              <p className="font-medium text-sm">{formatSize(compressedSize)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Saved</p>
              <p className="font-medium text-sm text-green-600">{savings}%</p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={compressedUrl}
              alt="Compressed preview"
              className="max-w-full max-h-[400px] rounded-lg border"
            />
          </div>

          <button
            onClick={download}
            className="w-full sm:w-auto px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  )
}
