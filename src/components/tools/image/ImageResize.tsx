'use client'

import { useState, useRef } from 'react'

export default function ImageResize() {
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [resizedUrl, setResizedUrl] = useState<string | null>(null)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [targetWidth, setTargetWidth] = useState(0)
  const [targetHeight, setTargetHeight] = useState(0)
  const [lockRatio, setLockRatio] = useState(true)
  const [mode, setMode] = useState<'pixels' | 'percent'>('pixels')
  const [percent, setPercent] = useState(50)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const aspectRatioRef = useRef(1)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (!selected.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP)')
      return
    }
    if (selected.size > 20 * 1024 * 1024) {
      setError('File too large. Maximum size is 20MB.')
      return
    }

    setError('')
    setResizedUrl(null)
    setFile(selected)

    const url = URL.createObjectURL(selected)
    setOriginalUrl(url)

    const img = new Image()
    img.onload = () => {
      setOriginalWidth(img.naturalWidth)
      setOriginalHeight(img.naturalHeight)
      setTargetWidth(img.naturalWidth)
      setTargetHeight(img.naturalHeight)
      aspectRatioRef.current = img.naturalWidth / img.naturalHeight
    }
    img.src = url
  }

  const handleWidthChange = (w: number) => {
    setTargetWidth(w)
    if (lockRatio && w > 0) {
      setTargetHeight(Math.round(w / aspectRatioRef.current))
    }
  }

  const handleHeightChange = (h: number) => {
    setTargetHeight(h)
    if (lockRatio && h > 0) {
      setTargetWidth(Math.round(h * aspectRatioRef.current))
    }
  }

  const resize = async () => {
    if (!file || !originalUrl) return
    setProcessing(true)
    setError('')

    try {
      const img = new Image()
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
      })
      img.src = originalUrl
      await loadPromise

      let width: number
      let height: number

      if (mode === 'percent') {
        width = Math.round(originalWidth * (percent / 100))
        height = Math.round(originalHeight * (percent / 100))
      } else {
        width = targetWidth || 1
        height = targetHeight || 1
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)

      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Resize failed'))),
          outputType,
          0.92
        )
      })

      const url = URL.createObjectURL(blob)
      setResizedUrl(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Resize failed')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!resizedUrl || !file) return
    const a = document.createElement('a')
    a.href = resizedUrl
    const ext = file.type === 'image/png' ? 'png' : 'jpg'
    a.download = `resized-${file.name.replace(/\.[^.]+$/, '')}.${ext}`
    a.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

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
          {file ? (
            <p className="text-sm">
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground ml-2">
                ({formatSize(file.size)} &middot; {originalWidth} x {originalHeight})
              </span>
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">Click to select an image</p>
              <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP (max 20MB)</p>
            </div>
          )}
        </div>
      </div>

      {file && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Resize Mode</label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('pixels')}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                  mode === 'pixels'
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent'
                }`}
              >
                Exact Pixels
              </button>
              <button
                onClick={() => setMode('percent')}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                  mode === 'percent'
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent'
                }`}
              >
                Percentage
              </button>
            </div>
          </div>

          {mode === 'pixels' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Width (px)</label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (px)</label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={lockRatio}
                  onChange={(e) => setLockRatio(e.target.checked)}
                  className="rounded accent-primary"
                />
                <span>Lock aspect ratio</span>
              </label>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Scale: {percent}%</label>
              <input
                type="range"
                min={5}
                max={200}
                value={percent}
                onChange={(e) => setPercent(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5%</span>
                <span>
                  {Math.round(originalWidth * (percent / 100))} x{' '}
                  {Math.round(originalHeight * (percent / 100))} px
                </span>
                <span>200%</span>
              </div>
            </div>
          )}
        </>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <button
        onClick={resize}
        disabled={!file || processing}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {processing ? 'Resizing...' : 'Resize Image'}
      </button>

      {resizedUrl && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={resizedUrl}
              alt="Resized preview"
              className="max-w-full max-h-[400px] rounded-lg border"
            />
          </div>
          <button
            onClick={download}
            className="w-full sm:w-auto px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Download Resized Image
          </button>
        </div>
      )}
    </div>
  )
}
