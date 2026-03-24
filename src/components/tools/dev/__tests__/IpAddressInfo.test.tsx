import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import IpAddressInfo from '../IpAddressInfo'

describe('IpAddressInfo', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('shows loading state initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))
    render(<IpAddressInfo />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    vi.restoreAllMocks()
  })

  it('displays IP address after fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ ip: '192.168.1.1' }),
    } as Response)

    render(<IpAddressInfo />)

    await waitFor(() => {
      expect(screen.getByText('192.168.1.1')).toBeInTheDocument()
    })
    vi.restoreAllMocks()
  })

  it('shows error message when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'))

    render(<IpAddressInfo />)

    await waitFor(() => {
      expect(screen.getByText('Unable to detect')).toBeInTheDocument()
    })
    vi.restoreAllMocks()
  })

  it('displays browser information', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ ip: '10.0.0.1' }),
    } as Response)

    render(<IpAddressInfo />)

    await waitFor(() => {
      expect(screen.getByText('Browser & Device Information')).toBeInTheDocument()
    })

    expect(screen.getByText('User Agent')).toBeInTheDocument()
    expect(screen.getByText('Platform')).toBeInTheDocument()
    expect(screen.getByText('Language')).toBeInTheDocument()
    expect(screen.getByText('Timezone')).toBeInTheDocument()
    expect(screen.getByText('Online Status')).toBeInTheDocument()
    vi.restoreAllMocks()
  })

  it('displays privacy notice', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ ip: '10.0.0.1' }),
    } as Response)

    render(<IpAddressInfo />)

    await waitFor(() => {
      expect(screen.getByText(/Your IP address is fetched from a public API/)).toBeInTheDocument()
    })
    vi.restoreAllMocks()
  })
})
