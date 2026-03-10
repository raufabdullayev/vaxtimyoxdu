'use client'

import { useState, useRef, useCallback } from 'react'

export default function SvgToPng() {
  const [svgInput, setSvgInput] = useState('')
  const [svgFile, setSvgFile] = useState<string | null>(null)
  const [inputMode, setInputMode] = useState<'paste' | 'upload'>('paste')
  const [width, setWidth] = useState(512)
  const [height, setHeight] = useState(512)
  const [lockAspect, setLockAspect] = useState(true)
  const [aspectRatio, setAspectRatio] = useState(1)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [transparent, setTransparent] = useState(true)
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [converting, setConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
      setError('Please upload an SVG file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setSvgFile(content)
      setSvgInput(content)
      setError('')

      // Try to detect original SVG dimensions
      detectSvgDimensions(content)
    }
    reader.readAsText(file)
  }

  const detectSvgDimensions = (svg: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, 'image/svg+xml')
    const svgEl = doc.querySelector('svg')
    if (!svgEl) return

    let w = 0
    let h = 0

    const viewBox = svgEl.getAttribute('viewBox')
    if (viewBox) {
      const parts = viewBox.split(/[\s,]+/)
      if (parts.length === 4) {
        w = parseFloat(parts[2])
        h = parseFloat(parts[3])
      }
    }

    const widthAttr = svgEl.getAttribute('width')
    const heightAttr = svgEl.getAttribute('height')
    if (widthAttr && heightAttr) {
      w = parseFloat(widthAttr) || w
      h = parseFloat(heightAttr) || h
    }

    if (w > 0 && h > 0) {
      const ratio = w / h
      setAspectRatio(ratio)
      setWidth(Math.round(w))
      setHeight(Math.round(h))
    }
  }

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth)
    if (lockAspect && aspectRatio > 0) {
      setHeight(Math.round(newWidth / aspectRatio))
    }
  }

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight)
    if (lockAspect && aspectRatio > 0) {
      setWidth(Math.round(newHeight * aspectRatio))
    }
  }

  const handleSvgPaste = (value: string) => {
    setSvgInput(value)
    if (value.trim()) {
      detectSvgDimensions(value)
    }
  }

  const convert = useCallback(async () => {
    const svg = inputMode === 'upload' ? svgFile : svgInput
    if (!svg?.trim()) {
      setError('Please provide an SVG to convert')
      return
    }

    if (!svg.trim().includes('<svg')) {
      setError('Input does not appear to be valid SVG')
      return
    }

    setConverting(true)
    setError('')
    setPngDataUrl(null)

    try {
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)

      const img = new Image()
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load SVG'))
        img.src = url
      })

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!

      if (!transparent) {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, width, height)

      const dataUrl = canvas.toDataURL('image/png')
      setPngDataUrl(dataUrl)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert SVG')
    } finally {
      setConverting(false)
    }
  }, [svgInput, svgFile, inputMode, width, height, transparent, bgColor])

  const download = () => {
    if (!pngDataUrl) return
    const a = document.createElement('a')
    a.href = pngDataUrl
    a.download = `converted-${width}x${height}.png`
    a.click()
  }

  const copySvg = async () => {
    if (pngDataUrl) {
      try {
        const response = await fetch(pngDataUrl)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ])
      } catch {
        // Fallback: copy data URL
        await navigator.clipboard.writeText(pngDataUrl)
      }
    }
  }

  const loadSample = () => {
    const sample = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="30" fill="url(#grad)"/>
  <text x="100" y="115" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">SVG</text>
</svg>`
    setSvgInput(sample)
    setInputMode('paste')
    detectSvgDimensions(sample)
    setPngDataUrl(null)
    setError('')
  }

  const clear = () => {
    setSvgInput('')
    setSvgFile(null)
    setPngDataUrl(null)
    setError('')
    setWidth(512)
    setHeight(512)
    setAspectRatio(1)
  }

  return (
    <div className="space-y-4">
      {/* Input mode toggle */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setInputMode('paste')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              inputMode === 'paste'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
            aria-pressed={inputMode === 'paste'}
          >
            Paste SVG
          </button>
          <button
            onClick={() => setInputMode('upload')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              inputMode === 'upload'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
            aria-pressed={inputMode === 'upload'}
          >
            Upload File
          </button>
        </div>
        <button
          onClick={loadSample}
          className="px-3 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
        >
          Load Sample
        </button>
      </div>

      {/* SVG Input */}
      {inputMode === 'paste' ? (
        <div>
          <label className="block text-sm font-medium mb-1">SVG Code</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste your SVG code here..."
            value={svgInput}
            onChange={(e) => handleSvgPaste(e.target.value)}
            aria-label="SVG code input"
          />
        </div>
      ) : (
        <div
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload SVG file"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click()
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".svg,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
          />
          {svgFile ? (
            <p className="text-sm text-muted-foreground">SVG file loaded. Click to change.</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-1">Click to upload SVG file</p>
              <p className="text-sm text-muted-foreground">Only .svg files accepted</p>
            </div>
          )}
        </div>
      )}

      {/* Dimensions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width (px)</label>
          <input
            type="number"
            min={1}
            max={4096}
            value={width}
            onChange={(e) => handleWidthChange(Math.max(1, Math.min(4096, Number(e.target.value))))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height (px)</label>
          <input
            type="number"
            min={1}
            max={4096}
            value={height}
            onChange={(e) => handleHeightChange(Math.max(1, Math.min(4096, Number(e.target.value))))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer py-2">
            <input
              type="checkbox"
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Lock ratio</span>
          </label>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer py-2">
            <input
              type="checkbox"
              checked={transparent}
              onChange={(e) => setTransparent(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Transparent BG</span>
          </label>
        </div>
      </div>

      {!transparent && (
        <div>
          <label className="block text-sm font-medium mb-1">Background Color</label>
          <div className="flex gap-2 max-w-[200px]">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-9 rounded cursor-pointer border-0"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="flex-1 rounded-lg border bg-background px-2 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}

      {/* Common size presets */}
      <div>
        <label className="block text-sm font-medium mb-2">Quick Sizes</label>
        <div className="flex flex-wrap gap-2">
          {[64, 128, 256, 512, 1024, 2048].map((size) => (
            <button
              key={size}
              onClick={() => {
                handleWidthChange(size)
                if (!lockAspect) setHeight(size)
              }}
              className="px-3 py-1.5 text-sm rounded-lg border hover:bg-accent transition-colors"
            >
              {size}px
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={convert}
          disabled={converting}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {converting ? 'Converting...' : 'Convert to PNG'}
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Output */}
      {pngDataUrl && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Result ({width}x{height} PNG)
            </label>
            <div className="flex gap-2">
              <button
                onClick={copySvg}
                className="text-xs text-primary hover:underline"
              >
                Copy Image
              </button>
            </div>
          </div>
          <div
            className="flex justify-center rounded-lg border p-4"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }}
          >
            <img
              src={pngDataUrl}
              alt="Converted PNG"
              className="max-w-full max-h-[300px]"
              style={{ imageRendering: width <= 64 ? 'pixelated' : 'auto' }}
            />
          </div>
          <button
            onClick={download}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  )
}
