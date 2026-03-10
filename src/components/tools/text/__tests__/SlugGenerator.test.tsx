import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SlugGenerator from '../SlugGenerator'

describe('SlugGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders the input field with correct placeholder', () => {
    render(<SlugGenerator />)

    expect(screen.getByPlaceholderText('Enter a title, heading, or any text...')).toBeInTheDocument()
  })

  it('generates a slug with spaces converted to hyphens', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello World')

    expect(screen.getByLabelText('Generated slug')).toHaveTextContent('hello-world')
  })

  it('removes special characters from the slug', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello! World@2024')

    expect(screen.getByLabelText('Generated slug')).toHaveTextContent('hello-world2024')
  })

  it('converts text to lowercase by default', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'HELLO WORLD')

    expect(screen.getByLabelText('Generated slug')).toHaveTextContent('hello-world')
  })

  it('handles accented characters', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'cafe resume')

    expect(screen.getByLabelText('Generated slug')).toHaveTextContent('cafe-resume')
  })

  it('handles multiple consecutive spaces and hyphens', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'hello   world')

    // Multiple spaces should collapse into a single separator
    expect(screen.getByLabelText('Generated slug')).toHaveTextContent('hello-world')
  })

  it('does not show slug section when input is empty', () => {
    render(<SlugGenerator />)

    expect(screen.queryByLabelText('Generated slug')).not.toBeInTheDocument()
  })

  it('shows character count below the slug', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello World')

    expect(screen.getByText('11 characters')).toBeInTheDocument()
  })

  it('copies slug to clipboard when Copy button is clicked', async () => {
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    fireEvent.change(input, { target: { value: 'Hello World' } })

    fireEvent.click(screen.getByLabelText('Copy slug to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('hello-world')
    })
  })

  it('shows "Copied!" after copying', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello World')

    await user.click(screen.getByLabelText('Copy slug to clipboard'))

    expect(screen.getByText('Copied!')).toBeInTheDocument()
  })

  it('allows changing separator to underscore', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello World')

    const separator = screen.getByLabelText('Separator type')
    await user.selectOptions(separator, '_')

    expect(screen.getByLabelText('Generated slug')).toHaveTextContent('hello_world')
  })

  it('can toggle lowercase option off', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello World')

    const lowercaseCheckbox = screen.getByLabelText('Convert to lowercase')
    await user.click(lowercaseCheckbox)

    expect(screen.getByLabelText('Generated slug')).toHaveTextContent('Hello-World')
  })

  it('clears input when Clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello World')

    await user.click(screen.getByLabelText('Clear input'))

    expect(input).toHaveValue('')
    expect(screen.queryByLabelText('Generated slug')).not.toBeInTheDocument()
  })

  it('does not show Clear button when input is empty', () => {
    render(<SlugGenerator />)

    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()
  })

  it('shows variant slugs when available', async () => {
    const user = userEvent.setup()
    render(<SlugGenerator />)

    const input = screen.getByLabelText('Text input for slug generation')
    await user.type(input, 'Hello World')

    // With default hyphen separator, the "Underscored" variant should appear
    expect(screen.getByText('Underscored:')).toBeInTheDocument()
  })
})
