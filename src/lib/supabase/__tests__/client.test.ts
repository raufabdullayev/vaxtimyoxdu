import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Supabase client', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('isSupabaseConfigured is false when env vars missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    const { isSupabaseConfigured } = await import('../client')
    expect(isSupabaseConfigured).toBe(false)
  })

  it('getSupabaseServer returns null when not configured', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    const { getSupabaseServer } = await import('../client')
    expect(getSupabaseServer()).toBeNull()
  })

  it('getSupabasePublic returns null when anon key missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const { getSupabasePublic } = await import('../client')
    expect(getSupabasePublic()).toBeNull()
  })
})
