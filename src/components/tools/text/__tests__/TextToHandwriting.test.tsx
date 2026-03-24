import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextToHandwriting from '../TextToHandwriting'

describe('TextToHandwriting', () => {
  it('renders textarea', () => {
    render(<TextToHandwriting />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('renders style options', () => {
    render(<TextToHandwriting />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('handles text input', () => {
    render(<TextToHandwriting />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Hello World' } })
    expect(textarea.value).toBe('Hello World')
  })
})
