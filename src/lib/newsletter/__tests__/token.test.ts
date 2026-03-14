import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { generateUnsubscribeToken, verifyUnsubscribeToken } from '@/lib/newsletter/token'
import { createHmac } from 'crypto'

const TEST_SECRET = 'test-secret-key-for-hmac-signing-1234'

describe('newsletter unsubscribe token', () => {
  beforeEach(() => {
    process.env.UNSUBSCRIBE_SECRET = TEST_SECRET
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-14T12:00:00Z'))
  })

  afterEach(() => {
    delete process.env.UNSUBSCRIBE_SECRET
    vi.useRealTimers()
  })

  describe('generateUnsubscribeToken', () => {
    it('generates a token with payload.signature format', () => {
      const token = generateUnsubscribeToken('user@example.com')
      expect(token).toContain('.')
      const parts = token.split('.')
      expect(parts).toHaveLength(2)
      expect(parts[0].length).toBeGreaterThan(0)
      expect(parts[1].length).toBeGreaterThan(0)
    })

    it('embeds timestamp in the payload', () => {
      const token = generateUnsubscribeToken('user@example.com')
      const [payload] = token.split('.')
      const decoded = Buffer.from(payload, 'base64url').toString('utf-8')
      expect(decoded).toContain(':')
      const lastColon = decoded.lastIndexOf(':')
      const timestamp = Number(decoded.slice(lastColon + 1))
      expect(timestamp).toBe(Date.now())
    })

    it('generates different tokens at different times', () => {
      const t1 = generateUnsubscribeToken('user@example.com')
      vi.advanceTimersByTime(1000)
      const t2 = generateUnsubscribeToken('user@example.com')
      expect(t1).not.toBe(t2)
    })

    it('generates different tokens for different emails', () => {
      const t1 = generateUnsubscribeToken('a@example.com')
      const t2 = generateUnsubscribeToken('b@example.com')
      expect(t1).not.toBe(t2)
    })

    it('normalizes email to lowercase', () => {
      const t1 = generateUnsubscribeToken('User@Example.COM')
      const email = verifyUnsubscribeToken(t1)
      expect(email).toBe('user@example.com')
    })

    it('throws if UNSUBSCRIBE_SECRET is not set', () => {
      delete process.env.UNSUBSCRIBE_SECRET
      expect(() => generateUnsubscribeToken('user@example.com')).toThrow(
        'UNSUBSCRIBE_SECRET environment variable is not set'
      )
    })
  })

  describe('verifyUnsubscribeToken', () => {
    it('verifies a valid token and returns the email', () => {
      const token = generateUnsubscribeToken('user@example.com')
      const email = verifyUnsubscribeToken(token)
      expect(email).toBe('user@example.com')
    })

    it('accepts a token within the 30-day window', () => {
      const token = generateUnsubscribeToken('user@example.com')
      vi.advanceTimersByTime(29 * 24 * 60 * 60 * 1000) // 29 days
      expect(verifyUnsubscribeToken(token)).toBe('user@example.com')
    })

    it('rejects an expired token (>30 days)', () => {
      const token = generateUnsubscribeToken('user@example.com')
      vi.advanceTimersByTime(31 * 24 * 60 * 60 * 1000) // 31 days
      expect(verifyUnsubscribeToken(token)).toBeNull()
    })

    it('rejects a token at exactly 30 days + 1ms', () => {
      const token = generateUnsubscribeToken('user@example.com')
      vi.advanceTimersByTime(30 * 24 * 60 * 60 * 1000 + 1) // 30 days + 1ms
      expect(verifyUnsubscribeToken(token)).toBeNull()
    })

    it('returns null for a token with tampered payload', () => {
      const token = generateUnsubscribeToken('user@example.com')
      const [, sig] = token.split('.')
      const tamperedPayload = Buffer.from(`attacker@evil.com:${Date.now()}`).toString('base64url')
      expect(verifyUnsubscribeToken(`${tamperedPayload}.${sig}`)).toBeNull()
    })

    it('returns null for a token with tampered signature', () => {
      const token = generateUnsubscribeToken('user@example.com')
      const [payload] = token.split('.')
      expect(verifyUnsubscribeToken(`${payload}.invalidsignature`)).toBeNull()
    })

    it('returns null for a token without a dot separator', () => {
      expect(verifyUnsubscribeToken('nodothere')).toBeNull()
    })

    it('returns null for an empty string', () => {
      expect(verifyUnsubscribeToken('')).toBeNull()
    })

    it('returns null for a token with empty payload', () => {
      expect(verifyUnsubscribeToken('.somesig')).toBeNull()
    })

    it('returns null for a token with empty signature', () => {
      expect(verifyUnsubscribeToken('somepayload.')).toBeNull()
    })

    it('returns null if UNSUBSCRIBE_SECRET is not set', () => {
      const token = generateUnsubscribeToken('user@example.com')
      delete process.env.UNSUBSCRIBE_SECRET
      expect(verifyUnsubscribeToken(token)).toBeNull()
    })

    it('returns null for a plain base64url email (old-style insecure token)', () => {
      const fakeToken = Buffer.from('victim@example.com').toString('base64url')
      expect(verifyUnsubscribeToken(fakeToken)).toBeNull()
    })

    it('returns null if decoded payload has no timestamp', () => {
      const payload = Buffer.from('user@example.com').toString('base64url')
      const sig = createHmac('sha256', TEST_SECRET).update(payload).digest('base64url')
      expect(verifyUnsubscribeToken(`${payload}.${sig}`)).toBeNull()
    })

    it('returns null if decoded payload is not an email', () => {
      const payload = Buffer.from(`not-an-email:${Date.now()}`).toString('base64url')
      const sig = createHmac('sha256', TEST_SECRET).update(payload).digest('base64url')
      expect(verifyUnsubscribeToken(`${payload}.${sig}`)).toBeNull()
    })

    it('rejects tokens signed with a different secret', () => {
      const token = generateUnsubscribeToken('user@example.com')
      process.env.UNSUBSCRIBE_SECRET = 'different-secret'
      expect(verifyUnsubscribeToken(token)).toBeNull()
    })

    it('rejects a token with invalid timestamp', () => {
      const payload = Buffer.from('user@example.com:notanumber').toString('base64url')
      const sig = createHmac('sha256', TEST_SECRET).update(payload).digest('base64url')
      expect(verifyUnsubscribeToken(`${payload}.${sig}`)).toBeNull()
    })

    it('rejects a token with negative timestamp', () => {
      const payload = Buffer.from('user@example.com:-1').toString('base64url')
      const sig = createHmac('sha256', TEST_SECRET).update(payload).digest('base64url')
      expect(verifyUnsubscribeToken(`${payload}.${sig}`)).toBeNull()
    })
  })
})
