import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TwitterCharCounter from '../TwitterCharCounter'

describe('TwitterCharCounter', () => {
  it('renders textarea', () => {
    render(<TwitterCharCounter />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('shows character count', () => {
    render(<TwitterCharCounter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Hello world' } })
    // Should show remaining characters (280 - 11 = 269)
    expect(screen.getByText(/269/)).toBeInTheDocument()
  })

  it('shows warning when approaching limit', () => {
    render(<TwitterCharCounter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    const longText = 'a'.repeat(270)
    fireEvent.change(textarea, { target: { value: longText } })
    // Should show remaining <= 10
    expect(screen.getByText(/10/)).toBeInTheDocument()
  })

  it('detects hashtags', () => {
    render(<TwitterCharCounter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Hello #world #test' } })
    // Should count 2 hashtags
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('detects mentions', () => {
    render(<TwitterCharCounter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Hello @user1 @user2' } })
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('counts URLs as 23 characters', () => {
    render(<TwitterCharCounter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Check https://example.com/very/long/url/path' } })
    // "Check " = 6 chars + URL counted as 23 = 29 total, remaining = 251
    expect(screen.getByText(/251/)).toBeInTheDocument()
  })
})
