import { test, expect } from '@playwright/test'

test.describe('Breadcrumb Navigation', () => {
  test('tool page has breadcrumb nav', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    await expect(breadcrumb).toBeVisible()
  })

  test('breadcrumb shows 3 levels: Home / Tools / Tool Name', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    const items = breadcrumb.locator('li')
    const itemCount = await items.count()
    expect(itemCount).toBe(3)
  })

  test('breadcrumb Home link navigates to homepage', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    const homeLink = breadcrumb.locator('a').first()
    await homeLink.click()

    await expect(page).toHaveURL(/\/(az|en|tr|ru)?$/)
  })

  test('breadcrumb Tools link navigates to tools page', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    const toolsLink = breadcrumb.locator('a[href*="/tools"]').first()
    await toolsLink.click()

    await expect(page).toHaveURL(/\/tools$/)
  })

  test('breadcrumb last item is not a link', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    const items = breadcrumb.locator('li')
    const lastItem = items.last()

    // Last item should be a span, not a link
    const link = lastItem.locator('a')
    expect(await link.count()).toBe(0)
  })

  test('breadcrumb has JSON-LD BreadcrumbList schema', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    const scripts = page.locator('script[type="application/ld+json"]')
    const count = await scripts.count()

    let hasBreadcrumbSchema = false
    for (let i = 0; i < count; i++) {
      const text = await scripts.nth(i).textContent()
      if (text) {
        const parsed = JSON.parse(text)
        if (parsed['@type'] === 'BreadcrumbList') {
          hasBreadcrumbSchema = true
        }
      }
    }
    expect(hasBreadcrumbSchema).toBe(true)
  })
})
