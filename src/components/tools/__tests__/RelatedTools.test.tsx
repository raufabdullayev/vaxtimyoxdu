import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import RelatedTools from '../RelatedTools'
import { Tool } from '@/types/tool'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const mockTextTools: Tool[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter',
    description: 'Count words and characters',
    shortDescription: 'Count words, characters, and more',
    category: 'text',
    icon: '🔢',
    isAI: false,
    isClientSide: true,
    keywords: ['word counter'],
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between cases',
    shortDescription: 'Convert text between different cases',
    category: 'text',
    icon: 'Aa',
    isAI: false,
    isClientSide: true,
    keywords: ['case converter'],
  },
  {
    slug: 'slug-generator',
    name: 'Slug Generator',
    description: 'Generate URL slugs',
    shortDescription: 'Generate URL-friendly slugs from text',
    category: 'text',
    icon: '🔗',
    isAI: false,
    isClientSide: true,
    keywords: ['slug generator'],
  },
  {
    slug: 'text-diff',
    name: 'Text Diff Checker',
    description: 'Compare two texts',
    shortDescription: 'Compare two texts and find differences',
    category: 'text',
    icon: '📊',
    isAI: false,
    isClientSide: true,
    keywords: ['text diff'],
  },
  {
    slug: 'html-entity-codec',
    name: 'HTML Entity Encoder/Decoder',
    description: 'Encode and decode HTML entities',
    shortDescription: 'Encode and decode HTML entities',
    category: 'text',
    icon: '&lt;',
    isAI: false,
    isClientSide: true,
    keywords: ['html entity'],
  },
]

vi.mock('@/lib/tools/registry', () => ({
  getToolsByCategory: vi.fn(),
}))

import { getToolsByCategory } from '@/lib/tools/registry'
const mockedGetToolsByCategory = vi.mocked(getToolsByCategory)

describe('RelatedTools', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the "Related Tools" heading', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(screen.getByText('Related Tools')).toBeInTheDocument()
  })

  it('renders related tools from the same category', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(screen.getByText('Case Converter')).toBeInTheDocument()
    expect(screen.getByText('Slug Generator')).toBeInTheDocument()
    expect(screen.getByText('Text Diff Checker')).toBeInTheDocument()
  })

  it('excludes the current tool from the list', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(screen.queryByText('Word Counter')).not.toBeInTheDocument()
  })

  it('shows a maximum of 4 related tools', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeLessThanOrEqual(4)
  })

  it('returns null when no related tools exist', () => {
    mockedGetToolsByCategory.mockReturnValue([mockTextTools[0]])
    const currentTool = mockTextTools[0]

    const { container } = render(<RelatedTools currentTool={currentTool} />)

    expect(container.innerHTML).toBe('')
  })

  it('links point to correct /tools/[slug] URLs', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/tools/case-converter')
    expect(links[1]).toHaveAttribute('href', '/tools/slug-generator')
    expect(links[2]).toHaveAttribute('href', '/tools/text-diff')
    expect(links[3]).toHaveAttribute('href', '/tools/html-entity-codec')
  })

  it('shows tool icons', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(screen.getByText('Aa')).toBeInTheDocument()
    expect(screen.getByText('🔗')).toBeInTheDocument()
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('shows tool names', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(screen.getByText('Case Converter')).toBeInTheDocument()
    expect(screen.getByText('Slug Generator')).toBeInTheDocument()
    expect(screen.getByText('Text Diff Checker')).toBeInTheDocument()
    expect(screen.getByText('HTML Entity Encoder/Decoder')).toBeInTheDocument()
  })

  it('shows tool short descriptions', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(screen.getByText('Convert text between different cases')).toBeInTheDocument()
    expect(screen.getByText('Generate URL-friendly slugs from text')).toBeInTheDocument()
    expect(screen.getByText('Compare two texts and find differences')).toBeInTheDocument()
  })

  it('shows "Client-side" badge for client-side tools', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    const badges = screen.getAllByText('Client-side')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('shows "AI-Powered" badge for AI tools', () => {
    const aiTools: Tool[] = [
      {
        slug: 'ai-tool-1',
        name: 'AI Tool 1',
        description: 'An AI tool',
        shortDescription: 'AI-powered tool',
        category: 'ai',
        icon: '🤖',
        isAI: true,
        isClientSide: false,
        keywords: ['ai'],
      },
      {
        slug: 'ai-tool-2',
        name: 'AI Tool 2',
        description: 'Another AI tool',
        shortDescription: 'Another AI-powered tool',
        category: 'ai',
        icon: '✨',
        isAI: true,
        isClientSide: false,
        keywords: ['ai'],
      },
    ]

    mockedGetToolsByCategory.mockReturnValue(aiTools)
    const currentTool = aiTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(screen.getByText('AI-Powered')).toBeInTheDocument()
  })

  it('calls getToolsByCategory with the current tool category', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    render(<RelatedTools currentTool={currentTool} />)

    expect(mockedGetToolsByCategory).toHaveBeenCalledWith('text')
  })

  it('returns null when category has only the current tool', () => {
    const singleTool: Tool[] = [
      {
        slug: 'only-tool',
        name: 'Only Tool',
        description: 'The only tool',
        shortDescription: 'Solo tool',
        category: 'pdf',
        icon: '📄',
        isAI: false,
        isClientSide: true,
        keywords: ['solo'],
      },
    ]

    mockedGetToolsByCategory.mockReturnValue(singleTool)

    const { container } = render(<RelatedTools currentTool={singleTool[0]} />)

    expect(container.innerHTML).toBe('')
  })

  it('renders grid layout with correct CSS classes', () => {
    mockedGetToolsByCategory.mockReturnValue(mockTextTools)
    const currentTool = mockTextTools[0]

    const { container } = render(<RelatedTools currentTool={currentTool} />)

    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
  })
})
