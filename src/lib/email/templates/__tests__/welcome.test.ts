import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the token module before importing
vi.mock('@/lib/newsletter/token', () => ({
  generateUnsubscribeToken: vi.fn().mockReturnValue('mock-token-abc'),
}))

import { getWelcomeEmailHtml } from '../welcome'

describe('getWelcomeEmailHtml', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns valid HTML with correct lang attribute for English', () => {
    const html = getWelcomeEmailHtml('en', 'test@example.com')

    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html lang="en">')
    expect(html).toContain('Welcome to Vaxtim Yoxdu!')
  })

  it('returns Azerbaijani content for az locale', () => {
    const html = getWelcomeEmailHtml('az', 'test@example.com')

    expect(html).toContain('<html lang="az">')
    expect(html).toContain('xoş gəldiniz')
    expect(html).toContain('vaxtimyoxdu.com/tools')
  })

  it('returns Turkish content for tr locale', () => {
    const html = getWelcomeEmailHtml('tr', 'test@example.com')

    expect(html).toContain('<html lang="tr">')
    expect(html).toContain('hoş geldiniz')
    expect(html).toContain('vaxtimyoxdu.com/tr/tools')
  })

  it('returns Russian content for ru locale', () => {
    const html = getWelcomeEmailHtml('ru', 'test@example.com')

    expect(html).toContain('<html lang="ru">')
    expect(html).toContain('Добро пожаловать')
    expect(html).toContain('vaxtimyoxdu.com/ru/tools')
  })

  it('falls back to English for unknown locale', () => {
    const html = getWelcomeEmailHtml('fr', 'test@example.com')

    expect(html).toContain('Welcome to Vaxtim Yoxdu!')
    expect(html).toContain('vaxtimyoxdu.com/en/tools')
  })

  it('includes unsubscribe link with token', () => {
    const html = getWelcomeEmailHtml('en', 'test@example.com')

    expect(html).toContain('/api/newsletter/unsubscribe?token=mock-token-abc')
    expect(html).toContain('Click here to unsubscribe')
  })

  it('includes CTA button linking to tools page', () => {
    const html = getWelcomeEmailHtml('en', 'test@example.com')

    expect(html).toContain('Check out our popular tools')
    expect(html).toContain('href="https://vaxtimyoxdu.com/en/tools"')
  })

  it('includes site branding', () => {
    const html = getWelcomeEmailHtml('en', 'test@example.com')

    expect(html).toContain('Vaxtim Yoxdu')
    expect(html).toContain('vaxtimyoxdu.com')
  })
})
