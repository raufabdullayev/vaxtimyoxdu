import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HttpHeaderParser from '../HttpHeaderParser'

describe('HttpHeaderParser - Deep Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const typeAndParse = (headers: string) => {
    render(<HttpHeaderParser />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: headers } })
    fireEvent.click(screen.getByText('Parse Headers'))
  }

  it('renders textarea and parse button', () => {
    render(<HttpHeaderParser />)
    expect(document.querySelector('textarea')).toBeInTheDocument()
    expect(screen.getByText('Parse Headers')).toBeInTheDocument()
  })

  it('parse button is disabled when input is empty', () => {
    render(<HttpHeaderParser />)
    expect(screen.getByText('Parse Headers')).toBeDisabled()
  })

  it('parses Content-Type header as Content category', () => {
    typeAndParse('Content-Type: application/json')
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Content-Type')).toBeInTheDocument()
    expect(screen.getByText('application/json')).toBeInTheDocument()
  })

  it('parses Cache-Control header as Caching category', () => {
    typeAndParse('Cache-Control: max-age=3600')
    expect(screen.getByText('Caching')).toBeInTheDocument()
    expect(screen.getByText('Cache-Control')).toBeInTheDocument()
  })

  it('parses Authorization header as Auth category', () => {
    typeAndParse('Authorization: Bearer token123')
    expect(screen.getByText('Auth')).toBeInTheDocument()
    expect(screen.getByText('Authorization')).toBeInTheDocument()
  })

  it('parses CORS headers', () => {
    typeAndParse('Access-Control-Allow-Origin: *')
    expect(screen.getByText('CORS')).toBeInTheDocument()
  })

  it('parses Security headers', () => {
    typeAndParse('X-Frame-Options: DENY')
    expect(screen.getByText('Security')).toBeInTheDocument()
    expect(screen.getByText('DENY')).toBeInTheDocument()
  })

  it('parses General headers', () => {
    typeAndParse('Server: nginx/1.24.0')
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('nginx/1.24.0')).toBeInTheDocument()
  })

  it('parses Request headers', () => {
    typeAndParse('User-Agent: Mozilla/5.0')
    expect(screen.getByText('Request')).toBeInTheDocument()
  })

  it('categorizes unknown headers as Other', () => {
    typeAndParse('X-Custom-Header: custom-value')
    expect(screen.getByText('Other')).toBeInTheDocument()
  })

  it('parses multiple headers', () => {
    typeAndParse('Content-Type: text/html\nCache-Control: no-cache\nServer: Apache')
    expect(screen.getByText('3 headers found')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Caching')).toBeInTheDocument()
    expect(screen.getByText('General')).toBeInTheDocument()
  })

  it('loads sample headers', () => {
    render(<HttpHeaderParser />)
    fireEvent.click(screen.getByText('loadSample'))

    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    expect(textarea.value).toContain('Content-Type')
    expect(textarea.value).toContain('Cache-Control')
  })

  it('shows parsed headers after loading sample', () => {
    render(<HttpHeaderParser />)
    fireEvent.click(screen.getByText('loadSample'))
    expect(screen.getByText('10 headers found')).toBeInTheDocument()
  })

  it('ignores empty lines', () => {
    typeAndParse('Content-Type: text/html\n\n\nServer: nginx')
    expect(screen.getByText('2 headers found')).toBeInTheDocument()
  })

  it('handles header with multiple colons in value', () => {
    typeAndParse('Content-Security-Policy: default-src: self')
    expect(screen.getByText('Content-Security-Policy')).toBeInTheDocument()
    expect(screen.getByText("default-src: self")).toBeInTheDocument()
  })

  it('shows header count', () => {
    typeAndParse('Content-Type: text/html')
    expect(screen.getByText('1 headers found')).toBeInTheDocument()
  })

  it('parses ETag as Caching', () => {
    typeAndParse('ETag: "abc123"')
    expect(screen.getByText('Caching')).toBeInTheDocument()
  })

  it('parses Set-Cookie as Auth', () => {
    typeAndParse('Set-Cookie: session=abc123; Path=/')
    expect(screen.getByText('Auth')).toBeInTheDocument()
  })

  it('parses Strict-Transport-Security as Security', () => {
    typeAndParse('Strict-Transport-Security: max-age=31536000')
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('parses Referrer-Policy as Security', () => {
    typeAndParse('Referrer-Policy: no-referrer')
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('parses Accept-Language as Request', () => {
    typeAndParse('Accept-Language: en-US,en;q=0.9')
    expect(screen.getByText('Request')).toBeInTheDocument()
  })
})
