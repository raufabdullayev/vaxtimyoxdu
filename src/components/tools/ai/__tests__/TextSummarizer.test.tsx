import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TextSummarizer from '../TextSummarizer'

describe('TextSummarizer', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders textarea and length options', () => {
    render(<TextSummarizer />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('shows length options', () => {
    render(<TextSummarizer />)
    expect(screen.getByText(/Short/)).toBeInTheDocument()
    expect(screen.getByText(/Medium/)).toBeInTheDocument()
    expect(screen.getByText(/Detailed/)).toBeInTheDocument()
  })

  it('shows error for empty input', () => {
    render(<TextSummarizer />)
    const buttons = screen.getAllByRole('button')
    const submitBtn = buttons.find(b => b.textContent?.toLowerCase().includes('summar')) || buttons[buttons.length - 1]
    fireEvent.click(submitBtn)
    expect(screen.getByText('pleaseEnterText')).toBeInTheDocument()
  })

  it('calls summarize API', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'X-RateLimit-Remaining': '3' }),
      json: () => Promise.resolve({ result: 'Summary of text' }),
    } as Response)

    render(<TextSummarizer />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Long text to summarize here' } })

    const buttons = screen.getAllByRole('button')
    const submitBtn = buttons.find(b => b.textContent?.toLowerCase().includes('summar')) || buttons[buttons.length - 1]
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/ai/summarize', expect.objectContaining({
        method: 'POST',
      }))
    })
  })

  it('displays result after successful summarization', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'X-RateLimit-Remaining': '3' }),
      json: () => Promise.resolve({ result: 'This is the summary.' }),
    } as Response)

    render(<TextSummarizer />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Long text' } })
    const buttons = screen.getAllByRole('button')
    const submitBtn = buttons.find(b => b.textContent?.toLowerCase().includes('summar')) || buttons[buttons.length - 1]
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText('This is the summary.')).toBeInTheDocument()
    })
  })
})
