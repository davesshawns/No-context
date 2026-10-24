import { useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router'
import { FileQuestion, Eye, PencilLine } from 'lucide-react'
import PhonePreview from '../components/lab/PhonePreview.jsx'
import ExportCard from '../components/lab/ExportCard.jsx'
import LabToolbar from '../components/lab/LabToolbar.jsx'
import ParticipantEditor from '../components/lab/ParticipantEditor.jsx'
import MessageEditor from '../components/lab/MessageEditor.jsx'
import FictionalBadge from '../components/ui/FictionalBadge.jsx'
import Button from '../components/ui/Button.jsx'
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx'
import { createBlank, createFromScenario, initialsFrom, nextColor, nextSender, nextTime, uid } from '../lib/creations.js'
import { exportChat } from '../lib/exportChat.js'
import { useToast } from '../state/ToastContext.jsx'
import { getScenario } from '../data/scenarios.js'

function resolveInitial(id, scenarioId) {
  if (id) return null // saved creations arrive with My Creations (slice 4)
  if (scenarioId) return createFromScenario(scenarioId)
  return createBlank()
}

// Route wrapper. The lab remounts on a fresh navigation (new location key),
// but keeps its state when we only rewrite the URL (state.session is carried).
export default function ChatLabPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const location = useLocation()
  const session = location.state?.session ?? location.key
  return <ChatLab key={session} id={id} scenarioId={params.get('scenario')} />
}

function Section({ title, children, aside }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-400">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

function ChatLab({ id, scenarioId }) {
  const [chat, setChat] = useState(() => resolveInitial(id, scenarioId))
  const [confirm, setConfirm] = useState(null)
  const [mobileView, setMobileView] = useState('edit')
  const [focusId, setFocusId] = useState(null)
  const exportRef = useRef(null)
  const navigate = useNavigate()
  const toast = useToast()

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

  // Every edit goes through here: copy-on-write, never touching the scenario template.
  const update = (fn) => setChat((c) => ({ ...fn(c), updatedAt: Date.now() }))

  const changeParticipant = (pid, patch) =>
    update((c) => ({
      ...c,
      participants: c.participants.map((p) => {
        if (p.id !== pid) return p
        const next = { ...p, ...patch }
        // Initials follow the name until the user customises them.
        if ('name' in patch && p.initials === initialsFrom(p.name)) next.initials = initialsFrom(patch.name)
        return next
      }),
    }))

  const setMe = (pid) => update((c) => ({ ...c, participants: c.participants.map((p) => ({ ...p, isMe: p.id === pid })) }))

  const addParticipant = () =>
    update((c) => {
      const name = `Person ${c.participants.length + 1}`
      return {
        ...c,
        participants: [...c.participants, { id: uid('p'), name, initials: initialsFrom(name), color: nextColor(c.participants), isMe: false }],
      }
    })

  const removeParticipant = (p) => {
    const count = chat.messages.filter((m) => m.senderId === p.id).length
    setConfirm({
      title: `Remove ${p.name}?`,
      body: count ? `Their ${count} message${count === 1 ? '' : 's'} will be deleted too.` : 'They haven’t said anything yet.',
      confirmLabel: 'Remove',
      danger: true,
      onConfirm: () =>
        update((c) => ({
          ...c,
          participants: c.participants.filter((x) => x.id !== p.id),
          messages: c.messages.filter((m) => m.senderId !== p.id),
        })),
    })
  }

  const changeMessage = (mid, patch) =>
    update((c) => ({ ...c, messages: c.messages.map((m) => (m.id === mid ? { ...m, ...patch } : m)) }))

  const deleteMessage = (mid) => update((c) => ({ ...c, messages: c.messages.filter((m) => m.id !== mid) }))

  const addMessage = (senderId) => {
    const mid = uid('m')
    update((c) => ({
      ...c,
      messages: [...c.messages, { id: mid, senderId: senderId ?? nextSender(c), text: '', time: nextTime(c.messages.at(-1)?.time) }],
    }))
    setFocusId(mid)
  }

  const reset = () =>
    setConfirm({
      title: scenario ? 'Reset to the original scenario?' : 'Clear all messages?',
      body: scenario ? 'Your edits to this chat will be replaced with the original script.' : 'Every message in this chat will be removed.',
      confirmLabel: 'Reset',
      danger: true,
      onConfirm: () =>
        update((c) => {
          if (!scenario) return { ...c, messages: [] }
          const fresh = createFromScenario(scenario.id)
          return { ...c, chatName: fresh.chatName, participants: fresh.participants, messages: fresh.messages, showSeen: fresh.showSeen }
        }),
    })

  async function handleExport() {
    try {
      await exportChat(exportRef.current, chat)
      toast('Saved to your downloads')
    } catch (err) {
      console.warn('Export failed', err)
      toast('Export failed — try again', 'error')
    }
  }

  const toggle = (
    <div className="grid grid-cols-2 rounded-full bg-ink-900 p-1 ring-1 ring-inset ring-ink-800 lg:hidden" role="tablist" aria-label="Chat Lab view">
      {[
        ['edit', 'Edit', PencilLine],
        ['preview', 'Preview', Eye],
      ].map(([key, label, Icon]) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={mobileView === key}
          onClick={() => setMobileView(key)}
          className={`flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-all ${
            mobileView === key ? 'bg-lime text-ink-950' : 'text-ink-300'
          }`}
        >
          <Icon size={15} /> {label}
        </button>
      ))}
    </div>
  )

  return (
    <div className="mx-auto grid max-w-7xl gap-x-12 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-12">
      <div className="min-w-0 lg:col-start-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{chat.name}</h1>
          <FictionalBadge />
        </div>
        <p className="mt-2 text-ink-300">{scenario ? scenario.premise : 'A blank chat. Your drama, your rules.'}</p>
        <div className="mt-6">
          <LabToolbar
            canExport={chat.messages.length > 0}
            onExport={handleExport}
            onNew={() => navigate('/lab/new')}
            onReset={reset}
            resetLabel={scenario ? 'Reset' : 'Clear'}
          />
        </div>
        <div className="mt-6">{toggle}</div>
      </div>

      <div className={`min-w-0 lg:col-start-1 ${mobileView === 'edit' ? '' : 'hidden lg:block'}`}>
        <Section title="Chat">
          <div className="flex flex-col gap-3 rounded-2xl bg-ink-900 p-3 ring-1 ring-inset ring-ink-800 sm:flex-row sm:items-center">
            <label className="flex min-w-0 flex-1 items-center gap-2">
              <span className="shrink-0 pl-1 text-sm text-ink-400">Chat name</span>
              <input
                value={chat.chatName}
                onChange={(e) => update((c) => ({ ...c, chatName: e.target.value }))}
                maxLength={40}
                className="min-w-0 flex-1 rounded-xl bg-ink-800 px-3 py-2 font-semibold outline-none ring-lime/60 focus:ring-2"
              />
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 pl-1 text-sm text-ink-300">
              <input
                type="checkbox"
                checked={chat.showSeen}
                onChange={(e) => update((c) => ({ ...c, showSeen: e.target.checked }))}
                className="peer sr-only"
              />
              <span className="relative h-6 w-10 rounded-full bg-ink-700 transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-paper after:transition-transform peer-checked:bg-lime peer-checked:after:translate-x-4 peer-checked:after:bg-ink-950 peer-focus-visible:ring-2 peer-focus-visible:ring-lime" />
              Show “Seen”
            </label>
          </div>
        </Section>

        <Section title={`People · ${chat.participants.length}`}>
          <ParticipantEditor
            participants={chat.participants}
            onChange={changeParticipant}
            onSetMe={setMe}
            onAdd={addParticipant}
            onRemove={removeParticipant}
          />
        </Section>

        <Section title={`Messages · ${chat.messages.length}`}>
          <MessageEditor chat={chat} onChange={changeMessage} onDelete={deleteMessage} onAdd={addMessage} focusId={focusId} />
        </Section>
      </div>

      <aside
        className={`mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:sticky lg:top-24 lg:self-start ${
          mobileView === 'preview' ? '' : 'hidden lg:block'
        }`}
      >
        <PhonePreview chat={chat} />
      </aside>

      <ExportCard ref={exportRef} chat={chat} />
      <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />
    </div>
  )
}
