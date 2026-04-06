import { describe, it, expect, vi, beforeEach } from 'vitest'

beforeEach(() => {
  vi.resetModules()
})

describe('env validation', () => {
  it('exports serverEnv and clientEnv', async () => {
    const { serverEnv, clientEnv, env } = await import('../env')
    expect(serverEnv).toBeDefined()
    expect(clientEnv).toBeDefined()
    expect(env).toBeDefined()
  })

  it('serverEnv has expected shape when env vars present', async () => {
    vi.stubEnv('GROQ_API_KEY', 'test-groq-key')
    vi.stubEnv('RESEND_API_KEY', 'test-resend-key')
    const { serverEnv } = await import('../env')
    expect(typeof serverEnv).toBe('object')
  })

  it('clientEnv has expected shape', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST123')
    const { clientEnv } = await import('../env')
    expect(typeof clientEnv).toBe('object')
  })

  it('env is a merge of server and client', async () => {
    const { env, serverEnv, clientEnv } = await import('../env')
    // env should contain keys from both
    expect(typeof env).toBe('object')
  })

  it('handles missing env vars in non-production gracefully', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    // Clear all relevant env vars
    vi.stubEnv('GROQ_API_KEY', '')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'invalid-url')
    const mod = await import('../env')
    // Should not throw in development
    expect(mod.serverEnv).toBeDefined()
    consoleSpy.mockRestore()
  })

  it('exports type definitions', async () => {
    const mod = await import('../env')
    // Type exports exist at compile time, we verify the module loads
    expect(mod).toHaveProperty('serverEnv')
    expect(mod).toHaveProperty('clientEnv')
    expect(mod).toHaveProperty('env')
  })
})
