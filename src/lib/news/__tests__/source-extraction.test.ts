import { describe, expect, it } from 'vitest'
import { extractNewsSourceNames } from '../source-extraction'

describe('extractNewsSourceNames', () => {
  it('returns known sources in article order without duplicates', () => {
    const content = 'According to CNN and Reuters, the update was later confirmed by CNN and Bloomberg.'

    expect(extractNewsSourceNames(content)).toEqual(['CNN', 'Reuters', 'Bloomberg'])
  })

  it('does not match short source names inside longer words', () => {
    const content = 'Aprel ayinda Reuters məlumat yayıb.'

    expect(extractNewsSourceNames(content)).toEqual(['Reuters'])
  })
})
