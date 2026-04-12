import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGamification } from '../useGamification'

describe('useGamification', () => {
  let mockStorage: Record<string, string>

  beforeEach(() => {
    mockStorage = {}

    const localStorageMock = {
      getItem: vi.fn((key: string) => mockStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { mockStorage[key] = value }),
      removeItem: vi.fn((key: string) => { delete mockStorage[key] }),
      clear: vi.fn(() => { mockStorage = {} }),
      get length() { return Object.keys(mockStorage).length },
      key: vi.fn(),
    }

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initializes badges after mount', () => {
    const { result } = renderHook(() => useGamification())

    // After useEffect, badges are computed from (empty) localStorage
    expect(result.current.badges.length).toBe(6) // 6 badge types
    // All should start unearned with zero progress
    expect(result.current.badges.every(b => !b.earned)).toBe(true)
    expect(result.current.streak.currentStreak).toBe(0)
  })

  it('loads badges from localStorage on mount', () => {
    mockStorage['tool-usage-stats'] = JSON.stringify({
      toolSlugs: ['json-formatter'],
      categorySet: ['dev'],
      sessionTools: [],
      sessionId: 'test',
      totalUses: 1,
    })
    mockStorage['tool-streak-data'] = JSON.stringify({
      currentStreak: 0,
      lastUsedDate: '',
      longestStreak: 0,
    })

    const { result } = renderHook(() => useGamification())

    // After useEffect runs, badges should be computed
    expect(result.current.badges.length).toBeGreaterThan(0)
    // first-step badge should be earned (totalUses >= 1)
    const firstStep = result.current.badges.find(b => b.id === 'first-step')
    expect(firstStep?.earned).toBe(true)
  })

  it('trackToolUse increments totalUses', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('json-formatter', 'dev')
    })

    const firstStep = result.current.badges.find(b => b.id === 'first-step')
    expect(firstStep?.earned).toBe(true)
    expect(firstStep?.progress).toBe(1)
  })

  it('explorer badge requires 5 unique tools', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('tool-1', 'dev')
      result.current.trackToolUse('tool-2', 'dev')
      result.current.trackToolUse('tool-3', 'dev')
      result.current.trackToolUse('tool-4', 'dev')
    })

    let explorer = result.current.badges.find(b => b.id === 'explorer')
    expect(explorer?.earned).toBe(false)
    expect(explorer?.progress).toBe(4)

    act(() => {
      result.current.trackToolUse('tool-5', 'dev')
    })

    explorer = result.current.badges.find(b => b.id === 'explorer')
    expect(explorer?.earned).toBe(true)
  })

  it('expert badge requires 10 unique tools', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      for (let i = 1; i <= 10; i++) {
        result.current.trackToolUse(`tool-${i}`, 'dev')
      }
    })

    const expert = result.current.badges.find(b => b.id === 'expert')
    expect(expert?.earned).toBe(true)
    expect(expert?.progress).toBe(10)
  })

  it('speed-runner badge requires 3 tools in one session', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('tool-1', 'dev')
      result.current.trackToolUse('tool-2', 'dev')
      result.current.trackToolUse('tool-3', 'dev')
    })

    const speedRunner = result.current.badges.find(b => b.id === 'speed-runner')
    expect(speedRunner?.earned).toBe(true)
  })

  it('category-master badge requires all 6 categories', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('t1', 'ai')
      result.current.trackToolUse('t2', 'pdf')
      result.current.trackToolUse('t3', 'image')
      result.current.trackToolUse('t4', 'dev')
      result.current.trackToolUse('t5', 'generators')
    })

    let catMaster = result.current.badges.find(b => b.id === 'category-master')
    expect(catMaster?.earned).toBe(false)
    expect(catMaster?.progress).toBe(5)

    act(() => {
      result.current.trackToolUse('t6', 'text')
    })

    catMaster = result.current.badges.find(b => b.id === 'category-master')
    expect(catMaster?.earned).toBe(true)
  })

  it('trackToolUse updates streak data', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('json-formatter', 'dev')
    })

    expect(result.current.streak.currentStreak).toBe(1)
    expect(result.current.streak.lastUsedDate).toBeTruthy()
  })

  it('does not duplicate tool slugs on repeated use', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('json-formatter', 'dev')
      result.current.trackToolUse('json-formatter', 'dev')
      result.current.trackToolUse('json-formatter', 'dev')
    })

    const explorer = result.current.badges.find(b => b.id === 'explorer')
    expect(explorer?.progress).toBe(1) // Only 1 unique tool
  })

  it('getBadges returns current badges', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('tool-1', 'dev')
    })

    const badges = result.current.getBadges()
    expect(badges.length).toBe(6) // All badge types
  })

  it('getStreak returns current streak data', () => {
    const { result } = renderHook(() => useGamification())

    act(() => {
      result.current.trackToolUse('tool-1', 'dev')
    })

    const streak = result.current.getStreak()
    expect(streak.currentStreak).toBe(1)
  })

  it('handles corrupted localStorage gracefully', () => {
    mockStorage['tool-usage-stats'] = 'invalid-json'

    const { result } = renderHook(() => useGamification())

    // Should not crash, should use defaults
    expect(result.current.badges).toBeDefined()
  })

  it('seven-day-streak badge progress tracks current streak', () => {
    mockStorage['tool-streak-data'] = JSON.stringify({
      currentStreak: 5,
      lastUsedDate: '2026-04-11',
      longestStreak: 5,
    })

    const { result } = renderHook(() => useGamification())

    const streakBadge = result.current.badges.find(b => b.id === 'seven-day-streak')
    expect(streakBadge?.progress).toBe(5)
    expect(streakBadge?.earned).toBe(false)
  })
})
