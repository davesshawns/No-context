import Button from '../components/ui/Button.jsx'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-28 text-center">
      <p className="font-display text-7xl font-bold text-lime">404</p>
      <h1 className="font-display text-2xl font-bold">No context for this page either.</h1>
      <p className="text-ink-300">This link leads nowhere. Like the group trip.</p>
      <Button to="/">Back to Discover</Button>
    </div>
  )
}
