import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ToolCard from '../ToolCard'
import { Tool } from '@/types/tool'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const baseTool: Tool = {
  slug: 'word-counter',
  name: 'Word Counter',
  description: 'Count words and characters in your text',
  shortDescription: 'Count words, characters, and more',
  category: 'text',
  icon: '🔢',
  isAI: false,
  isClientSide: true,
  keywords: ['word counter'],
}

const aiTool: Tool = {
  slug: 'ai-text-rewriter',
  name: 'AI Text Rewriter',
  description: 'Rewrite text using AI',
  shortDescription: 'Rewrite text with AI-powered paraphrasing',
  category: 'ai',
  icon: '✍️',
  isAI: true,
  isClientSide: false,
  keywords: ['ai rewriter'],
}

const bothBadgesTool: Tool = {
  slug: 'special-tool',
  name: 'Special Tool',
  description: 'A tool with both badges',
  shortDescription: 'Tool with both badges',
  category: 'dev',
  icon: '🛠',
  isAI: true,
  isClientSide: true,
  keywords: ['special'],
}

const noBadgesTool: Tool = {
  slug: 'plain-tool',
  name: 'Plain Tool',
  description: 'A tool without badges',
  shortDescription: 'Tool without badges',
  category: 'dev',
  icon: '🔧',
  isAI: false,
  isClientSide: false,
  keywords: ['plain'],
}

describe('ToolCard', () => {
  it('renders the tool name', () => {
    render(<ToolCard tool={baseTool} />)

    expect(screen.getByText('Word Counter')).toBeInTheDocument()
  })

  it('renders the tool icon', () => {
    render(<ToolCard tool={baseTool} />)

    expect(screen.getByText('🔢')).toBeInTheDocument()
  })

  it('renders the tool short description', () => {
    render(<ToolCard tool={baseTool} />)

    expect(screen.getByText('Count words, characters, and more')).toBeInTheDocument()
  })

  it('links to the correct /tools/[slug] URL', () => {
    render(<ToolCard tool={baseTool} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/tools/word-counter')
  })

  it('shows "AI-Powered" badge for AI tools', () => {
    render(<ToolCard tool={aiTool} />)

    expect(screen.getByText('AI-Powered')).toBeInTheDocument()
  })

  it('does not show "AI-Powered" badge for non-AI tools', () => {
    render(<ToolCard tool={baseTool} />)

    expect(screen.queryByText('AI-Powered')).not.toBeInTheDocument()
  })

  it('shows "Client-side" badge for client-side tools', () => {
    render(<ToolCard tool={baseTool} />)

    expect(screen.getByText('Client-side')).toBeInTheDocument()
  })

  it('does not show "Client-side" badge for server-side tools', () => {
    render(<ToolCard tool={aiTool} />)

    expect(screen.queryByText('Client-side')).not.toBeInTheDocument()
  })

  it('shows both badges when tool is AI and client-side', () => {
    render(<ToolCard tool={bothBadgesTool} />)

    expect(screen.getByText('AI-Powered')).toBeInTheDocument()
    expect(screen.getByText('Client-side')).toBeInTheDocument()
  })

  it('shows no badges when tool is neither AI nor client-side', () => {
    render(<ToolCard tool={noBadgesTool} />)

    expect(screen.queryByText('AI-Powered')).not.toBeInTheDocument()
    expect(screen.queryByText('Client-side')).not.toBeInTheDocument()
  })

  it('has hover-related CSS classes on the link', () => {
    render(<ToolCard tool={baseTool} />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('hover:shadow-lg')
    expect(link).toHaveClass('hover:border-primary/50')
    expect(link).toHaveClass('transition-all')
  })

  it('has correct group class for child hover effects', () => {
    render(<ToolCard tool={baseTool} />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('group')
  })

  it('renders the tool name with group-hover text styling', () => {
    render(<ToolCard tool={baseTool} />)

    const heading = screen.getByText('Word Counter')
    expect(heading.tagName).toBe('H3')
    expect(heading).toHaveClass('group-hover:text-primary')
  })

  it('renders different tools with their unique slugs', () => {
    const { unmount } = render(<ToolCard tool={aiTool} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tools/ai-text-rewriter')
    unmount()

    render(<ToolCard tool={baseTool} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tools/word-counter')
  })

  it('renders the icon in a large text size container', () => {
    const { container } = render(<ToolCard tool={baseTool} />)

    const iconDiv = container.querySelector('.text-3xl')
    expect(iconDiv).toBeInTheDocument()
    expect(iconDiv).toHaveTextContent('🔢')
  })
})
