import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import JsonToTypescript from '../JsonToTypescript'

describe('JsonToTypescript', () => {
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
    render(<JsonToTypescript />)
    expect(screen.getByLabelText('interfaceName')).toBeInTheDocument()
    expect(screen.getByLabelText('jsonInput')).toBeInTheDocument()
  })

  it('shows placeholder when no input', () => {
    render(<JsonToTypescript />)
    expect(screen.getByText('typescriptWillAppear')).toBeInTheDocument()
  })

  it('converts simple JSON object to TypeScript', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"name": "John", "age": 30}' },
    })

    expect(screen.getByText(/export interface Root/)).toBeInTheDocument()
    expect(screen.getByText(/name: string/)).toBeInTheDocument()
    expect(screen.getByText(/age: number/)).toBeInTheDocument()
  })

  it('handles nested objects', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"address": {"city": "NY", "zip": "10001"}}' },
    })

    expect(screen.getByText(/export interface Address/)).toBeInTheDocument()
    expect(screen.getByText(/city: string/)).toBeInTheDocument()
  })

  it('handles arrays', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"tags": ["a", "b"]}' },
    })

    expect(screen.getByText(/tags: string\[\]/)).toBeInTheDocument()
  })

  it('handles JSON array of objects', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '[{"id": 1, "name": "Alice"}]' },
    })

    expect(screen.getByText(/export interface RootItem/)).toBeInTheDocument()
    expect(screen.getByText(/export type Root = RootItem\[\]/)).toBeInTheDocument()
  })

  it('handles empty array', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '[]' },
    })

    expect(screen.getByText(/export type Root = unknown\[\]/)).toBeInTheDocument()
  })

  it('handles boolean values', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"active": true}' },
    })

    expect(screen.getByText(/active: boolean/)).toBeInTheDocument()
  })

  it('handles null values', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"data": null}' },
    })

    expect(screen.getByText(/data: null/)).toBeInTheDocument()
  })

  it('shows error for invalid JSON', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: 'not valid json' },
    })

    expect(screen.getByText('invalidJson')).toBeInTheDocument()
  })

  it('changes interface name', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('interfaceName'), { target: { value: 'User' } })
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"name": "John"}' },
    })

    expect(screen.getByText(/export interface User/)).toBeInTheDocument()
  })

  it('loads sample data', () => {
    render(<JsonToTypescript />)
    fireEvent.click(screen.getByText('loadSample'))
    const input = screen.getByLabelText('jsonInput') as HTMLTextAreaElement
    expect(input.value).toContain('John Doe')
  })

  it('copies output to clipboard', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"id": 1}' },
    })
    fireEvent.click(screen.getByText('copy'))
    expect(writeTextMock).toHaveBeenCalled()
    expect(writeTextMock.mock.calls[0][0]).toContain('export interface Root')
  })

  it('handles primitive JSON value', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '"hello"' },
    })

    expect(screen.getByText(/export type Root = string/)).toBeInTheDocument()
  })

  it('handles number arrays', () => {
    render(<JsonToTypescript />)
    fireEvent.change(screen.getByLabelText('jsonInput'), {
      target: { value: '{"scores": [1, 2, 3]}' },
    })

    expect(screen.getByText(/scores: number\[\]/)).toBeInTheDocument()
  })

  it('strips invalid characters from interface name', () => {
    render(<JsonToTypescript />)
    const nameInput = screen.getByLabelText('interfaceName') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'My-Type!' } })
    expect(nameInput.value).toBe('MyType')
  })
})
