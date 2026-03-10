import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GradientGenerator from '../GradientGenerator'

describe('GradientGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders gradient preview', () => {
    render(<GradientGenerator />)

    expect(screen.getByLabelText('Gradient preview')).toBeInTheDocument()
  })

  it('renders preset buttons', () => {
    render(<GradientGenerator />)

    expect(screen.getByText('Sunset')).toBeInTheDocument()
    expect(screen.getByText('Ocean')).toBeInTheDocument()
    expect(screen.getByText('Purple')).toBeInTheDocument()
    expect(screen.getByText('Forest')).toBeInTheDocument()
    expect(screen.getByText('Night')).toBeInTheDocument()
    expect(screen.getByText('Rainbow')).toBeInTheDocument()
  })

  it('renders Linear and Radial type buttons', () => {
    render(<GradientGenerator />)

    expect(screen.getByText('Linear')).toBeInTheDocument()
    expect(screen.getByText('Radial')).toBeInTheDocument()
  })

  it('has Linear type selected by default', () => {
    render(<GradientGenerator />)

    const linearBtn = screen.getByText('Linear')
    expect(linearBtn.className).toContain('bg-primary')
  })

  it('displays CSS code output', () => {
    render(<GradientGenerator />)

    expect(screen.getByText('CSS Code')).toBeInTheDocument()
    expect(screen.getByText(/background: linear-gradient/)).toBeInTheDocument()
  })

  it('shows default gradient with 135deg angle', () => {
    render(<GradientGenerator />)

    expect(screen.getByText(/Angle: 135deg/)).toBeInTheDocument()
  })

  it('shows angle slider when Linear type is selected', () => {
    render(<GradientGenerator />)

    expect(screen.getByText(/Angle: 135deg/)).toBeInTheDocument()
  })

  it('hides angle slider when Radial type is selected', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    await user.click(screen.getByText('Radial'))

    expect(screen.queryByText(/Angle:/)).not.toBeInTheDocument()
  })

  it('switches to radial gradient', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    await user.click(screen.getByText('Radial'))

    expect(screen.getByText(/radial-gradient/)).toBeInTheDocument()
  })

  it('switches back to linear gradient', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    await user.click(screen.getByText('Radial'))
    await user.click(screen.getByText('Linear'))

    expect(screen.getByText(/linear-gradient/)).toBeInTheDocument()
  })

  it('renders color stops section', () => {
    render(<GradientGenerator />)

    expect(screen.getByText('Color Stops')).toBeInTheDocument()
  })

  it('starts with 2 color stops', () => {
    render(<GradientGenerator />)

    // Should have color stop position indicators
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('shows "+ Add Stop" button', () => {
    render(<GradientGenerator />)

    expect(screen.getByText('+ Add Stop')).toBeInTheDocument()
  })

  it('adds a color stop when "+ Add Stop" is clicked', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    await user.click(screen.getByText('+ Add Stop'))

    // Now there should be 3 stops, so the remove buttons appear
    const removeButtons = screen.getAllByTitle('Remove stop')
    expect(removeButtons).toHaveLength(3)
  })

  it('does not show remove buttons when only 2 stops exist', () => {
    render(<GradientGenerator />)

    expect(screen.queryByTitle('Remove stop')).not.toBeInTheDocument()
  })

  it('removes a color stop', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    // Add a third stop
    await user.click(screen.getByText('+ Add Stop'))

    const removeButtons = screen.getAllByTitle('Remove stop')
    expect(removeButtons).toHaveLength(3)

    // Remove one
    await user.click(removeButtons[2])

    expect(screen.queryAllByTitle('Remove stop')).toHaveLength(0)
  })

  it('hides "+ Add Stop" when 6 stops are reached', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    // Add 4 more stops (2 default + 4 = 6)
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByText('+ Add Stop'))
    }

    expect(screen.queryByText('+ Add Stop')).not.toBeInTheDocument()
  })

  it('applies preset when clicked', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    await user.click(screen.getByText('Sunset'))

    const cssOutput = screen.getByText(/background:/).textContent || ''
    expect(cssOutput).toContain('#f12711')
    expect(cssOutput).toContain('#f5af19')
  })

  it('copies CSS code to clipboard', async () => {
    render(<GradientGenerator />)

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(1)
      const copiedText = writeTextMock.mock.calls[0][0]
      expect(copiedText).toContain('background:')
      expect(copiedText).toContain('linear-gradient')
    })
  })

  it('shows "Copied!" after copying', async () => {
    render(<GradientGenerator />)

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('updates preview when gradient changes', () => {
    render(<GradientGenerator />)

    const preview = screen.getByLabelText('Gradient preview')
    expect(preview.style.background).toContain('linear-gradient')
  })

  it('applies Night preset with 3 color stops', async () => {
    const user = userEvent.setup()
    render(<GradientGenerator />)

    await user.click(screen.getByText('Night'))

    // Night has 3 stops, so remove buttons should appear
    const removeButtons = screen.getAllByTitle('Remove stop')
    expect(removeButtons.length).toBe(3)
  })

  it('renders color stop hex input values', () => {
    render(<GradientGenerator />)

    // Default colors
    const hexInputs = screen.getAllByLabelText(/Color stop \d+ hex value/)
    expect(hexInputs).toHaveLength(2)
    expect(hexInputs[0]).toHaveValue('#667eea')
    expect(hexInputs[1]).toHaveValue('#764ba2')
  })
})
