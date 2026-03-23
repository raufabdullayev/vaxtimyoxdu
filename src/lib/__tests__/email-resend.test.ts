import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before importing the module
const mockSend = vi.fn()
const mockBatchSend = vi.fn()

vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = { send: mockSend }
    batch = { send: mockBatchSend }
  },
}))

vi.mock('@/lib/email/templates/welcome', () => ({
  getWelcomeEmailHtml: vi.fn(() => '<html>Welcome</html>'),
}))

describe('email/resend', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('sendWelcomeEmail', () => {
    it('returns false when RESEND_API_KEY is not set', async () => {
      vi.stubEnv('RESEND_API_KEY', '')
      const { sendWelcomeEmail } = await import('@/lib/email/resend')
      const result = await sendWelcomeEmail('test@example.com', 'en')
      expect(result).toBe(false)
    })

    it('sends email successfully when API key is set', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockSend.mockResolvedValue({ data: { id: 'msg-123' }, error: null })

      const { sendWelcomeEmail } = await import('@/lib/email/resend')
      const result = await sendWelcomeEmail('test@example.com', 'en')
      expect(result).toBe(true)
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
        })
      )
    })

    it('returns false when Resend returns an error', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockSend.mockResolvedValue({ data: null, error: { message: 'Invalid email' } })

      const { sendWelcomeEmail } = await import('@/lib/email/resend')
      const result = await sendWelcomeEmail('bad@example.com', 'en')
      expect(result).toBe(false)
    })

    it('returns false when send throws an exception', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockSend.mockRejectedValue(new Error('Network error'))

      const { sendWelcomeEmail } = await import('@/lib/email/resend')
      const result = await sendWelcomeEmail('test@example.com', 'en')
      expect(result).toBe(false)
    })

    it('uses correct subject for AZ locale', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockSend.mockResolvedValue({ data: { id: 'msg-az' }, error: null })

      const { sendWelcomeEmail } = await import('@/lib/email/resend')
      await sendWelcomeEmail('test@example.com', 'az')

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining('xoş gəldiniz'),
        })
      )
    })

    it('uses correct subject for TR locale', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockSend.mockResolvedValue({ data: { id: 'msg-tr' }, error: null })

      const { sendWelcomeEmail } = await import('@/lib/email/resend')
      await sendWelcomeEmail('test@example.com', 'tr')

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining('hoş geldiniz'),
        })
      )
    })

    it('uses correct subject for RU locale', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockSend.mockResolvedValue({ data: { id: 'msg-ru' }, error: null })

      const { sendWelcomeEmail } = await import('@/lib/email/resend')
      await sendWelcomeEmail('test@example.com', 'ru')

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining('Добро пожаловать'),
        })
      )
    })
  })

  describe('sendNewsletterEmail', () => {
    it('returns false when RESEND_API_KEY is not set', async () => {
      vi.stubEnv('RESEND_API_KEY', '')
      const { sendNewsletterEmail } = await import('@/lib/email/resend')
      const result = await sendNewsletterEmail(['a@b.com'], 'Subject', '<p>Body</p>')
      expect(result).toBe(false)
    })

    it('sends batch emails successfully', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockBatchSend.mockResolvedValue({ data: [{ id: 'batch-1' }], error: null })

      const { sendNewsletterEmail } = await import('@/lib/email/resend')
      const emails = ['a@example.com', 'b@example.com']
      const result = await sendNewsletterEmail(emails, 'News', '<p>Hello</p>')

      expect(result).toBe(true)
      expect(mockBatchSend).toHaveBeenCalled()
    })

    it('returns false when all batches fail', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockBatchSend.mockResolvedValue({ data: null, error: { message: 'Rate limit' } })

      const { sendNewsletterEmail } = await import('@/lib/email/resend')
      const result = await sendNewsletterEmail(['a@b.com'], 'Subject', '<p>Body</p>')
      expect(result).toBe(false)
    })

    it('handles batch send throwing an exception', async () => {
      vi.stubEnv('RESEND_API_KEY', 'test-key-123')
      mockBatchSend.mockRejectedValue(new Error('Connection timeout'))

      const { sendNewsletterEmail } = await import('@/lib/email/resend')
      const result = await sendNewsletterEmail(['a@b.com'], 'Subject', '<p>Body</p>')
      expect(result).toBe(false)
    })
  })
})
