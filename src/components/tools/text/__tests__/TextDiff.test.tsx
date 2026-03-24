import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextDiff from '../TextDiff'

describe('TextDiff', () => {
  function getOriginalTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Paste the original text here...') as HTMLTextAreaElement
  }

  function getModifiedTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Paste the modified text here...') as HTMLTextAreaElement
  }

  it('renders both textareas and control buttons', () => {
    render(<TextDiff />)

    expect(getOriginalTextarea()).toBeInTheDocument()
    expect(getModifiedTextarea()).toBeInTheDocument()
    expect(screen.getByLabelText('Compare texts')).toBeInTheDocument()
    expect(screen.getByLabelText('Load sample texts')).toBeInTheDocument()
    expect(screen.getByLabelText('Clear all fields')).toBeInTheDocument()
  })

  it('does not show diff until Compare is clicked', () => {
    render(<TextDiff />)

    fireEvent.change(getOriginalTextarea(), { target: { value: 'hello' } })
    fireEvent.change(getModifiedTextarea(), { target: { value: 'world' } })

    expect(screen.queryByText('Lines Added')).not.toBeInTheDocument()
    expect(screen.queryByText('Lines Removed')).not.toBeInTheDocument()
  })

  it('shows diff stats after comparing', () => {
    render(<TextDiff />)

    fireEvent.change(getOriginalTextarea(), { target: { value: 'line one\nline two' } })
    fireEvent.change(getModifiedTextarea(), { target: { value: 'line one\nline three' } })
    fireEvent.click(screen.getByLabelText('Compare texts'))

    expect(screen.getByText('Lines Added')).toBeInTheDocument()
    expect(screen.getByText('Lines Removed')).toBeInTheDocument()
    expect(screen.getByText('Unchanged')).toBeInTheDocument()
  })

  it('shows identical text message when texts match', () => {
    render(<TextDiff />)

    fireEvent.change(getOriginalTextarea(), { target: { value: 'same text' } })
    fireEvent.change(getModifiedTextarea(), { target: { value: 'same text' } })
    fireEvent.click(screen.getByLabelText('Compare texts'))

    expect(screen.getByText('No differences found. The texts are identical.')).toBeInTheDocument()
  })

  it('shows stats with zero values when both inputs are empty', () => {
    render(<TextDiff />)

    fireEvent.click(screen.getByLabelText('Compare texts'))

    // When both empty, diff produces a single empty-string line with status 'same',
    // so it shows "No differences found" rather than "Both texts are empty"
    expect(screen.getByText('Unchanged')).toBeInTheDocument()
  })

  it('loads sample texts when Load Sample is clicked', () => {
    render(<TextDiff />)

    fireEvent.click(screen.getByLabelText('Load sample texts'))

    expect(getOriginalTextarea().value).toContain('quick brown fox')
    expect(getModifiedTextarea().value).toContain('quick brown cat')
  })

  it('clears everything when Clear is clicked', () => {
    render(<TextDiff />)

    fireEvent.change(getOriginalTextarea(), { target: { value: 'foo' } })
    fireEvent.change(getModifiedTextarea(), { target: { value: 'bar' } })
    fireEvent.click(screen.getByLabelText('Compare texts'))

    fireEvent.click(screen.getByLabelText('Clear all fields'))

    expect(getOriginalTextarea().value).toBe('')
    expect(getModifiedTextarea().value).toBe('')
    expect(screen.queryByText('Lines Added')).not.toBeInTheDocument()
  })

  it('displays added and removed lines with correct prefixes', () => {
    render(<TextDiff />)

    fireEvent.change(getOriginalTextarea(), { target: { value: 'removed line' } })
    fireEvent.change(getModifiedTextarea(), { target: { value: 'added line' } })
    fireEvent.click(screen.getByLabelText('Compare texts'))

    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('resets diff view when input changes after comparison', () => {
    render(<TextDiff />)

    fireEvent.change(getOriginalTextarea(), { target: { value: 'a' } })
    fireEvent.change(getModifiedTextarea(), { target: { value: 'b' } })
    fireEvent.click(screen.getByLabelText('Compare texts'))

    expect(screen.getByText('Lines Added')).toBeInTheDocument()

    fireEvent.change(getOriginalTextarea(), { target: { value: 'c' } })

    expect(screen.queryByText('Lines Added')).not.toBeInTheDocument()
  })
})
