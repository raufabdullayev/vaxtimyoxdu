import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ToolContentSection from '../ToolContentSection'

describe('ToolContentSection', () => {
  const defaultProps = {
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Step one', 'Step two', 'Step three'],
    whyUseTitle: 'Why Use This Tool',
    whyUseReasons: ['Reason A', 'Reason B'],
    tipsTitle: 'Tips & Tricks',
    tips: ['Tip 1', 'Tip 2', 'Tip 3'],
  }

  it('renders all three section headings', () => {
    render(<ToolContentSection {...defaultProps} />)

    expect(screen.getByText('How to Use')).toBeInTheDocument()
    expect(screen.getByText('Why Use This Tool')).toBeInTheDocument()
    expect(screen.getByText('Tips & Tricks')).toBeInTheDocument()
  })

  it('renders numbered how-to steps', () => {
    render(<ToolContentSection {...defaultProps} />)

    expect(screen.getByText('Step one')).toBeInTheDocument()
    expect(screen.getByText('Step two')).toBeInTheDocument()
    expect(screen.getByText('Step three')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders why-use reasons', () => {
    render(<ToolContentSection {...defaultProps} />)

    expect(screen.getByText('Reason A')).toBeInTheDocument()
    expect(screen.getByText('Reason B')).toBeInTheDocument()
  })

  it('renders tips', () => {
    render(<ToolContentSection {...defaultProps} />)

    expect(screen.getByText('Tip 1')).toBeInTheDocument()
    expect(screen.getByText('Tip 2')).toBeInTheDocument()
    expect(screen.getByText('Tip 3')).toBeInTheDocument()
  })

  it('renders with empty arrays without crashing', () => {
    render(
      <ToolContentSection
        howToUseTitle="How"
        howToUseSteps={[]}
        whyUseTitle="Why"
        whyUseReasons={[]}
        tipsTitle="Tips"
        tips={[]}
      />
    )

    expect(screen.getByText('How')).toBeInTheDocument()
    expect(screen.getByText('Why')).toBeInTheDocument()
    expect(screen.getByText('Tips')).toBeInTheDocument()
  })
})
