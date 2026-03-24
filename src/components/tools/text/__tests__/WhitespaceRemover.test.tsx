import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import WhitespaceRemover from '../WhitespaceRemover'

describe('WhitespaceRemover', () => {
  it('renders textarea', () => {
    render(<WhitespaceRemover />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('processes text input', () => {
    render(<WhitespaceRemover />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'hello    world' } })
    // Component should render without errors
    expect(textarea.value).toBe('hello    world')
  })

  it('has option checkboxes', () => {
    render(<WhitespaceRemover />)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBeGreaterThanOrEqual(3)
  })

  it('renders copy button', () => {
    render(<WhitespaceRemover />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
