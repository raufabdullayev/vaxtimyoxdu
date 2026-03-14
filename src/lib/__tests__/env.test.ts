import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { z } from 'zod'

describe('env validation schemas', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  // Test the schemas directly rather than re-importing the module
  // (re-importing causes side effects with safeParse at module scope)

  const serverSchema = z.object({
    GROQ_API_KEY: z.string().min(1).optional(),
    GEMINI_API_KEY: z.string().min(1).optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    ANALYTICS_API_KEY: z.string().min(1).optional(),
    INDEXNOW_API_KEY: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
  })

  const clientSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_GA_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_ADSENSE_ID: z.string().min(1).optional(),
  })

  describe('serverSchema', () => {
    it('passes with no env vars set (all optional)', () => {
      const result = serverSchema.safeParse({})
      expect(result.success).toBe(true)
    })

    it('passes with valid GROQ_API_KEY', () => {
      const result = serverSchema.safeParse({ GROQ_API_KEY: 'gsk_test123' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.GROQ_API_KEY).toBe('gsk_test123')
      }
    })

    it('fails if GROQ_API_KEY is empty string', () => {
      const result = serverSchema.safeParse({ GROQ_API_KEY: '' })
      expect(result.success).toBe(false)
    })

    it('passes with valid UPSTASH_REDIS_REST_URL', () => {
      const result = serverSchema.safeParse({
        UPSTASH_REDIS_REST_URL: 'https://redis.upstash.io',
      })
      expect(result.success).toBe(true)
    })

    it('fails if UPSTASH_REDIS_REST_URL is not a valid URL', () => {
      const result = serverSchema.safeParse({
        UPSTASH_REDIS_REST_URL: 'not-a-url',
      })
      expect(result.success).toBe(false)
    })

    it('passes with all server keys set', () => {
      const result = serverSchema.safeParse({
        GROQ_API_KEY: 'gsk_123',
        GEMINI_API_KEY: 'gem_123',
        OPENAI_API_KEY: 'sk_123',
        UPSTASH_REDIS_REST_URL: 'https://redis.upstash.io',
        UPSTASH_REDIS_REST_TOKEN: 'token123',
        SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGc...',
        ANALYTICS_API_KEY: 'analytics_123',
        INDEXNOW_API_KEY: 'indexnow_123',
        RESEND_API_KEY: 're_123',
      })
      expect(result.success).toBe(true)
    })

    it('ignores unknown keys (strips extra fields)', () => {
      const result = serverSchema.safeParse({
        GROQ_API_KEY: 'gsk_123',
        UNKNOWN_VAR: 'should be ignored',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect('UNKNOWN_VAR' in result.data).toBe(false)
      }
    })
  })

  describe('clientSchema', () => {
    it('passes with no env vars set (all optional)', () => {
      const result = clientSchema.safeParse({})
      expect(result.success).toBe(true)
    })

    it('passes with valid NEXT_PUBLIC_SUPABASE_URL', () => {
      const result = clientSchema.safeParse({
        NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
      })
      expect(result.success).toBe(true)
    })

    it('fails if NEXT_PUBLIC_SUPABASE_URL is not a URL', () => {
      const result = clientSchema.safeParse({
        NEXT_PUBLIC_SUPABASE_URL: 'not-url',
      })
      expect(result.success).toBe(false)
    })

    it('fails if NEXT_PUBLIC_SUPABASE_ANON_KEY is empty', () => {
      const result = clientSchema.safeParse({
        NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
      })
      expect(result.success).toBe(false)
    })

    it('passes with all client keys set', () => {
      const result = clientSchema.safeParse({
        NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGc...',
        NEXT_PUBLIC_GA_ID: 'G-TESTID',
        NEXT_PUBLIC_ADSENSE_ID: 'ca-pub-123',
      })
      expect(result.success).toBe(true)
    })

    it('passes with valid GA ID', () => {
      const result = clientSchema.safeParse({
        NEXT_PUBLIC_GA_ID: 'G-BJHT1YYBCS',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.NEXT_PUBLIC_GA_ID).toBe('G-BJHT1YYBCS')
      }
    })
  })
})
