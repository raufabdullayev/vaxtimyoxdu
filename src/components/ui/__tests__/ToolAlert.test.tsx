import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ToolAlert from '../ToolAlert'

describe('ToolAlert', () => {
  it('renders error variant with role="alert" and aria-live="assertive"', () => {
    render(<ToolAlert variant="error">Something went wrong</ToolAlert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Something went wrong')
    expect(alert).toHaveAttribute('aria-live', 'assertive')
  })

  it('renders success variant with role="status" and aria-live="polite"', () => {
    render(<ToolAlert variant="success">Operation complete</ToolAlert>)
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Operation complete')
    expect(status).toHaveAttribute('aria-live', 'polite')
  })

  it('applies error styling for error variant', () => {
    render(<ToolAlert variant="error">Error</ToolAlert>)
    const alert = screen.getByRole('alert')
    expect(alert.className).toContain('bg-destructive/10')
    expect(alert.className).toContain('text-destructive')
  })

  it('applies success styling for success variant', () => {
    render(<ToolAlert variant="success">Success</ToolAlert>)
    const status = screen.getByRole('status')
    expect(status.className).toContain('bg-green-50')
  })

  it('renders children content', () => {
    render(
      <ToolAlert variant="error">
        <strong>Error:</strong> Invalid input
      </ToolAlert>
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Error: Invalid input')
  })

  it('accepts custom className', () => {
    render(<ToolAlert variant="error" className="mt-4">Error</ToolAlert>)
    expect(screen.getByRole('alert').className).toContain('mt-4')
  })
})
