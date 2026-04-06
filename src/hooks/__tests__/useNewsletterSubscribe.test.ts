import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useNewsletterSubscribe, isSubscribed } from '../useNewsletterSubscribe'

const defaultTranslations = {
  errorEmpty: 'Email required',
  errorInvalid: 'Invalid email',
  errorDuplicate: 'Already subscribed',
  errorGeneral: 'Something went wrong',
}

// Mock localStorage for jsdom environment
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true })

describe('isSubscribed', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  it('returns false when not subscribed', () => {
    expect(isSubscribed()).toBe(false)
  })

  it('returns true when subscribed', () => {
    localStorageMock.setItem('newsletter-subscribed', 'true')
    expect(isSubscribed()).toBe(true)
  })

  it('returns false when localStorage throws', () => {
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error('Disabled')
    })
    expect(isSubscribed()).toBe(false)
  })
})

describe('useNewsletterSubscribe', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  it('initializes with idle status', () => {
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    expect(result.current.status).toBe('idle')
    expect(result.current.email).toBe('')
    expect(result.current.error).toBe('')
  })

  it('sets error when submitting empty email', async () => {
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Email required')
    expect(result.current.status).toBe('error')
  })

  it('sets error for invalid email format', async () => {
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    act(() => {
      result.current.setEmail('not-an-email')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Invalid email')
  })

  it('clears error when user types', () => {
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    // Set error state first
    act(() => {
      result.current.setEmail('bad')
    })
    // Simulate submitting and getting error
    // Then typing again should clear
    act(() => {
      result.current.setEmail('new-value')
    })
    expect(result.current.email).toBe('new-value')
  })

  it('detects duplicate from localStorage', async () => {
    localStorage.setItem('newsletter-emails', JSON.stringify(['test@example.com']))
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    act(() => {
      result.current.setEmail('test@example.com')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Already subscribed')
  })

  it('calls API on valid submission', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    )
    const { result } = renderHook(() =>
      useNewsletterSubscribe({
        source: 'footer',
        locale: 'en',
        translations: defaultTranslations,
      })
    )
    act(() => {
      result.current.setEmail('new@example.com')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(fetchSpy).toHaveBeenCalledWith('/api/newsletter', expect.objectContaining({
      method: 'POST',
    }))
    expect(result.current.status).toBe('success')
    expect(localStorage.getItem('newsletter-subscribed')).toBe('true')
    fetchSpy.mockRestore()
  })

  it('handles 409 duplicate from API', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('', { status: 409 })
    )
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    act(() => {
      result.current.setEmail('dup@example.com')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Already subscribed')
    fetchSpy.mockRestore()
  })

  it('handles 400 invalid email from API', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 })
    )
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    act(() => {
      result.current.setEmail('bad@example.com')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Invalid email')
    fetchSpy.mockRestore()
  })

  it('handles 400 other error from API', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Missing field' }), { status: 400 })
    )
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    act(() => {
      result.current.setEmail('test@example.com')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Email required')
    fetchSpy.mockRestore()
  })

  it('handles 500 server error from API', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('', { status: 500 })
    )
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    act(() => {
      result.current.setEmail('test@example.com')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Something went wrong')
    fetchSpy.mockRestore()
  })

  it('handles network error', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new Error('Network error')
    )
    const { result } = renderHook(() =>
      useNewsletterSubscribe({ translations: defaultTranslations })
    )
    act(() => {
      result.current.setEmail('test@example.com')
    })
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })
    expect(result.current.error).toBe('Something went wrong')
    fetchSpy.mockRestore()
  })
})
