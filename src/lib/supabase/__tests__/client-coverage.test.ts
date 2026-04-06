import { describe, it, expect, vi, beforeEach } from 'vitest'

// We need to reset module state between tests
beforeEach(() => {
  vi.resetModules()
})

describe('Supabase Client', () => {
  it('isSupabaseConfigured is false when env vars are missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '')
    const { isSupabaseConfigured } = await import('../client')
    expect(isSupabaseConfigured).toBe(false)
  })

  it('getSupabaseServer returns null when not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '')
    const { getSupabaseServer } = await import('../client')
    expect(getSupabaseServer()).toBeNull()
  })

  it('getSupabasePublic returns null when anon key is missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '')
    const { getSupabasePublic } = await import('../client')
    expect(getSupabasePublic()).toBeNull()
  })

  it('getSupabaseServer returns a client when configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key')
    const { getSupabaseServer } = await import('../client')
    const client = getSupabaseServer()
    expect(client).not.toBeNull()
  })

  it('getSupabaseServer returns same instance on repeated calls', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key')
    const { getSupabaseServer } = await import('../client')
    const client1 = getSupabaseServer()
    const client2 = getSupabaseServer()
    expect(client1).toBe(client2)
  })

  it('getSupabasePublic returns a client when configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')
    const { getSupabasePublic } = await import('../client')
    const client = getSupabasePublic()
    expect(client).not.toBeNull()
  })

  it('getSupabasePublic returns same instance on repeated calls', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')
    const { getSupabasePublic } = await import('../client')
    const client1 = getSupabasePublic()
    const client2 = getSupabasePublic()
    expect(client1).toBe(client2)
  })
})
