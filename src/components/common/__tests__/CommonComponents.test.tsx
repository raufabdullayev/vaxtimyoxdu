import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Common Components - Rendering', () => {
  describe('PoweredByBrand', () => {
    it('renders without crashing', async () => {
      const { default: Comp } = await import('../PoweredByBrand')
      render(<Comp />)
      // Should render some content
      expect(document.body.querySelector('div')).toBeInTheDocument()
    })
  })

  describe('CurrentYear', () => {
    it('renders current year', async () => {
      const { default: Comp } = await import('../CurrentYear')
      const { container } = render(<Comp />)
      expect(container.textContent).toBe(String(new Date().getFullYear()))
    })
  })
})
