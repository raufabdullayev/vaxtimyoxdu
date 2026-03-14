import { Resend } from 'resend'
import { getWelcomeEmailHtml } from './templates/welcome'

const FROM_EMAIL = 'Vaxtim Yoxdu <noreply@vaxtimyoxdu.com>'

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

export async function sendWelcomeEmail(
  email: string,
  locale: string
): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  try {
    const html = getWelcomeEmailHtml(locale, email)

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: getWelcomeSubject(locale),
      html,
    })

    console.log(`[Email] Welcome email sent to ${email} (locale: ${locale})`)
    return true
  } catch (error) {
    console.error('[Email] Failed to send welcome email:', error)
    return false
  }
}

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

    for (const batch of batches) {
      await resend.batch.send(
        batch.map((to) => ({
          from: FROM_EMAIL,
          to,
          subject,
          html,
        }))
      )
    }

    console.log(`[Email] Newsletter sent to ${emails.length} subscribers`)
    return true
  } catch (error) {
    console.error('[Email] Failed to send newsletter:', error)
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
