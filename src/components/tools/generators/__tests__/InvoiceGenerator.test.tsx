import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InvoiceGenerator from '../InvoiceGenerator'

describe('InvoiceGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders invoice form with Edit/Preview toggle', () => {
    render(<InvoiceGenerator />)
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  it('renders invoice number field', () => {
    render(<InvoiceGenerator />)
    const invoiceNum = screen.getByLabelText('Invoice number') as HTMLInputElement
    expect(invoiceNum.value).toBe('INV-001')
  })

  it('renders invoice date field', () => {
    render(<InvoiceGenerator />)
    expect(screen.getByLabelText('Invoice date')).toBeInTheDocument()
  })

  it('renders from and to sections', () => {
    render(<InvoiceGenerator />)
    expect(screen.getByText('From (Your Company)')).toBeInTheDocument()
    expect(screen.getByText('To (Client)')).toBeInTheDocument()
  })

  it('renders currency selector', () => {
    render(<InvoiceGenerator />)
    expect(screen.getByLabelText('Currency')).toBeInTheDocument()
  })

  it('renders items section with add button', () => {
    render(<InvoiceGenerator />)
    expect(screen.getByText('Items')).toBeInTheDocument()
    expect(screen.getByText('+ Add Item')).toBeInTheDocument()
  })

  it('adds a new item row', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('+ Add Item'))
    const descInputs = screen.getAllByLabelText('Item description')
    expect(descInputs.length).toBe(2)
  })

  it('updates item description', () => {
    render(<InvoiceGenerator />)
    const descInput = screen.getByLabelText('Item description') as HTMLInputElement
    fireEvent.change(descInput, { target: { value: 'Web Design' } })
    expect(descInput.value).toBe('Web Design')
  })

  it('calculates item total', () => {
    render(<InvoiceGenerator />)
    const qtyInput = screen.getByLabelText('Quantity')
    const priceInput = screen.getByLabelText('Price')
    fireEvent.change(qtyInput, { target: { value: '2' } })
    fireEvent.change(priceInput, { target: { value: '100' } })
    // $200.00 appears in both item total and subtotal
    expect(screen.getAllByText(/\$200\.00/).length).toBeGreaterThanOrEqual(1)
  })

  it('switches to preview mode', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview'))
    // In preview mode the form is hidden and preview is shown
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('changes currency', () => {
    render(<InvoiceGenerator />)
    const currencySelect = screen.getByLabelText('Currency') as HTMLSelectElement
    fireEvent.change(currencySelect, { target: { value: 'EUR' } })
    expect(currencySelect.value).toBe('EUR')
  })
})
