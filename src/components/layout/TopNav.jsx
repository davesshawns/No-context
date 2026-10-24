import { Link, NavLink } from 'react-router'
import { MessagesSquare, FolderHeart, Compass } from 'lucide-react'
import Wordmark from './Wordmark.jsx'

const links = [
  { to: '/', label: 'Discover', icon: Compass, end: true },
  { to: '/lab', label: 'Chat Lab', icon: MessagesSquare },
  { to: '/creations', label: 'My Creations', icon: FolderHeart },
]

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" aria-label="NO CONTEXT home" className="rounded-lg transition-transform hover:scale-[1.03] active:scale-95">
          <Wordmark size="sm" className="sm:text-xl" />
        </Link>
        <ul className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-lime text-ink-950' : 'text-ink-300 hover:bg-ink-800 hover:text-paper'
                  }`
                }
              >
                <Icon size={16} strokeWidth={2.25} aria-hidden="true" />
                <span className={to === '/' ? 'hidden md:inline' : 'hidden sm:inline'}>{label}</span>
                <span className="sr-only sm:hidden">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
