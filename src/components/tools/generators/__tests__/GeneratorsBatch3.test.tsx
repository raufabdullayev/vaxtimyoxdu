import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Generator Tools Batch 3 - Rendering', () => {
  describe('HtaccessGenerator', () => {
    it('renders and has inputs', async () => {
      const { default: Comp } = await import('../HtaccessGenerator')
      render(<Comp />)
      const inputs = document.querySelectorAll('input, textarea, select')
      expect(inputs.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('OpenGraphGenerator', () => {
    it('renders and has inputs', async () => {
      const { default: Comp } = await import('../OpenGraphGenerator')
      render(<Comp />)
      const inputs = document.querySelectorAll('input, textarea, select')
      expect(inputs.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('PrivacyPolicyGenerator', () => {
    it('renders and has inputs', async () => {
      const { default: Comp } = await import('../PrivacyPolicyGenerator')
      render(<Comp />)
      const inputs = document.querySelectorAll('input, textarea, select, [type="checkbox"]')
      expect(inputs.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('RobotsTxtGenerator', () => {
    it('renders and has inputs', async () => {
      const { default: Comp } = await import('../RobotsTxtGenerator')
      render(<Comp />)
      const inputs = document.querySelectorAll('input, textarea, select')
      expect(inputs.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('SitemapGenerator', () => {
    it('renders and has inputs', async () => {
      const { default: Comp } = await import('../SitemapGenerator')
      render(<Comp />)
      const inputs = document.querySelectorAll('input, textarea')
      expect(inputs.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('TermsOfServiceGenerator', () => {
    it('renders and has inputs', async () => {
      const { default: Comp } = await import('../TermsOfServiceGenerator')
      render(<Comp />)
      const inputs = document.querySelectorAll('input, textarea, select, [type="checkbox"]')
      expect(inputs.length).toBeGreaterThanOrEqual(1)
    })
  })
})
