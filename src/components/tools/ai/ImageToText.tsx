'use client'

import { useState, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'

type OcrLang = 'eng' | 'aze' | 'tur' | 'rus'

interface LangOption {
  value: OcrLang
  label: string
}

export default function ImageToText() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.ocrTool')

  const languages: LangOption[] = [
    { value: 'eng', label: t('langEnglish') },
    { value: 'aze', label: t('langAzerbaijani') },
    { value: 'tur', label: t('langTurkish') },
    { value: 'rus', label: t('langRussian') },
  ]

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [lang, setLang] = useState<OcrLang>('eng')
  const [extractedText, setExtractedText] = useState('')
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressStatus, setProgressStatus] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp']
  const MAX_SIZE = 20 * 1024 * 1024

  const validateFile = (f: File): boolean => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError(t('onlyImagesAllowed'))
      return false
    }
    if (f.size > MAX_SIZE) {
      setError(t('fileTooLarge'))
      return false
    }
    return true
  }

  const loadPreview = (f: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setError('')
    setExtractedText('')
    setProgress(0)
    setProgressStatus('')
    if (validateFile(selected)) {
      setFile(selected)
      loadPreview(selected)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    setError('')
    setExtractedText('')
    setProgress(0)
    setProgressStatus('')
    if (validateFile(dropped)) {
      setFile(dropped)
      loadPreview(dropped)
    }
  }

  const extractText = useCallback(async () => {
    if (!file) return

    setProcessing(true)
    setError('')
    setExtractedText('')
    setProgress(0)
    setProgressStatus(t('loadingEngine'))

    try {
      const Tesseract = await import('tesseract.js')

      const worker = await Tesseract.createWorker(lang, undefined, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
            setProgressStatus(t('recognizingText'))
          } else if (m.status === 'loading language traineddata') {
            setProgressStatus(t('loadingLanguage'))
          } else if (m.status === 'initializing api') {
            setProgressStatus(t('initializingEngine'))
          }
        },
      })

      const { data } = await worker.recognize(file)
      setExtractedText(data.text)
      await worker.terminate()
    } catch {
      setError(t('extractionFailed'))
    } finally {
      setProcessing(false)
      setProgress(0)
      setProgressStatus('')
    }
  }, [file, lang, t])

  const copyToClipboard = async () => {
    if (!extractedText) return
    await navigator.clipboard.writeText(extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsTxt = () => {
    if (!extractedText) return
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const baseName = file?.name?.replace(/\.[^.]+$/, '') || 'extracted-text'
    a.download = `${baseName}.txt`
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
    setPreview(null)
    setError('')
    setExtractedText('')
    setProcessing(false)
    setProgress(0)
    setProgressStatus('')
    setCopied(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Language selector */}
      <div>
        <label className="block text-sm font-medium mb-2">{t('selectLanguage')}</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l.value}
              onClick={() => setLang(l.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                lang === l.value
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* File upload area */}
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
            accept="image/png,image/jpeg,image/webp,image/bmp"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-sm font-medium">{t('clickToSelectImage')}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('supportedFormats')}</p>
        </div>
      </div>

      {/* File info + preview */}
      {file && (
        <div className="space-y-3">
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

          {preview && (
            <div className="rounded-lg border overflow-hidden">
              <img
                src={preview}
                alt={t('imagePreview')}
                className="max-h-64 w-full object-contain bg-muted/30"
              />
            </div>
          )}
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Progress bar */}
      {processing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{progressStatus}</span>
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

      {/* Extract button */}
      <button
        onClick={extractText}
        disabled={!file || processing}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {processing ? tc('processing') : t('extractText')}
      </button>

      {/* Extracted text output */}
      {extractedText && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t('extractedText')}</label>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="text-xs text-primary hover:underline"
              >
                {copied ? tc('copied') : tc('copy')}
              </button>
              <button
                onClick={downloadAsTxt}
                className="text-xs text-primary hover:underline"
              >
                {tc('download')} .txt
              </button>
            </div>
          </div>
          <textarea
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">
            {extractedText.length} {t('characters')}
          </p>
        </div>
      )}
    </div>
  )
}
