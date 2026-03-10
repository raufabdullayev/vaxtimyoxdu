/**
 * Generate PWA icons as static PNG files.
 *
 * This script creates simple placeholder icons using a raw PNG approach
 * (no external dependencies). The icons feature a purple-to-blue gradient
 * background with a white "V" letter, matching the site's branding.
 *
 * For production, replace these with professionally designed icons.
 *
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs')
const path = require('path')

// Minimal PNG generator - creates a solid-color PNG with a simple "V" shape
// This is intentionally simple; for better icons, use a design tool.

function createPNG(size) {
  // We'll create a simple canvas-like approach using raw pixel data
  const pixels = new Uint8Array(size * size * 4)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4

      // Gradient from purple (#7c3aed) to blue (#2563eb)
      const t = (x + y) / (size * 2)
      const r = Math.round(124 * (1 - t) + 37 * t)
      const g = Math.round(58 * (1 - t) + 99 * t)
      const b = Math.round(237 * (1 - t) + 235 * t)

      // Round corners
      const cx = x - size / 2
      const cy = y - size / 2
      const cornerRadius = size * 0.2
      const edgeDist = size / 2 - cornerRadius

      let inside = true
      if (Math.abs(cx) > edgeDist && Math.abs(cy) > edgeDist) {
        const dx = Math.abs(cx) - edgeDist
        const dy = Math.abs(cy) - edgeDist
        if (dx * dx + dy * dy > cornerRadius * cornerRadius) {
          inside = false
        }
      }

      if (!inside) {
        pixels[idx] = 0
        pixels[idx + 1] = 0
        pixels[idx + 2] = 0
        pixels[idx + 3] = 0
        continue
      }

      // Draw "V" letter
      const nx = x / size
      const ny = y / size
      const letterTop = 0.22
      const letterBottom = 0.78
      const letterLeft = 0.2
      const letterRight = 0.8
      const letterCenter = 0.5
      const strokeWidth = 0.1

      let isLetter = false
      if (ny >= letterTop && ny <= letterBottom) {
        const progress = (ny - letterTop) / (letterBottom - letterTop)
        // Left stroke of V
        const leftX = letterLeft + progress * (letterCenter - letterLeft)
        if (Math.abs(nx - leftX) < strokeWidth / 2) {
          isLetter = true
        }
        // Right stroke of V
        const rightX = letterRight - progress * (letterRight - letterCenter)
        if (Math.abs(nx - rightX) < strokeWidth / 2) {
          isLetter = true
        }
      }

      if (isLetter) {
        pixels[idx] = 255
        pixels[idx + 1] = 255
        pixels[idx + 2] = 255
        pixels[idx + 3] = 255
      } else {
        pixels[idx] = r
        pixels[idx + 1] = g
        pixels[idx + 2] = b
        pixels[idx + 3] = 255
      }
    }
  }

  return encodePNG(pixels, size, size)
}

function encodePNG(pixels, width, height) {
  // PNG file structure
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR chunk
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type: RGBA
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace

  // Raw image data with filter bytes
  const rawData = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    rawData[y * (1 + width * 4)] = 0 // No filter
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4
      const dstIdx = y * (1 + width * 4) + 1 + x * 4
      rawData[dstIdx] = pixels[srcIdx]
      rawData[dstIdx + 1] = pixels[srcIdx + 1]
      rawData[dstIdx + 2] = pixels[srcIdx + 2]
      rawData[dstIdx + 3] = pixels[srcIdx + 3]
    }
  }

  // Compress using zlib
  const zlib = require('zlib')
  const compressed = zlib.deflateSync(rawData)

  // Build chunks
  function makeChunk(type, data) {
    const typeBuffer = Buffer.from(type, 'ascii')
    const length = Buffer.alloc(4)
    length.writeUInt32BE(data.length, 0)
    const combined = Buffer.concat([typeBuffer, data])
    const crc = crc32(combined)
    const crcBuffer = Buffer.alloc(4)
    crcBuffer.writeUInt32BE(crc, 0)
    return Buffer.concat([length, combined, crcBuffer])
  }

  const ihdrChunk = makeChunk('IHDR', ihdr)
  const idatChunk = makeChunk('IDAT', compressed)
  const iendChunk = makeChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320
      } else {
        crc = crc >>> 1
      }
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

// Generate icons
const iconsDir = path.join(__dirname, '..', 'public', 'icons')
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

const sizes = [192, 512]
sizes.forEach((size) => {
  const png = createPNG(size)
  const filePath = path.join(iconsDir, `icon-${size}.png`)
  fs.writeFileSync(filePath, png)
  console.log(`Generated ${filePath} (${png.length} bytes)`)
})

console.log('PWA icons generated successfully!')
