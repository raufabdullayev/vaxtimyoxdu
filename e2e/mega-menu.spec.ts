import { test, expect } from '@playwright/test'

test.describe('Mega Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
  })

  test('mega menu opens on hover over tools link', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    const toolsTrigger = nav.locator('a[aria-haspopup="true"]').first()
    await toolsTrigger.hover()

    const panel = page.locator('#mega-menu-panel')
    await expect(panel).toBeVisible()
  })

  test('mega menu shows all 6 categories', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    const toolsTrigger = nav.locator('a[aria-haspopup="true"]').first()
    await toolsTrigger.hover()

    const panel = page.locator('#mega-menu-panel')
    const headings = panel.locator('h3')
    await expect(headings).toHaveCount(6)
  })

  test('mega menu closes on Escape key', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    const toolsTrigger = nav.locator('a[aria-haspopup="true"]').first()
    await toolsTrigger.hover()

    await expect(page.locator('#mega-menu-panel')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('#mega-menu-panel')).not.toBeVisible()
  })

  test('mega menu tool link navigates correctly', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    const toolsTrigger = nav.locator('a[aria-haspopup="true"]').first()
    await toolsTrigger.hover()

    const panel = page.locator('#mega-menu-panel')
    const firstToolLink = panel.locator('a[href*="/tools/"]').first()
    await firstToolLink.click()

    await expect(page).toHaveURL(/\/tools\//)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('mega menu works on /en locale', async ({ page }) => {
    await page.goto('/en')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    const toolsTrigger = nav.locator('a[aria-haspopup="true"]').first()
    await toolsTrigger.hover()

    const panel = page.locator('#mega-menu-panel')
    await expect(panel).toBeVisible()
  })
})
