import { test, expect } from '@playwright/test'

test.describe('Mobile Tools Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('mobile menu button is visible on small screens', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-controls="mobile-menu"]')
    await expect(menuButton).toBeVisible()
  })

  test('clicking mobile menu button opens mobile nav', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-controls="mobile-menu"]')
    await menuButton.click()

    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false')
  })

  test('mobile nav shows tool category accordions', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-controls="mobile-menu"]')
    await menuButton.click()

    const mobileMenu = page.locator('#mobile-menu')
    const accordionButtons = mobileMenu.locator('button[aria-expanded]')
    const count = await accordionButtons.count()
    expect(count).toBeGreaterThanOrEqual(6) // 6 categories
  })

  test('expanding a category shows tool links', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-controls="mobile-menu"]')
    await menuButton.click()

    const mobileMenu = page.locator('#mobile-menu')
    const firstCategory = mobileMenu.locator('button[aria-expanded]').first()
    await firstCategory.click()

    // Should show tool links
    const toolLinks = mobileMenu.locator('a[href*="/tools/"]')
    await expect(toolLinks.first()).toBeVisible()
  })

  test('clicking a tool link in mobile nav navigates', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-controls="mobile-menu"]')
    await menuButton.click()

    const mobileMenu = page.locator('#mobile-menu')
    const firstCategory = mobileMenu.locator('button[aria-expanded]').first()
    await firstCategory.click()

    const toolLink = mobileMenu.locator('a[href*="/tools/"]').first()
    await toolLink.click()

    await expect(page).toHaveURL(/\/tools\//)
  })
})
