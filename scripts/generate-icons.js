/**
 * Generate brand icons for vaxtimyoxdu.com.
 *
 * Renders a Zap (lightning bolt) lucide-react symbol on a solid #2563eb
 * (Tailwind blue-600, matches globals.css --primary and the Header icon).
 *
 * Outputs (all written to public/):
 *   icons/icon-192.png          — PWA any
 *   icons/icon-192-maskable.png — PWA maskable (80% safe zone)
 *   icons/icon-512.png          — PWA any
 *   icons/icon-512-maskable.png — PWA maskable (80% safe zone)
 *   favicon.ico                 — multi-res (16 + 32 + 48) legacy fallback
 *
 * Keep the COLOR and SVG path in sync with:
 *   src/app/icon.tsx
 *   src/app/apple-icon.tsx
 *   src/components/layout/Header.tsx (Zap from lucide-react)
 *   public/manifest.json theme_color
 *   src/app/layout.tsx viewport.themeColor
 *
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
// png-to-ico ships both a default export (ESM) and a CJS wrapper.
// Pick whichever form is present so the script works in both environments.
const pngToIcoModule = require('png-to-ico')
const pngToIco = pngToIcoModule.default || pngToIcoModule

// ── Brand tokens ─────────────────────────────────────────────────────
const BRAND_BG = '#2563eb' // Tailwind blue-600 = globals.css --primary (light mode)
const BRAND_FG = '#ffffff'

// lucide-react Zap path, same source of truth as src/app/icon.tsx
// https://github.com/lucide-icons/lucide/blob/main/icons/zap.svg
const ZAP_PATH = 'M13 2 3 14h9l-1 8 10-12h-9l1-8z'

/**
 * Build an SVG string for a square icon of the given canvas size.
 *
 * @param {number} canvas  Total width/height of the PNG to generate
 * @param {object} options
 * @param {number} options.boltScale  Bolt size as a fraction of canvas (0..1)
 * @param {number} options.radiusRatio Background corner radius as a fraction of canvas
 */
function buildSvg(canvas, { boltScale, radiusRatio }) {
  const radius = Math.round(canvas * radiusRatio)
  const boltSize = Math.round(canvas * boltScale)
  const boltOffset = Math.round((canvas - boltSize) / 2)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas}" height="${canvas}" viewBox="0 0 ${canvas} ${canvas}">
    <rect width="${canvas}" height="${canvas}" rx="${radius}" ry="${radius}" fill="${BRAND_BG}"/>
    <g transform="translate(${boltOffset} ${boltOffset}) scale(${boltSize / 24})">
      <path d="${ZAP_PATH}" fill="${BRAND_FG}"/>
    </g>
  </svg>`
}

async function renderPng(svg, outPath) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath)
  const bytes = fs.statSync(outPath).size
  console.log(`  ✓ ${path.relative(process.cwd(), outPath)} (${bytes} bytes)`)
}

async function main() {
  const projectRoot = path.join(__dirname, '..')
  const iconsDir = path.join(projectRoot, 'public', 'icons')
  const publicDir = path.join(projectRoot, 'public')

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true })
  }

  console.log('Rendering brand icons…')

  // ── PWA icons: "any" purpose ───────────────────────────────────────
  // Full-bleed background, bolt ~55% of canvas for a balanced look.
  // rx ≈ 22% matches iOS squircle feel for Android adaptive backgrounds.
  for (const size of [192, 512]) {
    const svg = buildSvg(size, { boltScale: 0.55, radiusRatio: 0.22 })
    await renderPng(svg, path.join(iconsDir, `icon-${size}.png`))
  }

  // ── PWA icons: "maskable" purpose ──────────────────────────────────
  // Android applies a circle mask. W3C spec: content must live inside
  // the inner 80% (40% radius from center). We shrink the bolt to 40%
  // of the canvas so it fits well inside the safe zone, and keep the
  // background full-bleed (no rounded corners — the mask handles it).
  for (const size of [192, 512]) {
    const svg = buildSvg(size, { boltScale: 0.4, radiusRatio: 0 })
    await renderPng(svg, path.join(iconsDir, `icon-${size}-maskable.png`))
  }

  // ── favicon.ico (16 + 32 + 48 multi-resolution) ────────────────────
  // Tiny sizes: use a smaller corner radius (~6px for 32, scaled) and
  // a chunkier bolt (~62%) so the shape survives aggressive downscaling.
  console.log('Rendering favicon.ico sources…')
  const icoSizes = [16, 32, 48]
  const tmpIcoPngs = []
  for (const size of icoSizes) {
    const svg = buildSvg(size, { boltScale: 0.62, radiusRatio: 0.19 })
    const tmpPath = path.join(iconsDir, `.tmp-favicon-${size}.png`)
    await renderPng(svg, tmpPath)
    tmpIcoPngs.push(tmpPath)
  }

  const icoBuffer = await pngToIco(tmpIcoPngs)
  const icoPath = path.join(publicDir, 'favicon.ico')
  fs.writeFileSync(icoPath, icoBuffer)
  console.log(
    `  ✓ ${path.relative(process.cwd(), icoPath)} (${icoBuffer.length} bytes, ${icoSizes.length} resolutions)`
  )

  // Clean up temp files
  for (const tmp of tmpIcoPngs) {
    fs.unlinkSync(tmp)
  }

  console.log('\nBrand icons generated successfully.')
}

main().catch((err) => {
  console.error('Icon generation failed:', err)
  process.exit(1)
})
