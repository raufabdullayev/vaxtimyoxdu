'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'

const FONTS = [
  { name: 'Cursive', family: 'cursive' },
  { name: 'Serif', family: 'Georgia, serif' },
  { name: 'Fantasy', family: 'fantasy' },
  { name: 'Monospace', family: 'monospace' },
]

const PAPER_COLORS = [
  { name: 'White', bg: '#ffffff', line: '#e0e0e0' },
  { name: 'Cream', bg: '#fdf6e3', line: '#d4c5a0' },
  { name: 'Lined Blue', bg: '#f0f4ff', line: '#b8cce8' },
  { name: 'Yellow', bg: '#fffde7', line: '#e8e0b0' },
  { name: 'Pink', bg: '#fff0f0', line: '#e8b8b8' },
]

const INK_COLORS = [
  { name: 'Blue', color: '#1a237e' },
  { name: 'Black', color: '#1a1a1a' },
  { name: 'Red', color: '#b71c1c' },
  { name: 'Green', color: '#1b5e20' },
  { name: 'Purple', color: '#4a148c' },
]

export default function TextToHandwriting() {
  const t = useTranslations('toolUI')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.')
  const [font, setFont] = useState(0)
  const [fontSize, setFontSize] = useState(24)
  const [paperColor, setPaperColor] = useState(0)
  const [inkColor, setInkColor] = useState(0)
  const [lineSpacing, setLineSpacing] = useState(40)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const paper = PAPER_COLORS[paperColor]
    const ink = INK_COLORS[inkColor]
    const fontObj = FONTS[font]

    canvas.width = 800
    canvas.height = 600

    // Draw paper
    ctx.fillStyle = paper.bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw lines
    ctx.strokeStyle = paper.line
    ctx.lineWidth = 1
    for (let y = 60; y < canvas.height; y += lineSpacing) {
      ctx.beginPath()
      ctx.moveTo(40, y)
      ctx.lineTo(canvas.width - 40, y)
      ctx.stroke()
    }

    // Draw left margin
    ctx.strokeStyle = '#ff9999'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(70, 0)
    ctx.lineTo(70, canvas.height)
    ctx.stroke()

    // Draw text
    ctx.fillStyle = ink.color
    ctx.font = `${fontSize}px ${fontObj.family}`
    ctx.textBaseline = 'bottom'

    const maxWidth = canvas.width - 120
    const words = text.split(' ')
    let line = ''
    let y = 60

    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && line) {
        // Add slight random offset for natural look
        const xOffset = 80 + (Math.random() - 0.5) * 2
        const yOffset = y + (Math.random() - 0.5) * 1
        ctx.fillText(line, xOffset, yOffset)
        line = word
        y += lineSpacing
        if (y > canvas.height - 20) break
      } else {
        line = testLine
      }
    }
    if (line && y <= canvas.height - 20) {
      ctx.fillText(line, 80 + (Math.random() - 0.5) * 2, y)
    }
  }, [text, font, fontSize, paperColor, inkColor, lineSpacing])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'handwriting.png'
    a.click()
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('input')}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Font</label>
          <select
            value={font}
            onChange={(e) => setFont(Number(e.target.value))}
            className="w-full rounded-lg border bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {FONTS.map((f, i) => (
              <option key={i} value={i}>{f.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Size: {fontSize}px</label>
          <input
            type="range"
            min={16}
            max={48}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Line Spacing: {lineSpacing}px</label>
          <input
            type="range"
            min={30}
            max={60}
            value={lineSpacing}
            onChange={(e) => setLineSpacing(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Paper</label>
          <div className="flex gap-2">
            {PAPER_COLORS.map((p, i) => (
              <button
                key={i}
                onClick={() => setPaperColor(i)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  paperColor === i ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
                style={{ backgroundColor: p.bg }}
                title={p.name}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Ink</label>
          <div className="flex gap-2">
            {INK_COLORS.map((c, i) => (
              <button
                key={i}
                onClick={() => setInkColor(i)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  inkColor === i ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
                style={{ backgroundColor: c.color }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ aspectRatio: '4/3' }}
        />
      </div>

      <button
        onClick={download}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {t('download')} PNG
      </button>
    </div>
  )
}
