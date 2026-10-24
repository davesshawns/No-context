import { useEffect, useRef } from 'react'
import { MessageSquarePlus, Trash2 } from 'lucide-react'
import { colorOf } from '../../data/palette.js'
import AutoTextarea from '../ui/AutoTextarea.jsx'
import IconButton from '../ui/IconButton.jsx'

export default function MessageEditor({ chat, onChange, onDelete, onAdd, focusId }) {
  const byId = Object.fromEntries(chat.participants.map((p) => [p.id, p]))
  const focusRef = useRef(null)

  // Focus the text of a newly added message.
  useEffect(() => {
    focusRef.current?.focus()
  }, [focusId])

  return (
    <div className="flex flex-col gap-2">
      {chat.messages.length === 0 && (
        <p className="rounded-2xl border border-dashed border-ink-700 px-4 py-6 text-center text-sm text-ink-400">
          No messages yet. Pick who speaks first below.
        </p>
      )}
      {chat.messages.map((msg) => {
        const sender = byId[msg.senderId]
        const c = colorOf(sender?.color)
        return (
          <div
            key={msg.id}
            data-testid="message-row"
            className="group flex animate-fade gap-2 rounded-2xl bg-ink-900 p-2.5 ring-1 ring-inset ring-ink-800 transition-colors focus-within:ring-ink-600"
            style={{ boxShadow: `inset 3px 0 0 ${c.hex}` }}
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <select
                  aria-label="Sender"
                  value={msg.senderId}
                  onChange={(e) => onChange(msg.id, { senderId: e.target.value })}
                  className="max-w-[60%] cursor-pointer truncate rounded-lg bg-ink-800 px-2 py-1 text-xs font-bold outline-none ring-lime/60 focus:ring-2"
                  style={{ color: c.hex }}
                >
                  {chat.participants.map((p) => (
                    <option key={p.id} value={p.id} className="bg-ink-900 text-paper">
                      {p.name}{p.isMe ? ' (Me)' : ''}
                    </option>
                  ))}
                </select>
                <input
                  aria-label="Time"
                  value={msg.time}
                  onChange={(e) => onChange(msg.id, { time: e.target.value })}
                  maxLength={20}
                  className="ml-auto w-28 rounded-lg bg-transparent px-2 py-1 text-right text-xs text-ink-400 outline-none ring-lime/60 focus:bg-ink-800 focus:ring-2"
                />
              </div>
              <AutoTextarea
                aria-label="Message text"
                value={msg.text}
                inputRef={msg.id === focusId ? focusRef : undefined}
                onChange={(e) => onChange(msg.id, { text: e.target.value })}
                placeholder="Type the message…"
                maxLength={500}
                className="w-full rounded-xl bg-transparent px-2 py-1 text-[15px] leading-snug outline-none ring-lime/60 placeholder:text-ink-600 focus:bg-ink-800 focus:ring-2"
              />
            </div>
            <IconButton label="Delete message" onClick={() => onDelete(msg.id)} className="hover:text-rose-300">
              <Trash2 size={16} />
            </IconButton>
          </div>
        )
      })}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onAdd()}
          className="flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-xs font-bold text-ink-950 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <MessageSquarePlus size={14} /> Add message
        </button>
        <span className="text-xs text-ink-400">or as</span>
        {chat.participants.map((p) => {
          const c = colorOf(p.color)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onAdd(p.id)}
              className="rounded-full px-3 py-1.5 text-xs font-bold transition-all hover:-translate-y-0.5 active:scale-95"
              style={{ background: c.hex, color: c.ink }}
            >
              + {p.name || '?'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
