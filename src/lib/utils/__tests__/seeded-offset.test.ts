import { describe, it, expect } from 'vitest'
import { seededOffset } from '../seeded-offset'

describe('seededOffset', () => {
  it('is deterministic for a given seed', () => {
    expect(seededOffset(5)).toBe(seededOffset(5))
    expect(seededOffset(0)).toBe(seededOffset(0))
    expect(seededOffset(123)).toBe(seededOffset(123))
  })

  it('stays within [-0.5, 0.5) for a wide range of seeds', () => {
    for (let seed = 0; seed < 1000; seed++) {
      const value = seededOffset(seed)
      expect(value).toBeGreaterThanOrEqual(-0.5)
      expect(value).toBeLessThan(0.5)
    }
  })

  it('produces varied (not constant) offsets across seeds', () => {
    const values = new Set(Array.from({ length: 50 }, (_, i) => seededOffset(i)))
    expect(values.size).toBeGreaterThan(40)
  })
})
