// Curated bubble colours that stay readable on the dark UI.
// `hex` fills Me's bubbles and avatars; `ink` is the text colour on top of it.
export const BUBBLE_COLORS = {
  lime: { label: 'Lime', hex: '#c6ff00', ink: '#0a0a0c' },
  violet: { label: 'Violet', hex: '#8b5cf6', ink: '#ffffff' },
  sky: { label: 'Sky', hex: '#38bdf8', ink: '#04121c' },
  coral: { label: 'Coral', hex: '#fb7185', ink: '#1f0509' },
  amber: { label: 'Amber', hex: '#fbbf24', ink: '#1c1202' },
  mint: { label: 'Mint', hex: '#34d399', ink: '#03140d' },
  pink: { label: 'Pink', hex: '#f472b6', ink: '#1f0414' },
  slate: { label: 'Slate', hex: '#a1a1aa', ink: '#0a0a0c' },
}

export const COLOR_KEYS = Object.keys(BUBBLE_COLORS)

export function colorOf(key) {
  return BUBBLE_COLORS[key] ?? BUBBLE_COLORS.slate
}

// Blend a hex colour into a dark base — used for other people's tinted bubbles.
// Computed in JS (not CSS color-mix) so PNG export renders it identically.
export function tint(hex, amount, base = '#16161b') {
  const parse = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const a = parse(hex)
  const b = parse(base)
  const mixed = a.map((v, i) => Math.round(v * amount + b[i] * (1 - amount)))
  return `rgb(${mixed.join(', ')})`
}

export const CATEGORIES = [
  { id: 'friends', label: 'Friends', emoji: '🫶', color: 'lime' },
  { id: 'relationships', label: 'Relationships', emoji: '💘', color: 'pink' },
  { id: 'group', label: 'Group Chats', emoji: '🔥', color: 'violet' },
  { id: 'work', label: 'Uni & Work', emoji: '📎', color: 'amber' },
  { id: 'family', label: 'Family', emoji: '🏡', color: 'mint' },
]

export function categoryOf(id) {
  return CATEGORIES.find((c) => c.id === id)
}
