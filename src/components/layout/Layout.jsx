import { Outlet } from 'react-router'
import TopNav from './TopNav.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopNav />
      <main className="flex-1 overflow-x-clip">
        <Outlet />
      </main>
      <footer className="border-t border-ink-800/80 px-4 py-6 text-center text-xs text-ink-400">
        Every chat made here is <span className="font-semibold text-ink-300">fictional</span>. Not evidence, not real people — just vibes.
      </footer>
    </div>
  )
}
