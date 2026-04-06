import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'

const mockRefetch = vi.fn()

const mockPrices = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67000, change24h: 2.5 },
  { symbol: 'ETH', name: 'Ethereum', price: 3200, change24h: -1.2 },
  { symbol: 'GOLD', name: 'Gold', price: 2350, change24h: 0.3 },
  { symbol: 'OIL', name: 'Crude Oil', price: 78.5, change24h: -0.8 },
  { symbol: 'SPX', name: 'S&P 500', price: 5200, change24h: 1.1 },
]

vi.mock('@/hooks/useMarketPrices', () => ({
  useMarketPrices: () => ({
    prices: mockPrices,
    isLoading: false,
    error: null,
    updatedAt: new Date().toISOString(),
    refetch: mockRefetch,
    previousPrices: new Map(),
  }),
}))

import MarketTracker from '../MarketTracker'

describe('MarketTracker - Deep Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders all price cards', () => {
    render(<MarketTracker />)
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getByText('Gold')).toBeInTheDocument()
    expect(screen.getByText('Crude Oil')).toBeInTheDocument()
    expect(screen.getByText('S&P 500')).toBeInTheDocument()
  })

  it('renders symbols for each asset', () => {
    render(<MarketTracker />)
    expect(screen.getByText('BTC')).toBeInTheDocument()
    expect(screen.getByText('ETH')).toBeInTheDocument()
    expect(screen.getByText('GOLD')).toBeInTheDocument()
    expect(screen.getByText('OIL')).toBeInTheDocument()
    expect(screen.getByText('SPX')).toBeInTheDocument()
  })

  it('shows positive change with up arrow', () => {
    render(<MarketTracker />)
    expect(screen.getByText('+2.50%')).toBeInTheDocument()
  })

  it('shows negative change with down arrow', () => {
    render(<MarketTracker />)
    expect(screen.getByText('-1.20%')).toBeInTheDocument()
  })

  it('renders Refresh button', () => {
    render(<MarketTracker />)
    expect(screen.getByLabelText('Refresh prices')).toBeInTheDocument()
  })

  it('calls refetch on Refresh click', () => {
    render(<MarketTracker />)
    fireEvent.click(screen.getByLabelText('Refresh prices'))
    expect(mockRefetch).toHaveBeenCalled()
  })

  it('renders Auto-refresh checkbox (checked by default)', () => {
    render(<MarketTracker />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('shows countdown timer when auto-refresh is on', () => {
    render(<MarketTracker />)
    expect(screen.getByText(/Next:/)).toBeInTheDocument()
    expect(screen.getByText('5:00')).toBeInTheDocument()
  })

  it('counts down timer', () => {
    render(<MarketTracker />)
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByText('4:55')).toBeInTheDocument()
  })

  it('hides countdown when auto-refresh is disabled', () => {
    render(<MarketTracker />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(screen.queryByText(/Next:/)).not.toBeInTheDocument()
  })

  it('renders Price Converter section', () => {
    render(<MarketTracker />)
    expect(screen.getByText('Price Converter')).toBeInTheDocument()
  })

  it('renders amount input in converter', () => {
    render(<MarketTracker />)
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
  })

  it('renders asset selector in converter', () => {
    render(<MarketTracker />)
    expect(screen.getByLabelText('From asset')).toBeInTheDocument()
  })

  it('renders currency selector in converter', () => {
    render(<MarketTracker />)
    expect(screen.getByLabelText('To currency')).toBeInTheDocument()
  })

  it('converts BTC to USD by default', () => {
    render(<MarketTracker />)
    // 1 BTC = $67,000 - should show $67,000.00
    const result = screen.getByText(/67,000\.00/)
    expect(result).toBeInTheDocument()
  })

  it('converts to AZN when selected', () => {
    render(<MarketTracker />)
    const currencySelect = screen.getByLabelText('To currency')
    fireEvent.change(currencySelect, { target: { value: 'AZN' } })
    // 1 BTC * 67000 * 1.7 = 113,900
    expect(screen.getByText(/113,900\.00/)).toBeInTheDocument()
  })

  it('converts to EUR when selected', () => {
    render(<MarketTracker />)
    const currencySelect = screen.getByLabelText('To currency')
    fireEvent.change(currencySelect, { target: { value: 'EUR' } })
    // 1 BTC * 67000 * 0.92 = 61,640
    expect(screen.getByText(/61,640\.00/)).toBeInTheDocument()
  })

  it('updates result when amount changes', () => {
    render(<MarketTracker />)
    const amountInput = screen.getByLabelText('Amount')
    fireEvent.change(amountInput, { target: { value: '2' } })
    // 2 BTC = $134,000
    expect(screen.getByText(/134,000\.00/)).toBeInTheDocument()
  })

  it('changes asset in converter', () => {
    render(<MarketTracker />)
    const assetSelect = screen.getByLabelText('From asset')
    fireEvent.change(assetSelect, { target: { value: 'ETH' } })
    // 1 ETH = $3,200
    expect(screen.getByText(/3,200\.00/)).toBeInTheDocument()
  })

  it('renders Market Summary section', () => {
    render(<MarketTracker />)
    expect(screen.getByText('Market Summary')).toBeInTheDocument()
  })

  it('shows best performer', () => {
    render(<MarketTracker />)
    expect(screen.getByText('Best Performer (24h)')).toBeInTheDocument()
    // BTC has highest change24h at 2.5%
    const bestSection = screen.getByText('Best Performer (24h)').closest('div')
    expect(bestSection?.textContent).toContain('Bitcoin')
  })

  it('shows worst performer', () => {
    render(<MarketTracker />)
    expect(screen.getByText('Worst Performer (24h)')).toBeInTheDocument()
    // ETH has lowest change24h at -1.2%
    const worstSection = screen.getByText('Worst Performer (24h)').closest('div')
    expect(worstSection?.textContent).toContain('Ethereum')
  })

  it('shows average change', () => {
    render(<MarketTracker />)
    expect(screen.getByText('Average Change')).toBeInTheDocument()
  })

  it('renders updated time', () => {
    render(<MarketTracker />)
    expect(screen.getByText(/Updated/)).toBeInTheDocument()
  })

  it('renders disclaimer text', () => {
    render(<MarketTracker />)
    expect(
      screen.getByText(/Prices are provided by CoinGecko/)
    ).toBeInTheDocument()
  })

  it('formats prices with commas for thousands', () => {
    render(<MarketTracker />)
    // 67000 should be formatted as 67,000.00
    expect(screen.getAllByText(/67,000\.00/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders 24h label on each card', () => {
    render(<MarketTracker />)
    const labels = screen.getAllByText('24h')
    expect(labels.length).toBe(5)
  })
})
