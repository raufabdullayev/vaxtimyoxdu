'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'

interface MemeTemplate {
  id: string
  name: string
  color: string
  width: number
  height: number
}

const MEME_TEMPLATES: MemeTemplate[] = [
  { id: 'drake', name: 'Drake Hotline Bling', color: '#f5e6d3', width: 600, height: 600 },
  { id: 'distracted', name: 'Distracted Boyfriend', color: '#d4e6f1', width: 800, height: 500 },
  { id: 'brain', name: 'Expanding Brain', color: '#e8daef', width: 600, height: 800 },
  { id: 'button', name: 'Two Buttons', color: '#fadbd8', width: 600, height: 500 },
  { id: 'change-my-mind', name: 'Change My Mind', color: '#d5f5e3', width: 800, height: 500 },
  { id: 'aliens', name: 'Ancient Aliens', color: '#fdebd0', width: 600, height: 600 },
  { id: 'one-does-not', name: 'One Does Not Simply', color: '#d6dbdf', width: 800, height: 500 },
  { id: 'success-kid', name: 'Success Kid', color: '#aed6f1', width: 600, height: 600 },
  { id: 'bad-luck', name: 'Bad Luck Brian', color: '#f9e79f', width: 600, height: 600 },
  { id: 'doge', name: 'Doge', color: '#fce4d6', width: 600, height: 600 },
  { id: 'roll-safe', name: 'Roll Safe', color: '#d4efdf', width: 800, height: 500 },
  { id: 'pikachu', name: 'Surprised Pikachu', color: '#fcf3cf', width: 600, height: 500 },
  { id: 'this-is-fine', name: 'This Is Fine', color: '#f5b7b1', width: 800, height: 450 },
  { id: 'stonks', name: 'Stonks', color: '#d4e6f1', width: 800, height: 500 },
  { id: 'blank', name: 'Blank Canvas', color: '#ffffff', width: 800, height: 600 },
]

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  align: 'top' | 'bottom'
): void {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)

  const totalHeight = lines.length * lineHeight
  let startY = align === 'top' ? y : y - totalHeight

  for (const line of lines) {
    // Stroke (outline)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 4
    ctx.lineJoin = 'round'
    ctx.strokeText(line, x, startY)
    // Fill
    ctx.fillText(line, x, startY)
    startY += lineHeight
  }
}

export default function MemeGenerator() {
  const t = useTranslations('toolUI.memeGenerator')
  const tc = useTranslations('toolUI.common')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [template, setTemplate] = useState<MemeTemplate>(MEME_TEMPLATES[0])
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [fontSize, setFontSize] = useState(36)
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [customImage, setCustomImage] = useState<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = customImage ? customImage.width : template.width
    const h = customImage ? customImage.height : template.height
    canvas.width = w
    canvas.height = h

    if (customImage) {
      ctx.drawImage(customImage, 0, 0)
    } else {
      // Draw placeholder template
      ctx.fillStyle = template.color
      ctx.fillRect(0, 0, w, h)

      // Template name label
      ctx.fillStyle = '#666666'
      ctx.font = 'bold 20px Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(template.name, w / 2, h / 2)

      // Dashed border
      ctx.strokeStyle = '#cccccc'
      ctx.lineWidth = 2
      ctx.setLineDash([8, 4])
      ctx.strokeRect(10, 10, w - 20, h - 20)
      ctx.setLineDash([])
    }

    // Set text style
    ctx.fillStyle = textColor
    ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    const padding = 20
    const maxWidth = w - padding * 2
    const lineHeight = fontSize * 1.2

    // Top text
    if (topText) {
      wrapText(ctx, topText.toUpperCase(), w / 2, padding, maxWidth, lineHeight, 'top')
    }

    // Bottom text
    if (bottomText) {
      ctx.textBaseline = 'bottom'
      wrapText(ctx, bottomText.toUpperCase(), w / 2, h - padding, maxWidth, lineHeight, 'bottom')
    }

    // Watermark
    ctx.globalAlpha = 0.4
    ctx.fillStyle = '#888888'
    ctx.font = '12px Arial, sans-serif'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.strokeText('vaxtimyoxdu.com', w - 8, h - 6)
    ctx.fillText('vaxtimyoxdu.com', w - 8, h - 6)
    ctx.globalAlpha = 1
  }, [template, topText, bottomText, fontSize, textColor, customImage])

  useEffect(() => {
    drawMeme()
  }, [drawMeme])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `meme-${template.id}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Revoke previous object URL to prevent memory leak
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
    }
    const img = new Image()
    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    img.onload = () => {
      setCustomImage(img)
    }
    img.src = url
  }

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  const clearCustomImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setCustomImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Template Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">{t('selectTemplate')}</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {MEME_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => { setTemplate(tpl); setCustomImage(null) }}
              className={`p-2 rounded-lg border-2 text-xs text-center transition-all hover:shadow-md ${
                template.id === tpl.id && !customImage
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-transparent hover:border-muted-foreground/30'
              }`}
            >
              <div
                className="w-full aspect-square rounded mb-1"
                style={{ backgroundColor: tpl.color }}
              />
              <span className="line-clamp-1">{tpl.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">{t('orUploadImage')}</label>
        <div className="flex gap-2 items-center">
          <div
            className="flex-1 border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:border-primary transition-colors text-sm"
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                fileInputRef.current?.click()
              }
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {customImage ? t('imageUploaded') : t('clickToUpload')}
          </div>
          {customImage && (
            <button
              onClick={clearCustomImage}
              className="p-2 hover:bg-destructive/10 text-destructive rounded shrink-0"
              title={tc('clear')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Text Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">{t('topText')}</label>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder={t('topTextPlaceholder')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">{t('bottomText')}</label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder={t('bottomTextPlaceholder')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">
            {t('fontSize')}: {fontSize}px
          </label>
          <input
            type="range"
            min={16}
            max={72}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">{t('textColor')}</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10 rounded-lg border cursor-pointer"
          />
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="rounded-lg border overflow-hidden bg-muted/30">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ maxHeight: '500px', objectFit: 'contain' }}
        />
      </div>

      {/* Download */}
      <button
        onClick={download}
        className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {tc('download')} PNG
      </button>
    </div>
  )
}
