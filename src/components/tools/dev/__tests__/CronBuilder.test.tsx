import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CronBuilder from '../CronBuilder'

describe('CronBuilder', () => {
  it('renders without crashing', () => {
    render(<CronBuilder />)
    expect(document.querySelector('.space-y-4, .space-y-6')).toBeInTheDocument()
  })

  it('renders buttons', () => {
    render(<CronBuilder />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders input fields', () => {
    render(<CronBuilder />)
    const inputs = document.querySelectorAll('input, select')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })
})
