import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

// Mock all dynamically imported components
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFn: () => Promise<{ default: React.ComponentType }>) => {
    // Return a simple component that renders a data-testid
    const name = importFn.toString()
    if (name.includes('CookieConsent')) {
      return function MockCookieConsent() { return <div data-testid="cookie-consent" /> }
    }
    if (name.includes('InstallPrompt')) {
      return function MockInstallPrompt() { return <div data-testid="install-prompt" /> }
    }
    if (name.includes('PageViewTracker')) {
      return function MockPageViewTracker() { return <div data-testid="page-view-tracker" /> }
    }
    if (name.includes('NewsletterPopup')) {
      return function MockNewsletterPopup() { return <div data-testid="newsletter-popup" /> }
    }
    return function MockComponent() { return <div data-testid="unknown-dynamic" /> }
  },
}))

vi.mock('@/hooks/useSessionEngagement', () => ({
  useSessionEngagement: vi.fn(),
}))

vi.mock('@/hooks/useOutboundTracking', () => ({
  useOutboundTracking: vi.fn(),
}))

import ClientShell from '../ClientShell'
import { useSessionEngagement } from '@/hooks/useSessionEngagement'
import { useOutboundTracking } from '@/hooks/useOutboundTracking'

describe('ClientShell', () => {
  it('renders without crashing', () => {
    const { container } = render(<ClientShell />)
    expect(container).toBeTruthy()
  })

  it('calls useSessionEngagement hook', () => {
    render(<ClientShell />)
    expect(useSessionEngagement).toHaveBeenCalled()
  })

  it('calls useOutboundTracking hook', () => {
    render(<ClientShell />)
    expect(useOutboundTracking).toHaveBeenCalled()
  })

  it('renders CookieConsent component', () => {
    const { getByTestId } = render(<ClientShell />)
    expect(getByTestId('cookie-consent')).toBeInTheDocument()
  })

  it('renders InstallPrompt component', () => {
    const { getByTestId } = render(<ClientShell />)
    expect(getByTestId('install-prompt')).toBeInTheDocument()
  })

  it('renders PageViewTracker component', () => {
    const { getByTestId } = render(<ClientShell />)
    expect(getByTestId('page-view-tracker')).toBeInTheDocument()
  })

  it('renders NewsletterPopup component', () => {
    const { getByTestId } = render(<ClientShell />)
    expect(getByTestId('newsletter-popup')).toBeInTheDocument()
  })
})
