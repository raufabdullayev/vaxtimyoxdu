import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { generateUnsubscribeToken, verifyUnsubscribeToken } from '@/lib/newsletter/token'

const TEST_SECRET = 'test-secret-key-for-hmac-signing-1234'

describe('newsletter unsubscribe token', () => {
  beforeEach(() => {
    process.env.UNSUBSCRIBE_SECRET = TEST_SECRET
  })

  afterEach(() => {
    delete process.env.UNSUBSCRIBE_SECRET
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

    it('generates deterministic tokens for the same email', () => {
      const t1 = generateUnsubscribeToken('user@example.com')
      const t2 = generateUnsubscribeToken('user@example.com')
      expect(t1).toBe(t2)
    })

    it('generates different tokens for different emails', () => {
      const t1 = generateUnsubscribeToken('a@example.com')
      const t2 = generateUnsubscribeToken('b@example.com')
      expect(t1).not.toBe(t2)
    })

    it('normalizes email to lowercase', () => {
      const t1 = generateUnsubscribeToken('User@Example.COM')
      const t2 = generateUnsubscribeToken('user@example.com')
      expect(t1).toBe(t2)
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

    it('returns null for a token with tampered payload', () => {
      const token = generateUnsubscribeToken('user@example.com')
      const [, sig] = token.split('.')
      const tamperedPayload = Buffer.from('attacker@evil.com').toString('base64url')
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
      // An attacker crafting a base64url-encoded email should be rejected
      const fakeToken = Buffer.from('victim@example.com').toString('base64url')
      expect(verifyUnsubscribeToken(fakeToken)).toBeNull()
    })

    it('returns null if decoded payload is not an email', () => {
      const payload = Buffer.from('not-an-email').toString('base64url')
      const { createHmac } = require('crypto')
      const sig = createHmac('sha256', TEST_SECRET).update(payload).digest('base64url')
      expect(verifyUnsubscribeToken(`${payload}.${sig}`)).toBeNull()
    })

    it('rejects tokens signed with a different secret', () => {
      const token = generateUnsubscribeToken('user@example.com')
      process.env.UNSUBSCRIBE_SECRET = 'different-secret'
      expect(verifyUnsubscribeToken(token)).toBeNull()
    })
  })
})
