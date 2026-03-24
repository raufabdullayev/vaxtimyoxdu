import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoremIpsumAlternative from '../LoremIpsumAlternative'

describe('LoremIpsumAlternative', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders without crashing', () => {
    render(<LoremIpsumAlternative />)
    expect(document.querySelector('.space-y-4, .space-y-6')).toBeInTheDocument()
  })

  it('renders generate button', () => {
    render(<LoremIpsumAlternative />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders configuration options', () => {
    render(<LoremIpsumAlternative />)
    const inputs = document.querySelectorAll('input, select')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })
})
