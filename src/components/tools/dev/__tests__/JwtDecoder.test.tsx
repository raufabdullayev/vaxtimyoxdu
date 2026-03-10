import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JwtDecoder from '../JwtDecoder'

// Helper to create a valid JWT token for testing
function createTestJwt(
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
  signature = 'test-signature'
): string {
  const encode = (obj: Record<string, unknown>) => {
    const json = JSON.stringify(obj)
    return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }
  return `${encode(header)}.${encode(payload)}.${signature}`
}

describe('JwtDecoder', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders JWT token input', () => {
    render(<JwtDecoder />)

    expect(screen.getByLabelText('JWT token input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Paste your JWT token here...')).toBeInTheDocument()
  })

  it('does not show decoded sections when input is empty', () => {
    render(<JwtDecoder />)

    expect(screen.queryByText('Header')).not.toBeInTheDocument()
    expect(screen.queryByText('Payload')).not.toBeInTheDocument()
    expect(screen.queryByText('Signature')).not.toBeInTheDocument()
  })

  it('shows error for token without 3 parts', () => {
    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: 'invalid.token' } })

    expect(screen.getByText('Invalid JWT format. A JWT must have 3 parts separated by dots.')).toBeInTheDocument()
  })

  it('shows error for token with invalid base64', () => {
    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: '!!!.!!!.!!!' } })

    expect(screen.getByText('Failed to decode JWT. Ensure it is a valid Base64URL-encoded token.')).toBeInTheDocument()
  })

  it('decodes a valid JWT and shows header, payload, and signature', () => {
    const header = { alg: 'HS256', typ: 'JWT' }
    const payload = { sub: '1234567890', name: 'John Doe', iat: 1516239022 }
    const token = createTestJwt(header, payload, 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Payload')).toBeInTheDocument()
    expect(screen.getByText('Signature')).toBeInTheDocument()
  })

  it('shows decoded header content', () => {
    const header = { alg: 'HS256', typ: 'JWT' }
    const payload = { sub: '123' }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    // The header should be displayed as formatted JSON
    expect(screen.getByText(/"alg": "HS256"/)).toBeInTheDocument()
  })

  it('shows decoded payload content', () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '1234567890', name: 'Test User' }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    expect(screen.getByText(/"name": "Test User"/)).toBeInTheDocument()
  })

  it('shows signature text', () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123' }
    const sig = 'my-signature-value'
    const token = createTestJwt(header, payload, sig)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    expect(screen.getByText(sig)).toBeInTheDocument()
  })

  it('shows "Valid" for non-expired token', () => {
    const header = { alg: 'HS256' }
    // Set expiration 1 hour in the future
    const futureExp = Math.floor(Date.now() / 1000) + 3600
    const payload = { sub: '123', exp: futureExp }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    expect(screen.getByText(/Token is Valid/)).toBeInTheDocument()
  })

  it('shows "Expired" for expired token', () => {
    const header = { alg: 'HS256' }
    // Set expiration 1 hour in the past
    const pastExp = Math.floor(Date.now() / 1000) - 3600
    const payload = { sub: '123', exp: pastExp }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    expect(screen.getByText(/Token is Expired/)).toBeInTheDocument()
  })

  it('does not show expiration status when no exp claim', () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123', name: 'NoExp' }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    expect(screen.queryByText(/Token is/)).not.toBeInTheDocument()
  })

  it('copies header to clipboard', async () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123' }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    fireEvent.click(screen.getByLabelText('Copy header'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(JSON.stringify(header, null, 2))
    })
  })

  it('copies payload to clipboard', async () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123' }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    fireEvent.click(screen.getByLabelText('Copy payload'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(JSON.stringify(payload, null, 2))
    })
  })

  it('copies signature to clipboard', async () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123' }
    const sig = 'test-sig'
    const token = createTestJwt(header, payload, sig)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    fireEvent.click(screen.getByLabelText('Copy signature'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(sig)
    })
  })

  it('shows "Copied!" text after copying', async () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123' }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    fireEvent.click(screen.getByLabelText('Copy header'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('clears error when valid token is entered after invalid', () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123' }
    const validToken = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')

    // Enter invalid token
    fireEvent.change(input, { target: { value: 'bad.token' } })
    expect(screen.getByText(/Invalid JWT format/)).toBeInTheDocument()

    // Enter valid token
    fireEvent.change(input, { target: { value: validToken } })
    expect(screen.queryByText(/Invalid JWT format/)).not.toBeInTheDocument()
  })

  it('shows signature verification note', () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123' }
    const token = createTestJwt(header, payload)

    render(<JwtDecoder />)

    const input = screen.getByLabelText('JWT token input')
    fireEvent.change(input, { target: { value: token } })

    expect(screen.getByText(/Signature verification is not available client-side/)).toBeInTheDocument()
  })
})
