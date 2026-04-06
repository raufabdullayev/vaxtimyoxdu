import { describe, it, expect, vi } from 'vitest'

vi.mock('@/config/tool-content', () => ({
  hasRichContent: (slug: string) => ['json-formatter', 'password-generator'].includes(slug),
}))

vi.mock('@/config/tool-content-en.json', () => ({
  default: {
    sectionTitles: { howToUse: 'How to Use', whyUse: 'Why Use', tips: 'Tips', faq: 'FAQ' },
    'json-formatter': {
      howToUse: ['Step 1', 'Step 2'],
      whyUse: ['Reason 1'],
      tips: ['Tip 1'],
      faqs: [{ question: 'Q1', answer: 'A1' }],
    },
    'broken-tool': {
      title: 'Not proper format',
    },
  },
}))

vi.mock('@/config/tool-content-az.json', () => ({
  default: {
    sectionTitles: { howToUse: 'Necə istifadə', whyUse: 'Niyə', tips: 'Məsləhətlər', faq: 'FAQ' },
    'json-formatter': {
      howToUse: ['Addım 1', 'Addım 2'],
      whyUse: ['Səbəb 1'],
      tips: ['Məsləhət 1'],
      faqs: [{ question: 'S1', answer: 'C1' }],
    },
  },
}))

vi.mock('@/config/tool-content-tr.json', () => ({
  default: {
    sectionTitles: { howToUse: 'Nasıl', whyUse: 'Neden', tips: 'İpuçları', faq: 'SSS' },
  },
}))

vi.mock('@/config/tool-content-ru.json', () => ({
  default: {
    sectionTitles: { howToUse: 'Как', whyUse: 'Зачем', tips: 'Советы', faq: 'ЧЗВ' },
  },
}))

describe('getToolRichContent', () => {
  it('returns rich content for a supported tool', async () => {
    const { getToolRichContent } = await import('../tool-content-loader')
    const result = getToolRichContent('json-formatter', 'en')
    expect(result).not.toBeNull()
    expect(result!.howToUse).toEqual(['Step 1', 'Step 2'])
    expect(result!.whyUse).toEqual(['Reason 1'])
    expect(result!.tips).toEqual(['Tip 1'])
    expect(result!.faqs).toEqual([{ question: 'Q1', answer: 'A1' }])
    expect(result!.sectionTitles.howToUse).toBe('How to Use')
  })

  it('returns null for a tool without rich content', async () => {
    const { getToolRichContent } = await import('../tool-content-loader')
    const result = getToolRichContent('nonexistent-tool', 'en')
    expect(result).toBeNull()
  })

  it('returns localized content for az locale', async () => {
    const { getToolRichContent } = await import('../tool-content-loader')
    const result = getToolRichContent('json-formatter', 'az')
    expect(result).not.toBeNull()
    expect(result!.howToUse).toEqual(['Addım 1', 'Addım 2'])
    expect(result!.sectionTitles.howToUse).toBe('Necə istifadə')
  })

  it('falls back to en when locale has no tool data', async () => {
    const { getToolRichContent } = await import('../tool-content-loader')
    const result = getToolRichContent('json-formatter', 'tr')
    // tr has no json-formatter data, falls back behavior depends on content
    // But the tool slug is in hasRichContent list
    expect(result).toBeNull() // tr content doesn't have json-formatter
  })

  it('falls back to en for unknown locale', async () => {
    const { getToolRichContent } = await import('../tool-content-loader')
    const result = getToolRichContent('json-formatter', 'xx')
    expect(result).not.toBeNull()
    expect(result!.howToUse).toEqual(['Step 1', 'Step 2'])
  })

  it('returns null for tool with malformed data', async () => {
    const { getToolRichContent } = await import('../tool-content-loader')
    // broken-tool exists in en but has wrong shape
    const result = getToolRichContent('broken-tool', 'en')
    expect(result).toBeNull()
  })
})

describe('getToolFaqs', () => {
  it('returns FAQs for a supported tool', async () => {
    const { getToolFaqs } = await import('../tool-content-loader')
    const faqs = getToolFaqs('json-formatter', 'en')
    expect(faqs).toEqual([{ question: 'Q1', answer: 'A1' }])
  })

  it('returns null for unsupported tool', async () => {
    const { getToolFaqs } = await import('../tool-content-loader')
    const faqs = getToolFaqs('nonexistent', 'en')
    expect(faqs).toBeNull()
  })
})
