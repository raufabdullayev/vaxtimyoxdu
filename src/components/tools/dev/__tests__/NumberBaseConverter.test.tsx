import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NumberBaseConverter from '../NumberBaseConverter'

describe('NumberBaseConverter', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders input and base selector', () => {
    render(<NumberBaseConverter />)
    expect(screen.getByLabelText('Number input')).toBeInTheDocument()
    expect(screen.getByLabelText('Select input base')).toBeInTheDocument()
  })

  it('shows hint text when no input', () => {
    render(<NumberBaseConverter />)
    expect(screen.getByText(/Enter a number above/)).toBeInTheDocument()
  })

  it('converts decimal to all bases', () => {
    render(<NumberBaseConverter />)
    const input = screen.getByLabelText('Number input')
    fireEvent.change(input, { target: { value: '181' } })
    expect(screen.getByText('10110101')).toBeInTheDocument() // Binary
    expect(screen.getByText('265')).toBeInTheDocument() // Octal
    expect(screen.getByText('B5')).toBeInTheDocument() // Hex
  })

  it('converts binary to all bases', () => {
    render(<NumberBaseConverter />)
    const select = screen.getByLabelText('Select input base')
    fireEvent.change(select, { target: { value: '2' } })
    const input = screen.getByLabelText('Number input')
    fireEvent.change(input, { target: { value: '10110101' } })
    expect(screen.getByText('265')).toBeInTheDocument() // Octal
    expect(screen.getByText('181')).toBeInTheDocument() // Decimal
    expect(screen.getByText('B5')).toBeInTheDocument() // Hex
  })

  it('converts hex to all bases', () => {
    render(<NumberBaseConverter />)
    const select = screen.getByLabelText('Select input base')
    fireEvent.change(select, { target: { value: '16' } })
    const input = screen.getByLabelText('Number input')
    fireEvent.change(input, { target: { value: 'FF' } })
    expect(screen.getByText('11111111')).toBeInTheDocument() // Binary
    expect(screen.getByText('377')).toBeInTheDocument() // Octal
    expect(screen.getByText('255')).toBeInTheDocument() // Decimal
  })

  it('shows validation error for invalid binary input', () => {
    render(<NumberBaseConverter />)
    const select = screen.getByLabelText('Select input base')
    fireEvent.change(select, { target: { value: '2' } })
    const input = screen.getByLabelText('Number input')
    fireEvent.change(input, { target: { value: '234' } })
    expect(screen.getByText(/Invalid character for Binary/)).toBeInTheDocument()
  })

  it('shows validation error for invalid octal input', () => {
    render(<NumberBaseConverter />)
    const select = screen.getByLabelText('Select input base')
    fireEvent.change(select, { target: { value: '8' } })
    const input = screen.getByLabelText('Number input')
    fireEvent.change(input, { target: { value: '89' } })
    expect(screen.getByText(/Invalid character for Octal/)).toBeInTheDocument()
  })

  it('clears input when base changes', () => {
    render(<NumberBaseConverter />)
    const input = screen.getByLabelText('Number input') as HTMLInputElement
    fireEvent.change(input, { target: { value: '123' } })
    const select = screen.getByLabelText('Select input base')
    fireEvent.change(select, { target: { value: '2' } })
    expect(input.value).toBe('')
  })

  it('copies conversion result to clipboard', () => {
    render(<NumberBaseConverter />)
    const input = screen.getByLabelText('Number input')
    fireEvent.change(input, { target: { value: '10' } })
    const copyBtns = screen.getAllByText('Copy')
    fireEvent.click(copyBtns[0])
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('marks input base with Input badge', () => {
    render(<NumberBaseConverter />)
    const input = screen.getByLabelText('Number input')
    fireEvent.change(input, { target: { value: '42' } })
    expect(screen.getByText('Input')).toBeInTheDocument()
  })
})
