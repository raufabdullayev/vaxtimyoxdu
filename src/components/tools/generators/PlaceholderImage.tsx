'use client'

import { useState, useRef, useEffect } from 'react'

export default function PlaceholderImage() {
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [bgColor, setBgColor] = useState('#cccccc')
  const [textColor, setTextColor] = useState('#666666')
  const [text, setText] = useState('')
  const [format, setFormat] = useState<'png' | 'jpeg'>('png')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const displayText = text || `${width} x ${height}`

  useEffect(() => {
    drawCanvas()
  })

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Text
    const fontSize = Math.max(12, Math.min(width, height) / 8)
    ctx.fillStyle = textColor
    ctx.font = `bold ${fontSize}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Word wrap if needed
    const maxTextWidth = width * 0.8
    const words = displayText.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxTextWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)

    const lineHeight = fontSize * 1.3
    const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2

    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, startY + i * lineHeight)
    })
  }

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
    const ext = format

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `placeholder-${width}x${height}.${ext}`
        a.click()
        URL.revokeObjectURL(url)
      },
      mimeType,
      0.92
    )
  }

  const presets = [
    { label: 'Social Post', w: 1080, h: 1080 },
    { label: 'Banner', w: 1200, h: 628 },
    { label: 'Thumbnail', w: 320, h: 180 },
    { label: 'HD', w: 1920, h: 1080 },
    { label: 'A4 (72dpi)', w: 595, h: 842 },
    { label: 'Avatar', w: 400, h: 400 },
  ]

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div>
        <label className="block text-sm font-medium mb-2">Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setWidth(p.w)
                setHeight(p.h)
              }}
              className="px-3 py-1.5 text-sm rounded-lg border hover:bg-accent transition-colors"
            >
              {p.label} ({p.w}x{p.h})
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width (px)</label>
          <input
            type="number"
            min={10}
            max={4000}
            value={width}
            onChange={(e) => setWidth(Math.max(10, Math.min(4000, Number(e.target.value))))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height (px)</label>
          <input
            type="number"
            min={10}
            max={4000}
            value={height}
            onChange={(e) => setHeight(Math.max(10, Math.min(4000, Number(e.target.value))))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Background</label>
          <div className="flex gap-2">
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
        <div>
          <label className="block text-sm font-medium mb-1">Text Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-9 rounded cursor-pointer border-0"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="flex-1 rounded-lg border bg-background px-2 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Custom text */}
      <div>
        <label className="block text-sm font-medium mb-1">Custom Text (optional)</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Default: ${width} x ${height}`}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-medium mb-1">Format</label>
        <div className="flex gap-2">
          <button
            onClick={() => setFormat('png')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              format === 'png'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            PNG
          </button>
          <button
            onClick={() => setFormat('jpeg')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              format === 'jpeg'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            JPEG
          </button>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium mb-1">Preview</label>
        <div className="flex justify-center rounded-lg border p-4 bg-muted/20">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[300px] rounded"
            style={{ width: Math.min(width, 600), height: Math.min(height, 300) * (Math.min(width, 600) / width) }}
          />
        </div>
      </div>

      {/* Download */}
      <button
        onClick={download}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Download Image
      </button>
    </div>
  )
}
