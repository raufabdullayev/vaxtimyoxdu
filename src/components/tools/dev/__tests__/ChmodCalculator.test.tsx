import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ChmodCalculator from '../ChmodCalculator'

describe('ChmodCalculator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with default permissions (644)', () => {
    render(<ChmodCalculator />)
    // "644" appears in both result and preset list
    expect(screen.getAllByText('644').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('-rw-r--r--')).toBeInTheDocument()
    expect(screen.getByText('chmod 644 filename')).toBeInTheDocument()
  })

  it('renders permission grid with Owner, Group, Others', () => {
    render(<ChmodCalculator />)
    expect(screen.getByText('Owner')).toBeInTheDocument()
    expect(screen.getByText('Group')).toBeInTheDocument()
    expect(screen.getByText('Others')).toBeInTheDocument()
  })

  it('toggles permission bits when clicked', () => {
    render(<ChmodCalculator />)
    // Owner execute is off by default, toggle it on
    const ownerExecBtn = screen.getByLabelText('Owner Execute: disabled')
    fireEvent.click(ownerExecBtn)
    expect(screen.getByText('744')).toBeInTheDocument()
    expect(screen.getByText('-rwxr--r--')).toBeInTheDocument()
  })

  it('applies octal input value', () => {
    render(<ChmodCalculator />)
    const input = screen.getByLabelText('Octal permission value')
    fireEvent.change(input, { target: { value: '755' } })
    const applyBtn = screen.getByText('Apply')
    fireEvent.click(applyBtn)
    expect(screen.getAllByText('755').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('-rwxr-xr-x')).toBeInTheDocument()
  })

  it('filters non-octal characters from input', () => {
    render(<ChmodCalculator />)
    const input = screen.getByLabelText('Octal permission value') as HTMLInputElement
    fireEvent.change(input, { target: { value: '89a' } })
    // 8 and 9 are not valid octal, only 'a' gets filtered too
    // The regex [^0-7] removes them
    expect(input.value).toBe('')
  })

  it('disables Apply button for invalid octal input', () => {
    render(<ChmodCalculator />)
    const applyBtn = screen.getByText('Apply')
    expect(applyBtn).toBeDisabled()

    const input = screen.getByLabelText('Octal permission value')
    fireEvent.change(input, { target: { value: '75' } })
    expect(applyBtn).toBeDisabled()
  })

  it('applies preset permissions', () => {
    render(<ChmodCalculator />)
    const preset777 = screen.getByText('777')
    fireEvent.click(preset777)
    expect(screen.getByText('-rwxrwxrwx')).toBeInTheDocument()
    expect(screen.getByText('chmod 777 filename')).toBeInTheDocument()
  })

  it('copies octal value to clipboard', async () => {
    render(<ChmodCalculator />)
    const copyBtns = screen.getAllByText('Copy')
    fireEvent.click(copyBtns[0]) // First copy is for octal
    expect(writeTextMock).toHaveBeenCalledWith('644')
  })

  it('copies symbolic value to clipboard', async () => {
    render(<ChmodCalculator />)
    const copyBtns = screen.getAllByText('Copy')
    fireEvent.click(copyBtns[1]) // Second copy is for symbolic
    expect(writeTextMock).toHaveBeenCalledWith('-rw-r--r--')
  })

  it('copies chmod command to clipboard', async () => {
    render(<ChmodCalculator />)
    const copyBtns = screen.getAllByText('Copy')
    fireEvent.click(copyBtns[2]) // Third copy is for command
    expect(writeTextMock).toHaveBeenCalledWith('chmod 644 filename')
  })

  it('highlights active preset', () => {
    render(<ChmodCalculator />)
    // Find the preset button for 644 in the Common Permissions section
    const all644 = screen.getAllByText('644')
    const presetBtn = all644.find(el => el.closest('button')?.className.includes('bg-primary/10'))
    expect(presetBtn).toBeTruthy()
  })

  it('shows all common preset modes', () => {
    render(<ChmodCalculator />)
    expect(screen.getAllByText('755').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('644').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('777').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('700').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('600').length).toBeGreaterThanOrEqual(1)
  })
})
