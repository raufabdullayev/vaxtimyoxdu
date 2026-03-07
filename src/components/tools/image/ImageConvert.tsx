'use client'

import { useState, useRef } from 'react'

const formats = [
  { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
]

export default function ImageConvert() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState('image/png')
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (!selected.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    if (selected.size > 20 * 1024 * 1024) {
      setError('File too large. Maximum size is 20MB.')
      return
    }

    setError('')
    setFile(selected)
    setConvertedUrl(null)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  const convert = async () => {
    if (!file) return
    setProcessing(true)
    setError('')

    try {
      const img = new Image()
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
      })
      img.src = URL.createObjectURL(file)
      await loadPromise

      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Conversion failed'))),
          outputFormat,
          0.92
        )
      })

      setConvertedUrl(URL.createObjectURL(blob))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!convertedUrl || !file) return
    const fmt = formats.find((f) => f.value === outputFormat)
    const a = document.createElement('a')
    a.href = convertedUrl
    a.download = `${file.name.replace(/\.[^.]+$/, '')}.${fmt?.ext || 'png'}`
    a.click()
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {file ? (
            <p className="text-sm">
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground ml-2">({file.type})</span>
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">Click to select an image</p>
              <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP, GIF, BMP, SVG</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Convert To</label>
        <div className="flex flex-wrap gap-2">
          {formats.map((f) => (
            <button
              key={f.value}
              onClick={() => setOutputFormat(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                outputFormat === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <button
        onClick={convert}
        disabled={!file || processing}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {processing ? 'Converting...' : 'Convert Image'}
      </button>

      {convertedUrl && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={convertedUrl}
              alt="Converted preview"
              className="max-w-full max-h-[400px] rounded-lg border"
            />
          </div>
          <button
            onClick={download}
            className="w-full sm:w-auto px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Download Converted Image
          </button>
        </div>
      )}
    </div>
  )
}
