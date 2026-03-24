import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HttpHeaderParser from '../HttpHeaderParser'

describe('HttpHeaderParser', () => {
  it('renders input area', () => {
    render(<HttpHeaderParser />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('parses HTTP headers', () => {
    render(<HttpHeaderParser />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Content-Type: application/json\nCache-Control: no-cache' } })
    // Should parse and display the headers
    expect(screen.getByText(/Content-Type/)).toBeInTheDocument()
  })

  it('has load sample button', () => {
    render(<HttpHeaderParser />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
