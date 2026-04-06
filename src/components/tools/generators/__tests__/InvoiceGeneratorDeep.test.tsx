import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InvoiceGenerator from '../InvoiceGenerator'

describe('InvoiceGenerator - Deep Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(window, 'print').mockImplementation(() => {})
    vi.useFakeTimers()
  })

  // --- Preview mode tests ---
  it('shows preview content when Preview is clicked', () => {
    render(<InvoiceGenerator />)

    // Fill in some data first
    fireEvent.change(screen.getByLabelText('Invoice number'), {
      target: { value: 'INV-100' },
    })
    fireEvent.click(screen.getByText('Preview'))

    expect(screen.getByText('INVOICE')).toBeInTheDocument()
    expect(screen.getByText(/#INV-100/)).toBeInTheDocument()
  })

  it('shows From and Bill To sections in preview', () => {
    render(<InvoiceGenerator />)

    // Set from company
    const fromInputs = screen.getAllByPlaceholderText('Your Company Name')
    fireEvent.change(fromInputs[0], { target: { value: 'My Corp' } })

    const toInputs = screen.getAllByPlaceholderText('Client Company Name')
    fireEvent.change(toInputs[0], { target: { value: 'Client Inc' } })

    fireEvent.click(screen.getByText('Preview'))

    expect(screen.getByText('My Corp')).toBeInTheDocument()
    expect(screen.getByText('Client Inc')).toBeInTheDocument()
    expect(screen.getByText('From')).toBeInTheDocument()
    expect(screen.getByText('Bill To')).toBeInTheDocument()
  })

  it('shows default company names in preview when fields are empty', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview'))

    expect(screen.getByText('Your Company')).toBeInTheDocument()
    expect(screen.getByText('Client Company')).toBeInTheDocument()
  })

  it('shows email in preview when provided', () => {
    render(<InvoiceGenerator />)

    const emailInputs = screen.getAllByPlaceholderText('email@company.com')
    fireEvent.change(emailInputs[0], {
      target: { value: 'me@corp.com' },
    })

    fireEvent.click(screen.getByText('Preview'))
    expect(screen.getByText('me@corp.com')).toBeInTheDocument()
  })

  it('shows notes in preview when provided', () => {
    render(<InvoiceGenerator />)

    fireEvent.change(screen.getByPlaceholderText(/Payment terms/), {
      target: { value: 'Payment due within 30 days' },
    })

    fireEvent.click(screen.getByText('Preview'))
    expect(screen.getByText('Payment due within 30 days')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
  })

  it('hides notes section in preview when notes are empty', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview'))
    expect(screen.queryByText('Notes')).not.toBeInTheDocument()
  })

  it('shows Untitled item in preview for empty descriptions', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview'))
    expect(screen.getByText('Untitled item')).toBeInTheDocument()
  })

  it('shows Back to Edit button in preview', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview'))
    expect(screen.getByText('Back to Edit')).toBeInTheDocument()
  })

  it('returns to edit mode when Back to Edit is clicked', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview'))
    fireEvent.click(screen.getByText('Back to Edit'))
    expect(screen.getByText('Items')).toBeInTheDocument()
    expect(screen.getByText('+ Add Item')).toBeInTheDocument()
  })

  // --- Item management ---
  it('cannot remove the last item', () => {
    render(<InvoiceGenerator />)
    const removeBtn = screen.getByLabelText('Remove item')
    expect(removeBtn).toBeDisabled()
  })

  it('can remove an item when there are multiple', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('+ Add Item'))

    const removeBtns = screen.getAllByLabelText('Remove item')
    expect(removeBtns.length).toBe(2)

    fireEvent.click(removeBtns[0])

    const remainingRemoveBtns = screen.getAllByLabelText('Remove item')
    expect(remainingRemoveBtns.length).toBe(1)
  })

  it('updates item quantity', () => {
    render(<InvoiceGenerator />)
    const qtyInput = screen.getByLabelText('Quantity') as HTMLInputElement
    fireEvent.change(qtyInput, { target: { value: '5' } })
    expect(qtyInput.value).toBe('5')
  })

  it('updates item price', () => {
    render(<InvoiceGenerator />)
    const priceInput = screen.getByLabelText('Price') as HTMLInputElement
    fireEvent.change(priceInput, { target: { value: '50.00' } })
    expect(priceInput.value).toBe('50.00')
  })

  // --- Tax calculations ---
  it('shows tax row when tax rate is set', () => {
    render(<InvoiceGenerator />)
    const taxInput = screen.getByLabelText('Tax rate percentage')
    fireEvent.change(taxInput, { target: { value: '10' } })

    const priceInput = screen.getByLabelText('Price')
    fireEvent.change(priceInput, { target: { value: '100' } })

    // Tax line should show "Tax (10%)"
    expect(screen.getByText('Tax (10%)')).toBeInTheDocument()
    expect(screen.getAllByText(/\$10\.00/).length).toBeGreaterThanOrEqual(1)
  })

  it('hides tax row when tax rate is 0', () => {
    render(<InvoiceGenerator />)
    expect(screen.queryByText(/Tax \(/)).not.toBeInTheDocument()
  })

  it('calculates total with tax correctly', () => {
    render(<InvoiceGenerator />)
    const qtyInput = screen.getByLabelText('Quantity')
    const priceInput = screen.getByLabelText('Price')
    const taxInput = screen.getByLabelText('Tax rate percentage')

    fireEvent.change(qtyInput, { target: { value: '2' } })
    fireEvent.change(priceInput, { target: { value: '100' } })
    fireEvent.change(taxInput, { target: { value: '20' } })

    // Subtotal: $200, Tax: $40, Total: $240
    expect(screen.getAllByText(/\$200\.00/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/\$40\.00/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/\$240\.00/).length).toBeGreaterThanOrEqual(1)
  })

  // --- Currency formatting ---
  it('formats EUR currency with symbol', () => {
    render(<InvoiceGenerator />)
    const currencySelect = screen.getByLabelText('Currency')
    fireEvent.change(currencySelect, { target: { value: 'EUR' } })

    const priceInput = screen.getByLabelText('Price')
    fireEvent.change(priceInput, { target: { value: '100' } })

    // Should show EUR symbol
    expect(screen.getAllByText(/\u20AC100\.00/).length).toBeGreaterThanOrEqual(1)
  })

  it('formats GBP currency with pound symbol', () => {
    render(<InvoiceGenerator />)
    fireEvent.change(screen.getByLabelText('Currency'), {
      target: { value: 'GBP' },
    })
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '50' },
    })
    expect(screen.getAllByText(/\u00A350\.00/).length).toBeGreaterThanOrEqual(1)
  })

  it('formats AZN currency', () => {
    render(<InvoiceGenerator />)
    fireEvent.change(screen.getByLabelText('Currency'), {
      target: { value: 'AZN' },
    })
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '100' },
    })
    expect(screen.getAllByText(/\u20BC100\.00/).length).toBeGreaterThanOrEqual(1)
  })

  // --- Print (Download PDF) ---
  it('calls window.print when Download PDF is clicked', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Download PDF'))

    vi.advanceTimersByTime(400)
    expect(window.print).toHaveBeenCalled()
  })

  it('switches to preview mode before printing', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Download PDF'))

    // After clicking Download PDF, should be in preview mode
    expect(screen.getByText('INVOICE')).toBeInTheDocument()
  })

  // --- Preview Invoice button ---
  it('switches to preview via Preview Invoice button', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview Invoice'))

    expect(screen.getByText('INVOICE')).toBeInTheDocument()
  })

  // --- Preview with tax in preview mode ---
  it('shows tax in preview mode', () => {
    render(<InvoiceGenerator />)

    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '100' },
    })
    fireEvent.change(screen.getByLabelText('Tax rate percentage'), {
      target: { value: '15' },
    })

    fireEvent.click(screen.getByText('Preview'))

    // Preview should show tax row
    expect(screen.getByText('Tax (15%)')).toBeInTheDocument()
  })

  // --- Due date field ---
  it('renders due date field', () => {
    render(<InvoiceGenerator />)
    expect(screen.getByLabelText('Due date')).toBeInTheDocument()
  })

  it('updates due date', () => {
    render(<InvoiceGenerator />)
    const dueDateInput = screen.getByLabelText('Due date') as HTMLInputElement
    fireEvent.change(dueDateInput, { target: { value: '2026-12-31' } })
    expect(dueDateInput.value).toBe('2026-12-31')
  })

  // --- Address fields ---
  it('updates from address', () => {
    render(<InvoiceGenerator />)
    const addressInputs = screen.getAllByPlaceholderText('Street, City, Country')
    fireEvent.change(addressInputs[0], { target: { value: '123 Main St' } })
    expect((addressInputs[0] as HTMLTextAreaElement).value).toBe('123 Main St')
  })

  it('updates to email', () => {
    render(<InvoiceGenerator />)
    const emailInputs = screen.getAllByPlaceholderText('client@company.com')
    fireEvent.change(emailInputs[0], { target: { value: 'client@test.com' } })
    expect((emailInputs[0] as HTMLInputElement).value).toBe('client@test.com')
  })

  // --- Multiple items in preview ---
  it('shows multiple items in preview table', () => {
    render(<InvoiceGenerator />)

    // Fill first item
    fireEvent.change(screen.getByLabelText('Item description'), {
      target: { value: 'Service A' },
    })
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '100' },
    })

    // Add second item
    fireEvent.click(screen.getByText('+ Add Item'))
    const descInputs = screen.getAllByLabelText('Item description')
    fireEvent.change(descInputs[1], { target: { value: 'Service B' } })
    const priceInputs = screen.getAllByLabelText('Price')
    fireEvent.change(priceInputs[1], { target: { value: '200' } })

    fireEvent.click(screen.getByText('Preview'))

    expect(screen.getByText('Service A')).toBeInTheDocument()
    expect(screen.getByText('Service B')).toBeInTheDocument()
  })

  // --- Download PDF from preview ---
  it('prints from preview mode', () => {
    render(<InvoiceGenerator />)
    fireEvent.click(screen.getByText('Preview'))

    const downloadBtns = screen.getAllByText('Download PDF')
    fireEvent.click(downloadBtns[0])
    vi.advanceTimersByTime(400)
    expect(window.print).toHaveBeenCalled()
  })
})
