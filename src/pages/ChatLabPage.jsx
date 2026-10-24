import { useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { FileQuestion } from 'lucide-react'
import PhonePreview from '../components/lab/PhonePreview.jsx'
import ExportCard from '../components/lab/ExportCard.jsx'
import LabToolbar from '../components/lab/LabToolbar.jsx'
import { exportChat } from '../lib/exportChat.js'
import { useToast } from '../state/ToastContext.jsx'
import FictionalBadge from '../components/ui/FictionalBadge.jsx'
import Button from '../components/ui/Button.jsx'
import { createBlank, createFromScenario } from '../lib/creations.js'
import { getScenario } from '../data/scenarios.js'

function resolveInitial(id, scenarioId) {
  if (id) return null // saved creations arrive with My Creations (slice 4)
  if (scenarioId) return createFromScenario(scenarioId)
  return createBlank()
}

// Route wrapper: remount the lab whenever the target chat changes.
export default function ChatLabPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const scenarioId = params.get('scenario')
  return <ChatLab key={`${id ?? 'new'}:${scenarioId ?? ''}`} id={id} scenarioId={scenarioId} />
}

function ChatLab({ id, scenarioId }) {
  const [chat] = useState(() => resolveInitial(id, scenarioId))
  const exportRef = useRef(null)
  const toast = useToast()

  async function handleExport() {
    try {
      await exportChat(exportRef.current, chat)
      toast('Saved to your downloads')
    } catch (err) {
      console.warn('Export failed', err)
      toast('Export failed — try again', 'error')
    }
  }

  if (!chat) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <FileQuestion size={40} className="text-ink-400" />
        <h1 className="font-display text-2xl font-bold">This chat doesn’t exist (anymore?)</h1>
        <p className="text-ink-300">It may have been deleted, or the link is wrong.</p>
        <div className="flex gap-3">
          <Button to="/" variant="secondary">Browse scenarios</Button>
          <Button to="/lab/new">Create a chat</Button>
        </div>
      </div>
    )
  }

  const scenario = chat.scenarioId ? getScenario(chat.scenarioId) : null

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-12">
      <section className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{chat.name}</h1>
          <FictionalBadge />
        </div>
        <p className="mt-2 text-ink-300">{scenario ? scenario.premise : 'A blank chat. Your drama, your rules.'}</p>
        <div className="mt-6">
          <LabToolbar canExport={chat.messages.length > 0} onExport={handleExport} />
        </div>
      </section>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <PhonePreview chat={chat} />
      </aside>
      <ExportCard ref={exportRef} chat={chat} />
    </div>
  )
}
