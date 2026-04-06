import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import InstallPrompt from '../InstallPrompt'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

vi.mock('lucide-react', () => ({
  Download: () => <span data-testid="download-icon" />,
  X: () => <span data-testid="x-icon" />,
}))

describe('InstallPrompt', () => {
  let mockStorage: Record<string, string>

  beforeEach(() => {
    vi.useFakeTimers()
    mockStorage = {}

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => mockStorage[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
          mockStorage[key] = value
        }),
        removeItem: vi.fn((key: string) => {
          delete mockStorage[key]
        }),
        clear: vi.fn(),
        get length() {
          return Object.keys(mockStorage).length
        },
        key: vi.fn(),
      },
      writable: true,
      configurable: true,
    })

    // Default: not standalone, not mobile
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue({ matches: false }),
      writable: true,
      configurable: true,
    })

    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders nothing initially when no beforeinstallprompt fires', () => {
    const { container } = render(<InstallPrompt />)
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing when dismissed recently', () => {
    mockStorage['pwa-install-dismissed'] = (Date.now() - 1000).toString()
    const { container } = render(<InstallPrompt />)
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing when already standalone', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue({ matches: true }),
      writable: true,
      configurable: true,
    })
    const { container } = render(<InstallPrompt />)
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing on desktop devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      writable: true,
      configurable: true,
    })
    const { container } = render(<InstallPrompt />)
    expect(container.innerHTML).toBe('')
  })

  it('shows prompt after beforeinstallprompt event fires', () => {
    render(<InstallPrompt />)

    const promptEvent = new Event('beforeinstallprompt')
    Object.assign(promptEvent, {
      preventDefault: vi.fn(),
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
      platforms: ['web'],
    })

    act(() => {
      window.dispatchEvent(promptEvent)
    })

    // Advance past the 1500ms delay
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('dismiss sets localStorage key', () => {
    render(<InstallPrompt />)

    const promptEvent = new Event('beforeinstallprompt')
    Object.assign(promptEvent, {
      preventDefault: vi.fn(),
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
      platforms: ['web'],
    })

    act(() => {
      window.dispatchEvent(promptEvent)
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    // Click dismiss button (the X button with aria-label from t('close'))
    const closeBtn = screen.getByLabelText('close')
    fireEvent.click(closeBtn)

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'pwa-install-dismissed',
      expect.any(String)
    )
  })
})
