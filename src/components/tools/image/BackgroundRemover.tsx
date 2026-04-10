'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function BackgroundRemover() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.backgroundRemover')
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultBlobRef = useRef<Blob | null>(null)

  const validateFile = (f: File): boolean => {
    if (!f.type.startsWith('image/')) {
      setError(t('pleaseSelectImage'))
      return false
    }
    if (f.size > 20 * 1024 * 1024) {
      setError(t('fileTooLarge'))
      return false
    }
    return true
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setError('')
    setResultUrl(null)
    resultBlobRef.current = null
    setProgress(0)
    if (validateFile(selected)) {
      setFile(selected)
      setOriginalUrl(URL.createObjectURL(selected))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    setError('')
    setResultUrl(null)
    resultBlobRef.current = null
    setProgress(0)
    if (validateFile(dropped)) {
      setFile(dropped)
      setOriginalUrl(URL.createObjectURL(dropped))
    }
  }

  const removeBackground = async () => {
    if (!file) return

    setProcessing(true)
    setError('')
    setProgress(0)
    setResultUrl(null)
    resultBlobRef.current = null

    try {
      const { removeBackground: removeBg } = await import('@imgly/background-removal')
      const blob = await removeBg(file, {
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) {
            setProgress(Math.round((current / total) * 100))
          }
        },
        output: {
          format: 'image/png',
          quality: 0.9,
        },
      })
      resultBlobRef.current = blob
      setResultUrl(URL.createObjectURL(blob))
    } catch {
      setError(t('processError'))
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!resultBlobRef.current) return
    const url = URL.createObjectURL(resultBlobRef.current)
    const a = document.createElement('a')
    a.href = url
    const baseName = file?.name?.replace(/\.[^.]+$/, '') || 'image'
    a.download = `${baseName}-no-bg.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const reset = () => {
    setFile(null)
    setOriginalUrl(null)
    setResultUrl(null)
    setError('')
    setProcessing(false)
    setProgress(0)
    resultBlobRef.current = null
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('selectImage')}</label>
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              fileInputRef.current?.click()
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-sm font-medium">{t('clickToSelect')}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('maxFileSize')}</p>
        </div>
      </div>

      {file && (
        <div className="flex items-center justify-between p-3 rounded-lg border text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="truncate">{file.name}</span>
            <span className="text-muted-foreground text-xs shrink-0">
              ({formatSize(file.size)})
            </span>
          </div>
          <button
            onClick={reset}
            className="p-1 hover:bg-destructive/10 text-destructive rounded ml-2 shrink-0"
            title={tc('clear')}
          >
            ✕
          </button>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={removeBackground}
          disabled={!file || processing}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {processing ? t('processing') : t('removeBg')}
        </button>

        {resultUrl && (
          <button
            onClick={download}
            className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            {tc('download')}
          </button>
        )}
      </div>

      {processing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t('processingNote')}</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {(originalUrl || resultUrl) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {originalUrl && (
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">
                {t('original')}
              </label>
              <div className="border rounded-lg overflow-hidden bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>
            </div>
          )}
          {resultUrl && (
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">
                {t('result')}
              </label>
              <div
                className="border rounded-lg overflow-hidden"
                style={{
                  backgroundImage:
                    'repeating-conic-gradient(#d4d4d4 0% 25%, #fff 0% 50%)',
                  backgroundSize: '16px 16px',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resultUrl}
                  alt="Background removed"
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {resultUrl && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm">
          {t('success')}
        </div>
      )}
    </div>
  )
}
