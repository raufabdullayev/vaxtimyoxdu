const SOURCE_NAMES = [
  'Reuters',
  'Associated Press',
  'AP',
  'AFP',
  'Axios',
  'CNN',
  'NPR',
  'Washington Post',
  'Bloomberg',
  'Euronews',
  'Al Jazeera',
  'France 24',
  'CBS News',
  'PBS NewsHour',
  'Kyiv Independent',
  'Kyiv Post',
  'RFE/RL',
  'New Voice of Ukraine',
  'TechCrunch',
  'TheNextWeb',
  'The Africa Report',
  'BBC',
  'The Guardian',
  'Financial Times',
  'Wall Street Journal',
]

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const SOURCE_PATTERNS = SOURCE_NAMES.map((name) => ({
  name,
  pattern: new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(name)}([^\\p{L}\\p{N}]|$)`, 'iu'),
}))

export function extractNewsSourceNames(content: string): string[] {
  const matches = SOURCE_PATTERNS
    .map(({ name, pattern }) => {
      const index = content.search(pattern)
      return index >= 0 ? { name, index } : null
    })
    .filter((match): match is { name: string; index: number } => Boolean(match))
    .sort((a, b) => a.index - b.index)

  return [...new Set(matches.map((match) => match.name))]
}
