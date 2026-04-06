import { describe, it, expect } from 'vitest'

/**
 * Type-level tests for Supabase type definitions.
 * These verify the shape and structure of the types at compile time.
 */

describe('Supabase Types', () => {
  it('NewsletterSubscriber has required fields', () => {
    const row: import('../types').NewsletterSubscriber = {
      id: 'uuid-123',
      email: 'test@example.com',
      subscribed_at: '2024-01-01T00:00:00Z',
      locale: 'en',
      source: 'footer',
      is_active: true,
    }
    expect(row.id).toBe('uuid-123')
    expect(row.email).toBe('test@example.com')
    expect(row.is_active).toBe(true)
  })

  it('NewsletterSubscriber allows null for optional fields', () => {
    const row: import('../types').NewsletterSubscriber = {
      id: 'uuid-456',
      email: 'test2@example.com',
      subscribed_at: '2024-01-01T00:00:00Z',
      locale: null,
      source: null,
      is_active: false,
    }
    expect(row.locale).toBeNull()
    expect(row.source).toBeNull()
  })

  it('NewsletterSubscriberInsert requires only email', () => {
    const insert: import('../types').NewsletterSubscriberInsert = {
      email: 'new@example.com',
    }
    expect(insert.email).toBe('new@example.com')
    expect(insert.locale).toBeUndefined()
  })

  it('NewsletterSubscriberInsert accepts optional fields', () => {
    const insert: import('../types').NewsletterSubscriberInsert = {
      email: 'new@example.com',
      locale: 'az',
      source: 'popup',
    }
    expect(insert.locale).toBe('az')
    expect(insert.source).toBe('popup')
  })

  it('AnalyticsEvent has required fields', () => {
    const event: import('../types').AnalyticsEvent = {
      id: 'evt-123',
      event_type: 'page_view',
      event_data: { path: '/tools' },
      page_path: '/tools',
      locale: 'en',
      created_at: '2024-01-01T00:00:00Z',
    }
    expect(event.event_type).toBe('page_view')
    expect(event.event_data).toEqual({ path: '/tools' })
  })

  it('AnalyticsEventInsert requires only event_type', () => {
    const insert: import('../types').AnalyticsEventInsert = {
      event_type: 'tool_use',
    }
    expect(insert.event_type).toBe('tool_use')
  })

  it('Database type has correct table structure', () => {
    type DB = import('../types').Database
    // Verify the shape at type level - if this compiles, the structure is correct
    const tableNames: (keyof DB['public']['Tables'])[] = [
      'newsletter_subscribers',
      'analytics_events',
    ]
    expect(tableNames).toHaveLength(2)
  })
})
