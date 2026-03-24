import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, string | number>) => {
    if (params) {
      let result = key
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, String(v))
      }
      return result
    }
    return key
  },
}))

import HashtagGenerator from '../HashtagGenerator'

describe('HashtagGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders input fields', () => {
    render(<HashtagGenerator />)
    expect(screen.getByLabelText('enterTopics')).toBeInTheDocument()
    expect(screen.getByLabelText('hashtagStyle')).toBeInTheDocument()
    expect(screen.getByLabelText('prefix')).toBeInTheDocument()
  })

  it('shows no hashtags initially', () => {
    render(<HashtagGenerator />)
    expect(screen.queryByText('generatedHashtags')).not.toBeInTheDocument()
  })

  it('generates lowercase hashtags from keywords', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'Hello World, Coding' } })

    expect(screen.getByText('#helloworld')).toBeInTheDocument()
    expect(screen.getByText('#coding')).toBeInTheDocument()
  })

  it('generates camelCase hashtags', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('hashtagStyle'), { target: { value: 'camelCase' } })
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'hello world' } })

    expect(screen.getAllByText('#helloWorld').length).toBeGreaterThanOrEqual(1)
  })

  it('generates uppercase hashtags', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('hashtagStyle'), { target: { value: 'uppercase' } })
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'test' } })

    expect(screen.getAllByText('#TEST').length).toBeGreaterThanOrEqual(1)
  })

  it('applies prefix to hashtags', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'code' } })
    fireEvent.change(screen.getByLabelText('prefix'), { target: { value: 'my' } })

    expect(screen.getAllByText('#mycode').length).toBeGreaterThanOrEqual(1)
  })

  it('shows popular topic category buttons', () => {
    render(<HashtagGenerator />)
    expect(screen.getByText('socialMedia')).toBeInTheDocument()
    expect(screen.getByText('business')).toBeInTheDocument()
    expect(screen.getByText('tech')).toBeInTheDocument()
    expect(screen.getByText('travel')).toBeInTheDocument()
    expect(screen.getByText('fitness')).toBeInTheDocument()
    expect(screen.getByText('food')).toBeInTheDocument()
  })

  it('selects a popular topic category', () => {
    render(<HashtagGenerator />)
    fireEvent.click(screen.getByText('tech'))

    expect(screen.getByText('#technology')).toBeInTheDocument()
    expect(screen.getByText('#programming')).toBeInTheDocument()
    expect(screen.getByText('#javascript')).toBeInTheDocument()
  })

  it('deselects a popular topic category', () => {
    render(<HashtagGenerator />)
    fireEvent.click(screen.getByText('tech'))
    expect(screen.getByText('#technology')).toBeInTheDocument()

    fireEvent.click(screen.getByText('tech'))
    expect(screen.queryByText('#technology')).not.toBeInTheDocument()
  })

  it('copies all hashtags to clipboard', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'test, demo' } })
    fireEvent.click(screen.getByText('copyAll'))

    expect(writeTextMock).toHaveBeenCalledWith('#test #demo')
  })

  it('copies single hashtag', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'hello' } })
    // Click the button version of the hashtag (not the textarea)
    const buttons = screen.getAllByText('#hello')
    const button = buttons.find((el) => el.tagName === 'BUTTON')
    if (button) fireEvent.click(button)

    expect(writeTextMock).toHaveBeenCalledWith('#hello')
  })

  it('shows hashtag count', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'a, b, c' } })

    expect(screen.getByText('(hashtagCount)')).toBeInTheDocument()
  })

  it('shows copy-ready textarea', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'test' } })

    expect(screen.getByLabelText('copyReadyText')).toBeInTheDocument()
  })

  it('removes special characters from hashtags', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'hello!@#world' } })

    expect(screen.getAllByText('#helloworld').length).toBeGreaterThanOrEqual(1)
  })

  it('deduplicates hashtags', () => {
    render(<HashtagGenerator />)
    fireEvent.change(screen.getByLabelText('enterTopics'), { target: { value: 'test, test, test' } })

    // One button + one in textarea = 2 total, but only 1 unique hashtag button
    const buttons = screen.getAllByRole('button').filter((b) => b.textContent === '#test')
    expect(buttons.length).toBe(1)
  })
})
