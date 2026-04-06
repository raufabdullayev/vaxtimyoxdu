import { describe, it, expect, vi } from 'vitest'

describe('i18n/config', () => {
  it('exports locales and defaultLocale', async () => {
    const { locales, defaultLocale } = await import('../config')
    expect(Array.isArray(locales)).toBe(true)
    expect(locales.length).toBeGreaterThan(0)
    expect(typeof defaultLocale).toBe('string')
    expect(locales).toContain(defaultLocale)
  })

  it('includes all 4 supported locales', async () => {
    const { locales } = await import('../config')
    expect(locales).toContain('az')
    expect(locales).toContain('en')
    expect(locales).toContain('tr')
    expect(locales).toContain('ru')
  })
})

describe('i18n/routing', () => {
  it('exports routing configuration', async () => {
    const { routing } = await import('../routing')
    expect(routing).toBeDefined()
    expect(routing.locales).toBeDefined()
    expect(routing.defaultLocale).toBeDefined()
  })

  it('has localePrefix set to as-needed', async () => {
    const { routing } = await import('../routing')
    expect((routing as { localePrefix: string }).localePrefix).toBe('as-needed')
  })
})

describe('i18n/navigation', () => {
  it('exports navigation utilities', async () => {
    vi.mock('next-intl/navigation', () => ({
      createNavigation: () => ({
        Link: () => null,
        redirect: () => {},
        usePathname: () => '/',
        useRouter: () => ({}),
        getPathname: () => '/',
      }),
    }))
    const nav = await import('../navigation')
    expect(nav.Link).toBeDefined()
    expect(nav.redirect).toBeDefined()
    expect(nav.usePathname).toBeDefined()
    expect(nav.useRouter).toBeDefined()
    expect(nav.getPathname).toBeDefined()
  })
})
