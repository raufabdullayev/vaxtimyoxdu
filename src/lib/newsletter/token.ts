import { createHmac, timingSafeEqual } from 'crypto'

/** Token validity period: 30 days in milliseconds */
const TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

const getSecret = () => {
  const secret = process.env.UNSUBSCRIBE_SECRET
  if (!secret) {
    throw new Error('UNSUBSCRIBE_SECRET environment variable is not set')
  }
  return secret
}

/**
 * Generate an HMAC-signed unsubscribe token for the given email.
 * Format: base64url(email + ':' + timestamp).hmac_signature
 * Tokens expire after 30 days.
 */
export function generateUnsubscribeToken(email: string): string {
  const timestamp = Date.now()
  const data = `${email.toLowerCase()}:${timestamp}`
  const payload = Buffer.from(data).toString('base64url')
  const sig = createHmac('sha256', getSecret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

/**
 * Verify an unsubscribe token and extract the email.
 * Returns the email if valid and not expired, null otherwise.
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

  let decoded: string
  try {
    decoded = Buffer.from(payload, 'base64url').toString('utf-8')
  } catch {
    return null
  }

  const lastColon = decoded.lastIndexOf(':')
  if (lastColon === -1) return null

  const email = decoded.slice(0, lastColon)
  const timestampStr = decoded.slice(lastColon + 1)
  const timestamp = Number(timestampStr)

  if (!email || !email.includes('@')) return null
  if (!Number.isFinite(timestamp) || timestamp <= 0) return null

  // Check expiry
  if (Date.now() - timestamp > TOKEN_MAX_AGE_MS) return null

  return email
}
