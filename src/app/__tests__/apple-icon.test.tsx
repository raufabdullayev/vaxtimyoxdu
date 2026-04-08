import { describe, it, expect } from 'vitest'
import * as AppleIconModule from '@/app/apple-icon'

// Module-shape tests only. ImageResponse is not instantiated here — see
// icon.test.tsx for the rationale.

describe('app/apple-icon.tsx (iOS home screen icon)', () => {
  it('exports a 180x180 size (Apple touch icon standard)', () => {
    expect(AppleIconModule.size).toEqual({ width: 180, height: 180 })
  })

  it('exports image/png contentType', () => {
    expect(AppleIconModule.contentType).toBe('image/png')
  })

  it('exports a default function (AppleIcon)', () => {
    expect(typeof AppleIconModule.default).toBe('function')
    expect(AppleIconModule.default.name).toBe('AppleIcon')
  })
})
