import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import NewsletterPopup from '../NewsletterPopup'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

vi.mock('@/hooks/useNewsletterSubscribe', () => ({
  isSubscribed: vi.fn(() => false),
  useNewsletterSubscribe: vi.fn(() => ({
    email: '',
    setEmail: vi.fn(),
    error: null,
    status: 'idle',
    handleSubmit: vi.fn((e: Event) => e.preventDefault()),
    isAlreadySubscribed: false,
  })),
}))

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon" />,
  Mail: () => <span data-testid="mail-icon" />,
  Loader2: () => <span data-testid="loader-icon" />,
  CheckCircle2: () => <span data-testid="check-icon" />,
  Bell: () => <span data-testid="bell-icon" />,
}))

describe('NewsletterPopup', () => {
  let mockStorage: Record<string, string>
  let mockSessionStorage: Record<string, string>

  beforeEach(() => {
    vi.useFakeTimers()
    mockStorage = {}
    mockSessionStorage = {}

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => mockStorage[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
          mockStorage[key] = value
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        get length() {
          return Object.keys(mockStorage).length
        },
        key: vi.fn(),
      },
      writable: true,
      configurable: true,
    })

    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn((key: string) => mockSessionStorage[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
          mockSessionStorage[key] = value
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        get length() {
          return Object.keys(mockSessionStorage).length
        },
        key: vi.fn(),
      },
      writable: true,
      configurable: true,
    })

    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders nothing initially (before timer)', () => {
    const { container } = render(<NewsletterPopup />)
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing if already subscribed', async () => {
    const mod = await import('@/hooks/useNewsletterSubscribe')
    vi.mocked(mod.isSubscribed).mockReturnValue(true)

    const { container } = render(<NewsletterPopup />)
    act(() => {
      vi.advanceTimersByTime(50000)
    })
    expect(container.innerHTML).toBe('')

    vi.mocked(mod.isSubscribed).mockReturnValue(false)
  })

  it('renders nothing if previously dismissed', () => {
    mockStorage['newsletter-popup-dismissed'] = 'true'
    const { container } = render(<NewsletterPopup />)
    act(() => {
      vi.advanceTimersByTime(50000)
    })
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing if already shown this session', () => {
    mockSessionStorage['newsletter-popup-shown-session'] = 'true'
    const { container } = render(<NewsletterPopup />)
    act(() => {
      vi.advanceTimersByTime(50000)
    })
    expect(container.innerHTML).toBe('')
  })

  it('shows popup after 45 seconds', () => {
    render(<NewsletterPopup />)
    act(() => {
      vi.advanceTimersByTime(46000)
    })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('popup has email input', () => {
    render(<NewsletterPopup />)
    act(() => {
      vi.advanceTimersByTime(46000)
    })
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('popup has close button', () => {
    render(<NewsletterPopup />)
    act(() => {
      vi.advanceTimersByTime(46000)
    })
    expect(screen.getByLabelText('close')).toBeInTheDocument()
  })

  it('marks session storage when shown', () => {
    render(<NewsletterPopup />)
    act(() => {
      vi.advanceTimersByTime(46000)
    })
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      'newsletter-popup-shown-session',
      'true'
    )
  })
})
