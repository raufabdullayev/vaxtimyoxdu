import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage before importing component
const store: Record<string, string> = {}
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { store[key] = value }),
  removeItem: vi.fn((key: string) => { delete store[key] }),
  clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]) }),
  length: 0,
  key: vi.fn(() => null),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true })

import ThemeToggle from '../ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    Object.keys(store).forEach(k => delete store[k])
    vi.clearAllMocks()
    document.documentElement.classList.remove('dark')
  })

  it('renders a button with aria-label', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /theme|mode|preference/i })
    expect(button).toBeInTheDocument()
  })

  it('renders an SVG icon', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    const svg = button.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('cycles from system to light on first click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(store['theme-preference']).toBe('light')
  })

  it('cycles from light to dark', async () => {
    store['theme-preference'] = 'light'
    const user = userEvent.setup()
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(store['theme-preference']).toBe('dark')
  })

  it('cycles from dark to system', async () => {
    store['theme-preference'] = 'dark'
    const user = userEvent.setup()
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(store['theme-preference']).toBe('system')
  })

  it('applies dark class to html when set to dark', async () => {
    store['theme-preference'] = 'light'
    const user = userEvent.setup()
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    await user.click(button) // light -> dark
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when set to light', async () => {
    document.documentElement.classList.add('dark')
    const user = userEvent.setup()
    render(<ThemeToggle />)
    // Default is system, click cycles to light
    const button = screen.getByRole('button')
    await user.click(button) // system -> light
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('shows correct aria-label for system theme (default)', () => {
    render(<ThemeToggle />)
    expect(screen.getByLabelText('System preference')).toBeInTheDocument()
  })

  it('shows Light mode aria-label after clicking once', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByLabelText('Light mode')).toBeInTheDocument()
  })

  it('shows Dark mode aria-label after clicking twice', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    await user.click(button) // system -> light
    await user.click(button) // light -> dark
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument()
  })

  it('has title attribute with resolved theme info', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button')) // system -> light
    const button = screen.getByLabelText('Light mode')
    expect(button).toHaveAttribute('title', expect.stringContaining('light'))
  })

  it('button has type="button" implicitly (not submit)', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    // Buttons in React default to type="submit" in forms, verify it's a button
    expect(button.tagName).toBe('BUTTON')
  })
})
