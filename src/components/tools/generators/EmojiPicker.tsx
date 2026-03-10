'use client'

import { useState, useMemo } from 'react'

const EMOJI_DATA: Record<string, string[]> = {
  'Smileys': [
    '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍',
    '🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫',
    '🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','😌','😔',
    '😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳',
    '🥸','😎','🤓','🧐','😕','🫤','😟','🙁','😮','😯','😲','😳','🥺','🥹','😦',
    '😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤',
    '😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖',
  ],
  'Gestures': [
    '👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌️','🤞','🫰',
    '🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛',
    '🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦿','🦵',
  ],
  'Hearts': [
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','❣️','💕',
    '💞','💓','💗','💖','💘','💝','💟',
  ],
  'Animals': [
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷',
    '🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉',
    '🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳',
    '🦟','🦗','🕷️','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈',
  ],
  'Food': [
    '🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥',
    '🥝','🍅','🍆','🥑','🥦','🥬','🌶️','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠',
    '🍕','🍔','🍟','🌭','🍿','🧀','🥚','🍳','🥞','🧇','🥓','🥩','🍗','🍖','🌮',
    '🌯','🫔','🥙','🧆','🥗','🥘','🫕','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪',
  ],
  'Travel': [
    '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍️',
    '🛵','🚲','🛴','🛹','🛼','🚁','🛩️','✈️','🛫','🛬','🚀','🛸','🚢','⛵','🚤',
    '🗼','🗽','⛩️','🏰','🏯','🗺️','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏞️',
  ],
  'Objects': [
    '⌚','📱','📲','💻','⌨️','🖥️','🖨️','🖱️','🖲️','💾','💿','📀','📷','📹','🎥',
    '📽️','📺','📻','🎙️','🎚️','🎛️','🧭','⏱️','⏲️','⏰','🕰️','⌛','⏳','📡','🔋',
    '🔌','💡','🔦','🕯️','🧯','🛢️','💰','💸','💵','💴','💶','💷','🪙','💳','💎',
  ],
  'Symbols': [
    '❤️','💯','💢','💥','💫','💦','💨','🕳️','💬','🗨️','🗯️','💭','💤','🔴','🟠',
    '🟡','🟢','🔵','🟣','🟤','⚫','⚪','🟥','🟧','🟨','🟩','🟦','🟪','🟫','⬛',
    '⬜','◼️','◻️','▪️','▫️','🔶','🔷','🔸','🔹','🔺','🔻','💠','🔘','🔳','🔲',
    '✅','❌','❎','➕','➖','➗','✖️','♾️','‼️','⁉️','❓','❔','❕','❗','〰️',
  ],
}

export default function EmojiPicker() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Smileys')
  const [copied, setCopied] = useState<string | null>(null)
  const [recent, setRecent] = useState<string[]>([])

  const categories = Object.keys(EMOJI_DATA)

  const filteredEmojis = useMemo(() => {
    if (!search.trim()) {
      return EMOJI_DATA[selectedCategory] || []
    }
    // When searching, look across all categories
    const results: string[] = []
    for (const emojis of Object.values(EMOJI_DATA)) {
      results.push(...emojis)
    }
    return results
  }, [search, selectedCategory])

  const copyEmoji = async (emoji: string) => {
    await navigator.clipboard.writeText(emoji)
    setCopied(emoji)
    setTimeout(() => setCopied(null), 1500)

    setRecent((prev) => {
      const updated = [emoji, ...prev.filter((e) => e !== emoji)].slice(0, 20)
      return updated
    })
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <input
          type="text"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search emojis... (browse by category below)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search emojis"
        />
      </div>

      {/* Recently used */}
      {recent.length > 0 && !search && (
        <div>
          <label className="block text-sm font-medium mb-2">Recently Used</label>
          <div className="flex flex-wrap gap-1">
            {recent.map((emoji, i) => (
              <button
                key={`recent-${i}`}
                onClick={() => copyEmoji(emoji)}
                className="w-10 h-10 flex items-center justify-center text-xl rounded-lg hover:bg-accent transition-colors"
                title="Click to copy"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      {!search && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Emoji grid */}
      <div className="rounded-lg border p-3 max-h-[400px] overflow-y-auto">
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1">
          {filteredEmojis.map((emoji, i) => (
            <button
              key={`${emoji}-${i}`}
              onClick={() => copyEmoji(emoji)}
              className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg hover:bg-accent transition-colors ${
                copied === emoji ? 'bg-primary/10 ring-2 ring-primary' : ''
              }`}
              title="Click to copy"
              aria-label={`Copy ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
        {filteredEmojis.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No emojis found</p>
        )}
      </div>

      {/* Status */}
      <div className="text-center">
        {copied ? (
          <p className="text-sm text-primary font-medium">
            {copied} copied to clipboard!
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click any emoji to copy it to your clipboard
          </p>
        )}
      </div>
    </div>
  )
}
