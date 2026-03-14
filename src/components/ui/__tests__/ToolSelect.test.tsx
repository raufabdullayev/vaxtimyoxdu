import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToolSelect from '../ToolSelect'

const options = [
  { value: '2', label: '2 spaces' },
  { value: '4', label: '4 spaces' },
  { value: 'tab', label: 'Tab' },
]

describe('ToolSelect', () => {
  it('renders with label linked via htmlFor/id', () => {
    render(<ToolSelect label="Indent" options={options} />)
    const select = screen.getByLabelText('Indent')
    expect(select).toBeInTheDocument()
    expect(select.tagName).toBe('SELECT')
  })

  it('renders all options', () => {
    render(<ToolSelect label="Indent" options={options} />)
    expect(screen.getByText('2 spaces')).toBeInTheDocument()
    expect(screen.getByText('4 spaces')).toBeInTheDocument()
    expect(screen.getByText('Tab')).toBeInTheDocument()
  })

  it('displays help text linked via aria-describedby', () => {
    render(<ToolSelect label="Indent" options={options} helpText="Choose indentation" />)
    const select = screen.getByLabelText('Indent')
    const helpText = screen.getByText('Choose indentation')
    expect(select).toHaveAttribute('aria-describedby', expect.stringContaining(helpText.id))
  })

  it('does not have aria-describedby without help text', () => {
    render(<ToolSelect label="Indent" options={options} />)
    expect(screen.getByLabelText('Indent')).not.toHaveAttribute('aria-describedby')
  })

  it('calls onChange when selection changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ToolSelect label="Indent" options={options} onChange={onChange} />)
    await user.selectOptions(screen.getByLabelText('Indent'), '4')
    expect(onChange).toHaveBeenCalled()
  })

  it('forwards native select props', () => {
    render(<ToolSelect label="Indent" options={options} value="4" onChange={() => {}} />)
    expect(screen.getByLabelText('Indent')).toHaveValue('4')
  })
})
