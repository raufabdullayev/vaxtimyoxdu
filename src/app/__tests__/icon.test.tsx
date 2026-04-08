import { describe, it, expect } from 'vitest'
import * as IconModule from '@/app/icon'

// These tests verify the module shape of src/app/icon.tsx without actually
// instantiating ImageResponse (which requires Satori + fonts at runtime and
// is not available in the vitest environment). The goal is to catch
// accidental syntax errors in the SVG JSX and config regressions.

describe('app/icon.tsx (browser tab favicon)', () => {
  it('exports a 32x32 size', () => {
    expect(IconModule.size).toEqual({ width: 32, height: 32 })
  })

  it('exports image/png contentType', () => {
    expect(IconModule.contentType).toBe('image/png')
  })

  it('exports a default function (Icon)', () => {
    expect(typeof IconModule.default).toBe('function')
    expect(IconModule.default.name).toBe('Icon')
  })
})
