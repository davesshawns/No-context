import { ArrowDown, Plus } from 'lucide-react'
import Wordmark from '../layout/Wordmark.jsx'
import Button from '../ui/Button.jsx'

const floaters = [
  { text: 'we need to talk', side: 'left', rot: '-rotate-3', delay: '0ms' },
  { text: 'oh no', side: 'right', rot: 'rotate-2', delay: '120ms' },
  { text: 'where do you want to get dinner', side: 'left', rot: 'rotate-1', delay: '240ms' },
  { text: '😭😭😭', side: 'right', rot: '-rotate-2', delay: '360ms' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet/30 via-fuchsia/20 to-violet/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:pb-24">
        <div>
          <p className="mb-6 flex w-fit items-center gap-2 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1 text-xs font-medium text-ink-300">
            <span className="size-1.5 rounded-full bg-lime" /> fictional chats · real feelings
          </p>
          <h1 className="sr-only">NO CONTEXT</h1>
          <div><Wordmark size="lg" /></div>
          <p className="mt-8 max-w-xl font-display text-2xl font-semibold leading-tight text-paper sm:text-3xl">
            Screenshots of chats that <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">never happened</span>.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-300">
            Pick a painfully relatable scenario, make it yours, and export the screenshot for the group chat. 100% fictional. 0% context.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/lab/new" size="lg">
              <Plus size={18} strokeWidth={2.5} /> Create a chat
            </Button>
            <Button variant="secondary" size="lg" onClick={(e) => { e.preventDefault(); document.getElementById('scenarios')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Browse scenarios <ArrowDown size={16} />
            </Button>
          </div>
        </div>
        <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-sm flex-col gap-3 sm:flex">
          {floaters.map((f) => (
            <div
              key={f.text}
              style={{ animationDelay: f.delay }}
              className={`animate-rise ${f.rot} max-w-[80%] rounded-[22px] px-5 py-3 text-lg font-medium shadow-2xl ${
                f.side === 'right'
                  ? 'self-end rounded-br-[6px] bg-lime text-ink-950'
                  : 'self-start rounded-bl-[6px] bg-ink-800 text-paper ring-1 ring-violet/40'
              }`}
            >
              {f.text}
            </div>
          ))}
          <span className="mt-2 self-center text-xs uppercase tracking-[0.2em] text-ink-400">seen 6:09 pm</span>
        </div>
      </div>
    </section>
  )
}
