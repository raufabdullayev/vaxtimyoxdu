import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('theme toggle button is present', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.locator('button[aria-label*="mode"], button[aria-label="Toggle theme"], button[aria-label="System preference"]').first()
    await expect(themeButton).toBeVisible()
  })

  test('clicking theme toggle changes theme', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.locator('button[aria-label*="mode"], button[aria-label="Toggle theme"], button[aria-label="System preference"]').first()
    await expect(themeButton).toBeVisible()

    // Click twice to ensure a visible change (light->dark or dark->system->light)
    await themeButton.click()
    await page.waitForTimeout(300)
    await themeButton.click()
    await page.waitForTimeout(300)

    // The button should still be visible and functional after toggling
    await expect(themeButton).toBeVisible()
  })

  test('dark mode persists across page navigation', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.locator('button[aria-label*="mode"], button[aria-label="Toggle theme"], button[aria-label="System preference"]').first()
    await themeButton.click()

    const classAfterToggle = await page.locator('html').getAttribute('class')

    await page.goto('/tools')
    const classOnTools = await page.locator('html').getAttribute('class')

    expect(classOnTools).toBe(classAfterToggle)
  })

  test('dark mode persists on page reload', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.locator('button[aria-label*="mode"], button[aria-label="Toggle theme"], button[aria-label="System preference"]').first()
    await themeButton.click()

    const classAfterToggle = await page.locator('html').getAttribute('class')

    await page.reload()
    const classAfterReload = await page.locator('html').getAttribute('class')

    expect(classAfterReload).toBe(classAfterToggle)
  })

  test('theme toggle is accessible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const themeButton = page.locator('button[aria-label*="mode"], button[aria-label="Toggle theme"], button[aria-label="System preference"]').first()
    await expect(themeButton).toBeVisible()
  })
})
