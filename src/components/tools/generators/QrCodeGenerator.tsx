'use client'

import { useState, useRef, useCallback } from 'react'
import QRCode from 'qrcode'

export default function QrCodeGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const generate = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter text or URL')
      return
    }
    setError('')
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      })
      setQrDataUrl(url)
    } catch {
      setError('Failed to generate QR code')
    }
  }, [text, size, fgColor, bgColor])

  const download = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Text or URL</label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter URL, text, email, phone number..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Size (px)</label>
          <select
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value={128}>128x128</option>
            <option value={256}>256x256</option>
            <option value={512}>512x512</option>
            <option value={1024}>1024x1024</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Foreground</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-9 w-12 rounded border cursor-pointer"
            />
            <input
              type="text"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-9 w-12 rounded border cursor-pointer"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        onClick={generate}
        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Generate QR Code
      </button>

      {qrDataUrl && (
        <div className="flex flex-col items-center gap-4 p-6 bg-muted/50 rounded-lg">
          <img src={qrDataUrl} alt="Generated QR Code" className="rounded" />
          <button
            onClick={download}
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  )
}
