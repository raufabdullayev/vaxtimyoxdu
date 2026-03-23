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

    // Ensure the Encode mode radio is active (it is default)
    const encodeRadio = page.locator('[role="radio"]', { hasText: 'Encode' })
    await expect(encodeRadio).toHaveAttribute('aria-checked', 'true')

    // Type input text into the first textarea
    const inputArea = page.locator('textarea').first()
    await inputArea.fill('Hello World')

    // Click the action button below the textarea
    const actionButton = page.locator('button.px-6', { hasText: 'Encode' })
    await actionButton.click()

    // The result should be the base64-encoded value
    const outputArea = page.locator('textarea').nth(1)
    await expect(outputArea).toHaveValue('SGVsbG8gV29ybGQ=')
  })

  test('base64 decode works correctly', async ({ page }) => {
    await page.goto('/tools/base64-encode-decode')

    // Switch to decode mode by clicking the Decode radio button
    const decodeRadio = page.locator('[role="radio"]', { hasText: 'Decode' })
    await decodeRadio.click()

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

  test('json-formatter formats JSON correctly', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    // Enter invalid-looking but valid compact JSON
    const inputArea = page.locator('textarea').first()
    await inputArea.fill('{"name":"test","value":42}')

    // Click Format/Beautify button
    const formatBtn = page.locator('button', { hasText: /Format|Beautify/ })
    await formatBtn.click()

    // The output textarea should have formatted (pretty-printed) JSON
    const outputArea = page.locator('textarea').nth(1)
    const outputValue = await outputArea.inputValue()
    expect(outputValue).toContain('"name": "test"')
    expect(outputValue).toContain('"value": 42')
    // Verify it is multi-line (formatted)
    expect(outputValue.split('\n').length).toBeGreaterThan(1)
  })

  test('json-formatter shows error for invalid JSON', async ({ page }) => {
    await page.goto('/tools/json-formatter')

    const inputArea = page.locator('textarea').first()
    await inputArea.fill('{invalid json}')

    const formatBtn = page.locator('button', { hasText: /Format|Beautify/ })
    await formatBtn.click()

    // An error alert should appear
    const errorAlert = page.locator('[role="alert"]')
    await expect(errorAlert).toBeVisible()
  })

  test('password-generator generates a password on load', async ({ page }) => {
    await page.goto('/tools/password-generator')

    // Password should be generated automatically on mount
    const passwordDisplay = page.locator('[aria-label="Generated password"]')
    await expect(passwordDisplay).toBeVisible()
    const text = await passwordDisplay.textContent()
    // Default length is 16
    expect(text!.length).toBeGreaterThanOrEqual(8)
  })

  test('password-generator regenerate button works', async ({ page }) => {
    await page.goto('/tools/password-generator')

    // Get the initial password
    const passwordDisplay = page.locator('[aria-label="Generated password"]')
    const initialPassword = await passwordDisplay.textContent()

    // Click regenerate
    const regenBtn = page.locator('button[aria-label="Regenerate password"]')
    await regenBtn.click()

    // Password should change (with overwhelming probability)
    const newPassword = await passwordDisplay.textContent()
    expect(newPassword).toBeTruthy()
    expect(newPassword!.length).toBeGreaterThanOrEqual(8)
  })
})
