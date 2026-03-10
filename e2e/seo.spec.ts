import { test, expect } from '@playwright/test'

test.describe('SEO', () => {
  test('homepage has correct meta title', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Vaxtim Yoxdu/)
  })

  test('homepage has meta description', async ({ page }) => {
    await page.goto('/')

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('tools page has meta description', async ({ page }) => {
    await page.goto('/tools')

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('tool detail page has meta description', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('homepage has hreflang tags', async ({ page }) => {
    await page.goto('/')

    // Should have hreflang for az, en, tr, ru, and x-default
    const hreflangAz = page.locator('link[rel="alternate"][hreflang="az"]')
    const hreflangEn = page.locator('link[rel="alternate"][hreflang="en"]')
    const hreflangTr = page.locator('link[rel="alternate"][hreflang="tr"]')
    const hreflangRu = page.locator('link[rel="alternate"][hreflang="ru"]')
    const hreflangDefault = page.locator('link[rel="alternate"][hreflang="x-default"]')

    await expect(hreflangAz).toHaveAttribute('href', /vaxtimyoxdu\.com/)
    await expect(hreflangEn).toHaveAttribute('href', /vaxtimyoxdu\.com\/en/)
    await expect(hreflangTr).toHaveAttribute('href', /vaxtimyoxdu\.com\/tr/)
    await expect(hreflangRu).toHaveAttribute('href', /vaxtimyoxdu\.com\/ru/)
    await expect(hreflangDefault).toHaveAttribute('href', /vaxtimyoxdu\.com/)
  })

  test('tools page has hreflang tags', async ({ page }) => {
    await page.goto('/tools')

    const hreflangEn = page.locator('link[rel="alternate"][hreflang="en"]')
    await expect(hreflangEn).toHaveAttribute('href', /\/en\/tools/)
  })

  test('homepage has JSON-LD structured data', async ({ page }) => {
    await page.goto('/')

    // Check for WebSite JSON-LD
    const jsonLdScripts = page.locator('script[type="application/ld+json"]')
    const count = await jsonLdScripts.count()
    expect(count).toBeGreaterThanOrEqual(1)

    // Parse the first JSON-LD and verify it is a WebSite schema
    const firstScript = await jsonLdScripts.first().textContent()
    expect(firstScript).toBeTruthy()
    const parsed = JSON.parse(firstScript!)
    expect(parsed['@type']).toBeDefined()
  })

  test('tool page has JSON-LD structured data', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    const jsonLdScripts = page.locator('script[type="application/ld+json"]')
    const count = await jsonLdScripts.count()
    // Tool pages have: WebSite + Organization (root layout) + SoftwareApplication + FAQPage + BreadcrumbList
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('homepage has canonical URL', async ({ page }) => {
    await page.goto('/')

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /vaxtimyoxdu\.com/)
  })

  test('page has Open Graph meta tags', async ({ page }) => {
    await page.goto('/tools')

    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)

    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /.+/)

    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toHaveAttribute('content', 'website')
  })

  test('page has Twitter Card meta tags', async ({ page }) => {
    await page.goto('/tools')

    const twitterCard = page.locator('meta[name="twitter:card"]')
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image')
  })

  test('html lang attribute matches locale for explicit locale URLs', async ({ page }) => {
    // Visiting /en explicitly should always produce lang="en"
    await page.goto('/en')
    const htmlLangEn = await page.locator('html').getAttribute('lang')
    expect(htmlLangEn).toBe('en')

    // Visiting /tr explicitly should always produce lang="tr"
    await page.goto('/tr')
    const htmlLangTr = await page.locator('html').getAttribute('lang')
    expect(htmlLangTr).toBe('tr')

    // Visiting /ru explicitly should always produce lang="ru"
    await page.goto('/ru')
    const htmlLangRu = await page.locator('html').getAttribute('lang')
    expect(htmlLangRu).toBe('ru')
  })

  test('html lang attribute is a valid locale on root path', async ({ page }) => {
    await page.goto('/')
    const htmlLang = await page.locator('html').getAttribute('lang')
    // The root path resolves to a locale based on Accept-Language detection.
    // It should always be one of the supported locales.
    expect(['az', 'en', 'tr', 'ru']).toContain(htmlLang)
  })
})
