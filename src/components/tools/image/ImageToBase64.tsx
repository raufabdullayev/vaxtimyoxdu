'use client'

import { useState, useRef } from 'react'

export default function ImageToBase64() {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [base64Output, setBase64Output] = useState('')
  const [dataUri, setDataUri] = useState('')
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string; type: string } | null>(null)
  const [outputFormat, setOutputFormat] = useState<'datauri' | 'base64' | 'css' | 'html'>('datauri')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, GIF, WebP, SVG).')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be under 5 MB for Base64 encoding.')
      return
    }

    setError('')
    setFileInfo({
      name: file.name,
      size: file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type,
    })

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setDataUri(result)
      setBase64Output(result.split(',')[1] || '')
      setImageSrc(result)
    }
    reader.onerror = () => {
      setError('Failed to read file.')
    }
    reader.readAsDataURL(file)
  }

  const getOutput = (): string => {
    if (!base64Output) return ''
    switch (outputFormat) {
      case 'datauri':
        return dataUri
      case 'base64':
        return base64Output
      case 'css':
        return `background-image: url(${dataUri});`
      case 'html':
        return `<img src="${dataUri}" alt="" />`
      default:
        return dataUri
    }
  }

  const output = getOutput()

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setImageSrc('')
    setBase64Output('')
    setDataUri('')
    setFileInfo(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      {/* File input */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-primary-foreground file:text-sm file:font-medium file:cursor-pointer"
          aria-label="Upload image file"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Supports JPEG, PNG, GIF, WebP, SVG. Max 5 MB.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {/* Image preview */}
      {imageSrc && (
        <div>
          <label className="block text-sm font-medium mb-1">Preview</label>
          <div className="rounded-lg border p-4 bg-muted/30 flex justify-center">
            <img
              src={imageSrc}
              alt="Preview"
              className="max-h-48 max-w-full object-contain rounded"
            />
          </div>
        </div>
      )}

      {/* File info */}
      {fileInfo && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Name</div>
            <div className="text-sm font-medium mt-1 truncate" title={fileInfo.name}>{fileInfo.name}</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Size</div>
            <div className="text-sm font-medium mt-1">{fileInfo.size}</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xs text-muted-foreground">Type</div>
            <div className="text-sm font-medium mt-1">{fileInfo.type}</div>
          </div>
        </div>
      )}

      {/* Output format */}
      {base64Output && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Output Format</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'datauri' as const, label: 'Data URI' },
                { value: 'base64' as const, label: 'Base64 Only' },
                { value: 'css' as const, label: 'CSS Background' },
                { value: 'html' as const, label: 'HTML <img>' },
              ].map((fmt) => (
                <button
                  key={fmt.value}
                  onClick={() => setOutputFormat(fmt.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    outputFormat === fmt.value
                      ? 'bg-primary text-primary-foreground'
                      : 'border hover:bg-accent'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium">
                Result ({output.length.toLocaleString()} characters)
              </label>
              <div className="flex gap-3">
                <button onClick={copy} className="text-xs text-primary hover:underline">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={clear} className="text-xs text-muted-foreground hover:underline">
                  Clear
                </button>
              </div>
            </div>
            <textarea
              className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-xs font-mono min-h-[150px] focus:outline-none break-all"
              value={output}
              readOnly
            />
          </div>
        </>
      )}
    </div>
  )
}
