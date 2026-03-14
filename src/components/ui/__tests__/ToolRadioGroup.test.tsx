import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToolRadioGroup from '../ToolRadioGroup'

const options = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'academic', label: 'Academic' },
]

describe('ToolRadioGroup', () => {
  it('renders with role="radiogroup" and aria-label', () => {
    render(
      <ToolRadioGroup label="Tone" options={options} value="professional" onChange={() => {}} />
    )
    const group = screen.getByRole('radiogroup', { name: 'Tone' })
    expect(group).toBeInTheDocument()
  })

  it('renders all options with role="radio"', () => {
    render(
      <ToolRadioGroup label="Tone" options={options} value="professional" onChange={() => {}} />
    )
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
  })

  it('marks the selected option as aria-checked="true"', () => {
    render(
      <ToolRadioGroup label="Tone" options={options} value="casual" onChange={() => {}} />
    )
    expect(screen.getByRole('radio', { name: 'Casual' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Professional' })).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByRole('radio', { name: 'Academic' })).toHaveAttribute('aria-checked', 'false')
  })

  it('calls onChange with the clicked option value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ToolRadioGroup label="Tone" options={options} value="professional" onChange={onChange} />
    )
    await user.click(screen.getByRole('radio', { name: 'Academic' }))
    expect(onChange).toHaveBeenCalledWith('academic')
  })

  it('applies active styling to selected option', () => {
    render(
      <ToolRadioGroup label="Tone" options={options} value="professional" onChange={() => {}} />
    )
    const selected = screen.getByRole('radio', { name: 'Professional' })
    expect(selected.className).toContain('bg-primary')
    const unselected = screen.getByRole('radio', { name: 'Casual' })
    expect(unselected.className).toContain('border')
  })

  it('renders buttons with type="button"', () => {
    render(
      <ToolRadioGroup label="Tone" options={options} value="professional" onChange={() => {}} />
    )
    const radios = screen.getAllByRole('radio')
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('type', 'button')
    })
  })
})
