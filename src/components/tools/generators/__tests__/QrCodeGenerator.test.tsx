import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, string> = {
      textOrUrl: 'Text or URL', enterUrlText: 'Enter URL, text, email, phone number...',
      size: 'Size', foreground: 'Foreground', background: 'Background',
      generateQrCode: 'Generate QR Code', downloadPng: 'Download PNG',
      pleaseEnterTextOrUrl: 'Please enter text or URL',
      failedToGenerateQr: 'Failed to generate QR code',
    }
    return (key: string) => translations[key] ?? key
  },
}))

// Mock the qrcode library
vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mockQrCode'),
  },
}))

import QrCodeGenerator from '../QrCodeGenerator'

describe('QrCodeGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders text input textarea', () => {
    render(<QrCodeGenerator />)

    expect(screen.getByPlaceholderText('Enter URL, text, email, phone number...')).toBeInTheDocument()
  })

  it('renders size selector with default 256x256', () => {
    render(<QrCodeGenerator />)

    expect(screen.getByDisplayValue('256x256')).toBeInTheDocument()
  })

  it('renders color inputs', () => {
    render(<QrCodeGenerator />)

    expect(screen.getByText('Foreground')).toBeInTheDocument()
    expect(screen.getByText('Background')).toBeInTheDocument()
  })

  it('renders Generate QR Code button', () => {
    render(<QrCodeGenerator />)

    expect(screen.getByText('Generate QR Code')).toBeInTheDocument()
  })

  it('does not show QR code before generation', () => {
    render(<QrCodeGenerator />)

    expect(screen.queryByAltText('Generated QR Code')).not.toBeInTheDocument()
  })

  it('shows error for empty input', async () => {
    const user = userEvent.setup()
    render(<QrCodeGenerator />)

    await user.click(screen.getByText('Generate QR Code'))

    expect(screen.getByText('Please enter text or URL')).toBeInTheDocument()
  })

  it('generates QR code with valid input', async () => {
    const user = userEvent.setup()
    render(<QrCodeGenerator />)

    const input = screen.getByPlaceholderText('Enter URL, text, email, phone number...')
    await user.type(input, 'https://example.com')

    await user.click(screen.getByText('Generate QR Code'))

    await waitFor(() => {
      expect(screen.getByAltText('Generated QR Code')).toBeInTheDocument()
    })
  })

  it('shows Download PNG button after generation', async () => {
    const user = userEvent.setup()
    render(<QrCodeGenerator />)

    const input = screen.getByPlaceholderText('Enter URL, text, email, phone number...')
    await user.type(input, 'hello')

    await user.click(screen.getByText('Generate QR Code'))

    await waitFor(() => {
      expect(screen.getByText('Download PNG')).toBeInTheDocument()
    })
  })

  it('clears error when generating with valid input after error', async () => {
    const user = userEvent.setup()
    render(<QrCodeGenerator />)

    // First trigger error
    await user.click(screen.getByText('Generate QR Code'))
    expect(screen.getByText('Please enter text or URL')).toBeInTheDocument()

    // Then enter text and generate
    const input = screen.getByPlaceholderText('Enter URL, text, email, phone number...')
    await user.type(input, 'test')
    await user.click(screen.getByText('Generate QR Code'))

    await waitFor(() => {
      expect(screen.queryByText('Please enter text or URL')).not.toBeInTheDocument()
    })
  })

  it('allows changing QR code size', async () => {
    const user = userEvent.setup()
    render(<QrCodeGenerator />)

    const select = screen.getByDisplayValue('256x256')
    await user.selectOptions(select, '512')

    expect(screen.getByDisplayValue('512x512')).toBeInTheDocument()
  })

  it('allows changing foreground color', () => {
    render(<QrCodeGenerator />)

    // There are two text inputs for colors (foreground and background)
    const colorInputs = screen.getAllByDisplayValue('#000000')
    expect(colorInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('allows changing background color', () => {
    render(<QrCodeGenerator />)

    const colorInputs = screen.getAllByDisplayValue('#ffffff')
    expect(colorInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('calls QRCode.toDataURL with correct parameters', async () => {
    const QRCode = await import('qrcode')
    const user = userEvent.setup()
    render(<QrCodeGenerator />)

    const input = screen.getByPlaceholderText('Enter URL, text, email, phone number...')
    await user.type(input, 'test-url')

    await user.click(screen.getByText('Generate QR Code'))

    await waitFor(() => {
      expect(QRCode.default.toDataURL).toHaveBeenCalledWith('test-url', {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
    })
  })

  it('shows error when QR code generation fails', async () => {
    const QRCode = await import('qrcode')
    ;(QRCode.default.toDataURL as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('fail'))

    const user = userEvent.setup()
    render(<QrCodeGenerator />)

    const input = screen.getByPlaceholderText('Enter URL, text, email, phone number...')
    await user.type(input, 'test')

    await user.click(screen.getByText('Generate QR Code'))

    await waitFor(() => {
      expect(screen.getByText('Failed to generate QR code')).toBeInTheDocument()
    })
  })

  it('triggers download when Download PNG is clicked', async () => {
    const user = userEvent.setup()
    const clickMock = vi.fn()
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        const el = { href: '', download: '', click: clickMock } as unknown as HTMLAnchorElement
        return el
      }
      return originalCreateElement(tag)
    })

    render(<QrCodeGenerator />)

    const input = screen.getByPlaceholderText('Enter URL, text, email, phone number...')
    await user.type(input, 'test')

    await user.click(screen.getByText('Generate QR Code'))

    await waitFor(() => {
      expect(screen.getByText('Download PNG')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Download PNG'))

    expect(clickMock).toHaveBeenCalled()

    vi.restoreAllMocks()
  })
})
