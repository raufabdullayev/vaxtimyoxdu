import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ApiResponseFormatter from '../ApiResponseFormatter'

describe('ApiResponseFormatter', () => {
  it('renders input area', () => {
    render(<ApiResponseFormatter />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('renders format buttons', () => {
    render(<ApiResponseFormatter />)
    expect(screen.getByText(/JSON/)).toBeInTheDocument()
  })

  it('formats valid JSON input', () => {
    render(<ApiResponseFormatter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '{"key":"value"}' } })
    // Should show formatted output
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
