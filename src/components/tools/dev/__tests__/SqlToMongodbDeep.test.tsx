import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SqlToMongodb from '../SqlToMongodb'

describe('SqlToMongodb - Deep Tests', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  const typeAndConvert = (sql: string) => {
    render(<SqlToMongodb />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: sql } })
    fireEvent.click(screen.getByText('convert'))
  }

  it('converts SELECT * FROM table', () => {
    typeAndConvert('SELECT * FROM users')
    expect(screen.getByText(/db\.users\.find/)).toBeInTheDocument()
  })

  it('converts SELECT with specific fields', () => {
    typeAndConvert("SELECT name, email FROM users")
    expect(screen.getByText(/name: 1.*email: 1/)).toBeInTheDocument()
  })

  it('converts SELECT with WHERE clause', () => {
    typeAndConvert("SELECT * FROM users WHERE age > 25")
    expect(screen.getByText(/\$gt/)).toBeInTheDocument()
  })

  it('converts SELECT with ORDER BY', () => {
    typeAndConvert("SELECT * FROM users WHERE age > 25 ORDER BY name")
    expect(screen.getByText(/sort.*name: 1/)).toBeInTheDocument()
  })

  it('converts SELECT with ORDER BY DESC', () => {
    typeAndConvert("SELECT * FROM users WHERE age > 25 ORDER BY name DESC")
    expect(screen.getByText(/sort.*name: -1/)).toBeInTheDocument()
  })

  it('converts SELECT with LIMIT', () => {
    typeAndConvert("SELECT * FROM users WHERE age > 25 LIMIT 10")
    expect(screen.getByText(/limit\(10\)/)).toBeInTheDocument()
  })

  it('converts INSERT INTO', () => {
    typeAndConvert("INSERT INTO users (name, email, age) VALUES ('John', 'john@example.com', 30)")
    expect(screen.getByText(/insertOne/)).toBeInTheDocument()
    expect(screen.getByText(/name:.*'John'/)).toBeInTheDocument()
  })

  it('converts UPDATE with SET and WHERE', () => {
    typeAndConvert("UPDATE users SET status = 'inactive' WHERE lastLogin < '2025-01-01'")
    expect(screen.getByText(/updateMany/)).toBeInTheDocument()
    expect(screen.getByText(/\$set/)).toBeInTheDocument()
  })

  it('converts DELETE FROM with WHERE', () => {
    typeAndConvert("DELETE FROM sessions WHERE expired = true")
    expect(screen.getByText(/deleteMany/)).toBeInTheDocument()
  })

  it('converts DELETE FROM without WHERE', () => {
    typeAndConvert("DELETE FROM sessions")
    expect(screen.getByText(/deleteMany.*\{\}/)).toBeInTheDocument()
  })

  it('handles WHERE with != operator', () => {
    typeAndConvert("SELECT * FROM users WHERE status != 'banned'")
    expect(screen.getByText(/\$ne/)).toBeInTheDocument()
  })

  it('handles WHERE with >= operator', () => {
    typeAndConvert("SELECT * FROM users WHERE age >= 18")
    expect(screen.getByText(/\$gte/)).toBeInTheDocument()
  })

  it('handles WHERE with <= operator', () => {
    typeAndConvert("SELECT * FROM users WHERE age <= 65")
    expect(screen.getByText(/\$lte/)).toBeInTheDocument()
  })

  it('handles WHERE with < operator', () => {
    typeAndConvert("SELECT * FROM users WHERE age < 18")
    expect(screen.getByText(/\$lt/)).toBeInTheDocument()
  })

  it('handles WHERE with LIKE operator', () => {
    typeAndConvert("SELECT * FROM users WHERE name LIKE '%john%'")
    expect(screen.getByText(/name:.*\/.*john.*\/i/)).toBeInTheDocument()
  })

  it('handles WHERE with IN operator', () => {
    typeAndConvert("SELECT * FROM users WHERE status IN ('active', 'pending')")
    expect(screen.getByText(/\$in/)).toBeInTheDocument()
  })

  it('handles WHERE with AND', () => {
    typeAndConvert("SELECT * FROM users WHERE age > 18 AND status = 'active'")
    expect(screen.getByText(/\$gt.*status/)).toBeInTheDocument()
  })

  it('shows error for unsupported query', () => {
    typeAndConvert("CREATE TABLE users (id INT)")
    expect(screen.getByText(/Could not parse SQL/)).toBeInTheDocument()
  })

  it('handles trailing semicolons', () => {
    typeAndConvert("SELECT * FROM users;")
    expect(screen.getByText(/db\.users\.find/)).toBeInTheDocument()
  })

  it('renders sample query buttons', () => {
    render(<SqlToMongodb />)
    // Sample buttons show "SELECT 1", "INSERT 1", etc.
    expect(screen.getByText('SELECT 1')).toBeInTheDocument()
  })

  it('loads a sample query when clicked', () => {
    render(<SqlToMongodb />)
    fireEvent.click(screen.getByText('SELECT 1'))
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    expect(textarea.value).toContain('SELECT')
  })

  it('copies result to clipboard', () => {
    typeAndConvert("SELECT * FROM users")
    fireEvent.click(screen.getByText('copy'))
    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining('db.users.find')
    )
  })

  it('renders output area', () => {
    render(<SqlToMongodb />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBe(2)
  })

  it('handles WHERE with <> operator', () => {
    typeAndConvert("SELECT * FROM users WHERE role <> 'admin'")
    expect(screen.getByText(/\$ne/)).toBeInTheDocument()
  })
})
