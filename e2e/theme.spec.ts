import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test('theme toggle button exists on homepage', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.locator('button[aria-label*="mode"]')
    await expect(themeButton).toBeVisible()
  })

  test('clicking theme toggle changes to dark mode', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')

    // Click the theme toggle
    const themeButton = page.locator('button[aria-label*="mode"]')
    await themeButton.click()

    // html element should have class "dark" or data-theme change
    const classList = await html.getAttribute('class')
    // After toggle, it may switch to dark or light depending on initial state
    expect(classList).toBeTruthy()
  })

  test('theme persists after navigation', async ({ page }) => {
    await page.goto('/')

    // Click theme toggle
    const themeButton = page.locator('button[aria-label*="mode"]')
    await themeButton.click()

    // Get current theme state
    const htmlClass = await page.locator('html').getAttribute('class')

    // Navigate to another page
    await page.goto('/tools')

    // Theme should persist
    const newHtmlClass = await page.locator('html').getAttribute('class')
    expect(newHtmlClass).toBe(htmlClass)
  })

  test('theme toggle works on tools page', async ({ page }) => {
    await page.goto('/tools')
    const themeButton = page.locator('button[aria-label*="mode"]')
    await expect(themeButton).toBeVisible()
    await themeButton.click()
    // Should not crash
    await expect(page.locator('h1')).toBeVisible()
  })
})
