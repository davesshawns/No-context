import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { categoryOf, colorOf, tint } from '../../data/palette.js'

export default function ScenarioCard({ scenario, index = 0 }) {
  const cat = categoryOf(scenario.category)
  const accent = colorOf(cat.color).hex
  const byId = Object.fromEntries(scenario.participants.map((p) => [p.id, p]))
  const teaser = scenario.teaser.map((i) => scenario.messages[i])

  return (
    <article
      style={{ animationDelay: `${index * 60}ms` }}
      className="group relative flex animate-rise flex-col overflow-hidden rounded-3xl bg-ink-900 p-5 ring-1 ring-inset ring-ink-800 transition-all duration-300 hover:-translate-y-1 hover:ring-ink-600 hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.45)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-50" style={{ background: accent }} />
      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider" style={{ background: tint(accent, 0.18, '#111114'), color: accent }}>
        <span aria-hidden="true">{cat.emoji}</span> {cat.label}
      </span>
      <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">{scenario.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-300">{scenario.premise}</p>

      <div aria-hidden="true" className="mt-5 flex flex-1 flex-col justify-end gap-1.5 rounded-2xl bg-ink-950/60 p-3">
        {teaser.map((msg) => {
          const sender = byId[msg.senderId]
          const c = colorOf(sender.color)
          return (
            <span
              key={msg.id}
              className={`max-w-[85%] truncate rounded-2xl px-3 py-1.5 text-xs ${sender.isMe ? 'self-end rounded-br-md' : 'self-start rounded-bl-md'}`}
              style={sender.isMe ? { background: c.hex, color: c.ink } : { background: tint(c.hex, 0.22), color: '#f4f4f0' }}
            >
              {msg.text}
            </span>
          )
        })}
      </div>

      <Link
        to={`/lab/new?scenario=${scenario.id}`}
        className="mt-5 inline-flex items-center justify-between rounded-full bg-ink-800 px-4 py-2.5 text-sm font-semibold text-paper transition-all duration-200 group-hover:bg-lime group-hover:text-ink-950 active:scale-[0.98]"
      >
        Use scenario <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="absolute inset-0" aria-hidden="true" />
      </Link>
    </article>
  )
}
