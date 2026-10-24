import { getScenario } from '../data/scenarios.js'
import { COLOR_KEYS } from '../data/palette.js'

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-3)}`
}

export function initialsFrom(name) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

export function createBlank() {
  const now = Date.now()
  return {
    id: uid('c'),
    name: 'Untitled chat',
    scenarioId: null,
    chatName: 'New chat ✨',
    participants: [
      { id: uid('p'), name: 'You', initials: 'YO', color: 'lime', isMe: true },
      { id: uid('p'), name: 'Alex', initials: 'AL', color: 'violet', isMe: false },
    ],
    messages: [],
    showSeen: false,
    createdAt: now,
    updatedAt: now,
  }
}

// Deep copy so the scenario template is never mutated.
export function createFromScenario(scenarioId) {
  const s = getScenario(scenarioId)
  if (!s) return null
  const now = Date.now()
  return {
    id: uid('c'),
    name: s.title.replace(/[“”]/g, ''),
    scenarioId: s.id,
    chatName: s.chatName,
    participants: structuredClone(s.participants),
    messages: structuredClone(s.messages),
    showSeen: s.showSeen,
    createdAt: now,
    updatedAt: now,
  }
}

export function nextColor(participants) {
  const used = new Set(participants.map((p) => p.color))
  return COLOR_KEYS.find((k) => !used.has(k)) ?? 'slate'
}
