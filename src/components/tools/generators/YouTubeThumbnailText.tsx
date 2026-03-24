'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'

const BG_COLORS = [
  { name: 'Red', color: '#FF0000' },
  { name: 'Blue', color: '#0066FF' },
  { name: 'Green', color: '#00AA00' },
  { name: 'Purple', color: '#9900FF' },
  { name: 'Orange', color: '#FF6600' },
  { name: 'Black', color: '#1a1a1a' },
  { name: 'Gradient 1', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { name: 'Gradient 2', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
]

export default function YouTubeThumbnailText() {
  const t = useTranslations('toolUI')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [title, setTitle] = useState('AMAZING TITLE')
  const [subtitle, setSubtitle] = useState('Click to watch')
  const [bgColor, setBgColor] = useState('#FF0000')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [fontSize, setFontSize] = useState(72)
  const [strokeWidth, setStrokeWidth] = useState(3)
  const [fontWeight, setFontWeight] = useState<'bold' | 'normal'>('bold')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // YouTube thumbnail: 1280x720
    canvas.width = 1280
    canvas.height = 720

    // Background
    if (bgColor.includes('gradient')) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, bgColor.includes('667eea') ? '#667eea' : '#f093fb')
      gradient.addColorStop(1, bgColor.includes('764ba2') ? '#764ba2' : '#f5576c')
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = bgColor
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Title text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Stroke (outline)
    if (strokeWidth > 0) {
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = strokeWidth * 2
      ctx.lineJoin = 'round'
      ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
      ctx.strokeText(title, canvas.width / 2, canvas.height / 2 - 30, canvas.width - 100)
    }

    // Fill
    ctx.fillStyle = textColor
    ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 30, canvas.width - 100)

    // Subtitle
    if (subtitle) {
      const subSize = Math.round(fontSize * 0.45)
      if (strokeWidth > 0) {
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = strokeWidth
        ctx.font = `normal ${subSize}px Arial, sans-serif`
        ctx.strokeText(subtitle, canvas.width / 2, canvas.height / 2 + 60, canvas.width - 100)
      }
      ctx.fillStyle = textColor
      ctx.font = `normal ${subSize}px Arial, sans-serif`
      ctx.globalAlpha = 0.9
      ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 60, canvas.width - 100)
      ctx.globalAlpha = 1
    }
  }, [title, subtitle, bgColor, textColor, fontSize, strokeWidth, fontWeight])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'youtube-thumbnail.png'
    a.click()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Title Text</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="AMAZING TITLE"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Click to watch"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Background Color</label>
        <div className="flex flex-wrap gap-2">
          {BG_COLORS.map((bg) => (
            <button
              key={bg.name}
              onClick={() => setBgColor(bg.color)}
              className={`w-10 h-10 rounded-lg border-2 transition-all ${
                bgColor === bg.color ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              style={{ background: bg.color }}
              title={bg.name}
            />
          ))}
          <input
            type="color"
            value={bgColor.startsWith('#') ? bgColor : '#FF0000'}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-10 h-10 rounded-lg border-2 cursor-pointer"
            title="Custom color"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10 rounded-lg border cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Font Size: {fontSize}</label>
          <input type="range" min={32} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Outline: {strokeWidth}px</label>
          <input type="range" min={0} max={10} value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Weight</label>
          <select
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value as 'bold' | 'normal')}
            className="w-full rounded-lg border bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="bold">Bold</option>
            <option value="normal">Normal</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <canvas ref={canvasRef} className="w-full" style={{ aspectRatio: '16/9' }} />
      </div>

      <div className="text-xs text-muted-foreground text-center">1280 x 720 pixels (YouTube recommended size)</div>

      <button
        onClick={download}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {t('download')} PNG (1280x720)
      </button>
    </div>
  )
}
