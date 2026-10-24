import { Crown, Plus, Trash2 } from 'lucide-react'
import { BUBBLE_COLORS, COLOR_KEYS } from '../../data/palette.js'
import Avatar from '../chat/Avatar.jsx'
import IconButton from '../ui/IconButton.jsx'

const MAX_PEOPLE = 6

export default function ParticipantEditor({ participants, onChange, onSetMe, onAdd, onRemove }) {
  return (
    <div className="flex flex-col gap-3">
      {participants.map((p) => {
        const removeBlocked = participants.length <= 2 || p.isMe
        return (
          <div key={p.id} className="rounded-2xl bg-ink-900 p-3 ring-1 ring-inset ring-ink-800 transition-colors focus-within:ring-ink-600" data-testid="participant-row">
            <div className="flex items-center gap-2">
              <Avatar participant={p} size={36} />
              <input
                aria-label="Name"
                value={p.name}
                onChange={(e) => onChange(p.id, { name: e.target.value })}
                maxLength={24}
                className="min-w-0 flex-1 rounded-xl bg-transparent px-2 py-1.5 font-semibold outline-none ring-lime/60 transition focus:bg-ink-800 focus:ring-2"
              />
              <input
                aria-label={`Initials for ${p.name}`}
                value={p.initials}
                onChange={(e) => onChange(p.id, { initials: e.target.value.toUpperCase().slice(0, 2) })}
                className="w-12 rounded-xl bg-ink-800 px-2 py-1.5 text-center text-sm font-bold uppercase outline-none ring-lime/60 focus:ring-2"
              />
              <button
                type="button"
                onClick={() => onSetMe(p.id)}
                aria-pressed={p.isMe}
                title={p.isMe ? 'This is you — your messages appear on the right' : 'Make this person “Me”'}
                className={`flex h-8 shrink-0 items-center gap-1 rounded-full px-3 text-xs font-bold transition-all active:scale-95 ${
                  p.isMe ? 'bg-lime text-ink-950' : 'bg-ink-800 text-ink-400 hover:text-paper'
                }`}
              >
                {p.isMe && <Crown size={12} aria-hidden="true" />} Me
              </button>
              <IconButton
                label={p.isMe ? 'Choose someone else as Me before removing' : participants.length <= 2 ? 'A chat needs at least two people' : `Remove ${p.name}`}
                disabled={removeBlocked}
                onClick={() => onRemove(p)}
                className="hover:text-rose-300"
              >
                <Trash2 size={16} />
              </IconButton>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5 pl-11" role="radiogroup" aria-label={`Bubble colour for ${p.name}`}>
              {COLOR_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={p.color === key}
                  aria-label={BUBBLE_COLORS[key].label}
                  title={BUBBLE_COLORS[key].label}
                  onClick={() => onChange(p.id, { color: key })}
                  className={`size-6 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 ${
                    p.color === key ? 'ring-2 ring-paper ring-offset-2 ring-offset-ink-900' : ''
                  }`}
                  style={{ background: BUBBLE_COLORS[key].hex }}
                />
              ))}
            </div>
          </div>
        )
      })}
      <button
        type="button"
        onClick={onAdd}
        disabled={participants.length >= MAX_PEOPLE}
        className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-ink-700 py-3 text-sm font-semibold text-ink-300 transition-colors hover:border-lime/60 hover:text-lime disabled:pointer-events-none disabled:opacity-40"
      >
        <Plus size={16} /> {participants.length >= MAX_PEOPLE ? 'Max 6 people' : 'Add person'}
      </button>
    </div>
  )
}
