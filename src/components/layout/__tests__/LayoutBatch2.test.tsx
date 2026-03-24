import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

// Mock dynamic imports and next/navigation for layout components
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/en',
  useSearchParams: () => new URLSearchParams(),
}))

describe('Layout Components - Rendering', () => {
  describe('LazyAdBanner', () => {
    it('renders without crashing', async () => {
      const { default: Comp } = await import('../LazyAdBanner')
      render(<Comp slot="test" format="banner" />)
      expect(document.body.querySelector('div')).toBeInTheDocument()
    })
  })

  describe('ServiceWorkerRegistrar', () => {
    it('renders without crashing', async () => {
      const { default: Comp } = await import('../ServiceWorkerRegistrar')
      render(<Comp />)
      // Component renders null or empty
      expect(document.body).toBeInTheDocument()
    })
  })
})
