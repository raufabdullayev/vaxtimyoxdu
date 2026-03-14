import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HashGenerator from '../HashGenerator'

describe('HashGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  // Mock crypto.subtle.digest
  const mockDigest = vi.fn()

  beforeEach(() => {
    writeTextMock.mockClear()
    mockDigest.mockClear()

    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })

    // Provide a deterministic mock for crypto.subtle.digest
    mockDigest.mockImplementation(async (algorithm: string, data: ArrayBuffer) => {
      // Return a fixed buffer based on algorithm for test predictability
      const bytes = new Uint8Array(32) // 32 bytes = 256 bits
      const algByte = algorithm === 'SHA-1' ? 0x01 : algorithm === 'SHA-256' ? 0x02 : algorithm === 'SHA-384' ? 0x03 : 0x04
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = (algByte + i) % 256
      }
      return bytes.buffer
    })

    Object.defineProperty(globalThis, 'crypto', {
      value: {
        subtle: {
          digest: mockDigest,
        },
      },
      writable: true,
      configurable: true,
    })
  })

  it('renders input textarea', () => {
    render(<HashGenerator />)

    expect(screen.getByPlaceholderText('Enter text to hash...')).toBeInTheDocument()
  })

  it('renders Generate Hashes button', () => {
    render(<HashGenerator />)

    expect(screen.getByText('hashGenerate')).toBeInTheDocument()
  })

  it('disables button when input is empty', () => {
    render(<HashGenerator />)

    const button = screen.getByText('hashGenerate')
    expect(button).toBeDisabled()
  })

  it('enables button when input has text', () => {
    render(<HashGenerator />)

    const input = screen.getByPlaceholderText('Enter text to hash...')
    fireEvent.change(input, { target: { value: 'hello' } })

    const button = screen.getByText('hashGenerate')
    expect(button).not.toBeDisabled()
  })

  it('generates hashes for all algorithms when clicked', async () => {
    render(<HashGenerator />)

    const input = screen.getByPlaceholderText('Enter text to hash...')
    fireEvent.change(input, { target: { value: 'test input' } })

    fireEvent.click(screen.getByText('hashGenerate'))

    await waitFor(() => {
      expect(screen.getByText('SHA-1')).toBeInTheDocument()
      expect(screen.getByText('SHA-256')).toBeInTheDocument()
      expect(screen.getByText('SHA-384')).toBeInTheDocument()
      expect(screen.getByText('SHA-512')).toBeInTheDocument()
    })
  })

  it('calls crypto.subtle.digest for each algorithm', async () => {
    render(<HashGenerator />)

    const input = screen.getByPlaceholderText('Enter text to hash...')
    fireEvent.change(input, { target: { value: 'test' } })

    fireEvent.click(screen.getByText('hashGenerate'))

    await waitFor(() => {
      expect(mockDigest).toHaveBeenCalledTimes(4)
      const calledAlgos = mockDigest.mock.calls.map((c: unknown[]) => c[0])
      expect(calledAlgos).toContain('SHA-1')
      expect(calledAlgos).toContain('SHA-256')
      expect(calledAlgos).toContain('SHA-384')
      expect(calledAlgos).toContain('SHA-512')
    })
  })

  it('displays hash results as hex strings', async () => {
    render(<HashGenerator />)

    const input = screen.getByPlaceholderText('Enter text to hash...')
    fireEvent.change(input, { target: { value: 'hello' } })

    fireEvent.click(screen.getByText('hashGenerate'))

    await waitFor(() => {
      // Each algorithm should produce a hex string display
      const allCopyButtons = screen.getAllByText('copy')
      expect(allCopyButtons).toHaveLength(4)
    })
  })

  it('copies hash to clipboard when Copy is clicked', async () => {
    render(<HashGenerator />)

    const input = screen.getByPlaceholderText('Enter text to hash...')
    fireEvent.change(input, { target: { value: 'hello' } })

    fireEvent.click(screen.getByText('hashGenerate'))

    await waitFor(() => {
      expect(screen.getAllByText('copy')).toHaveLength(4)
    })

    // Click first Copy button
    const copyButtons = screen.getAllByText('copy')
    fireEvent.click(copyButtons[0])

    expect(writeTextMock).toHaveBeenCalledTimes(1)
    // The copied text should be a hex string
    expect(typeof writeTextMock.mock.calls[0][0]).toBe('string')
  })

  it('does not show results before generating', () => {
    render(<HashGenerator />)

    expect(screen.queryByText('SHA-1')).not.toBeInTheDocument()
    expect(screen.queryByText('SHA-256')).not.toBeInTheDocument()
  })

  it('shows loading state while generating', async () => {
    // Make digest slow
    mockDigest.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve(new ArrayBuffer(32)), 100)))

    render(<HashGenerator />)

    const input = screen.getByPlaceholderText('Enter text to hash...')
    fireEvent.change(input, { target: { value: 'hello' } })

    fireEvent.click(screen.getByText('hashGenerate'))

    expect(screen.getByText('processing')).toBeInTheDocument()
  })
})
