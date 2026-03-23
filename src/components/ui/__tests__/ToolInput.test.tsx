import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToolInput from '../ToolInput'

describe('ToolInput', () => {
  it('renders with label linked via htmlFor/id', () => {
    render(<ToolInput label="Name" />)
    const input = screen.getByLabelText('Name')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('displays help text linked via aria-describedby', () => {
    render(<ToolInput label="Email" helpText="We will not share your email" />)
    const input = screen.getByLabelText('Email')
    const helpText = screen.getByText('We will not share your email')
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(helpText.id))
  })

  it('displays error with role="alert" and aria-invalid', () => {
    render(<ToolInput label="Email" error="Invalid email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')

    const errorEl = screen.getByRole('alert')
    expect(errorEl).toHaveTextContent('Invalid email')
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(errorEl.id))
  })

  it('does not set aria-invalid when there is no error', () => {
    render(<ToolInput label="Name" />)
    expect(screen.getByLabelText('Name')).not.toHaveAttribute('aria-invalid')
  })

  it('includes both help and error in aria-describedby', () => {
    render(<ToolInput label="Field" helpText="Help" error="Error" />)
    const input = screen.getByLabelText('Field')
    const describedBy = input.getAttribute('aria-describedby')!
    expect(describedBy.split(' ')).toHaveLength(2)
  })

  it('forwards native input props', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ToolInput label="URL" type="url" placeholder="https://..." value="" onChange={onChange} />
    )
    const input = screen.getByLabelText('URL')
    expect(input).toHaveAttribute('type', 'url')
    expect(input).toHaveAttribute('placeholder', 'https://...')
    await user.type(input, 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('applies destructive border style on error', () => {
    render(<ToolInput label="Name" error="Required" />)
    const input = screen.getByLabelText('Name')
    expect(input.className).toContain('border-destructive')
  })
})
