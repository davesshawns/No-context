import { CATEGORIES } from '../../data/palette.js'

export default function CategoryFilter({ value, onChange, counts }) {
  const options = [{ id: 'all', label: 'All', emoji: '✦' }, ...CATEGORIES]
  return (
    <div role="group" aria-label="Filter scenarios by category" className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((c) => {
        const active = value === c.id
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 ${
              active ? 'bg-lime text-ink-950' : 'bg-ink-900 text-ink-300 ring-1 ring-inset ring-ink-700 hover:text-paper hover:ring-ink-600'
            }`}
          >
            <span aria-hidden="true">{c.emoji}</span>
            {c.label}
            <span className={`text-xs ${active ? 'text-ink-950/60' : 'text-ink-400'}`}>{counts[c.id] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}
