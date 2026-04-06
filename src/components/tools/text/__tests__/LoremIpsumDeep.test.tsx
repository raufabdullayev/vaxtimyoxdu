import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoremIpsumAlternative from '../LoremIpsumAlternative'

describe('LoremIpsumAlternative - Deep Tests', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders style selector with all 6 styles', () => {
    render(<LoremIpsumAlternative />)
    expect(screen.getByText('Hipster')).toBeInTheDocument()
    expect(screen.getByText('Corporate')).toBeInTheDocument()
    expect(screen.getByText('Pirate')).toBeInTheDocument()
    expect(screen.getByText('Space')).toBeInTheDocument()
    expect(screen.getByText('Foodie')).toBeInTheDocument()
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  it('renders count input with default value 3', () => {
    render(<LoremIpsumAlternative />)
    const countInput = document.querySelector(
      'input[type="number"]'
    ) as HTMLInputElement
    expect(countInput.value).toBe('3')
  })

  it('renders unit selector with paragraphs selected', () => {
    render(<LoremIpsumAlternative />)
    const select = document.querySelector('select') as HTMLSelectElement
    expect(select.value).toBe('paragraphs')
  })

  it('generates paragraphs by default', () => {
    render(<LoremIpsumAlternative />)
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelector(
      'textarea[readonly], pre, .whitespace-pre-wrap'
    )
    expect(output).toBeInTheDocument()
    // Generated output should contain periods (sentences end with dots)
    const textContent = output?.textContent || ''
    expect(textContent.length).toBeGreaterThan(0)
    expect(textContent).toContain('.')
  })

  it('generates sentences', () => {
    render(<LoremIpsumAlternative />)
    const select = document.querySelector('select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'sentences' } })
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelectorAll('textarea, pre, .whitespace-pre-wrap')
    const lastEl = output[output.length - 1]
    const textContent = lastEl?.textContent || ''
    expect(textContent.length).toBeGreaterThan(0)
    expect(textContent).toContain('.')
  })

  it('generates words', () => {
    render(<LoremIpsumAlternative />)
    const select = document.querySelector('select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'words' } })

    const countInput = document.querySelector(
      'input[type="number"]'
    ) as HTMLInputElement
    fireEvent.change(countInput, { target: { value: '5' } })
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelectorAll('textarea, pre, .whitespace-pre-wrap')
    const lastEl = output[output.length - 1]
    const textContent = lastEl?.textContent || ''
    expect(textContent.length).toBeGreaterThan(0)
  })

  it('changes style to Pirate', () => {
    render(<LoremIpsumAlternative />)
    fireEvent.click(screen.getByText('Pirate'))
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelectorAll('textarea, pre, .whitespace-pre-wrap')
    const lastEl = output[output.length - 1]
    const textContent = lastEl?.textContent?.toLowerCase() || ''
    expect(textContent.length).toBeGreaterThan(0)
  })

  it('changes style to Tech', () => {
    render(<LoremIpsumAlternative />)
    fireEvent.click(screen.getByText('Tech'))
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelectorAll('textarea, pre, .whitespace-pre-wrap')
    const lastEl = output[output.length - 1]
    expect(lastEl?.textContent?.length).toBeGreaterThan(0)
  })

  it('changes style to Space', () => {
    render(<LoremIpsumAlternative />)
    fireEvent.click(screen.getByText('Space'))
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelectorAll('textarea, pre, .whitespace-pre-wrap')
    const lastEl = output[output.length - 1]
    expect(lastEl?.textContent?.length).toBeGreaterThan(0)
  })

  it('changes style to Foodie', () => {
    render(<LoremIpsumAlternative />)
    fireEvent.click(screen.getByText('Foodie'))
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelectorAll('textarea, pre, .whitespace-pre-wrap')
    const lastEl = output[output.length - 1]
    expect(lastEl?.textContent?.length).toBeGreaterThan(0)
  })

  it('changes style to Corporate', () => {
    render(<LoremIpsumAlternative />)
    fireEvent.click(screen.getByText('Corporate'))
    fireEvent.click(screen.getByText('generate'))

    const output = document.querySelectorAll('textarea, pre, .whitespace-pre-wrap')
    const lastEl = output[output.length - 1]
    expect(lastEl?.textContent?.length).toBeGreaterThan(0)
  })

  it('copies generated text to clipboard', () => {
    render(<LoremIpsumAlternative />)
    fireEvent.click(screen.getByText('generate'))

    const copyBtn = screen.getByText('copy')
    fireEvent.click(copyBtn)
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('enforces minimum count of 1', () => {
    render(<LoremIpsumAlternative />)
    const countInput = document.querySelector(
      'input[type="number"]'
    ) as HTMLInputElement
    fireEvent.change(countInput, { target: { value: '0' } })
    expect(countInput.value).toBe('1')
  })

  it('shows copy button only after generating', () => {
    render(<LoremIpsumAlternative />)
    expect(screen.queryByText('copy')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('generate'))
    expect(screen.getByText('copy')).toBeInTheDocument()
  })
})
