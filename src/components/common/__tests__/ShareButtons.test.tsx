import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, string>) => {
    if (params) {
      let result = key
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, String(v))
      }
      return result
    }
    return key
  },
}))

vi.mock('lucide-react', () => ({
  MessageCircle: () => <span data-testid="whatsapp-icon" />,
  Send: () => <span data-testid="telegram-icon" />,
  Twitter: () => <span data-testid="twitter-icon" />,
  Facebook: () => <span data-testid="facebook-icon" />,
  Linkedin: () => <span data-testid="linkedin-icon" />,
  Link2: () => <span data-testid="link-icon" />,
  Check: () => <span data-testid="check-icon" />,
  Share2: () => <span data-testid="share-icon" />,
}))

import ShareButtons from '../ShareButtons'

describe('ShareButtons', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  const defaultProps = {
    url: 'https://vaxtimyoxdu.com/tools/json-formatter',
    title: 'JSON Formatter',
    description: 'Format JSON online',
  }

  it('renders share buttons for all platforms', () => {
    render(<ShareButtons {...defaultProps} />)

    // With mock, aria-label becomes "shareOn" (translation key with {platform} replaced)
    const shareLinks = screen.getAllByLabelText(/shareOn/)
    expect(shareLinks.length).toBe(5)
  })

  it('renders copy link button', () => {
    render(<ShareButtons {...defaultProps} />)
    expect(screen.getByLabelText('copyLink')).toBeInTheDocument()
  })

  it('opens share links in new tab', () => {
    render(<ShareButtons {...defaultProps} />)
    const shareLinks = screen.getAllByLabelText(/shareOn/)
    expect(shareLinks[0]).toHaveAttribute('target', '_blank')
    expect(shareLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('share links include UTM parameters', () => {
    render(<ShareButtons {...defaultProps} />)
    const shareLinks = screen.getAllByLabelText(/shareOn/)
    const firstHref = shareLinks[0].getAttribute('href') || ''
    // UTM params are URL-encoded inside WhatsApp text param
    expect(firstHref).toContain('utm_source')
  })

  it('copies link to clipboard on click', async () => {
    render(<ShareButtons {...defaultProps} />)
    await fireEvent.click(screen.getByLabelText('copyLink'))
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('renders copy link button with correct initial state', () => {
    render(<ShareButtons {...defaultProps} />)
    expect(screen.getByLabelText('copyLink')).toBeInTheDocument()
  })

  it('renders without description prop', () => {
    render(<ShareButtons url={defaultProps.url} title={defaultProps.title} />)
    const shareLinks = screen.getAllByLabelText(/shareOn/)
    expect(shareLinks.length).toBe(5)
  })

  it('includes title text in header', () => {
    render(<ShareButtons {...defaultProps} />)
    expect(screen.getByText('title')).toBeInTheDocument()
  })
})
