import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GrammarChecker from '../GrammarChecker'

describe('GrammarChecker', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders textarea and check button', () => {
    render(<GrammarChecker />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('shows error for empty input', async () => {
    render(<GrammarChecker />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(screen.getByText('pleaseEnterText')).toBeInTheDocument()
  })

  it('calls API on submit with text', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'X-RateLimit-Remaining': '5' }),
      json: () => Promise.resolve({ result: 'Corrected text here' }),
    } as Response)

    render(<GrammarChecker />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'This is test text' } })

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/ai/grammar', expect.objectContaining({
        method: 'POST',
      }))
    })
  })

  it('shows rate limit error on 429', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 429,
      headers: new Headers({ 'Retry-After': '30' }),
      json: () => Promise.resolve({}),
    } as Response)

    render(<GrammarChecker />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Some text' } })
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByText(/rateLimitRetry/)).toBeInTheDocument()
    })
  })

  it('shows service unavailable on 500', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      headers: new Headers(),
      json: () => Promise.resolve({}),
    } as Response)

    render(<GrammarChecker />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Some text' } })
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByText('serviceUnavailable')).toBeInTheDocument()
    })
  })
})
