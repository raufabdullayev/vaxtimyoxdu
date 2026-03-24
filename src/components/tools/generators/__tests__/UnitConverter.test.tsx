import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import UnitConverter from '../UnitConverter'

describe('UnitConverter', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with length category by default', () => {
    render(<UnitConverter />)
    const lengthBtn = screen.getByText('Length')
    expect(lengthBtn).toBeInTheDocument()
    expect(lengthBtn.getAttribute('aria-pressed')).toBe('true')
  })

  it('renders all category buttons', () => {
    render(<UnitConverter />)
    expect(screen.getByText('Length')).toBeInTheDocument()
    expect(screen.getByText('Weight')).toBeInTheDocument()
    expect(screen.getByText('Temperature')).toBeInTheDocument()
    expect(screen.getByText('Speed')).toBeInTheDocument()
    expect(screen.getByText('Digital Storage')).toBeInTheDocument()
    expect(screen.getByText('Time')).toBeInTheDocument()
    expect(screen.getByText('Area')).toBeInTheDocument()
  })

  it('shows default conversion of 1 m to km', () => {
    render(<UnitConverter />)
    const result = screen.getByLabelText('Conversion result') as HTMLInputElement
    expect(result.value).toBe('0.001')
  })

  it('converts meters to feet', () => {
    render(<UnitConverter />)
    const toSelect = screen.getByLabelText('To unit')
    fireEvent.change(toSelect, { target: { value: 'ft' } })
    const result = screen.getByLabelText('Conversion result') as HTMLInputElement
    expect(parseFloat(result.value)).toBeCloseTo(3.28084, 2)
  })

  it('swaps from and to units', () => {
    render(<UnitConverter />)
    fireEvent.click(screen.getByLabelText('Swap units'))
    const fromSelect = screen.getByLabelText('From unit') as HTMLSelectElement
    const toSelect = screen.getByLabelText('To unit') as HTMLSelectElement
    expect(fromSelect.value).toBe('km')
    expect(toSelect.value).toBe('m')
  })

  it('changes input value and recalculates', () => {
    render(<UnitConverter />)
    const input = screen.getByLabelText('Value to convert')
    fireEvent.change(input, { target: { value: '1000' } })
    const result = screen.getByLabelText('Conversion result') as HTMLInputElement
    expect(result.value).toBe('1')
  })

  it('switches category and resets units', () => {
    render(<UnitConverter />)
    fireEvent.click(screen.getByText('Weight'))
    const fromSelect = screen.getByLabelText('From unit') as HTMLSelectElement
    expect(fromSelect.value).toBe('mg')
  })

  it('shows formula display', () => {
    render(<UnitConverter />)
    expect(screen.getByText(/1 m = .* km/)).toBeInTheDocument()
  })

  it('shows all conversions list', () => {
    render(<UnitConverter />)
    expect(screen.getByText('All Length Conversions')).toBeInTheDocument()
  })

  it('handles temperature conversion (C to F)', () => {
    render(<UnitConverter />)
    fireEvent.click(screen.getByText('Temperature'))
    const fromSelect = screen.getByLabelText('From unit')
    fireEvent.change(fromSelect, { target: { value: 'C' } })
    const toSelect = screen.getByLabelText('To unit')
    fireEvent.change(toSelect, { target: { value: 'F' } })
    const input = screen.getByLabelText('Value to convert')
    fireEvent.change(input, { target: { value: '100' } })
    const result = screen.getByLabelText('Conversion result') as HTMLInputElement
    expect(parseFloat(result.value)).toBeCloseTo(212, 0)
  })

  it('copies result to clipboard', () => {
    render(<UnitConverter />)
    fireEvent.click(screen.getByLabelText('Copy result'))
    expect(writeTextMock).toHaveBeenCalledWith('0.001')
  })

  it('shows empty result for NaN input', () => {
    render(<UnitConverter />)
    const input = screen.getByLabelText('Value to convert')
    fireEvent.change(input, { target: { value: '' } })
    const result = screen.getByLabelText('Conversion result') as HTMLInputElement
    expect(result.value).toBe('')
  })
})
