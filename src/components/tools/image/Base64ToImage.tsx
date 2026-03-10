'use client'

import { useState, useRef } from 'react'

export default function Base64ToImage() {
  const [input, setInput] = useState('')
  const [imageSrc, setImageSrc] = useState<string>('')
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number; size: string } | null>(null)
  const [error, setError] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)

  const decode = () => {
    if (!input.trim()) {
      setError('Please enter a Base64 string or Data URI.')
      setImageSrc('')
      setImageInfo(null)
      return
    }

    setError('')
    let src = input.trim()

    // If it's raw base64, try to detect format and add data URI prefix
    if (!src.startsWith('data:')) {
      // Check for common image signatures in base64
      if (src.startsWith('/9j/') || src.startsWith('/9j+')) {
        src = `data:image/jpeg;base64,${src}`
      } else if (src.startsWith('iVBOR')) {
        src = `data:image/png;base64,${src}`
      } else if (src.startsWith('R0lGOD')) {
        src = `data:image/gif;base64,${src}`
      } else if (src.startsWith('UklGR')) {
        src = `data:image/webp;base64,${src}`
      } else if (src.startsWith('PHN2Zy') || src.startsWith('PD94bW')) {
        src = `data:image/svg+xml;base64,${src}`
      } else {
        // Default to PNG
        src = `data:image/png;base64,${src}`
      }
    }

    // Validate base64 portion
    const base64Part = src.split(',')[1] || src
    try {
      atob(base64Part.slice(0, 100)) // Test decoding a small portion
    } catch {
      setError('Invalid Base64 string. Please check your input.')
      setImageSrc('')
      setImageInfo(null)
      return
    }

    setImageSrc(src)
  }

  const handleImageLoad = () => {
    if (imgRef.current) {
      const base64Part = imageSrc.split(',')[1] || imageSrc
      const byteSize = Math.ceil(base64Part.length * 0.75)
      setImageInfo({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
        size: byteSize < 1024
          ? `${byteSize} B`
          : byteSize < 1024 * 1024
            ? `${(byteSize / 1024).toFixed(1)} KB`
            : `${(byteSize / (1024 * 1024)).toFixed(1)} MB`,
      })
    }
  }

  const handleImageError = () => {
    setError('Could not decode the image. The Base64 string may be corrupted or invalid.')
    setImageSrc('')
    setImageInfo(null)
  }

  const download = () => {
    if (!imageSrc) return
    const link = document.createElement('a')
    link.href = imageSrc
    // Detect extension from data URI
    const mimeMatch = imageSrc.match(/data:image\/([a-zA-Z+]+);/)
    const ext = mimeMatch ? mimeMatch[1].replace('svg+xml', 'svg').replace('jpeg', 'jpg') : 'png'
    link.download = `decoded_image.${ext}`
    link.click()
  }

  const clear = () => {
    setInput('')
    setImageSrc('')
    setImageInfo(null)
    setError('')
  }

  const loadSample = () => {
    // A tiny 1x1 red pixel PNG
    setInput('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==')
    setImageSrc('')
    setImageInfo(null)
    setError('')
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Base64 Input</label>
          <div className="flex gap-3">
            <button onClick={loadSample} className="text-xs text-primary hover:underline">
              Sample
            </button>
            <button onClick={clear} className="text-xs text-muted-foreground hover:underline">
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Paste Base64 string or data:image/... URI here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Base64 string input"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Accepts raw Base64 or full Data URI (data:image/png;base64,...). Auto-detects JPEG, PNG, GIF, WebP, SVG.
        </p>
      </div>

      {/* Action */}
      <div className="flex gap-3">
        <button
          onClick={decode}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Decode Image
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {/* Image preview */}
      {imageSrc && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Decoded Image</label>
            <button onClick={download} className="text-xs text-primary hover:underline">
              Download
            </button>
          </div>
          <div className="rounded-lg border p-4 bg-muted/30 flex justify-center">
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Decoded from Base64"
              className="max-h-64 max-w-full object-contain rounded"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        </div>
      )}

      {/* Image info */}
      {imageInfo && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Width</div>
            <div className="text-sm font-medium mt-1">{imageInfo.width}px</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Height</div>
            <div className="text-sm font-medium mt-1">{imageInfo.height}px</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Approx Size</div>
            <div className="text-sm font-medium mt-1">{imageInfo.size}</div>
          </div>
        </div>
      )}
    </div>
  )
}
