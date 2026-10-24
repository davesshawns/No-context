import { useEffect, useRef } from 'react'
import { BatteryFull, ChevronLeft, Plus, SendHorizontal, Signal, Wifi } from 'lucide-react'
import { ChatHeader, MessageList } from '../chat/ChatThread.jsx'
import FictionalBadge from '../ui/FictionalBadge.jsx'

function statusTime(messages) {
  const t = messages.at(-1)?.time ?? ''
  return t.match(/\d{1,2}:\d{2}/)?.[0] ?? '9:41'
}

export default function PhonePreview({ chat }) {
  const scroller = useRef(null)
  const mounted = useRef(false)
  const count = chat.messages.length
  const initialCount = useRef(count) // only bubbles added after opening animate in

  // Keep the newest message in view: jump on open, glide as the chat grows.
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: mounted.current ? 'smooth' : 'instant' })
    mounted.current = true
  }, [count])

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-violet/35 via-fuchsia/15 to-transparent blur-3xl" />
      <div className="rounded-[3rem] bg-gradient-to-b from-ink-600 to-ink-800 p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative flex h-[min(720px,calc(100dvh-10rem))] min-h-[520px] flex-col overflow-hidden rounded-[2.4rem] bg-ink-900">
          {/* status bar */}
          <div className="relative flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-[12px] font-semibold">
            <span>{statusTime(chat.messages)}</span>
            <span className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <Signal size={13} /> <Wifi size={13} /> <BatteryFull size={16} />
            </span>
          </div>
          {/* header */}
          <div className="flex shrink-0 items-center gap-1 border-b border-ink-800 px-3 pb-3">
            <ChevronLeft size={22} className="text-lime" aria-hidden="true" />
            <ChatHeader chat={chat} />
          </div>
          {/* messages */}
          <div ref={scroller} className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-4 flex justify-center">
              <FictionalBadge />
            </div>
            {count === 0 ? (
              <div className="flex h-[70%] flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="font-display text-lg font-bold">No messages yet</p>
                <p className="text-sm text-ink-400">Add one to start the drama.</p>
              </div>
            ) : (
              <MessageList chat={chat} animateFrom={initialCount.current} />
            )}
          </div>
          {/* composer (decorative) */}
          <div className="flex shrink-0 items-center gap-2 border-t border-ink-800 px-3 py-3" aria-hidden="true">
            <span className="flex size-8 items-center justify-center rounded-full bg-ink-800 text-ink-300">
              <Plus size={16} />
            </span>
            <span className="flex-1 truncate rounded-full bg-ink-800 px-4 py-2 text-[13px] text-ink-400">say something unhinged…</span>
            <span className="flex size-8 items-center justify-center rounded-full bg-lime text-ink-950">
              <SendHorizontal size={15} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
