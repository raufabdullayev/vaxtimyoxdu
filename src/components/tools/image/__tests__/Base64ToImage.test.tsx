import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Base64ToImage from '../Base64ToImage'

describe('Base64ToImage', () => {
  it('renders base64 input textarea', () => {
    render(<Base64ToImage />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('shows error for empty input', () => {
    render(<Base64ToImage />)
    const decodeBtn = screen.getByText(/Decode|Convert/i)
    fireEvent.click(decodeBtn)
    expect(screen.getByText(/Please enter a Base64/)).toBeInTheDocument()
  })

  it('shows error for invalid base64', () => {
    render(<Base64ToImage />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '!!!invalid!!!' } })
    const decodeBtn = screen.getByText(/Decode|Convert/i)
    fireEvent.click(decodeBtn)
    expect(screen.getByText(/Invalid Base64/)).toBeInTheDocument()
  })

  it('decodes valid data URI', () => {
    render(<Base64ToImage />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    // Minimal valid PNG base64
    const validBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    fireEvent.change(textarea, { target: { value: validBase64 } })
    const decodeBtn = screen.getByText(/Decode|Convert/i)
    fireEvent.click(decodeBtn)
    // Should not show error
    expect(screen.queryByText(/Invalid Base64/)).not.toBeInTheDocument()
  })

  it('auto-detects JPEG base64', () => {
    render(<Base64ToImage />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '/9j/4AAQSkZJRg==' } })
    const decodeBtn = screen.getByText(/Decode|Convert/i)
    fireEvent.click(decodeBtn)
    expect(screen.queryByText(/Invalid Base64/)).not.toBeInTheDocument()
  })
})
