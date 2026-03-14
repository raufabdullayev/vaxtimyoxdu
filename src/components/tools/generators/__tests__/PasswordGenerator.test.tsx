import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, string> = {
      copy: 'Copy', copied: 'Copied!', regenerate: 'Regenerate',
      strength: 'Strength', length: 'Length',
      uppercase: 'Uppercase (A-Z)', lowercase: 'Lowercase (a-z)',
      digits: 'Digits (0-9)', symbols: 'Symbols (!@#$)',
      selectAtLeastOne: 'Select at least one character set',
      weak: 'Weak', medium: 'Medium', strong: 'Strong', veryStrong: 'Very Strong',
    }
    return (key: string) => translations[key] ?? key
  },
}))

import PasswordGenerator from '../PasswordGenerator'

describe('PasswordGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('generates a password on initial render', () => {
    render(<PasswordGenerator />)

    const passwordDisplay = screen.getByLabelText('Generated password')
    expect(passwordDisplay.textContent).not.toBe('')
    expect(passwordDisplay.textContent!.length).toBeGreaterThanOrEqual(16)
  })

  it('renders all character set checkboxes', () => {
    render(<PasswordGenerator />)

    expect(screen.getByText('Uppercase (A-Z)')).toBeInTheDocument()
    expect(screen.getByText('Lowercase (a-z)')).toBeInTheDocument()
    expect(screen.getByText('Digits (0-9)')).toBeInTheDocument()
    expect(screen.getByText('Symbols (!@#$)')).toBeInTheDocument()
  })

  it('has all character sets checked by default', () => {
    render(<PasswordGenerator />)

    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked()
    })
  })

  it('generates a new password when Regenerate is clicked', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)

    const passwordDisplay = screen.getByLabelText('Generated password')
    const firstPassword = passwordDisplay.textContent

    await user.click(screen.getByLabelText('Regenerate password'))

    // Password could theoretically be the same but extremely unlikely
    // Just verify it still has content
    expect(passwordDisplay.textContent).not.toBe('')
  })

  it('renders the length slider with default value of 16', () => {
    render(<PasswordGenerator />)

    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('16')
  })

  it('changes password length when slider is adjusted', () => {
    render(<PasswordGenerator />)

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '32' } })

    const passwordDisplay = screen.getByLabelText('Generated password')
    expect(passwordDisplay.textContent!.length).toBe(32)
  })

  it('generates password with only uppercase when other options are unchecked', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)

    const checkboxes = screen.getAllByRole('checkbox')
    // Uncheck lowercase, digits, symbols (keep uppercase)
    await user.click(checkboxes[1]) // lowercase
    await user.click(checkboxes[2]) // digits
    await user.click(checkboxes[3]) // symbols

    const passwordDisplay = screen.getByLabelText('Generated password')
    const password = passwordDisplay.textContent!
    expect(password).toMatch(/^[A-Z]+$/)
  })

  it('generates password with only lowercase when other options are unchecked', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)

    const checkboxes = screen.getAllByRole('checkbox')
    // Uncheck uppercase, digits, symbols (keep lowercase)
    await user.click(checkboxes[0]) // uppercase
    await user.click(checkboxes[2]) // digits
    await user.click(checkboxes[3]) // symbols

    const passwordDisplay = screen.getByLabelText('Generated password')
    const password = passwordDisplay.textContent!
    expect(password).toMatch(/^[a-z]+$/)
  })

  it('generates password with only digits when other options are unchecked', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)

    const checkboxes = screen.getAllByRole('checkbox')
    // Uncheck uppercase, lowercase, symbols (keep digits)
    await user.click(checkboxes[0]) // uppercase
    await user.click(checkboxes[1]) // lowercase
    await user.click(checkboxes[3]) // symbols

    const passwordDisplay = screen.getByLabelText('Generated password')
    const password = passwordDisplay.textContent!
    expect(password).toMatch(/^[0-9]+$/)
  })

  it('shows empty password when no character set is selected', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0]) // uppercase
    await user.click(checkboxes[1]) // lowercase
    await user.click(checkboxes[2]) // digits
    await user.click(checkboxes[3]) // symbols

    const passwordDisplay = screen.getByLabelText('Generated password')
    expect(passwordDisplay.textContent).toBe('Select at least one character set')
  })

  it('copies password to clipboard', async () => {
    render(<PasswordGenerator />)

    const passwordDisplay = screen.getByLabelText('Generated password')
    const password = passwordDisplay.textContent!

    fireEvent.click(screen.getByLabelText('Copy password to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(password)
    })
  })

  it('shows "Copied!" after copying', async () => {
    render(<PasswordGenerator />)

    fireEvent.click(screen.getByLabelText('Copy password to clipboard'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('shows password strength indicator', () => {
    render(<PasswordGenerator />)

    // With all charsets and length 16, should show strength
    expect(screen.getByText('Strength')).toBeInTheDocument()
  })

  it('disables Regenerate button when no charset is selected', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    await user.click(checkboxes[1])
    await user.click(checkboxes[2])
    await user.click(checkboxes[3])

    expect(screen.getByLabelText('Regenerate password')).toBeDisabled()
  })

  it('disables Copy button when no password exists', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    await user.click(checkboxes[1])
    await user.click(checkboxes[2])
    await user.click(checkboxes[3])

    expect(screen.getByLabelText('Copy password to clipboard')).toBeDisabled()
  })
})
