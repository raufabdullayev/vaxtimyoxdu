'use client'

import { useState, useMemo } from 'react'

type PermissionBit = 'r' | 'w' | 'x'
type EntityType = 'owner' | 'group' | 'others'

interface Permissions {
  owner: Record<PermissionBit, boolean>
  group: Record<PermissionBit, boolean>
  others: Record<PermissionBit, boolean>
}

const DEFAULT_PERMISSIONS: Permissions = {
  owner: { r: true, w: true, x: false },
  group: { r: true, w: false, x: false },
  others: { r: true, w: false, x: false },
}

const COMMON_MODES = [
  { octal: '755', desc: 'Owner rwx, group rx, others rx' },
  { octal: '644', desc: 'Owner rw, group r, others r' },
  { octal: '777', desc: 'Full access for all' },
  { octal: '700', desc: 'Owner only, full access' },
  { octal: '600', desc: 'Owner only, read/write' },
  { octal: '750', desc: 'Owner rwx, group rx, others none' },
  { octal: '664', desc: 'Owner rw, group rw, others r' },
  { octal: '400', desc: 'Owner read only' },
]

function bitsToOctal(perms: Record<PermissionBit, boolean>): number {
  return (perms.r ? 4 : 0) + (perms.w ? 2 : 0) + (perms.x ? 1 : 0)
}

function octalToBits(digit: number): Record<PermissionBit, boolean> {
  return {
    r: (digit & 4) !== 0,
    w: (digit & 2) !== 0,
    x: (digit & 1) !== 0,
  }
}

function bitsToString(perms: Record<PermissionBit, boolean>): string {
  return (perms.r ? 'r' : '-') + (perms.w ? 'w' : '-') + (perms.x ? 'x' : '-')
}

export default function ChmodCalculator() {
  const [permissions, setPermissions] = useState<Permissions>(DEFAULT_PERMISSIONS)
  const [octalInput, setOctalInput] = useState('')
  const [copied, setCopied] = useState('')

  const octalValue = useMemo(() => {
    return `${bitsToOctal(permissions.owner)}${bitsToOctal(permissions.group)}${bitsToOctal(permissions.others)}`
  }, [permissions])

  const symbolicValue = useMemo(() => {
    return `-${bitsToString(permissions.owner)}${bitsToString(permissions.group)}${bitsToString(permissions.others)}`
  }, [permissions])

  const chmodCommand = useMemo(() => {
    return `chmod ${octalValue} filename`
  }, [octalValue])

  const toggleBit = (entity: EntityType, bit: PermissionBit) => {
    setPermissions((prev) => ({
      ...prev,
      [entity]: {
        ...prev[entity],
        [bit]: !prev[entity][bit],
      },
    }))
    setOctalInput('')
  }

  const applyOctal = () => {
    const trimmed = octalInput.trim()
    if (!/^[0-7]{3}$/.test(trimmed)) return
    const digits = trimmed.split('').map(Number)
    setPermissions({
      owner: octalToBits(digits[0]),
      group: octalToBits(digits[1]),
      others: octalToBits(digits[2]),
    })
  }

  const applyPreset = (octal: string) => {
    const digits = octal.split('').map(Number)
    setPermissions({
      owner: octalToBits(digits[0]),
      group: octalToBits(digits[1]),
      others: octalToBits(digits[2]),
    })
    setOctalInput('')
  }

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const entities: { key: EntityType; label: string }[] = [
    { key: 'owner', label: 'Owner' },
    { key: 'group', label: 'Group' },
    { key: 'others', label: 'Others' },
  ]

  const bits: { key: PermissionBit; label: string; color: string }[] = [
    { key: 'r', label: 'Read', color: 'bg-blue-500' },
    { key: 'w', label: 'Write', color: 'bg-orange-500' },
    { key: 'x', label: 'Execute', color: 'bg-green-500' },
  ]

  return (
    <div className="space-y-4">
      {/* Permission grid */}
      <div>
        <label className="text-sm font-medium mb-2 block">Permissions</label>
        <div className="rounded-lg border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 bg-muted/50">
            <div className="px-4 py-2 text-sm font-medium" />
            {bits.map((b) => (
              <div key={b.key} className="px-4 py-2 text-sm font-medium text-center">
                {b.label} ({b.key})
              </div>
            ))}
          </div>
          {/* Rows */}
          {entities.map((entity) => (
            <div key={entity.key} className="grid grid-cols-4 border-t">
              <div className="px-4 py-3 text-sm font-medium flex items-center">
                {entity.label}
              </div>
              {bits.map((bit) => (
                <div key={bit.key} className="px-4 py-3 flex justify-center">
                  <button
                    onClick={() => toggleBit(entity.key, bit.key)}
                    className={`w-10 h-10 rounded-lg font-mono text-sm font-bold transition-all ${
                      permissions[entity.key][bit.key]
                        ? `${bit.color} text-white shadow-sm`
                        : 'bg-muted/50 text-muted-foreground border'
                    }`}
                    aria-label={`${entity.label} ${bit.label}: ${permissions[entity.key][bit.key] ? 'enabled' : 'disabled'}`}
                  >
                    {permissions[entity.key][bit.key] ? bit.key : '-'}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Octal input */}
      <div>
        <label className="block text-sm font-medium mb-1">Enter Octal Value</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-32 rounded-lg border bg-background px-3 py-2 text-sm font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="755"
            value={octalInput}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-7]/g, '').slice(0, 3)
              setOctalInput(v)
            }}
            maxLength={3}
            aria-label="Octal permission value"
          />
          <button
            onClick={applyOctal}
            disabled={!/^[0-7]{3}$/.test(octalInput.trim())}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm disabled:opacity-50"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-muted-foreground">Octal</label>
            <button
              onClick={() => copy(octalValue, 'octal')}
              className="text-xs text-primary hover:underline"
            >
              {copied === 'octal' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-2xl font-mono font-bold text-primary">{octalValue}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-muted-foreground">Symbolic</label>
            <button
              onClick={() => copy(symbolicValue, 'symbolic')}
              className="text-xs text-primary hover:underline"
            >
              {copied === 'symbolic' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-2xl font-mono font-bold">{symbolicValue}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-muted-foreground">Command</label>
            <button
              onClick={() => copy(chmodCommand, 'command')}
              className="text-xs text-primary hover:underline"
            >
              {copied === 'command' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-lg font-mono font-bold break-all">{chmodCommand}</div>
        </div>
      </div>

      {/* Common presets */}
      <div>
        <label className="text-sm font-medium mb-2 block">Common Permissions</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {COMMON_MODES.map((mode) => (
            <button
              key={mode.octal}
              onClick={() => applyPreset(mode.octal)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                octalValue === mode.octal
                  ? 'bg-primary/10 ring-1 ring-primary'
                  : 'border hover:bg-accent'
              }`}
            >
              <span className="font-mono font-bold text-primary w-10">{mode.octal}</span>
              <span className="text-muted-foreground">{mode.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
