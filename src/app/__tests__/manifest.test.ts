import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const manifestPath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'public',
  'manifest.json'
)
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
  name: string
  short_name: string
  theme_color: string
  background_color: string
  icons: Array<{ src: string; sizes: string; type: string; purpose: string }>
}

describe('public/manifest.json — PWA manifest', () => {
  describe('brand colors', () => {
    it('has theme_color set to warm amber #E68A00 (matches globals.css --primary)', () => {
      expect(manifest.theme_color).toBe('#E68A00')
    })

    it('has background_color set to warm cream', () => {
      expect(manifest.background_color).toBe('#FFFCF5')
    })
  })

  describe('icons array', () => {
    it('has exactly 4 icon entries (192 + 192-maskable + 512 + 512-maskable)', () => {
      expect(Array.isArray(manifest.icons)).toBe(true)
      expect(manifest.icons).toHaveLength(4)
    })

    it('has separate "any" and "maskable" purpose entries (W3C spec)', () => {
      const purposes = manifest.icons.map((i) => i.purpose)
      expect(purposes).toContain('any')
      expect(purposes).toContain('maskable')
      // The combined "any maskable" is deprecated — should NOT be present.
      expect(purposes).not.toContain('any maskable')
    })

    it('has a 192x192 any-purpose icon at /icons/icon-192.png', () => {
      const icon = manifest.icons.find(
        (i) => i.sizes === '192x192' && i.purpose === 'any'
      )
      expect(icon).toBeDefined()
      expect(icon?.src).toBe('/icons/icon-192.png')
      expect(icon?.type).toBe('image/png')
    })

    it('has a 192x192 maskable-purpose icon at /icons/icon-192-maskable.png', () => {
      const icon = manifest.icons.find(
        (i) => i.sizes === '192x192' && i.purpose === 'maskable'
      )
      expect(icon).toBeDefined()
      expect(icon?.src).toBe('/icons/icon-192-maskable.png')
    })

    it('has a 512x512 any-purpose icon at /icons/icon-512.png', () => {
      const icon = manifest.icons.find(
        (i) => i.sizes === '512x512' && i.purpose === 'any'
      )
      expect(icon).toBeDefined()
      expect(icon?.src).toBe('/icons/icon-512.png')
    })

    it('has a 512x512 maskable-purpose icon at /icons/icon-512-maskable.png', () => {
      const icon = manifest.icons.find(
        (i) => i.sizes === '512x512' && i.purpose === 'maskable'
      )
      expect(icon).toBeDefined()
      expect(icon?.src).toBe('/icons/icon-512-maskable.png')
    })
  })

  describe('referenced icon files exist on disk', () => {
    it.each(['/icons/icon-192.png', '/icons/icon-192-maskable.png', '/icons/icon-512.png', '/icons/icon-512-maskable.png'])(
      '%s is present in public/',
      (iconPath) => {
        const fullPath = path.join(__dirname, '..', '..', '..', 'public', iconPath)
        expect(fs.existsSync(fullPath)).toBe(true)
      }
    )

    it('public/favicon.ico multi-resolution fallback exists', () => {
      const icoPath = path.join(__dirname, '..', '..', '..', 'public', 'favicon.ico')
      expect(fs.existsSync(icoPath)).toBe(true)
      const stat = fs.statSync(icoPath)
      // Multi-res ICO should be at least ~5KB (16+32+48 RGBA PNGs)
      expect(stat.size).toBeGreaterThan(2000)
    })
  })
})
