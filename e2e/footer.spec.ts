import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
  test('footer is visible on homepage', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('footer has legal links', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const privacyLink = footer.locator('a[href*="privacy"]')
    await expect(privacyLink).toBeVisible()
    const termsLink = footer.locator('a[href*="terms"]')
    await expect(termsLink).toBeVisible()
  })

  test('footer has tool links', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const toolLinks = footer.locator('a[href*="/tools/"]')
    const count = await toolLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('footer has copyright text', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const currentYear = new Date().getFullYear().toString()
    await expect(footer).toContainText(currentYear)
  })

  test('footer newsletter form exists', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const emailInput = footer.locator('input[type="email"]')
    await expect(emailInput).toBeVisible()
  })

  test('privacy page loads from footer link', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await footer.locator('a[href*="privacy"]').click()
    await expect(page).toHaveURL(/\/privacy/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('terms page loads from footer link', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await footer.locator('a[href*="terms"]').click()
    await expect(page).toHaveURL(/\/terms/)
    await expect(page.locator('h1')).toBeVisible()
  })
})
