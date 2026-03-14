import { Resend } from 'resend'
import { getWelcomeEmailHtml } from './templates/welcome'

const FROM_EMAIL = 'Vaxtim Yoxdu <noreply@vaxtimyoxdu.com>'
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

let resendClient: Resend | null = null

function getResend(): Resend | null {
  if (resendClient) return resendClient

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY not set — skipping email delivery')
    return null
  }

  resendClient = new Resend(apiKey)
  return resendClient
}

/**
 * Masks email for safe logging (e.g., user@example.com -> u***@example.com)
 */
function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***@***'
  const masked = local.charAt(0) + '*'.repeat(Math.max(1, local.length - 2)) + local.charAt(local.length - 1)
  return `${masked}@${domain}`
}

/**
 * Send welcome email with retry logic
 */
export async function sendWelcomeEmail(
  email: string,
  locale: string
): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  const maskedEmail = maskEmail(email)
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const html = getWelcomeEmailHtml(locale, email)

      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: getWelcomeSubject(locale),
        html,
      })

      if (result.error) {
        lastError = new Error(result.error.message)
        console.warn(
          `[Email] Welcome email send failed (attempt ${attempt}/${MAX_RETRIES}): ${maskedEmail} - ${result.error.message}`
        )

        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt))
          continue
        }
      } else {
        console.info(`[Email] Welcome email sent to ${maskedEmail} (locale: ${locale}, id: ${result.data?.id || 'unknown'})`)
        return true
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      console.warn(
        `[Email] Welcome email error (attempt ${attempt}/${MAX_RETRIES}): ${maskedEmail} - ${lastError.message}`
      )

      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt))
        continue
      }
    }
  }

  console.error(`[Email] Failed to send welcome email after ${MAX_RETRIES} attempts: ${maskedEmail}`)
  return false
}

/**
 * Send newsletter to multiple subscribers with retry logic
 */
export async function sendNewsletterEmail(
  emails: string[],
  subject: string,
  html: string
): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  try {
    // Resend batch API supports up to 100 emails per request
    const batches: string[][] = []
    for (let i = 0; i < emails.length; i += 100) {
      batches.push(emails.slice(i, i + 100))
    }

    let sentCount = 0
    let failedCount = 0

    for (const batch of batches) {
      try {
        const result = await resend.batch.send(
          batch.map((to) => ({
            from: FROM_EMAIL,
            to,
            subject,
            html,
          }))
        )

        if (result.error) {
          console.warn(`[Email] Batch send error: ${result.error.message}`)
          failedCount += batch.length
        } else {
          sentCount += batch.length
        }
      } catch (batchError) {
        failedCount += batch.length
        console.error(
          `[Email] Batch send failed: ${batchError instanceof Error ? batchError.message : String(batchError)}`
        )
      }
    }

    if (failedCount > 0) {
      console.warn(
        `[Email] Newsletter sent with partial success: ${sentCount}/${emails.length} (${failedCount} failed)`
      )
      return sentCount > 0
    }

    console.info(`[Email] Newsletter sent to ${sentCount} subscribers`)
    return true
  } catch (error) {
    console.error(
      `[Email] Failed to send newsletter: ${error instanceof Error ? error.message : String(error)}`
    )
    return false
  }
}

function getWelcomeSubject(locale: string): string {
  switch (locale) {
    case 'az':
      return 'Vaxtim Yoxdu-ya xoş gəldiniz!'
    case 'tr':
      return "Vaxtim Yoxdu'ya hoş geldiniz!"
    case 'ru':
      return 'Добро пожаловать в Vaxtim Yoxdu!'
    default:
      return 'Welcome to Vaxtim Yoxdu!'
  }
}
