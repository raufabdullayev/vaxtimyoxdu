import { test, expect } from '@playwright/test'

test.describe('Sitemap and Robots.txt', () => {
  test('robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt')

    expect(response?.status()).toBe(200)

    // In dev mode, robots.txt may be rendered as a Next.js page
    // Verify the response was successful
    const content = await page.content()
    expect(content.length).toBeGreaterThan(0)
  })

  test('robots.txt references sitemap URL', async ({ page }) => {
    await page.goto('/robots.txt')

    const content = await page.content()
    expect(content).toMatch(/Sitemap:\s*https?:\/\//)
  })

  test('sitemap.xml is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')

    expect(response?.status()).toBe(200)
    const contentType = response?.headers()['content-type'] || ''
    expect(contentType).toMatch(/xml/)
  })

  test('sitemap contains key pages', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    const text = await response?.text() || ''

    // Sitemap should reference the main site
    expect(text).toContain('vaxtimyoxdu.com')
  })

  test('robots.txt does not block important paths', async ({ page }) => {
    await page.goto('/robots.txt')

    const content = await page.content()

    // Should not block /tools, /blog, /info
    expect(content).not.toMatch(/Disallow:\s*\/tools\b/)
    expect(content).not.toMatch(/Disallow:\s*\/blog\b/)
    expect(content).not.toMatch(/Disallow:\s*\/info\b/)
  })
})
