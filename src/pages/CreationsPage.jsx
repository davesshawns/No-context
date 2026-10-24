import { FolderHeart } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

export default function CreationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">My Creations</h1>
      <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-ink-700 px-6 py-16 text-center">
        <FolderHeart size={40} className="text-ink-400" />
        <p className="font-display text-xl font-bold">Nothing here yet</p>
        <p className="max-w-sm text-ink-300">Pick a scenario or start from scratch — your chats save here automatically.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/" variant="secondary">Browse scenarios</Button>
          <Button to="/lab/new">Create a chat</Button>
        </div>
      </div>
    </div>
  )
}
