import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FindAndReplace from '../FindAndReplace'

describe('FindAndReplace', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with all required UI elements', () => {
    render(<FindAndReplace />)

    expect(screen.getByText('Find')).toBeInTheDocument()
    expect(screen.getByText('Replace with')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
    expect(screen.getByText('Case Sensitive')).toBeInTheDocument()
    expect(screen.getByText('Regex')).toBeInTheDocument()
    expect(screen.getByText('Whole Word')).toBeInTheDocument()
  })

  it('renders input fields with correct placeholders', () => {
    render(<FindAndReplace />)

    expect(screen.getByPlaceholderText('Enter text to find...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter replacement text...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter or paste your text here...')).toBeInTheDocument()
  })

  it('finds text and shows match count', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'The cat and the cat sat on the mat' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'cat' } })

    expect(screen.getByText('2 matches found')).toBeInTheDocument()
  })

  it('shows singular match text for single match', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'The cat sat on the mat' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'cat' } })

    expect(screen.getByText('1 match found')).toBeInTheDocument()
  })

  it('shows 0 matches when search term is not found', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Hello world' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'xyz' } })

    expect(screen.getByText('0 matches found')).toBeInTheDocument()
  })

  it('replaces first occurrence only', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'aaa bbb aaa bbb aaa' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'aaa' } })

    const replaceInput = screen.getByLabelText('Replace text')
    fireEvent.change(replaceInput, { target: { value: 'xxx' } })

    fireEvent.click(screen.getByText('Replace First'))

    expect(textInput).toHaveValue('xxx bbb aaa bbb aaa')
  })

  it('replaces all occurrences', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'aaa bbb aaa bbb aaa' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'aaa' } })

    const replaceInput = screen.getByLabelText('Replace text')
    fireEvent.change(replaceInput, { target: { value: 'xxx' } })

    fireEvent.click(screen.getByText('Replace All'))

    expect(textInput).toHaveValue('xxx bbb xxx bbb xxx')
  })

  it('performs case-insensitive search by default', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Hello HELLO hello' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'hello' } })

    expect(screen.getByText('3 matches found')).toBeInTheDocument()
  })

  it('performs case-sensitive search when enabled', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Hello HELLO hello' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'hello' } })

    // Enable case sensitive
    const caseSensitiveCheckbox = screen.getByText('Case Sensitive').previousElementSibling as HTMLInputElement
    fireEvent.click(caseSensitiveCheckbox)

    expect(screen.getByText('1 match found')).toBeInTheDocument()
  })

  it('uses regex mode when enabled', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'cat bat sat mat' } })

    // Enable regex
    const regexCheckbox = screen.getByText('Regex').previousElementSibling as HTMLInputElement
    fireEvent.click(regexCheckbox)

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: '[cb]at' } })

    expect(screen.getByText('2 matches found')).toBeInTheDocument()
  })

  it('shows regex error for invalid regex pattern', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'some text' } })

    // Enable regex
    const regexCheckbox = screen.getByText('Regex').previousElementSibling as HTMLInputElement
    fireEvent.click(regexCheckbox)

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: '[invalid' } })

    expect(screen.getByText(/Regex Error:/)).toBeInTheDocument()
  })

  it('changes placeholder when regex mode is enabled', () => {
    render(<FindAndReplace />)

    expect(screen.getByPlaceholderText('Enter text to find...')).toBeInTheDocument()

    const regexCheckbox = screen.getByText('Regex').previousElementSibling as HTMLInputElement
    fireEvent.click(regexCheckbox)

    expect(screen.getByPlaceholderText('Enter regex pattern...')).toBeInTheDocument()
  })

  it('disables Whole Word checkbox when regex mode is enabled', () => {
    render(<FindAndReplace />)

    const regexCheckbox = screen.getByText('Regex').previousElementSibling as HTMLInputElement
    fireEvent.click(regexCheckbox)

    const wholeWordCheckbox = screen.getByText('Whole Word').previousElementSibling as HTMLInputElement
    expect(wholeWordCheckbox).toBeDisabled()
  })

  it('does not show match count when find value is empty', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Some text here' } })

    expect(screen.queryByText(/match/)).not.toBeInTheDocument()
  })

  it('does not show Replace buttons when no matches exist', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Hello world' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'xyz' } })

    expect(screen.queryByText('Replace First')).not.toBeInTheDocument()
    expect(screen.queryByText('Replace All')).not.toBeInTheDocument()
  })

  it('shows Replace buttons when matches exist', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Hello world' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'Hello' } })

    expect(screen.getByText('Replace First')).toBeInTheDocument()
    expect(screen.getByText('Replace All')).toBeInTheDocument()
  })

  it('shows match highlights when matches exist', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'The fox and the fox' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'fox' } })

    expect(screen.getByText('Match Highlights (2)')).toBeInTheDocument()
  })

  it('handles empty text with no matches', () => {
    render(<FindAndReplace />)

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'search' } })

    expect(screen.getByText('0 matches found')).toBeInTheDocument()
  })

  it('copies text to clipboard', async () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Some text' } })

    fireEvent.click(screen.getByLabelText('Copy text'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('Some text')
    })
  })

  it('loads sample data when Sample button is clicked', () => {
    render(<FindAndReplace />)

    fireEvent.click(screen.getByText('Sample'))

    const textInput = screen.getByLabelText('Text input for find and replace') as HTMLTextAreaElement
    expect(textInput.value).toContain('quick brown fox')

    const findInput = screen.getByLabelText('Find text') as HTMLInputElement
    expect(findInput.value).toBe('quick')

    const replaceInput = screen.getByLabelText('Replace text') as HTMLInputElement
    expect(replaceInput.value).toBe('fast')
  })

  it('clears all fields when Clear All button is clicked', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Some text' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'Some' } })

    const replaceInput = screen.getByLabelText('Replace text')
    fireEvent.change(replaceInput, { target: { value: 'Other' } })

    fireEvent.click(screen.getByLabelText('Clear all fields'))

    expect(textInput).toHaveValue('')
    expect(findInput).toHaveValue('')
    expect(replaceInput).toHaveValue('')
  })

  it('replaces with empty string effectively deleting matches', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'Remove this word from text' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'this ' } })

    const replaceInput = screen.getByLabelText('Replace text')
    fireEvent.change(replaceInput, { target: { value: '' } })

    fireEvent.click(screen.getByText('Replace All'))

    expect(textInput).toHaveValue('Remove word from text')
  })

  it('handles whole word matching', () => {
    render(<FindAndReplace />)

    const textInput = screen.getByLabelText('Text input for find and replace')
    fireEvent.change(textInput, { target: { value: 'cat catch concatenate' } })

    const findInput = screen.getByLabelText('Find text')
    fireEvent.change(findInput, { target: { value: 'cat' } })

    // Without whole word, should match 3
    expect(screen.getByText('3 matches found')).toBeInTheDocument()

    // Enable whole word
    const wholeWordCheckbox = screen.getByText('Whole Word').previousElementSibling as HTMLInputElement
    fireEvent.click(wholeWordCheckbox)

    expect(screen.getByText('1 match found')).toBeInTheDocument()
  })
})
