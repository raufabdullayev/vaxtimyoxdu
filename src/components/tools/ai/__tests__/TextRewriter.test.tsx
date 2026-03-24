import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TextRewriter from '../TextRewriter'

describe('TextRewriter', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders textarea and tone selection', () => {
    render(<TextRewriter />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
    // Tone options
    expect(screen.getByText('professional')).toBeInTheDocument()
    expect(screen.getByText('casual')).toBeInTheDocument()
  })

  it('shows error for empty input', () => {
    render(<TextRewriter />)
    const buttons = screen.getAllByRole('button')
    // Find the rewrite/submit button
    const submitBtn = buttons.find(b => b.textContent?.toLowerCase().includes('rewrite')) || buttons[buttons.length - 1]
    fireEvent.click(submitBtn)
    expect(screen.getByText('enterTextToRewrite')).toBeInTheDocument()
  })

  it('calls rewrite API with tone', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'X-RateLimit-Remaining': '5' }),
      json: () => Promise.resolve({ result: 'Rewritten text' }),
    } as Response)

    render(<TextRewriter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Original text' } })

    const buttons = screen.getAllByRole('button')
    const submitBtn = buttons.find(b => b.textContent?.toLowerCase().includes('rewrite')) || buttons[buttons.length - 1]
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/ai/rewrite', expect.objectContaining({
        method: 'POST',
      }))
    })
  })

  it('shows rate limit error on 429', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 429,
      headers: new Headers(),
      json: () => Promise.resolve({}),
    } as Response)

    render(<TextRewriter />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Some text' } })
    const buttons = screen.getAllByRole('button')
    const submitBtn = buttons.find(b => b.textContent?.toLowerCase().includes('rewrite')) || buttons[buttons.length - 1]
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText('rateLimitExceeded')).toBeInTheDocument()
    })
  })
})
