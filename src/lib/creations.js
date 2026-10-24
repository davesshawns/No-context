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

// "11:58 PM" + 1 minute → "11:59 PM". Anything unparseable (e.g. "Mar 3") is kept as-is.
export function nextTime(time) {
  const match = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(time ?? '')
  if (!match) {
    if (time) return time
    return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  let h = Number(match[1]) % 12
  if (match[3].toUpperCase() === 'PM') h += 12
  const total = (h * 60 + Number(match[2]) + 1) % (24 * 60)
  const hh = Math.floor(total / 60)
  const mm = String(total % 60).padStart(2, '0')
  return `${hh % 12 || 12}:${mm} ${hh < 12 ? 'AM' : 'PM'}`
}

// Rotate to the next participant after whoever spoke last.
export function nextSender(chat) {
  const ids = chat.participants.map((p) => p.id)
  const last = chat.messages.at(-1)?.senderId
  const i = ids.indexOf(last)
  return ids[(i + 1) % ids.length] ?? ids[0]
}
