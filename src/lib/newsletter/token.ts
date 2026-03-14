import { createHmac, timingSafeEqual } from 'crypto'

const getSecret = () => {
  const secret = process.env.UNSUBSCRIBE_SECRET
  if (!secret) {
    throw new Error('UNSUBSCRIBE_SECRET environment variable is not set')
  }
  return secret
}

/**
 * Generate an HMAC-signed unsubscribe token for the given email.
 * Format: base64url(email).hmac_signature
 */
export function generateUnsubscribeToken(email: string): string {
  const payload = Buffer.from(email.toLowerCase()).toString('base64url')
  const sig = createHmac('sha256', getSecret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

/**
 * Verify an unsubscribe token and extract the email.
 * Returns the email if valid, null if tampered or malformed.
 */
export function verifyUnsubscribeToken(token: string): string | null {
  const dotIndex = token.indexOf('.')
  if (dotIndex === -1) return null

  const payload = token.slice(0, dotIndex)
  const sig = token.slice(dotIndex + 1)

  if (!payload || !sig) return null

  let secret: string
  try {
    secret = getSecret()
  } catch {
    return null
  }

  const expected = createHmac('sha256', secret).update(payload).digest('base64url')

  // Constant-time comparison to prevent timing attacks
  const sigBuf = Buffer.from(sig)
  const expectedBuf = Buffer.from(expected)

  if (sigBuf.length !== expectedBuf.length) return null
  if (!timingSafeEqual(sigBuf, expectedBuf)) return null

  let email: string
  try {
    email = Buffer.from(payload, 'base64url').toString('utf-8')
  } catch {
    return null
  }

  if (!email || !email.includes('@')) return null

  return email
}
