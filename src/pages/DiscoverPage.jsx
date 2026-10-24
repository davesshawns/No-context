import { useMemo, useState } from 'react'
import Hero from '../components/discover/Hero.jsx'
import CategoryFilter from '../components/discover/CategoryFilter.jsx'
import ScenarioCard from '../components/discover/ScenarioCard.jsx'
import { SCENARIOS } from '../data/scenarios.js'

export default function DiscoverPage() {
  const [category, setCategory] = useState('all')

  const counts = useMemo(() => {
    const c = { all: SCENARIOS.length }
    for (const s of SCENARIOS) c[s.category] = (c[s.category] ?? 0) + 1
    return c
  }, [])

  const visible = category === 'all' ? SCENARIOS : SCENARIOS.filter((s) => s.category === category)

  return (
    <>
      <Hero />
      <section id="scenarios" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-24 sm:px-6">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Pick your situation</h2>
            <p className="mt-2 text-ink-300">Eight scenarios. All fictional. All painfully familiar.</p>
          </div>
          <CategoryFilter value={category} onChange={setCategory} counts={counts} />
        </div>
        <div key={category} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" data-testid="scenario-grid">
          {visible.map((s, i) => (
            <ScenarioCard key={s.id} scenario={s} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
