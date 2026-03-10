import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Newsletter from '../Newsletter'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Mail: ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <svg data-testid="mail-icon" className={className} {...props} />
  ),
  Loader2: ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <svg data-testid="loader-icon" className={className} {...props} />
  ),
}))

describe('Newsletter', () => {
  let mockStorage: Record<string, string>
  const fetchMock = vi.fn()

  beforeEach(() => {
    mockStorage = {}
    fetchMock.mockClear()

    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn((key: string) => mockStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { mockStorage[key] = value }),
      removeItem: vi.fn((key: string) => { delete mockStorage[key] }),
      clear: vi.fn(() => { mockStorage = {} }),
      get length() { return Object.keys(mockStorage).length },
      key: vi.fn(),
    }

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true,
    })

    // Mock fetch
    vi.stubGlobal('fetch', fetchMock)
  })

  it('renders the newsletter form', () => {
    render(<Newsletter />)

    expect(screen.getByText('Yeniliklərdən xəbərdar olun')).toBeInTheDocument()
  })

  it('renders email input with placeholder', () => {
    render(<Newsletter />)

    expect(screen.getByPlaceholderText('Email ünvanınızı daxil edin')).toBeInTheDocument()
  })

  it('renders subscribe button', () => {
    render(<Newsletter />)

    expect(screen.getByText('Abunə ol')).toBeInTheDocument()
  })

  it('renders mail icon', () => {
    render(<Newsletter />)

    expect(screen.getAllByTestId('mail-icon').length).toBeGreaterThanOrEqual(1)
  })

  it('shows error for empty email', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)

    await user.click(screen.getByText('Abunə ol'))

    expect(screen.getByText('Email ünvanı daxil edin.')).toBeInTheDocument()
  })

  it('shows error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'invalid-email')
    await user.click(screen.getByText('Abunə ol'))

    expect(screen.getByText('Düzgün email ünvanı daxil edin.')).toBeInTheDocument()
  })

  it('shows error for duplicate email from localStorage', async () => {
    mockStorage['newsletter-emails'] = JSON.stringify(['test@example.com'])

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'test@example.com')
    await user.click(screen.getByText('Abunə ol'))

    expect(screen.getByText('Bu email artıq abunə olub.')).toBeInTheDocument()
    // Should not call fetch
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('submits valid email to API', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    })

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'user@example.com')
    await user.click(screen.getByText('Abunə ol'))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'user@example.com' }),
      })
    })
  })

  it('shows success message after successful subscription', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    })

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'user@example.com')
    await user.click(screen.getByText('Abunə ol'))

    await waitFor(() => {
      expect(screen.getByText('Uğurla abunə oldunuz!')).toBeInTheDocument()
    })
  })

  it('saves email to localStorage after successful subscription', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    })

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'New@Example.com')
    await user.click(screen.getByText('Abunə ol'))

    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'newsletter-emails',
        JSON.stringify(['new@example.com'])
      )
    })
  })

  it('shows error for 409 conflict (duplicate)', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ error: 'Already subscribed' }),
    })

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'existing@example.com')
    await user.click(screen.getByText('Abunə ol'))

    await waitFor(() => {
      expect(screen.getByText('Bu email artıq abunə olub.')).toBeInTheDocument()
    })
  })

  it('shows error for 400 invalid format from API', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Invalid email format' }),
    })

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'user@example.com')
    await user.click(screen.getByText('Abunə ol'))

    await waitFor(() => {
      expect(screen.getByText('Düzgün email ünvanı daxil edin.')).toBeInTheDocument()
    })
  })

  it('shows generic error for non-ok response', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    })

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'user@example.com')
    await user.click(screen.getByText('Abunə ol'))

    await waitFor(() => {
      expect(screen.getByText('Xəta baş verdi. Yenidən cəhd edin.')).toBeInTheDocument()
    })
  })

  it('shows generic error for fetch failure', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'))

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'user@example.com')
    await user.click(screen.getByText('Abunə ol'))

    await waitFor(() => {
      expect(screen.getByText('Xəta baş verdi. Yenidən cəhd edin.')).toBeInTheDocument()
    })
  })

  it('shows loading state while submitting', async () => {
    fetchMock.mockImplementation(() => new Promise((resolve) => {
      setTimeout(() => resolve({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      }), 1000)
    }))

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'user@example.com')
    await user.click(screen.getByText('Abunə ol'))

    expect(screen.getByText('Göndərilir...')).toBeInTheDocument()
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
  })

  it('disables input and button while loading', async () => {
    fetchMock.mockImplementation(() => new Promise((resolve) => {
      setTimeout(() => resolve({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      }), 1000)
    }))

    const user = userEvent.setup()
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'user@example.com')
    await user.click(screen.getByText('Abunə ol'))

    expect(input).toBeDisabled()
    expect(screen.getByText('Göndərilir...').closest('button')).toBeDisabled()
  })

  it('clears error when typing in email input', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)

    // Trigger error
    await user.click(screen.getByText('Abunə ol'))
    expect(screen.getByText('Email ünvanı daxil edin.')).toBeInTheDocument()

    // Start typing
    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    await user.type(input, 'a')

    expect(screen.queryByText('Email ünvanı daxil edin.')).not.toBeInTheDocument()
  })

  it('has proper ARIA attributes', () => {
    render(<Newsletter />)

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    expect(input).toHaveAttribute('id', 'newsletter-email')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('autocomplete', 'email')
  })

  it('sets aria-invalid and aria-describedby when error exists', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)

    await user.click(screen.getByText('Abunə ol'))

    const input = screen.getByPlaceholderText('Email ünvanınızı daxil edin')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'newsletter-error')
  })

  it('error message has role="alert"', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)

    await user.click(screen.getByText('Abunə ol'))

    const errorMsg = screen.getByRole('alert')
    expect(errorMsg).toBeInTheDocument()
    expect(errorMsg).toHaveTextContent('Email ünvanı daxil edin.')
  })

  it('has sr-only label for email input', () => {
    render(<Newsletter />)

    expect(screen.getByLabelText('Email ünvanı')).toBeInTheDocument()
  })
})
