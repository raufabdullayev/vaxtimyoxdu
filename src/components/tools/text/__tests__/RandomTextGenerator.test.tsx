import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RandomTextGenerator from '../RandomTextGenerator'

describe('RandomTextGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders type selector buttons', () => {
    render(<RandomTextGenerator />)

    expect(screen.getByText('Words')).toBeInTheDocument()
    expect(screen.getByText('Sentences')).toBeInTheDocument()
    expect(screen.getByText('Paragraphs')).toBeInTheDocument()
    expect(screen.getByText('Names')).toBeInTheDocument()
    expect(screen.getByText('Emails')).toBeInTheDocument()
    expect(screen.getByText('Phone Numbers')).toBeInTheDocument()
    expect(screen.getByText('Addresses')).toBeInTheDocument()
  })

  it('renders count input and generate button', () => {
    render(<RandomTextGenerator />)

    expect(screen.getByLabelText('Number of items to generate')).toBeInTheDocument()
    expect(screen.getByText('Generate')).toBeInTheDocument()
  })

  it('generates sentences by default', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Generate'))

    expect(screen.getByLabelText('Generated output')).toBeInTheDocument()
    const output = (screen.getByLabelText('Generated output') as HTMLTextAreaElement).value
    expect(output.length).toBeGreaterThan(0)
  })

  it('generates specified number of words', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Words'))
    fireEvent.change(screen.getByLabelText('Number of items to generate'), {
      target: { value: '10' },
    })
    fireEvent.click(screen.getByText('Generate'))

    const output = (screen.getByLabelText('Generated output') as HTMLTextAreaElement).value
    const words = output.split(' ')
    expect(words).toHaveLength(10)
  })

  it('generates names', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Names'))
    fireEvent.change(screen.getByLabelText('Number of items to generate'), {
      target: { value: '3' },
    })
    fireEvent.click(screen.getByText('Generate'))

    const output = (screen.getByLabelText('Generated output') as HTMLTextAreaElement).value
    const names = output.split('\n')
    expect(names).toHaveLength(3)
    // Each name should have first and last name
    names.forEach((name: string) => {
      expect(name.split(' ').length).toBeGreaterThanOrEqual(2)
    })
  })

  it('generates email addresses', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Emails'))
    fireEvent.change(screen.getByLabelText('Number of items to generate'), {
      target: { value: '3' },
    })
    fireEvent.click(screen.getByText('Generate'))

    const output = (screen.getByLabelText('Generated output') as HTMLTextAreaElement).value
    const emails = output.split('\n')
    expect(emails).toHaveLength(3)
    emails.forEach((email: string) => {
      expect(email).toContain('@')
    })
  })

  it('generates phone numbers', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Phone Numbers'))
    fireEvent.change(screen.getByLabelText('Number of items to generate'), {
      target: { value: '2' },
    })
    fireEvent.click(screen.getByText('Generate'))

    const output = (screen.getByLabelText('Generated output') as HTMLTextAreaElement).value
    const phones = output.split('\n')
    expect(phones).toHaveLength(2)
    phones.forEach((phone: string) => {
      expect(phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/)
    })
  })

  it('generates addresses', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Addresses'))
    fireEvent.change(screen.getByLabelText('Number of items to generate'), {
      target: { value: '2' },
    })
    fireEvent.click(screen.getByText('Generate'))

    const output = (screen.getByLabelText('Generated output') as HTMLTextAreaElement).value
    const addresses = output.split('\n')
    expect(addresses).toHaveLength(2)
    addresses.forEach((addr: string) => {
      expect(addr).toContain(',')
    })
  })

  it('generates paragraphs separated by double newlines', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Paragraphs'))
    fireEvent.change(screen.getByLabelText('Number of items to generate'), {
      target: { value: '2' },
    })
    fireEvent.click(screen.getByText('Generate'))

    const output = (screen.getByLabelText('Generated output') as HTMLTextAreaElement).value
    const paragraphs = output.split('\n\n')
    expect(paragraphs).toHaveLength(2)
  })

  it('shows word and character count after generation', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Generate'))

    // The count info paragraph matches pattern like "46 words, 317 characters"
    expect(screen.getByText(/\d+ words, \d+ characters/)).toBeInTheDocument()
  })

  it('copies generated output to clipboard', () => {
    render(<RandomTextGenerator />)

    fireEvent.click(screen.getByText('Generate'))
    fireEvent.click(screen.getByLabelText('Copy generated text'))

    expect(writeTextMock).toHaveBeenCalled()
  })
})
