interface ChatMessage {
  role: 'system' | 'user'
  content: string
}

interface AIProvider {
  name: string
  baseUrl: string
  apiKey: string
  model: string
}

/** Total timeout budget across all providers — must fit within Vercel's 10s limit.
 *  Using 8s here leaves 2s buffer for Vercel's own overhead and network latency. */
const TOTAL_TIMEOUT_MS = 8000
/** Maximum time (ms) per single provider — ensures fallback chain completes in time.
 *  Reduced from 4000ms to 3000ms to guarantee completion with network overhead. */
const MAX_PROVIDER_TIMEOUT_MS = 3000
/** Minimum time (ms) to allocate to a provider — below this it's not worth trying.
 *  Increased from 500ms to 800ms to skip providers if we can't give them a fair chance. */
const MIN_PROVIDER_TIMEOUT_MS = 800

function getProviders(): AIProvider[] {
  const providers: AIProvider[] = []

  // Primary: Groq (free tier)
  if (process.env.GROQ_API_KEY) {
    providers.push({
      name: 'Groq',
      baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
      apiKey: process.env.GROQ_API_KEY,
      model: 'llama-3.3-70b-versatile',
    })
  }

  // Fallback: Google Gemini (free tier)
  if (process.env.GEMINI_API_KEY) {
    providers.push({
      name: 'Gemini',
      baseUrl: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`,
      apiKey: process.env.GEMINI_API_KEY,
      model: 'gemini-2.0-flash',
    })
  }

  // Last resort: OpenAI (paid)
  if (process.env.OPENAI_API_KEY) {
    providers.push({
      name: 'OpenAI',
      baseUrl: 'https://api.openai.com/v1/chat/completions',
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o-mini',
    })
  }

  return providers
}

async function callProvider(
  provider: AIProvider,
  messages: ChatMessage[],
  maxTokens: number,
  temperature: number,
  timeoutMs: number
): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(provider.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${provider.apiKey}`,
      },
      body: JSON.stringify({
        model: provider.model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(
        `${provider.name} error: ${err.error?.message || res.status}`
      )
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error(`${provider.name} returned empty response`)
    }

    return content
  } finally {
    clearTimeout(timeout)
  }
}

export async function callAI(
  messages: ChatMessage[],
  maxTokens = 1024,
  temperature = 0.7
): Promise<string> {
  const providers = getProviders()

  if (providers.length === 0) {
    throw new Error('No AI provider configured. Set GROQ_API_KEY or GEMINI_API_KEY.')
  }

  const startTime = Date.now()

  // Try each provider in order, respecting the total timeout budget
  for (let i = 0; i < providers.length; i++) {
    const elapsed = Date.now() - startTime
    const remaining = TOTAL_TIMEOUT_MS - elapsed

    // Not enough budget left — skip remaining providers
    if (remaining < MIN_PROVIDER_TIMEOUT_MS) {
      throw new Error(
        `AI providers unavailable: request timed out after ${elapsed}ms. Please try again.`
      )
    }

    // Divide remaining time: give current provider its share, reserve some for fallbacks
    const providersLeft = providers.length - i
    const providerTimeout = Math.max(
      MIN_PROVIDER_TIMEOUT_MS,
      Math.floor(remaining / providersLeft)
    )
    // Cap at both MAX_PROVIDER_TIMEOUT_MS and remaining budget
    const timeoutMs = Math.min(providerTimeout, MAX_PROVIDER_TIMEOUT_MS, remaining)

    try {
      const result = await callProvider(providers[i], messages, maxTokens, temperature, timeoutMs)

      if (i > 0) {
        console.warn(
          `AI fallback: ${providers[0].name} failed, succeeded with ${providers[i].name}`
        )
      }

      return result
    } catch (error) {
      const isTimeout = error instanceof DOMException && error.name === 'AbortError'
      const providerName = providers[i].name

      if (isTimeout) {
        console.warn(`${providerName} timed out after ${timeoutMs}ms (${elapsed + timeoutMs}ms total)`)
      } else {
        console.warn(`${providerName} failed: ${error instanceof Error ? error.message : String(error)}`)
      }

      const isLast = i === providers.length - 1
      if (isLast) {
        throw new Error(
          'All AI providers are currently unavailable. Please try again in a moment.'
        )
      }
      // Continue to next provider
    }
  }

  throw new Error('All AI providers are currently unavailable. Please try again in a moment.')
}
