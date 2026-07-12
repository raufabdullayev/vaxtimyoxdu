import { describe, it, expect } from 'vitest'
import { extractTextFromPdfBytes } from '../PdfToWord'

const encode = (s: string) => new TextEncoder().encode(s)

describe('extractTextFromPdfBytes', () => {
  it('extracts text from a Tj content stream', async () => {
    const pdf = [
      '%PDF-1.4',
      '1 0 obj << /Type /Page >> endobj',
      'stream',
      'BT (Hello World) Tj ET',
      'endstream',
    ].join('\n')

    const pages = await extractTextFromPdfBytes(encode(pdf))
    expect(pages).toEqual(['Hello World'])
  })

  it('extracts text from a TJ array operator', async () => {
    const pdf = [
      '%PDF-1.4',
      '<< /Type /Page >>',
      'stream',
      '[(Foo)-250(Bar)] TJ',
      'endstream',
    ].join('\n')

    const pages = await extractTextFromPdfBytes(encode(pdf))
    expect(pages).toEqual(['FooBar'])
  })

  it('reports monotonic progress ending at 1.0', async () => {
    const pdf = [
      '%PDF-1.4',
      '1 0 obj << /Type /Page >> endobj',
      'stream',
      'BT (Page one) Tj ET',
      'endstream',
    ].join('\n')

    const fractions: number[] = []
    await extractTextFromPdfBytes(encode(pdf), (f) => fractions.push(f))

    expect(fractions.length).toBeGreaterThan(0)
    expect(fractions[fractions.length - 1]).toBeCloseTo(1.0)
    for (let i = 1; i < fractions.length; i++) {
      expect(fractions[i]).toBeGreaterThanOrEqual(fractions[i - 1])
    }
  })

  it('returns an empty string per page when a page has no extractable text', async () => {
    const pdf = ['%PDF-1.4', '<< /Type /Page >>'].join('\n')
    const pages = await extractTextFromPdfBytes(encode(pdf))
    expect(pages).toEqual([''])
  })

  it('yields across many pages without changing output (no clamp regression)', async () => {
    // 40 pages > YIELD_INTERVAL (16) exercises the batched MessageChannel yield.
    const streams = Array.from({ length: 40 }, (_, i) =>
      ['stream', `BT (P${i}) Tj ET`, 'endstream'].join('\n')
    ).join('\n')
    const pages = Array.from({ length: 40 }, () => '/Type /Page').join('\n')
    const pdf = `%PDF-1.4\n${pages}\n${streams}`

    const result = await extractTextFromPdfBytes(encode(pdf))
    expect(result).toHaveLength(40)
    expect(result[0]).toBe('P0')
    expect(result[39]).toBe('P39')
  })
})
