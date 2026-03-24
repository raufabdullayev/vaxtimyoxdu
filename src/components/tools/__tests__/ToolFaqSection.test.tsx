import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ToolFaqSection from '../ToolFaqSection'

describe('ToolFaqSection', () => {
  const faqs = [
    { question: 'What is this tool?', answer: 'A great testing tool.' },
    { question: 'How does it work?', answer: 'It processes your input.' },
    { question: 'Is it free?', answer: 'Yes, completely free.' },
  ]

  it('renders the section title', () => {
    render(<ToolFaqSection title="FAQ" faqs={faqs} />)

    expect(screen.getByText('FAQ')).toBeInTheDocument()
  })

  it('renders all FAQ questions', () => {
    render(<ToolFaqSection title="FAQ" faqs={faqs} />)

    expect(screen.getByText('What is this tool?')).toBeInTheDocument()
    expect(screen.getByText('How does it work?')).toBeInTheDocument()
    expect(screen.getByText('Is it free?')).toBeInTheDocument()
  })

  it('has the first FAQ expanded by default', () => {
    render(<ToolFaqSection title="FAQ" faqs={faqs} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles FAQ items on click', () => {
    render(<ToolFaqSection title="FAQ" faqs={faqs} />)

    const buttons = screen.getAllByRole('button')

    // Click the second question to expand it
    fireEvent.click(buttons[1])
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')

    // Click the same question again to collapse it
    fireEvent.click(buttons[1])
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders nothing when faqs array is empty', () => {
    const { container } = render(<ToolFaqSection title="FAQ" faqs={[]} />)

    expect(container.innerHTML).toBe('')
  })
})
