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

const PROVIDER_TIMEOUT_MS = 8000

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
  maxTokens: number
): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS)

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
        temperature: 0.7,
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
  maxTokens = 1024
): Promise<string> {
  const providers = getProviders()

  if (providers.length === 0) {
    throw new Error('No AI provider configured. Set GROQ_API_KEY or GEMINI_API_KEY.')
  }

  // Try each provider in order, fallback on failure
  for (let i = 0; i < providers.length; i++) {
    try {
      const result = await callProvider(providers[i], messages, maxTokens)

      if (i > 0) {
        console.warn(
          `AI fallback: ${providers[0].name} failed, succeeded with ${providers[i].name}`
        )
      }

      return result
    } catch (error) {
      const isLast = i === providers.length - 1
      if (isLast) throw error
      // Continue to next provider
    }
  }

  throw new Error('All AI providers failed')
}
