import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockReplace = vi.fn()

// Mock next-intl
vi.mock('next-intl', () => ({
  useLocale: () => 'az',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      selectLanguage: 'Select language',
      menu: 'Menu',
    }
    return translations[key] || key
  },
}))

// Mock @/i18n/navigation
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/tools',
}))

// Mock @/i18n/config
vi.mock('@/i18n/config', () => ({
  locales: ['az', 'en', 'tr', 'ru'] as const,
  localeNames: { az: 'AZ', en: 'EN', tr: 'TR', ru: 'RU' },
  localeFlags: { az: '\u{1F1E6}\u{1F1FF}', en: '\u{1F1EC}\u{1F1E7}', tr: '\u{1F1F9}\u{1F1F7}', ru: '\u{1F1F7}\u{1F1FA}' },
}))

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Globe: (props: Record<string, unknown>) => <svg data-testid="globe-icon" {...props} />,
}))

import LanguageSelector from '../LanguageSelector'

describe('LanguageSelector', () => {
  beforeEach(() => {
    mockReplace.mockClear()
  })

  it('renders the language selector button', () => {
    render(<LanguageSelector />)
    const button = screen.getByRole('button', { name: 'Select language' })
    expect(button).toBeInTheDocument()
  })

  it('displays current locale name', () => {
    render(<LanguageSelector />)
    expect(screen.getByText('AZ')).toBeInTheDocument()
  })

  it('renders globe icon', () => {
    render(<LanguageSelector />)
    expect(screen.getByTestId('globe-icon')).toBeInTheDocument()
  })

  it('does not show dropdown initially', () => {
    render(<LanguageSelector />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows dropdown when button is clicked', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('displays all locale options in dropdown', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4)
  })

  it('marks current locale as selected', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))

    const azOption = screen.getAllByRole('option').find(
      (opt) => opt.getAttribute('aria-selected') === 'true'
    )
    expect(azOption).toBeDefined()
    expect(azOption).toHaveTextContent('AZ')
  })

  it('switches locale when a different option is clicked', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))

    // Click English option
    const options = screen.getAllByRole('option')
    const enOption = options.find((opt) => opt.textContent?.includes('EN'))
    expect(enOption).toBeDefined()
    await user.click(enOption!)

    expect(mockReplace).toHaveBeenCalledWith('/tools', { locale: 'en' })
  })

  it('closes dropdown after selecting a locale', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const options = screen.getAllByRole('option')
    await user.click(options[1]) // Click 'EN'

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('toggles dropdown on button click', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    const button = screen.getByRole('button', { name: 'Select language' })

    await user.click(button) // open
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.click(button) // close
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('sets aria-expanded correctly', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    const button = screen.getByRole('button', { name: 'Select language' })

    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('has aria-haspopup="listbox" on the trigger button', () => {
    render(<LanguageSelector />)
    const button = screen.getByRole('button', { name: 'Select language' })
    expect(button).toHaveAttribute('aria-haspopup', 'listbox')
  })

  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <LanguageSelector />
      </div>
    )
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.click(screen.getByTestId('outside'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows checkmark for current locale', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))

    // The current locale (AZ) option should have a checkmark span
    const azOption = screen.getAllByRole('option').find(
      (opt) => opt.getAttribute('aria-selected') === 'true'
    )
    expect(azOption).toBeDefined()
    // Checkmark character
    expect(azOption!.textContent).toContain('\u2713')
  })
})
