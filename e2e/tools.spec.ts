import { test, expect } from '@playwright/test'

test.describe('Tools', () => {
  test('tools page lists tool categories', async ({ page }) => {
    await page.goto('/tools')

    // The page should have a heading
    await expect(page.locator('h1')).toBeVisible()

    // There should be tool cards linking to individual tools
    const toolLinks = page.locator('a[href*="/tools/"]')
    await expect(toolLinks.first()).toBeVisible()
    const count = await toolLinks.count()
    expect(count).toBeGreaterThanOrEqual(10)
  })

  test('tools page shows category sections', async ({ page }) => {
    await page.goto('/tools')

    // Each category has an h2 heading
    const categoryHeadings = page.locator('section h2')
    const headingCount = await categoryHeadings.count()
    // We have 6 categories: AI, PDF, Image, Dev, Generators, Text
    expect(headingCount).toBeGreaterThanOrEqual(6)
  })

  test('navigate to base64 encode/decode tool', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    // Tool page should load with the tool name in the heading
    await expect(page.locator('h1')).toContainText('Base64')
  })

  test('tool page has breadcrumbs', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    await expect(breadcrumb).toBeVisible()

    // Breadcrumb should show 3 items: Home / Tools / Base64...
    const items = breadcrumb.locator('li')
    const itemCount = await items.count()
    expect(itemCount).toBe(3)
  })

  test('base64 encode works correctly', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    // Ensure the Encode mode button is active (it is default)
    const modeButtons = page.locator('.flex.items-center.gap-3 button')
    await expect(modeButtons.first()).toContainText('Encode')

    // Type input text into the first textarea
    const inputArea = page.locator('textarea').first()
    await inputArea.fill('Hello World')

    // Click the action button -- it is the larger button below the textarea.
    // Use the more specific class selector for the action row button.
    const actionButton = page.locator('button.px-6', { hasText: 'Encode' })
    await actionButton.click()

    // The result should be the base64-encoded value
    const outputArea = page.locator('textarea').nth(1)
    await expect(outputArea).toHaveValue('SGVsbG8gV29ybGQ=')
  })

  test('base64 decode works correctly', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    // Switch to decode mode by clicking the Decode mode-selector button (px-4 class)
    const decodeModeButton = page.locator('button.px-4', { hasText: 'Decode' })
    await decodeModeButton.click()

    // Type base64 input
    const inputArea = page.locator('textarea').first()
    await inputArea.fill('SGVsbG8gV29ybGQ=')

    // Click the Decode action button (px-6 class)
    const actionButton = page.locator('button.px-6', { hasText: 'Decode' })
    await actionButton.click()

    // Check result
    const outputArea = page.locator('textarea').nth(1)
    await expect(outputArea).toHaveValue('Hello World')
  })

  test('tool page shows related tools section', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    // Related tools links should exist -- tools from the same dev category
    const toolLinks = page.locator('a[href*="/tools/"]')
    const count = await toolLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('tool page has description section', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    // The ToolTemplate renders an "About {tool.name}" section
    await expect(page.getByText('About JSON Formatter')).toBeVisible()
  })
})
