import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

// Read the root layout file as raw text. This avoids rendering it (which
// would require mocking next-intl/server, Sentry, theme scripts, etc.)
// and gives us a reliable regression guard for the icon setup.
const layoutPath = path.join(__dirname, '..', 'layout.tsx')
const rawLayout = fs.readFileSync(layoutPath, 'utf8')

// Strip JSX ({/* … */}) and JS (/* … */, // …) comments so the regression
// checks don't false-positive on explanatory comments that mention the
// strings we're guarding against.
const layoutSource = rawLayout
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')

describe('app/layout.tsx icon + theme color setup', () => {
  it('does NOT contain a manual <link rel="apple-touch-icon"> tag', () => {
    // REGRESSION GUARD: A manual apple-touch-icon link conflicts with the
    // file-based src/app/apple-icon.tsx convention and causes browsers to
    // show an inconsistent or broken favicon. See plan file
    // breezy-hopping-hummingbird.md for the full root-cause analysis.
    // Require `href=` to ensure we only match real JSX tags, not prose.
    const match = layoutSource.match(
      /<link\s+rel=["']apple-touch-icon["']\s+href=/
    )
    expect(match).toBeNull()
  })

  it('uses brand blue #2563eb for viewport.themeColor', () => {
    expect(layoutSource).toMatch(/themeColor:\s*['"]#2563eb['"]/)
  })

  it('does NOT use the legacy purple #7c3aed anywhere', () => {
    // The purple was a manifest/theme-color inconsistency that did not
    // match the actual CSS --primary variable rendered in the UI.
    expect(layoutSource).not.toContain('#7c3aed')
  })

  it('uses brand blue #2563eb for msapplication-TileColor meta tag', () => {
    expect(layoutSource).toMatch(
      /msapplication-TileColor["']\s+content=["']#2563eb["']/
    )
  })

  it('still links the web app manifest', () => {
    expect(layoutSource).toMatch(/<link\s+rel=["']manifest["']\s+href=["']\/manifest\.json["']/)
  })
})
