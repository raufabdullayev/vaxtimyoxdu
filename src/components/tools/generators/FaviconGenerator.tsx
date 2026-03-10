'use client'

import { useState, useRef, useCallback } from 'react'

interface FaviconSize {
  size: number
  label: string
  selected: boolean
}

const DEFAULT_SIZES: FaviconSize[] = [
  { size: 16, label: '16x16', selected: true },
  { size: 32, label: '32x32', selected: true },
  { size: 48, label: '48x48', selected: true },
  { size: 64, label: '64x64', selected: true },
  { size: 128, label: '128x128', selected: true },
  { size: 192, label: '192x192', selected: true },
  { size: 512, label: '512x512', selected: true },
]

export default function FaviconGenerator() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [sizes, setSizes] = useState<FaviconSize[]>(DEFAULT_SIZES)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [generatedFavicons, setGeneratedFavicons] = useState<
    { size: number; dataUrl: string }[]
  >([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, SVG, etc.)')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setError('')
    setFileName(file.name)
    setGeneratedFavicons([])

    const reader = new FileReader()
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const toggleSize = (targetSize: number) => {
    setSizes((prev) =>
      prev.map((s) => (s.size === targetSize ? { ...s, selected: !s.selected } : s))
    )
  }

  const selectAll = () => {
    setSizes((prev) => prev.map((s) => ({ ...s, selected: true })))
  }

  const deselectAll = () => {
    setSizes((prev) => prev.map((s) => ({ ...s, selected: false })))
  }

  const generateFavicons = useCallback(async () => {
    if (!imageSrc) {
      setError('Please upload an image first')
      return
    }

    const selectedSizes = sizes.filter((s) => s.selected)
    if (selectedSizes.length === 0) {
      setError('Please select at least one size')
      return
    }

    setGenerating(true)
    setError('')

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = imageSrc
      })

      const results: { size: number; dataUrl: string }[] = []

      for (const { size } of selectedSizes) {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')!

        // Use high-quality image scaling
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        // Draw image covering the entire canvas (crop to square if needed)
        const srcAspect = img.width / img.height
        let sx = 0,
          sy = 0,
          sw = img.width,
          sh = img.height

        if (srcAspect > 1) {
          // Wider than tall — crop sides
          sw = img.height
          sx = (img.width - sw) / 2
        } else if (srcAspect < 1) {
          // Taller than wide — crop top/bottom
          sh = img.width
          sy = (img.height - sh) / 2
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size)
        results.push({ size, dataUrl: canvas.toDataURL('image/png') })
      }

      setGeneratedFavicons(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate favicons')
    } finally {
      setGenerating(false)
    }
  }, [imageSrc, sizes])

  const downloadSingle = (dataUrl: string, size: number) => {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `favicon-${size}x${size}.png`
    a.click()
  }

  const downloadAllAsZip = async () => {
    if (generatedFavicons.length === 0) return

    // Simple ZIP file creation without external libraries
    // Uses the bare minimum ZIP format
    const files: { name: string; data: Uint8Array }[] = []

    for (const favicon of generatedFavicons) {
      const response = await fetch(favicon.dataUrl)
      const blob = await response.blob()
      const buffer = await blob.arrayBuffer()
      files.push({
        name: `favicon-${favicon.size}x${favicon.size}.png`,
        data: new Uint8Array(buffer),
      })
    }

    // Build ZIP
    const zipParts: Uint8Array[] = []
    const centralDirectory: Uint8Array[] = []
    let offset = 0

    for (const file of files) {
      const nameBytes = new TextEncoder().encode(file.name)

      // Local file header
      const localHeader = new Uint8Array(30 + nameBytes.length)
      const view = new DataView(localHeader.buffer)
      view.setUint32(0, 0x04034b50, true) // Local file header signature
      view.setUint16(4, 20, true) // Version needed
      view.setUint16(6, 0, true) // Flags
      view.setUint16(8, 0, true) // Compression (store)
      view.setUint16(10, 0, true) // Mod time
      view.setUint16(12, 0, true) // Mod date
      view.setUint32(14, 0, true) // CRC-32 (simplified)
      view.setUint32(18, file.data.length, true) // Compressed size
      view.setUint32(22, file.data.length, true) // Uncompressed size
      view.setUint16(26, nameBytes.length, true) // Filename length
      view.setUint16(28, 0, true) // Extra field length
      localHeader.set(nameBytes, 30)

      // CRC-32 calculation
      const crc = crc32(file.data)
      view.setUint32(14, crc, true)

      zipParts.push(localHeader)
      zipParts.push(file.data)

      // Central directory entry
      const cdEntry = new Uint8Array(46 + nameBytes.length)
      const cdView = new DataView(cdEntry.buffer)
      cdView.setUint32(0, 0x02014b50, true) // Central directory signature
      cdView.setUint16(4, 20, true) // Version made by
      cdView.setUint16(6, 20, true) // Version needed
      cdView.setUint16(8, 0, true) // Flags
      cdView.setUint16(10, 0, true) // Compression
      cdView.setUint16(12, 0, true) // Mod time
      cdView.setUint16(14, 0, true) // Mod date
      cdView.setUint32(16, crc, true) // CRC-32
      cdView.setUint32(20, file.data.length, true) // Compressed size
      cdView.setUint32(24, file.data.length, true) // Uncompressed size
      cdView.setUint16(28, nameBytes.length, true) // Filename length
      cdView.setUint16(30, 0, true) // Extra field length
      cdView.setUint16(32, 0, true) // Comment length
      cdView.setUint16(34, 0, true) // Disk number
      cdView.setUint16(36, 0, true) // Internal attributes
      cdView.setUint32(38, 0, true) // External attributes
      cdView.setUint32(42, offset, true) // Local header offset
      cdEntry.set(nameBytes, 46)

      centralDirectory.push(cdEntry)
      offset += localHeader.length + file.data.length
    }

    const centralDirOffset = offset
    let centralDirSize = 0
    for (const entry of centralDirectory) {
      zipParts.push(entry)
      centralDirSize += entry.length
    }

    // End of central directory
    const eocd = new Uint8Array(22)
    const eocdView = new DataView(eocd.buffer)
    eocdView.setUint32(0, 0x06054b50, true) // EOCD signature
    eocdView.setUint16(4, 0, true) // Disk number
    eocdView.setUint16(6, 0, true) // Central dir disk
    eocdView.setUint16(8, files.length, true) // Entries on disk
    eocdView.setUint16(10, files.length, true) // Total entries
    eocdView.setUint32(12, centralDirSize, true) // Central dir size
    eocdView.setUint32(16, centralDirOffset, true) // Central dir offset
    eocdView.setUint16(20, 0, true) // Comment length
    zipParts.push(eocd)

    const totalSize = zipParts.reduce((sum, part) => sum + part.length, 0)
    const zipBuffer = new Uint8Array(totalSize)
    let pos = 0
    for (const part of zipParts) {
      zipBuffer.set(part, pos)
      pos += part.length
    }

    const blob = new Blob([zipBuffer], { type: 'application/zip' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'favicons.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload image"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click()
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {imageSrc ? (
          <div className="space-y-3">
            <img
              src={imageSrc}
              alt="Uploaded preview"
              className="mx-auto max-w-[200px] max-h-[200px] rounded-lg"
            />
            <p className="text-sm text-muted-foreground">{fileName}</p>
            <p className="text-xs text-muted-foreground">Click to change image</p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium mb-2">Click or drop an image here</p>
            <p className="text-sm text-muted-foreground">
              Supports PNG, JPG, SVG, WebP (max 10MB)
            </p>
          </div>
        )}
      </div>

      {/* Size selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Favicon Sizes</label>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="text-xs text-primary hover:underline"
            >
              Select All
            </button>
            <span className="text-xs text-muted-foreground">|</span>
            <button
              onClick={deselectAll}
              className="text-xs text-primary hover:underline"
            >
              Deselect All
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s.size}
              onClick={() => toggleSize(s.size)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                s.selected
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
              aria-pressed={s.selected}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Generate button */}
      <button
        onClick={generateFavicons}
        disabled={!imageSrc || generating}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {generating ? 'Generating...' : 'Generate Favicons'}
      </button>

      {/* Generated favicons */}
      {generatedFavicons.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Generated Favicons ({generatedFavicons.length})
            </label>
            <button
              onClick={downloadAllAsZip}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Download All (ZIP)
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {generatedFavicons.map((favicon) => (
              <div
                key={favicon.size}
                className="rounded-lg border p-3 text-center space-y-2"
              >
                <div className="flex items-center justify-center min-h-[80px]">
                  <img
                    src={favicon.dataUrl}
                    alt={`${favicon.size}x${favicon.size} favicon`}
                    className="rounded"
                    style={{
                      width: Math.min(favicon.size, 64),
                      height: Math.min(favicon.size, 64),
                      imageRendering: favicon.size <= 32 ? 'pixelated' : 'auto',
                    }}
                  />
                </div>
                <p className="text-sm font-medium">
                  {favicon.size}x{favicon.size}
                </p>
                <button
                  onClick={() => downloadSingle(favicon.dataUrl, favicon.size)}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg hover:bg-accent transition-colors"
                >
                  Download PNG
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// CRC-32 implementation
function crc32(data: Uint8Array): number {
  let crc = 0xffffffff
  const table = getCrc32Table()
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xff]
  }
  return (crc ^ 0xffffffff) >>> 0
}

let crc32Table: Uint32Array | null = null
function getCrc32Table(): Uint32Array {
  if (crc32Table) return crc32Table
  crc32Table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1)
      } else {
        c = c >>> 1
      }
    }
    crc32Table[i] = c
  }
  return crc32Table
}
