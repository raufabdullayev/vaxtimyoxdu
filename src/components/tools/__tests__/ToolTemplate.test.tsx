import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ToolTemplate from '../ToolTemplate'

vi.mock('@/components/layout/LazyAdBanner', () => ({
  default: ({ slot }: { slot: string }) => <div data-testid={`ad-${slot}`} />,
}))

vi.mock('@/components/common/PoweredByBrand', () => ({
  default: () => <div data-testid="powered-by" />,
}))

const mockTool = {
  slug: 'test-tool',
  name: 'Test Tool',
  shortDescription: 'A test tool for testing',
  description: 'This is a detailed description of the test tool',
  icon: '🔧',
  category: 'dev' as const,
  component: 'TestTool',
  isAI: false,
  isClientSide: true,
  keywords: ['test', 'tool'],
}

describe('ToolTemplate', () => {
  it('renders tool name', () => {
    render(
      <ToolTemplate tool={mockTool}>
        <div>Tool content</div>
      </ToolTemplate>
    )
    expect(screen.getByText('Test Tool')).toBeInTheDocument()
  })

  it('renders tool icon', () => {
    render(
      <ToolTemplate tool={mockTool}>
        <div>Tool content</div>
      </ToolTemplate>
    )
    expect(screen.getByText('🔧')).toBeInTheDocument()
  })

  it('renders tool short description', () => {
    render(
      <ToolTemplate tool={mockTool}>
        <div>Tool content</div>
      </ToolTemplate>
    )
    expect(screen.getByText('A test tool for testing')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <ToolTemplate tool={mockTool}>
        <div>Tool content goes here</div>
      </ToolTemplate>
    )
    expect(screen.getByText('Tool content goes here')).toBeInTheDocument()
  })

  it('renders about section with description', () => {
    render(
      <ToolTemplate tool={mockTool}>
        <div>Content</div>
      </ToolTemplate>
    )
    expect(screen.getByText('About Test Tool')).toBeInTheDocument()
    expect(screen.getByText('This is a detailed description of the test tool')).toBeInTheDocument()
  })

  it('renders ad banners', () => {
    render(
      <ToolTemplate tool={mockTool}>
        <div>Content</div>
      </ToolTemplate>
    )
    expect(screen.getByTestId('ad-tool-top')).toBeInTheDocument()
    expect(screen.getByTestId('ad-tool-bottom')).toBeInTheDocument()
  })

  it('renders PoweredByBrand', () => {
    render(
      <ToolTemplate tool={mockTool}>
        <div>Content</div>
      </ToolTemplate>
    )
    expect(screen.getByTestId('powered-by')).toBeInTheDocument()
  })
})
