import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToolTextarea from '../ToolTextarea'

describe('ToolTextarea', () => {
  it('renders with label linked via htmlFor/id', () => {
    render(<ToolTextarea label="Input Text" />)
    const textarea = screen.getByLabelText('Input Text')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('shows max length hint in label', () => {
    render(<ToolTextarea label="Input" maxLength={5000} />)
    expect(screen.getByText('(max 5,000 chars)')).toBeInTheDocument()
  })

  it('shows character count when showCount and maxLength are set', () => {
    render(<ToolTextarea label="Input" maxLength={100} showCount value="hello" onChange={() => {}} />)
    expect(screen.getByText('5/100')).toBeInTheDocument()
  })

  it('does not show character count without maxLength', () => {
    render(<ToolTextarea label="Input" showCount value="hello" onChange={() => {}} />)
    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument()
  })

  it('displays help text linked via aria-describedby', () => {
    render(<ToolTextarea label="Input" helpText="Enter your text here" />)
    const textarea = screen.getByLabelText('Input')
    const helpText = screen.getByText('Enter your text here')
    expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining(helpText.id))
  })

  it('displays error with role="alert" and aria-invalid', () => {
    render(<ToolTextarea label="Input" error="This field is required" />)
    const textarea = screen.getByLabelText('Input')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')

    const errorEl = screen.getByRole('alert')
    expect(errorEl).toHaveTextContent('This field is required')
    expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining(errorEl.id))
  })

  it('does not set aria-invalid when there is no error', () => {
    render(<ToolTextarea label="Input" />)
    expect(screen.getByLabelText('Input')).not.toHaveAttribute('aria-invalid')
  })

  it('includes both help and error in aria-describedby', () => {
    render(<ToolTextarea label="Input" helpText="Some help" error="Some error" />)
    const textarea = screen.getByLabelText('Input')
    const describedBy = textarea.getAttribute('aria-describedby')!
    expect(describedBy.split(' ')).toHaveLength(2)
  })

  it('forwards native textarea props', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ToolTextarea label="Input" placeholder="Type here..." value="" onChange={onChange} />
    )
    const textarea = screen.getByLabelText('Input')
    expect(textarea).toHaveAttribute('placeholder', 'Type here...')
    await user.type(textarea, 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('applies destructive border style on error', () => {
    render(<ToolTextarea label="Input" error="Bad" />)
    const textarea = screen.getByLabelText('Input')
    expect(textarea.className).toContain('border-destructive')
  })
})
