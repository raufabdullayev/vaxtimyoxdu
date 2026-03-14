import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

const { mockCaptureException, mockAddBreadcrumb } = vi.hoisted(() => ({
  mockCaptureException: vi.fn(),
  mockAddBreadcrumb: vi.fn(),
}))
vi.mock('@sentry/nextjs', () => ({
  captureException: mockCaptureException,
  addBreadcrumb: mockAddBreadcrumb,
}))

import { withErrorTracking, addBreadcrumb } from '../api-handler'

function createRequest(method = 'POST', path = '/api/test'): NextRequest {
  return new NextRequest(`http://localhost:3000${path}`, { method })
}

describe('withErrorTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('passes request through to handler on success', async () => {
    const handler = vi.fn().mockResolvedValue(
      NextResponse.json({ ok: true }, { status: 200 })
    )
    const wrapped = withErrorTracking(handler)

    const req = createRequest()
    const response = await wrapped(req)
    const data = await response.json()

    expect(handler).toHaveBeenCalledWith(req)
    expect(data.ok).toBe(true)
    expect(response.status).toBe(200)
    expect(mockCaptureException).not.toHaveBeenCalled()
  })

  it('catches errors and returns 500', async () => {
    const handler = vi.fn().mockRejectedValue(new Error('db connection failed'))
    const wrapped = withErrorTracking(handler)

    const response = await wrapped(createRequest())
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
  })

  it('sends error to Sentry with request context', async () => {
    const err = new Error('something broke')
    const handler = vi.fn().mockRejectedValue(err)
    const wrapped = withErrorTracking(handler)

    await wrapped(createRequest('GET', '/api/health'))

    expect(mockCaptureException).toHaveBeenCalledWith(err, {
      tags: {
        component: 'api-route',
        method: 'GET',
        url: expect.stringContaining('/api/health'),
      },
      level: 'error',
    })
  })

  it('handles non-Error thrown values', async () => {
    const handler = vi.fn().mockRejectedValue('string error')
    const wrapped = withErrorTracking(handler)

    const response = await wrapped(createRequest())
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error')
    expect(mockCaptureException).toHaveBeenCalledWith(
      'string error',
      expect.any(Object)
    )
  })

  it('logs the error to console.error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const handler = vi.fn().mockRejectedValue(new Error('test error'))
    const wrapped = withErrorTracking(handler)

    await wrapped(createRequest('POST', '/api/newsletter'))

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('/api/newsletter'),
      'test error'
    )
  })
})

describe('addBreadcrumb', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls Sentry.addBreadcrumb with correct params', () => {
    addBreadcrumb('user subscribed', { email: 'test@example.com' })

    expect(mockAddBreadcrumb).toHaveBeenCalledWith({
      category: 'api',
      message: 'user subscribed',
      level: 'info',
      data: { email: 'test@example.com' },
    })
  })

  it('works without data parameter', () => {
    addBreadcrumb('request started')

    expect(mockAddBreadcrumb).toHaveBeenCalledWith({
      category: 'api',
      message: 'request started',
      level: 'info',
      data: undefined,
    })
  })
})
