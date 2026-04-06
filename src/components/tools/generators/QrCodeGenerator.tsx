'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import QRCode from 'qrcode'
import { ToolTextarea, ToolSelect, ToolInput, ToolAlert } from '@/components/ui'

export default function QrCodeGenerator() {
  const t = useTranslations('toolUI.genTools')
  const [text, setText] = useState('')
  const [size, setSize] = useState('256')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const generate = useCallback(async () => {
    if (!text.trim()) {
      setError(t('pleaseEnterTextOrUrl'))
      return
    }
    setError('')
    try {
      const url = await QRCode.toDataURL(text, {
        width: Number(size),
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      })
      setQrDataUrl(url)
    } catch {
      setError(t('failedToGenerateQr'))
    }
  }, [text, size, fgColor, bgColor, t])

  const download = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <div className="space-y-6">
      <ToolTextarea
        label={t('textOrUrl')}
        className="min-h-[80px]"
        placeholder={t('enterUrlText')}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ToolSelect
          label={`${t('size')} (px)`}
          value={size}
          onChange={(e) => setSize(e.target.value)}
          options={[
            { value: '128', label: '128x128' },
            { value: '256', label: '256x256' },
            { value: '512', label: '512x512' },
            { value: '1024', label: '1024x1024' },
          ]}
        />
        <div>
          <ToolInput
            label={t('foreground')}
            type="text"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="h-9 w-12 rounded border cursor-pointer mt-1"
            aria-label={t('foreground') + ' color picker'}
          />
        </div>
        <div>
          <ToolInput
            label={t('background')}
            type="text"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="h-9 w-12 rounded border cursor-pointer mt-1"
            aria-label={t('background') + ' color picker'}
          />
        </div>
      </div>

      {error && <ToolAlert variant="error">{error}</ToolAlert>}

      <button
        onClick={generate}
        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {t('generateQrCode')}
      </button>

      {qrDataUrl && (
        <div className="flex flex-col items-center gap-4 p-6 bg-muted/50 rounded-lg">
          <img src={qrDataUrl} alt="Generated QR Code" className="rounded" />
          <button
            onClick={download}
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            {t('downloadPng')}
          </button>
        </div>
      )}
    </div>
  )
}
