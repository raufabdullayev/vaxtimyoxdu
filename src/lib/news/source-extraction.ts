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

export function extractNewsSourceNames(content: string): string[] {
  const matches = SOURCE_NAMES
    .map((name) => {
      const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(name)}([^\\p{L}\\p{N}]|$)`, 'iu')
      const index = content.search(pattern)
      return index >= 0 ? { name, index } : null
    })
    .filter((match): match is { name: string; index: number } => Boolean(match))
    .sort((a, b) => a.index - b.index)

  return [...new Set(matches.map((match) => match.name))]
}
