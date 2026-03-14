import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import CookieConsent from '../CookieConsent'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      cookie: {
        message: 'Bu sayt təcrübəmizi yaxşılaşdırmaq üçün cookie-lərdən istifadə edir.',
        accept: 'Qəbul et',
        reject: 'Rədd et',
        privacyLink: 'Məxfilik Siyasəti',
        ariaLabel: 'Cookie razılıq banneri',
        ariaReject: 'Cookie-ləri rədd et',
        ariaAccept: 'Cookie-ləri qəbul et',
      },
    }
    return (key: string) => translations[namespace]?.[key] ?? key
  },
}))

// Mock i18n navigation Link
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('CookieConsent', () => {
  let mockStorage: Record<string, string>
  const gtagMock = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    mockStorage = {}

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

    // Mock gtag
    gtagMock.mockClear()
    ;(window as unknown as { gtag: typeof gtagMock }).gtag = gtagMock
  })

  afterEach(() => {
    vi.useRealTimers()
    delete (window as unknown as { gtag?: typeof gtagMock }).gtag
  })

  it('renders the cookie consent banner when no previous choice exists', async () => {
    render(<CookieConsent />)

    // Advance past the 300ms delay
    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows cookie consent text in Azerbaijani', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(screen.getByText(/cookie-lərdən istifadə edir/)).toBeInTheDocument()
  })

  it('renders accept and reject buttons', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(screen.getByLabelText('Cookie-ləri qəbul et')).toBeInTheDocument()
    expect(screen.getByLabelText('Cookie-ləri rədd et')).toBeInTheDocument()
  })

  it('renders privacy policy link', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    const link = screen.getByText('Məxfilik Siyasəti')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/privacy')
  })

  it('does not render when user previously accepted', () => {
    mockStorage['cookie-consent'] = 'accepted'

    const { container } = render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(container.innerHTML).toBe('')
  })

  it('does not render when user previously rejected', () => {
    mockStorage['cookie-consent'] = 'rejected'

    const { container } = render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(container.innerHTML).toBe('')
  })

  it('saves "accepted" to localStorage when accept is clicked', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    fireEvent.click(screen.getByLabelText('Cookie-ləri qəbul et'))

    expect(window.localStorage.setItem).toHaveBeenCalledWith('cookie-consent', 'accepted')
  })

  it('saves "rejected" to localStorage when reject is clicked', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    fireEvent.click(screen.getByLabelText('Cookie-ləri rədd et'))

    expect(window.localStorage.setItem).toHaveBeenCalledWith('cookie-consent', 'rejected')
  })

  it('hides banner after accepting', async () => {
    const { container } = render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    fireEvent.click(screen.getByLabelText('Cookie-ləri qəbul et'))

    // After accepting, component returns null
    expect(container.innerHTML).toBe('')
  })

  it('hides banner after rejecting', async () => {
    const { container } = render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    fireEvent.click(screen.getByLabelText('Cookie-ləri rədd et'))

    expect(container.innerHTML).toBe('')
  })

  it('calls gtag consent update when accepting', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    fireEvent.click(screen.getByLabelText('Cookie-ləri qəbul et'))

    expect(gtagMock).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
  })

  it('does not call gtag when rejecting', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    fireEvent.click(screen.getByLabelText('Cookie-ləri rədd et'))

    expect(gtagMock).not.toHaveBeenCalled()
  })

  it('does not call gtag if gtag is not available', async () => {
    delete (window as unknown as { gtag?: typeof gtagMock }).gtag

    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    // Should not throw error
    expect(() => {
      fireEvent.click(screen.getByLabelText('Cookie-ləri qəbul et'))
    }).not.toThrow()
  })

  it('has proper ARIA attributes', async () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-label', 'Cookie razılıq banneri')
    expect(dialog).toHaveAttribute('aria-describedby', 'cookie-consent-description')
  })

  it('starts with translate-y-full (hidden) before animation delay', () => {
    render(<CookieConsent />)

    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('translate-y-full')
  })

  it('transitions to visible after delay', () => {
    render(<CookieConsent />)

    act(() => {
      vi.advanceTimersByTime(400)
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('translate-y-0')
  })
})
