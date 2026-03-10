import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('skip to content link exists', async ({ page }) => {
    await page.goto('/')

    // The skip-to-content link should exist in the DOM
    const skipLink = page.locator('a.skip-to-content')
    await expect(skipLink).toBeAttached()

    // It should reference #main-content
    await expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  test('main content landmark exists', async ({ page }) => {
    await page.goto('/')

    const main = page.locator('main#main-content')
    await expect(main).toBeVisible()
  })

  test('navigation landmarks have aria labels', async ({ page }) => {
    await page.goto('/')

    // Desktop navigation
    const mainNav = page.locator('nav[aria-label="Main navigation"]')
    await expect(mainNav).toBeAttached()

    // Mobile navigation
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]')
    await expect(mobileNav).toBeAttached()
  })

  test('breadcrumb navigation has aria label', async ({ page }) => {
    await page.goto('/tools')

    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    await expect(breadcrumb).toBeVisible()
  })

  test('theme toggle button has aria-label', async ({ page }) => {
    await page.goto('/')

    const themeButton = page.locator('button[aria-label*="mode"]')
    await expect(themeButton).toBeVisible()
  })

  test('language selector has proper ARIA attributes', async ({ page }) => {
    await page.goto('/')

    const langButton = page.locator('button[aria-label="Select language"]')
    await expect(langButton).toBeVisible()
    await expect(langButton).toHaveAttribute('aria-expanded', 'false')
    await expect(langButton).toHaveAttribute('aria-haspopup', 'listbox')

    // Open dropdown and check expanded state
    await langButton.click()
    await expect(langButton).toHaveAttribute('aria-expanded', 'true')

    // Dropdown should have role="listbox"
    const listbox = page.locator('[role="listbox"]')
    await expect(listbox).toBeVisible()

    // Options should have role="option" and aria-selected
    const options = listbox.locator('[role="option"]')
    await expect(options).toHaveCount(4)

    // Current locale (az) should be selected
    const selectedOption = listbox.locator('[role="option"][aria-selected="true"]')
    await expect(selectedOption).toHaveCount(1)
  })

  test('mobile menu button has aria attributes', async ({ page }) => {
    // Set mobile viewport to ensure the menu button is visible
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const menuButton = page.locator('button[aria-label="Menyu"]')
    await expect(menuButton).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Open mobile menu and check expanded state
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('/')

    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      const ariaHidden = await img.getAttribute('aria-hidden')
      const role = await img.getAttribute('role')

      // Image should have alt text OR be aria-hidden OR be a presentational role
      const isAccessible = (alt !== null && alt !== undefined) ||
                          ariaHidden === 'true' ||
                          role === 'presentation' ||
                          role === 'none'
      expect(isAccessible, `Image at index ${i} is missing alt text`).toBe(true)
    }
  })

  test('decorative SVG icons have aria-hidden', async ({ page }) => {
    await page.goto('/')

    // Lucide icons in the header should be aria-hidden
    const headerIcon = page.locator('header svg[aria-hidden="true"]')
    const count = await headerIcon.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/')

    // Tab through the page and verify focus moves to interactive elements
    await page.keyboard.press('Tab')

    // First focusable element should be the skip-to-content link
    const skipLink = page.locator('a.skip-to-content')
    await expect(skipLink).toBeFocused()

    // Continue tabbing to reach header elements
    await page.keyboard.press('Tab')
    // Should focus on the logo/home link
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('focus is visible on interactive elements', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    // Tab to the first button and check it receives focus
    const encodeButton = page.locator('button:has-text("Encode")').first()
    await encodeButton.focus()
    await expect(encodeButton).toBeFocused()
  })

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/tools')

    // There should be exactly one h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)

    // h2 elements should exist for category sections
    const h2Count = await page.locator('h2').count()
    expect(h2Count).toBeGreaterThanOrEqual(1)
  })
})
