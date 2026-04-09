import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}))

// Mock sentry client config (v10 uses top-level init via instrumentation-client.ts)
vi.mock('../../../sentry.client.config', () => ({}))

import GlobalError from '../global-error'
import * as Sentry from '@sentry/nextjs'

describe('GlobalError', () => {
  const mockReset = vi.fn()
  const mockError = new Error('Test error') as Error & { digest?: string }
  mockError.digest = 'test-digest-123'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('renders error heading', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(screen.getByText('Xeta bas verdi')).toBeInTheDocument()
  })

  it('renders error description', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(
      screen.getByText(/Gozlenilmeyen xeta bas verdi/)
    ).toBeInTheDocument()
  })

  it('renders retry button', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(screen.getByText('Yeniden cehd et')).toBeInTheDocument()
  })

  it('calls reset when retry button is clicked', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    fireEvent.click(screen.getByText('Yeniden cehd et'))
    expect(mockReset).toHaveBeenCalledOnce()
  })

  it('logs error to console', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(console.error).toHaveBeenCalledWith(
      'Global application error:',
      mockError
    )
  })

  it('captures error in Sentry with correct tags', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError, {
      tags: {
        component: 'global-error',
        digest: 'test-digest-123',
      },
      level: 'fatal',
    })
  })

  it('uses "unknown" digest when error has no digest', () => {
    const errorNoDigest = new Error('No digest')
    render(<GlobalError error={errorNoDigest} reset={mockReset} />)
    expect(Sentry.captureException).toHaveBeenCalledWith(
      errorNoDigest,
      expect.objectContaining({
        tags: expect.objectContaining({ digest: 'unknown' }),
      })
    )
  })

  it('renders html element with lang="az"', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(document.documentElement).toHaveAttribute('lang', 'az')
  })

  it('renders decorative "Xeta" text', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(screen.getByText('Xeta')).toBeInTheDocument()
  })
})
