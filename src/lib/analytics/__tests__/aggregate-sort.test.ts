import { describe, it, expect } from 'vitest'
import { byCountThenKey } from '../aggregate-sort'

type Row = { k: string; n: number }
const cmp = byCountThenKey<Row>(
  (r) => r.n,
  (r) => r.k
)

describe('byCountThenKey', () => {
  it('sorts by count descending', () => {
    const rows: Row[] = [
      { k: 'a', n: 1 },
      { k: 'b', n: 3 },
      { k: 'c', n: 2 },
    ]
    rows.sort(cmp)
    expect(rows.map((r) => r.k)).toEqual(['b', 'c', 'a'])
  })

  it('breaks ties by key ascending (code-point order, matching SQL ORDER BY key ASC)', () => {
    const rows: Row[] = [
      { k: 'banana', n: 2 },
      { k: 'apple', n: 2 },
      { k: 'cherry', n: 1 },
    ]
    rows.sort(cmp)
    expect(rows.map((r) => r.k)).toEqual(['apple', 'banana', 'cherry'])
  })

  it('is deterministic regardless of input order for tied rows', () => {
    const forward: Row[] = [
      { k: 'x', n: 5 },
      { k: 'y', n: 5 },
      { k: 'z', n: 5 },
    ]
    const reversed: Row[] = [
      { k: 'z', n: 5 },
      { k: 'y', n: 5 },
      { k: 'x', n: 5 },
    ]
    forward.sort(cmp)
    reversed.sort(cmp)
    expect(forward.map((r) => r.k)).toEqual(['x', 'y', 'z'])
    expect(reversed.map((r) => r.k)).toEqual(['x', 'y', 'z'])
  })
})
