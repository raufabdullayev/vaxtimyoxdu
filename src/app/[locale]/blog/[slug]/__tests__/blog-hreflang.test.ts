import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the blog-posts data module BEFORE importing the page
vi.mock('@/data/blog-posts', () => {
  const base = {
    title: 'Test Post',
    description: 'Test description',
    content: 'Body content.',
    date: '2026-04-01',
    relatedTools: [],
  }
  return {
    blogPosts: { 'post-in-all-locales': base, 'post-en-only': base },
    blogPostsByLocale: {
      en: { 'post-in-all-locales': base, 'post-en-only': base },
      az: { 'post-in-all-locales': { ...base, title: 'Test AZ' }, 'post-az-only': base },
      tr: { 'post-in-all-locales': { ...base, title: 'Test TR' } },
      ru: { 'post-in-all-locales': { ...base, title: 'Test RU' } },
    },
    getBlogPostBySlug: vi.fn((slug: string, locale: string) => {
      const byLoc: Record<string, Record<string, unknown>> = {
        en: { 'post-in-all-locales': base, 'post-en-only': base },
        az: { 'post-in-all-locales': { ...base, title: 'Test AZ' }, 'post-az-only': base },
        tr: { 'post-in-all-locales': { ...base, title: 'Test TR' } },
        ru: { 'post-in-all-locales': { ...base, title: 'Test RU' } },
      }
      return byLoc[locale]?.[slug]
    }),
    getBlogPostsByLocale: vi.fn(() => ({})),
  }
})

// Mock next-intl server helpers
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
  setRequestLocale: vi.fn(),
}))

// Mock next/navigation — page.tsx imports notFound at module top.
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND')
  }),
}))

// Mock the locale-aware Link — the page imports it at module top and
// without this mock next-intl tries to resolve next/navigation as a real
// module during import, which fails under Vitest.
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: unknown }) => ({
    type: 'a',
    props: { href, children },
  }),
}))

import { generateMetadata } from '../page'

describe('blog/[slug] generateMetadata hreflang probe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('emits hreflang for every locale that has the post', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'post-in-all-locales', locale: 'az' }),
    } as any)
    const alt = meta.alternates as {
      canonical: string
      languages: Record<string, string>
    }
    expect(alt.languages['az']).toBe('https://vaxtimyoxdu.com/blog/post-in-all-locales')
    expect(alt.languages['en']).toBe('https://vaxtimyoxdu.com/en/blog/post-in-all-locales')
    expect(alt.languages['tr']).toBe('https://vaxtimyoxdu.com/tr/blog/post-in-all-locales')
    expect(alt.languages['ru']).toBe('https://vaxtimyoxdu.com/ru/blog/post-in-all-locales')
    expect(alt.languages['x-default']).toBe('https://vaxtimyoxdu.com/blog/post-in-all-locales')
  })

  it('omits hreflang for locales where the post does not exist (AZ-only post)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'post-az-only', locale: 'az' }),
    } as any)
    const alt = meta.alternates as {
      canonical: string
      languages: Record<string, string>
    }
    expect(alt.languages['az']).toBe('https://vaxtimyoxdu.com/blog/post-az-only')
    expect(alt.languages['en']).toBeUndefined()
    expect(alt.languages['tr']).toBeUndefined()
    expect(alt.languages['ru']).toBeUndefined()
    // x-default falls back to self when default locale does not have the post? No —
    // az IS the default locale here, so x-default matches the az entry.
    expect(alt.languages['x-default']).toBe('https://vaxtimyoxdu.com/blog/post-az-only')
  })

  it('omits hreflang for locales where the post does not exist (EN-only post)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'post-en-only', locale: 'en' }),
    } as any)
    const alt = meta.alternates as {
      canonical: string
      languages: Record<string, string>
    }
    expect(alt.languages['en']).toBe('https://vaxtimyoxdu.com/en/blog/post-en-only')
    expect(alt.languages['az']).toBeUndefined()
    expect(alt.languages['tr']).toBeUndefined()
    expect(alt.languages['ru']).toBeUndefined()
    // x-default falls back to self (en) because az does not have the post
    expect(alt.languages['x-default']).toBe('https://vaxtimyoxdu.com/en/blog/post-en-only')
  })

  it('returns empty metadata object when slug does not exist in any locale', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'nonexistent', locale: 'az' }),
    } as any)
    expect(meta).toEqual({})
  })
})
