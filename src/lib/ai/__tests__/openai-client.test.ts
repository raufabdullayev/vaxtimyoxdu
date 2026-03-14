import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// We need to mock fetch globally since callProvider uses it directly
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('openai-client', () => {
  beforeEach(() => {
    vi.resetModules()
    mockFetch.mockReset()
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    // Clear all AI provider env vars by default
    delete process.env.GROQ_API_KEY
    delete process.env.GEMINI_API_KEY
    delete process.env.OPENAI_API_KEY
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  async function getCallAI() {
    const mod = await import('@/lib/ai/openai-client')
    return mod.callAI
  }

  function mockSuccessResponse(content: string) {
    return {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content } }],
      }),
    }
  }

  function mockErrorResponse(status: number, message?: string) {
    return {
      ok: false,
      status,
      json: vi.fn().mockResolvedValue({
        error: { message: message || `Error ${status}` },
      }),
    }
  }

  // ---- Exports ----

  it('exports a callAI function', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    const callAI = await getCallAI()
    expect(typeof callAI).toBe('function')
  })

  // ---- No providers configured ----

  it('throws when no AI provider API keys are configured', async () => {
    const callAI = await getCallAI()

    await expect(
      callAI([{ role: 'user', content: 'Hello' }])
    ).rejects.toThrow('No AI provider configured')
  })

  // ---- Provider fallback order ----

  it('uses Groq as the primary provider when GROQ_API_KEY is set', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    mockFetch.mockResolvedValueOnce(mockSuccessResponse('Groq response'))

    const callAI = await getCallAI()
    const result = await callAI([{ role: 'user', content: 'Hello' }])

    expect(result).toBe('Groq response')
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.groq.com/openai/v1/chat/completions'
    )
  })

  it('falls back to Gemini when Groq fails', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    process.env.GEMINI_API_KEY = 'test-gemini-key'

    mockFetch
      .mockResolvedValueOnce(mockErrorResponse(500, 'Groq is down'))
      .mockResolvedValueOnce(mockSuccessResponse('Gemini response'))

    const callAI = await getCallAI()
    const result = await callAI([{ role: 'user', content: 'Hello' }])

    expect(result).toBe('Gemini response')
    expect(mockFetch).toHaveBeenCalledTimes(2)
    // First call to Groq
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.groq.com/openai/v1/chat/completions'
    )
    // Second call to Gemini
    expect(mockFetch.mock.calls[1][0]).toContain(
      'generativelanguage.googleapis.com'
    )
  })

  it('falls back to OpenAI when both Groq and Gemini fail', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    process.env.GEMINI_API_KEY = 'test-gemini-key'
    process.env.OPENAI_API_KEY = 'test-openai-key'

    mockFetch
      .mockResolvedValueOnce(mockErrorResponse(500, 'Groq is down'))
      .mockResolvedValueOnce(mockErrorResponse(503, 'Gemini is down'))
      .mockResolvedValueOnce(mockSuccessResponse('OpenAI response'))

    const callAI = await getCallAI()
    const result = await callAI([{ role: 'user', content: 'Hello' }])

    expect(result).toBe('OpenAI response')
    expect(mockFetch).toHaveBeenCalledTimes(3)
    expect(mockFetch.mock.calls[2][0]).toBe(
      'https://api.openai.com/v1/chat/completions'
    )
  })

  it('throws when all configured providers fail', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    process.env.GEMINI_API_KEY = 'test-gemini-key'

    mockFetch
      .mockResolvedValueOnce(mockErrorResponse(500, 'Groq is down'))
      .mockResolvedValueOnce(mockErrorResponse(503, 'Gemini is down'))

    const callAI = await getCallAI()

    await expect(
      callAI([{ role: 'user', content: 'Hello' }])
    ).rejects.toThrow()
  })

  // ---- Timeout configuration ----

  it('passes an AbortSignal for timeout control', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    mockFetch.mockResolvedValueOnce(mockSuccessResponse('result'))

    const callAI = await getCallAI()
    await callAI([{ role: 'user', content: 'Hello' }])

    const fetchOptions = mockFetch.mock.calls[0][1]
    expect(fetchOptions.signal).toBeDefined()
    expect(fetchOptions.signal).toBeInstanceOf(AbortSignal)
  })

  // ---- Request structure ----

  it('sends Authorization header with Bearer token', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    mockFetch.mockResolvedValueOnce(mockSuccessResponse('result'))

    const callAI = await getCallAI()
    await callAI([{ role: 'user', content: 'Hello' }])

    const fetchOptions = mockFetch.mock.calls[0][1]
    expect(fetchOptions.headers.Authorization).toBe('Bearer test-groq-key')
    expect(fetchOptions.headers['Content-Type']).toBe('application/json')
  })

  it('sends the correct model and messages in the request body', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    mockFetch.mockResolvedValueOnce(mockSuccessResponse('result'))

    const messages = [
      { role: 'system' as const, content: 'You are helpful' },
      { role: 'user' as const, content: 'Hello' },
    ]
    const callAI = await getCallAI()
    await callAI(messages, 512)

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.model).toBe('llama-3.3-70b-versatile')
    expect(body.messages).toEqual(messages)
    expect(body.max_tokens).toBe(512)
    expect(body.temperature).toBe(0.7)
  })

  it('uses default max_tokens of 1024 when not specified', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    mockFetch.mockResolvedValueOnce(mockSuccessResponse('result'))

    const callAI = await getCallAI()
    await callAI([{ role: 'user', content: 'Hello' }])

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.max_tokens).toBe(1024)
  })

  // ---- Empty response handling ----

  it('throws when the provider returns an empty response (no content)', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: '' } }],
      }),
    })

    const callAI = await getCallAI()

    await expect(
      callAI([{ role: 'user', content: 'Hello' }])
    ).rejects.toThrow('All AI providers are currently unavailable')
  })

  it('throws when the provider returns no choices', async () => {
    process.env.GROQ_API_KEY = 'test-groq-key'
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ choices: [] }),
    })

    const callAI = await getCallAI()

    await expect(
      callAI([{ role: 'user', content: 'Hello' }])
    ).rejects.toThrow()
  })

  // ---- Only providers with keys are tried ----

  it('only uses Gemini if only GEMINI_API_KEY is set', async () => {
    process.env.GEMINI_API_KEY = 'test-gemini-key'
    mockFetch.mockResolvedValueOnce(mockSuccessResponse('Gemini result'))

    const callAI = await getCallAI()
    const result = await callAI([{ role: 'user', content: 'Hello' }])

    expect(result).toBe('Gemini result')
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch.mock.calls[0][0]).toContain(
      'generativelanguage.googleapis.com'
    )
  })

  it('only uses OpenAI if only OPENAI_API_KEY is set', async () => {
    process.env.OPENAI_API_KEY = 'test-openai-key'
    mockFetch.mockResolvedValueOnce(mockSuccessResponse('OpenAI result'))

    const callAI = await getCallAI()
    const result = await callAI([{ role: 'user', content: 'Hello' }])

    expect(result).toBe('OpenAI result')
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.openai.com/v1/chat/completions'
    )
  })
})
