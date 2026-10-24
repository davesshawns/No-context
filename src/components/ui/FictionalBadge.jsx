import { Sparkles } from 'lucide-react'

export default function FictionalBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-violet/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-200 ring-1 ring-inset ring-violet/40 ${className}`}
    >
      <Sparkles size={11} aria-hidden="true" />
      Fictional
    </span>
  )
}
