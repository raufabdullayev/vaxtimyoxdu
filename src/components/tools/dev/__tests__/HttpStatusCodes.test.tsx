import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HttpStatusCodes from '../HttpStatusCodes'

describe('HttpStatusCodes', () => {
  it('renders search input', () => {
    render(<HttpStatusCodes />)
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('displays status code categories', () => {
    render(<HttpStatusCodes />)
    expect(screen.getAllByText(/1xx/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/2xx/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/3xx/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/4xx/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/5xx/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows common status codes', () => {
    render(<HttpStatusCodes />)
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('filters status codes by search', () => {
    render(<HttpStatusCodes />)
    const searchInput = screen.getByPlaceholderText(/search/i)
    fireEvent.change(searchInput, { target: { value: '404' } })

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Not Found')).toBeInTheDocument()
    expect(screen.queryByText('200')).not.toBeInTheDocument()
  })

  it('filters by category', () => {
    render(<HttpStatusCodes />)
    // Click a category filter button
    const buttons = screen.getAllByRole('button')
    const successBtn = buttons.find((b) => b.textContent?.includes('2xx'))
    if (successBtn) fireEvent.click(successBtn)

    expect(screen.getByText('200')).toBeInTheDocument()
  })

  it('shows description for status codes', () => {
    render(<HttpStatusCodes />)
    expect(screen.getByText(/OK/)).toBeInTheDocument()
  })

  it('searches by name', () => {
    render(<HttpStatusCodes />)
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'teapot' } })

    expect(screen.getByText('418')).toBeInTheDocument()
  })
})
