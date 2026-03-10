'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export default function ImageCrop() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null)
  const [naturalWidth, setNaturalWidth] = useState(0)
  const [naturalHeight, setNaturalHeight] = useState(0)
  const [crop, setCrop] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (!selected.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP)')
      return
    }
    if (selected.size > 20 * 1024 * 1024) {
      setError('File too large. Maximum size is 20MB.')
      return
    }

    setError('')
    setCroppedUrl(null)
    setFile(selected)

    const url = URL.createObjectURL(selected)
    setImageUrl(url)

    const img = new Image()
    img.onload = () => {
      setNaturalWidth(img.naturalWidth)
      setNaturalHeight(img.naturalHeight)
      setCrop({ x: 0, y: 0, width: 0, height: 0 })
    }
    img.src = url
  }

  const getRelativePos = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current || !imgRef.current) return { x: 0, y: 0 }
      const rect = imgRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height))
      return { x, y }
    },
    []
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const pos = getRelativePos(e.clientX, e.clientY)
      setDragStart(pos)
      setCrop({ x: pos.x, y: pos.y, width: 0, height: 0 })
      setDragging(true)
      setCroppedUrl(null)
    },
    [getRelativePos]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return
      const pos = getRelativePos(e.clientX, e.clientY)
      const x = Math.min(dragStart.x, pos.x)
      const y = Math.min(dragStart.y, pos.y)
      const width = Math.abs(pos.x - dragStart.x)
      const height = Math.abs(pos.y - dragStart.y)
      setCrop({ x, y, width, height })
    },
    [dragging, dragStart, getRelativePos]
  )

  const handleMouseUp = useCallback(() => {
    setDragging(false)
  }, [])

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      const pos = getRelativePos(touch.clientX, touch.clientY)
      setDragStart(pos)
      setCrop({ x: pos.x, y: pos.y, width: 0, height: 0 })
      setDragging(true)
      setCroppedUrl(null)
    },
    [getRelativePos]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging || e.touches.length !== 1) return
      e.preventDefault()
      const touch = e.touches[0]
      const pos = getRelativePos(touch.clientX, touch.clientY)
      const x = Math.min(dragStart.x, pos.x)
      const y = Math.min(dragStart.y, pos.y)
      const width = Math.abs(pos.x - dragStart.x)
      const height = Math.abs(pos.y - dragStart.y)
      setCrop({ x, y, width, height })
    },
    [dragging, dragStart, getRelativePos]
  )

  const handleTouchEnd = useCallback(() => {
    setDragging(false)
  }, [])

  const cropImage = async () => {
    if (!file || !imageUrl || !imgRef.current) return
    if (crop.width < 5 || crop.height < 5) {
      setError('Please draw a crop area on the image')
      return
    }

    setProcessing(true)
    setError('')

    try {
      const displayedWidth = imgRef.current.clientWidth
      const displayedHeight = imgRef.current.clientHeight
      const scaleX = naturalWidth / displayedWidth
      const scaleY = naturalHeight / displayedHeight

      const sx = Math.round(crop.x * scaleX)
      const sy = Math.round(crop.y * scaleY)
      const sw = Math.round(crop.width * scaleX)
      const sh = Math.round(crop.height * scaleY)

      const img = new Image()
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
      })
      img.src = imageUrl
      await loadPromise

      const canvas = document.createElement('canvas')
      canvas.width = sw
      canvas.height = sh
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)

      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Crop failed'))),
          outputType,
          0.92
        )
      })

      const url = URL.createObjectURL(blob)
      setCroppedUrl(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Crop failed')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!croppedUrl || !file) return
    const a = document.createElement('a')
    a.href = croppedUrl
    const ext = file.type === 'image/png' ? 'png' : 'jpg'
    a.download = `cropped-${file.name.replace(/\.[^.]+$/, '')}.${ext}`
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
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          {file ? (
            <p className="text-sm">
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground ml-2">
                ({naturalWidth} x {naturalHeight})
              </span>
            </p>
          ) : (
            <div>
              <p className="text-sm font-medium">Click to select an image</p>
              <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP (max 20MB)</p>
            </div>
          )}
        </div>
      </div>

      {imageUrl && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Draw crop area on the image
          </label>
          <div
            ref={containerRef}
            className="relative inline-block rounded-lg border overflow-hidden select-none cursor-crosshair"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Source"
              className="max-w-full max-h-[500px] block"
              draggable={false}
            />
            {/* Overlay */}
            {crop.width > 0 && crop.height > 0 && (
              <>
                <div
                  className="absolute inset-0 bg-black/40 pointer-events-none"
                  style={{
                    clipPath: `polygon(
                      0 0, 100% 0, 100% 100%, 0 100%, 0 0,
                      ${crop.x}px ${crop.y}px,
                      ${crop.x}px ${crop.y + crop.height}px,
                      ${crop.x + crop.width}px ${crop.y + crop.height}px,
                      ${crop.x + crop.width}px ${crop.y}px,
                      ${crop.x}px ${crop.y}px
                    )`,
                  }}
                />
                <div
                  className="absolute border-2 border-white border-dashed pointer-events-none"
                  style={{
                    left: crop.x,
                    top: crop.y,
                    width: crop.width,
                    height: crop.height,
                  }}
                />
              </>
            )}
          </div>
          {crop.width > 0 && crop.height > 0 && imgRef.current && (
            <p className="text-xs text-muted-foreground mt-1">
              Selection: {Math.round(crop.width * (naturalWidth / imgRef.current.clientWidth))} x{' '}
              {Math.round(crop.height * (naturalHeight / imgRef.current.clientHeight))} px
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          onClick={cropImage}
          disabled={!file || processing || crop.width < 5 || crop.height < 5}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {processing ? 'Cropping...' : 'Crop Image'}
        </button>

        {croppedUrl && (
          <button
            onClick={download}
            className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Download
          </button>
        )}
      </div>

      {croppedUrl && (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Cropped Result</label>
          <div className="flex justify-center">
            <img
              src={croppedUrl}
              alt="Cropped preview"
              className="max-w-full max-h-[400px] rounded-lg border"
            />
          </div>
        </div>
      )}
    </div>
  )
}
