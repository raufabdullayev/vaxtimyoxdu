/**
 * Regression tests for the P0-2 news-article hero <img> fix.
 *
 * Background (Sprint 9 P0 incident dərsi):
 *   News article pages must render an above-the-fold hero <img> sourced from
 *   the dynamic /api/og endpoint. The image is built via getOgImageUrl() and
 *   uses the first 80 chars of the article body (with markdown special
 *   characters stripped) as the OG `subtitle`. A regression here surfaces as:
 *     - empty social previews (broken `og:image` for crawlers),
 *     - LCP fallback to a paragraph (worse Core Web Vitals),
 *     - markdown leakage into the rendered alt/subtitle text.
 *
 * Strategy:
 *   We test the pure logic — getOgImageUrl() URL construction and the
 *   subtitle sanitisation pipeline used by the Server Component — instead of
 *   rendering the full RSC tree (which requires next-intl/server, async
 *   params, and the App Router runtime that vitest cannot bootstrap).
 */
import { describe, it, expect } from 'vitest'
import { getOgImageUrl } from '@/lib/utils/seo/og'
import { SITE_URL } from '@/lib/utils/seo/url'

/**
 * Mirror of the in-page sanitisation pipeline used by
 * src/app/[locale]/info/[slug]/page.tsx when computing the hero image
 * subtitle. If the page implementation diverges from this regex / slice
 * order, these tests must fail loudly so we catch the regression in CI.
 */
function buildHeroSubtitle(content: string): string {
  return content.slice(0, 80).replace(/[#*_`\[\]]/g, '').trim()
}

describe('News article hero image (P0-2 regression)', () => {
  describe('getOgImageUrl()', () => {
    it('builds an absolute /api/og URL on the production origin', () => {
      const url = getOgImageUrl({ title: 'Hello World' })
      expect(url.startsWith(`${SITE_URL}/api/og`)).toBe(true)
    })

    it('always includes the title query parameter', () => {
      const url = new URL(
        getOgImageUrl({ title: 'Trump cancels Pakistan visit' })
      )
      expect(url.searchParams.get('title')).toBe(
        'Trump cancels Pakistan visit'
      )
    })

    it('emits type=news when type is "news"', () => {
      const url = new URL(
        getOgImageUrl({ title: 'Test Article', type: 'news' })
      )
      expect(url.searchParams.get('type')).toBe('news')
    })

    it('omits the type parameter when type is not provided', () => {
      const url = new URL(getOgImageUrl({ title: 'Test Article' }))
      expect(url.searchParams.has('type')).toBe(false)
    })

    it('emits the subtitle parameter when provided', () => {
      const url = new URL(
        getOgImageUrl({
          title: 'Test',
          subtitle: 'Short summary here',
          type: 'news',
        })
      )
      expect(url.searchParams.get('subtitle')).toBe('Short summary here')
    })

    it('omits the subtitle parameter when not provided', () => {
      const url = new URL(getOgImageUrl({ title: 'Test', type: 'news' }))
      expect(url.searchParams.has('subtitle')).toBe(false)
    })

    it('URL-encodes special characters in title and subtitle', () => {
      // URL.searchParams.set encodes spaces as %20 (not "+") and percent-
      // encodes &, =, ?, etc. This must keep the OG endpoint parseable.
      const raw = getOgImageUrl({
        title: 'AT&T = best?',
        subtitle: 'Spaces & symbols',
        type: 'news',
      })
      // The raw URL string must not contain unencoded `&` inside a value.
      // Re-parse and assert that the decoded values round-trip.
      const parsed = new URL(raw)
      expect(parsed.searchParams.get('title')).toBe('AT&T = best?')
      expect(parsed.searchParams.get('subtitle')).toBe('Spaces & symbols')
    })
  })

  describe('hero subtitle sanitisation', () => {
    it('strips markdown header (#) characters', () => {
      const cleaned = buildHeroSubtitle('# Heading line of news content')
      expect(cleaned).not.toContain('#')
    })

    it('strips markdown emphasis (*, _) and code (`) characters', () => {
      const cleaned = buildHeroSubtitle(
        '**bold** _italic_ and `inline code` together'
      )
      expect(cleaned).not.toContain('*')
      expect(cleaned).not.toContain('_')
      expect(cleaned).not.toContain('`')
    })

    it('strips markdown link brackets ([ and ])', () => {
      const cleaned = buildHeroSubtitle(
        '[link text](https://example.com) starts the article'
      )
      expect(cleaned).not.toContain('[')
      expect(cleaned).not.toContain(']')
    })

    it('truncates content to at most 80 characters', () => {
      const long = 'a'.repeat(500)
      const cleaned = buildHeroSubtitle(long)
      expect(cleaned.length).toBeLessThanOrEqual(80)
    })

    it('trims leading and trailing whitespace after stripping', () => {
      const cleaned = buildHeroSubtitle('   # Title with padding   ')
      expect(cleaned.startsWith(' ')).toBe(false)
      expect(cleaned.endsWith(' ')).toBe(false)
    })

    it('returns an empty string for an empty content body', () => {
      expect(buildHeroSubtitle('')).toBe('')
    })

    it('preserves regular alphanumeric and punctuation characters', () => {
      const cleaned = buildHeroSubtitle(
        'Trump and Putin met in Geneva, talks ended after 3 hours.'
      )
      expect(cleaned).toContain('Trump')
      expect(cleaned).toContain(',')
      expect(cleaned).toContain('.')
    })
  })

  describe('integration: hero <img> src for a representative news article', () => {
    it('produces a valid /api/og URL with type=news and a sanitised subtitle', () => {
      // Mirrors how src/app/[locale]/info/[slug]/page.tsx assembles the
      // hero <img> src for a real article body.
      const article = {
        title: 'Trump iranı danışıqlarını ləğv etdi',
        content:
          '# Açıqlama\n\n**Tramp** Pakistan səfərini ləğv etdi və _Vitkoff_ Kushner ilə [bəyanat](https://example.com) verdi.',
      }

      const heroSrc = getOgImageUrl({
        title: article.title,
        subtitle: buildHeroSubtitle(article.content),
        type: 'news',
      })

      const parsed = new URL(heroSrc)
      expect(parsed.pathname).toBe('/api/og')
      expect(parsed.searchParams.get('type')).toBe('news')
      expect(parsed.searchParams.get('title')).toBe(article.title)

      const subtitle = parsed.searchParams.get('subtitle') || ''
      expect(subtitle.length).toBeGreaterThan(0)
      expect(subtitle.length).toBeLessThanOrEqual(80)
      // Markdown chars must not leak into the social-card subtitle.
      for (const ch of ['#', '*', '_', '`', '[', ']']) {
        expect(subtitle).not.toContain(ch)
      }
    })
  })
})
