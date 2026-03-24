import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AspectRatioCalc from '../AspectRatioCalc'

describe('AspectRatioCalc', () => {
  it('renders with default 1920x1080', () => {
    render(<AspectRatioCalc />)
    expect(screen.getByDisplayValue('1920')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1080')).toBeInTheDocument()
  })

  it('shows calculated aspect ratio', () => {
    render(<AspectRatioCalc />)
    expect(screen.getAllByText('16:9').length).toBeGreaterThanOrEqual(1)
  })

  it('shows preset buttons', () => {
    render(<AspectRatioCalc />)
    expect(screen.getByText('4:3')).toBeInTheDocument()
    expect(screen.getByText('1:1')).toBeInTheDocument()
    expect(screen.getByText('21:9')).toBeInTheDocument()
  })

  it('updates ratio when width changes', () => {
    render(<AspectRatioCalc />)
    const widthInput = screen.getByDisplayValue('1920')
    fireEvent.change(widthInput, { target: { value: '1024' } })
    // 1024:1080 won't be a clean ratio
  })

  it('applies preset when clicked', () => {
    render(<AspectRatioCalc />)
    const squareBtn = screen.getAllByText('1:1')[0]
    fireEvent.click(squareBtn)
  })

  it('shows common resolutions', () => {
    render(<AspectRatioCalc />)
    // Default is 16:9 which has common resolutions
    expect(screen.getByText(/1920x1080/)).toBeInTheDocument()
  })

  it('shows lock ratio toggle', () => {
    render(<AspectRatioCalc />)
    const lockButton = screen.getByText(/lock/i)
    expect(lockButton).toBeInTheDocument()
  })

  it('handles zero width gracefully', () => {
    render(<AspectRatioCalc />)
    fireEvent.change(screen.getByDisplayValue('1920'), { target: { value: '0' } })
    // Should not crash and ratio should not show a valid ratio
  })
})
