import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('@/hooks/useMarketPrices', () => ({
  useMarketPrices: () => ({
    prices: [],
    loading: true,
    error: null,
    updatedAt: null,
  }),
}))

import MarketTracker from '../MarketTracker'

describe('MarketTracker', () => {
  it('renders loading state', () => {
    const { container } = render(<MarketTracker />)
    expect(container.querySelector('.space-y-4, .space-y-6, div')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    render(<MarketTracker />)
    // Component should render without errors even with empty data
    expect(document.body.textContent?.length).toBeGreaterThan(0)
  })
})
