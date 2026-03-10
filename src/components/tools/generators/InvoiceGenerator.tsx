'use client'

import { useState, useRef, useCallback } from 'react'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
}

interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  fromCompany: string
  fromAddress: string
  fromEmail: string
  toCompany: string
  toAddress: string
  toEmail: string
  items: InvoiceItem[]
  taxRate: number
  notes: string
  currency: string
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '\u20AC',
    GBP: '\u00A3',
    AZN: '\u20BC',
    TRY: '\u20BA',
    JPY: '\u00A5',
    CAD: 'C$',
    AUD: 'A$',
  }
  const symbol = symbols[currency] || currency + ' '
  return `${symbol}${amount.toFixed(2)}`
}

const defaultItem: () => InvoiceItem = () => ({
  id: generateId(),
  description: '',
  quantity: 1,
  price: 0,
})

const defaultInvoice: InvoiceData = {
  invoiceNumber: 'INV-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  fromCompany: '',
  fromAddress: '',
  fromEmail: '',
  toCompany: '',
  toAddress: '',
  toEmail: '',
  items: [defaultItem()],
  taxRate: 0,
  notes: '',
  currency: 'USD',
}

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoice)
  const [showPreview, setShowPreview] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const taxAmount = subtotal * (invoice.taxRate / 100)
  const total = subtotal + taxAmount

  const updateField = useCallback(
    <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
      setInvoice((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const updateItem = useCallback(
    (id: string, field: keyof InvoiceItem, value: string | number) => {
      setInvoice((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }))
    },
    []
  )

  const addItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, defaultItem()],
    }))
  }, [])

  const removeItem = useCallback(
    (id: string) => {
      if (invoice.items.length <= 1) return
      setInvoice((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }))
    },
    [invoice.items.length]
  )

  const handlePrint = () => {
    setShowPreview(true)
    setTimeout(() => {
      window.print()
    }, 300)
  }

  const inputClass =
    'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
  const labelClass = 'block text-sm font-medium mb-1'

  const currencies = ['USD', 'EUR', 'GBP', 'AZN', 'TRY', 'JPY', 'CAD', 'AUD']

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-print, #invoice-print * { visibility: visible; }
          #invoice-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white;
            color: black;
          }
        }
      `}</style>

      <div className="space-y-6">
        {/* Toggle between form and preview */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(false)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              !showPreview
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              showPreview
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            Preview
          </button>
        </div>

        {!showPreview ? (
          /* FORM */
          <div className="space-y-6">
            {/* Invoice details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Invoice Number</label>
                <input
                  type="text"
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateField('invoiceNumber', e.target.value)}
                  className={inputClass}
                  aria-label="Invoice number"
                />
              </div>
              <div>
                <label className={labelClass}>Invoice Date</label>
                <input
                  type="date"
                  value={invoice.invoiceDate}
                  onChange={(e) => updateField('invoiceDate', e.target.value)}
                  className={inputClass}
                  aria-label="Invoice date"
                />
              </div>
              <div>
                <label className={labelClass}>Due Date</label>
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => updateField('dueDate', e.target.value)}
                  className={inputClass}
                  aria-label="Due date"
                />
              </div>
            </div>

            {/* Currency */}
            <div className="max-w-xs">
              <label className={labelClass}>Currency</label>
              <select
                value={invoice.currency}
                onChange={(e) => updateField('currency', e.target.value)}
                className={inputClass}
                aria-label="Currency"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* From / To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">From (Your Company)</h3>
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input
                    type="text"
                    value={invoice.fromCompany}
                    onChange={(e) => updateField('fromCompany', e.target.value)}
                    placeholder="Your Company Name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <textarea
                    value={invoice.fromAddress}
                    onChange={(e) => updateField('fromAddress', e.target.value)}
                    placeholder="Street, City, Country"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={invoice.fromEmail}
                    onChange={(e) => updateField('fromEmail', e.target.value)}
                    placeholder="email@company.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">To (Client)</h3>
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input
                    type="text"
                    value={invoice.toCompany}
                    onChange={(e) => updateField('toCompany', e.target.value)}
                    placeholder="Client Company Name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <textarea
                    value={invoice.toAddress}
                    onChange={(e) => updateField('toAddress', e.target.value)}
                    placeholder="Street, City, Country"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={invoice.toEmail}
                    onChange={(e) => updateField('toEmail', e.target.value)}
                    placeholder="client@company.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Items</h3>
              <div className="space-y-3">
                {/* Header (hidden on mobile) */}
                <div className="hidden sm:grid sm:grid-cols-[1fr_80px_100px_100px_40px] gap-2 text-xs font-medium text-muted-foreground px-1">
                  <span>Description</span>
                  <span>Qty</span>
                  <span>Price</span>
                  <span>Total</span>
                  <span></span>
                </div>

                {invoice.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_80px_100px_100px_40px] gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, 'description', e.target.value)
                      }
                      placeholder="Item description"
                      className={inputClass}
                      aria-label="Item description"
                    />
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, 'quantity', Math.max(1, Number(e.target.value)))
                      }
                      className={inputClass}
                      aria-label="Quantity"
                    />
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(item.id, 'price', Math.max(0, Number(e.target.value)))
                      }
                      className={inputClass}
                      aria-label="Price"
                    />
                    <div className="px-3 py-2 text-sm font-mono bg-muted/50 rounded-lg text-right">
                      {formatCurrency(item.quantity * item.price, invoice.currency)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={invoice.items.length <= 1}
                      className="p-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-30"
                      aria-label="Remove item"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="mt-3 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
              >
                + Add Item
              </button>
            </div>

            {/* Tax */}
            <div className="max-w-xs">
              <label className={labelClass}>Tax Rate (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                step="0.1"
                value={invoice.taxRate}
                onChange={(e) =>
                  updateField('taxRate', Math.max(0, Math.min(100, Number(e.target.value))))
                }
                className={inputClass}
                aria-label="Tax rate percentage"
              />
            </div>

            {/* Notes */}
            <div>
              <label className={labelClass}>Notes (optional)</label>
              <textarea
                value={invoice.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Payment terms, thank you note, etc."
                rows={3}
                className={inputClass}
              />
            </div>

            {/* Summary */}
            <div className="rounded-lg border p-4 space-y-2 max-w-sm ml-auto">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-mono">{formatCurrency(subtotal, invoice.currency)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Tax ({invoice.taxRate}%)</span>
                  <span className="font-mono">{formatCurrency(taxAmount, invoice.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold border-t pt-2">
                <span>Total</span>
                <span className="font-mono">{formatCurrency(total, invoice.currency)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Preview Invoice
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        ) : (
          /* PREVIEW */
          <div>
            <div
              id="invoice-print"
              ref={printRef}
              className="rounded-lg border bg-white dark:bg-gray-950 p-6 sm:p-8 max-w-3xl mx-auto"
              style={{ color: '#111' }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#111' }}>INVOICE</h2>
                  <p className="text-sm mt-1" style={{ color: '#666' }}>
                    #{invoice.invoiceNumber}
                  </p>
                </div>
                <div className="text-sm text-right" style={{ color: '#666' }}>
                  <p>Date: {invoice.invoiceDate}</p>
                  <p>Due: {invoice.dueDate}</p>
                </div>
              </div>

              {/* From / To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase mb-1" style={{ color: '#999' }}>
                    From
                  </p>
                  <p className="font-semibold text-sm" style={{ color: '#111' }}>
                    {invoice.fromCompany || 'Your Company'}
                  </p>
                  <p className="text-sm whitespace-pre-line" style={{ color: '#666' }}>
                    {invoice.fromAddress}
                  </p>
                  {invoice.fromEmail && (
                    <p className="text-sm" style={{ color: '#666' }}>
                      {invoice.fromEmail}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase mb-1" style={{ color: '#999' }}>
                    Bill To
                  </p>
                  <p className="font-semibold text-sm" style={{ color: '#111' }}>
                    {invoice.toCompany || 'Client Company'}
                  </p>
                  <p className="text-sm whitespace-pre-line" style={{ color: '#666' }}>
                    {invoice.toAddress}
                  </p>
                  {invoice.toEmail && (
                    <p className="text-sm" style={{ color: '#666' }}>
                      {invoice.toEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Items table */}
              <table className="w-full text-sm mb-6" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th className="text-left py-2 font-semibold" style={{ color: '#111' }}>Description</th>
                    <th className="text-right py-2 font-semibold" style={{ color: '#111', width: '60px' }}>Qty</th>
                    <th className="text-right py-2 font-semibold" style={{ color: '#111', width: '90px' }}>Price</th>
                    <th className="text-right py-2 font-semibold" style={{ color: '#111', width: '90px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td className="py-2" style={{ color: '#333' }}>
                        {item.description || 'Untitled item'}
                      </td>
                      <td className="py-2 text-right font-mono" style={{ color: '#333' }}>
                        {item.quantity}
                      </td>
                      <td className="py-2 text-right font-mono" style={{ color: '#333' }}>
                        {formatCurrency(item.price, invoice.currency)}
                      </td>
                      <td className="py-2 text-right font-mono" style={{ color: '#333' }}>
                        {formatCurrency(item.quantity * item.price, invoice.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1 text-sm">
                  <div className="flex justify-between" style={{ color: '#666' }}>
                    <span>Subtotal</span>
                    <span className="font-mono">
                      {formatCurrency(subtotal, invoice.currency)}
                    </span>
                  </div>
                  {invoice.taxRate > 0 && (
                    <div className="flex justify-between" style={{ color: '#666' }}>
                      <span>Tax ({invoice.taxRate}%)</span>
                      <span className="font-mono">
                        {formatCurrency(taxAmount, invoice.currency)}
                      </span>
                    </div>
                  )}
                  <div
                    className="flex justify-between font-bold pt-2"
                    style={{ borderTop: '2px solid #e5e7eb', color: '#111' }}
                  >
                    <span>Total</span>
                    <span className="font-mono">
                      {formatCurrency(total, invoice.currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="mt-8 pt-4" style={{ borderTop: '1px solid #f3f4f6' }}>
                  <p className="text-xs font-semibold uppercase mb-1" style={{ color: '#999' }}>
                    Notes
                  </p>
                  <p className="text-sm whitespace-pre-line" style={{ color: '#666' }}>
                    {invoice.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4 justify-center print:hidden">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Back to Edit
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
