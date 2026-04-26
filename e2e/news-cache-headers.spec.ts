import { test, expect } from '@playwright/test'

/**
 * Regression suite for the two SEO P0 fixes shipped on 2026-04-26:
 *
 *  P0-1: Cache-Control headers for SSG HTML pages.
 *        next.config.js applies a catch-all header rule
 *        (`public, s-maxage=3600, stale-while-revalidate=86400`) to every
 *        non-asset, non-API path. Without it, Vercel served HTML with
 *        `private, no-cache, no-store`, which produced
 *        `x-vercel-cache: MISS` on every request, +200-400ms TTFB,
 *        and crawl-budget exhaustion.
 *
 *  P0-2: News-article hero <img>.
 *        src/app/[locale]/info/[slug]/page.tsx must render a hero image
 *        sourced from /api/og (with type=news) above the fold so that the
 *        social-share card and LCP element are correct.
 *
 * The cache-header assertions are gated on the test running against a
 * production-style host (HTTPS or NODE_ENV=production), because `next dev`
 * serves all HTML with `no-store` regardless of next.config.js header rules.
 */

const isProductionTarget = (() => {
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || ''
  return process.env.NODE_ENV === 'production' || baseUrl.startsWith('https://')
})()

/**
 * Pull the first /info/<slug> link out of the news index page so we always
 * test against a real, published article without hard-coding a slug that
 * could be deleted or renamed.
 */
async function findFirstNewsSlug(
  request: import('@playwright/test').APIRequestContext
): Promise<string | null> {
  const indexResp = await request.get('/info')
  if (!indexResp.ok()) return null
  const html = await indexResp.text()
  // Match the first absolute or relative /info/<slug> link, skipping pure
  // category/tag fragments. Slugs are lowercased ASCII with hyphens.
  const match = html.match(/href="(?:https?:\/\/[^"\/]+)?\/info\/([a-z0-9-]+)"/i)
  return match ? match[1] : null
}

test.describe('News article — Cache-Control headers (P0-1 regression)', () => {
  test('news index page advertises public, s-maxage Cache-Control', async ({
    request,
  }) => {
    test.skip(
      !isProductionTarget,
      'Cache-Control catch-all header is only applied by `next start` / Vercel; ' +
        '`next dev` always sets `no-store`. Run against a preview/prod URL.'
    )

    const response = await request.get('/info')
    expect(response.status()).toBe(200)

    const cacheControl = response.headers()['cache-control'] || ''
    expect(cacheControl).toMatch(/public/)
    expect(cacheControl).toMatch(/s-maxage=\d+/)
    expect(cacheControl).toMatch(/stale-while-revalidate=\d+/)
  })

  test('news article page advertises public, s-maxage Cache-Control', async ({
    request,
  }) => {
    test.skip(
      !isProductionTarget,
      'Cache-Control catch-all header is only applied by `next start` / Vercel; ' +
        '`next dev` always sets `no-store`. Run against a preview/prod URL.'
    )

    const slug = await findFirstNewsSlug(request)
    test.skip(!slug, 'Could not discover a news article slug from /info')

    const response = await request.get(`/info/${slug}`)
    expect(response.status()).toBe(200)

    const cacheControl = response.headers()['cache-control'] || ''
    expect(cacheControl).toMatch(/public/)
    expect(cacheControl).toMatch(/s-maxage=\d+/)
  })

  test('news article does not regress to no-store / private', async ({
    request,
  }) => {
    test.skip(
      !isProductionTarget,
      'Only meaningful against a production-style Cache-Control source.'
    )

    const slug = await findFirstNewsSlug(request)
    test.skip(!slug, 'Could not discover a news article slug from /info')

    const response = await request.get(`/info/${slug}`)
    const cacheControl = response.headers()['cache-control'] || ''
    expect(cacheControl).not.toMatch(/no-store/)
    expect(cacheControl).not.toMatch(/private/)
  })
})

test.describe('News article — hero image render (P0-2 regression)', () => {
  test('news index links to at least one article', async ({ page }) => {
    await page.goto('/info')
    const links = page.locator('a[href*="/info/"]')
    expect(await links.count()).toBeGreaterThanOrEqual(1)
  })

  test('news article body contains a hero <img> sourced from /api/og', async ({
    page,
  }) => {
    await page.goto('/info')
    const firstLink = page.locator('a[href*="/info/"]').first()
    const href = await firstLink.getAttribute('href')
    test.skip(!href, 'No article link on /info to follow')

    await page.goto(href!)
    await expect(page.locator('h1')).toBeVisible()

    // P0-2 fix shipped a single hero <img> sourced from /api/og?type=news.
    const heroImg = page.locator('img[src*="/api/og"]').first()
    await expect(heroImg).toBeVisible()

    const src = await heroImg.getAttribute('src')
    expect(src).toBeTruthy()
    expect(src!).toContain('/api/og')
    expect(src!).toMatch(/[?&]type=news/)
    expect(src!).toMatch(/[?&]title=/)

    // The hero must be high-priority for LCP and have a meaningful alt text.
    const alt = await heroImg.getAttribute('alt')
    expect(alt && alt.length).toBeGreaterThan(0)
    const fetchPriority = await heroImg.getAttribute('fetchpriority')
    if (fetchPriority !== null) {
      expect(fetchPriority).toBe('high')
    }
  })

  test('news article exposes og:image meta pointing at /api/og', async ({
    page,
  }) => {
    await page.goto('/info')
    const firstLink = page.locator('a[href*="/info/"]').first()
    const href = await firstLink.getAttribute('href')
    test.skip(!href, 'No article link on /info to follow')

    await page.goto(href!)
    const ogImage = page.locator('meta[property="og:image"]').first()
    await expect(ogImage).toHaveAttribute('content', /\/api\/og/)
  })
})
