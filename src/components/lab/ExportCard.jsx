import { forwardRef } from 'react'
import { ChatHeader, MessageList } from '../chat/ChatThread.jsx'
import Wordmark from '../layout/Wordmark.jsx'

// The frame-less image that gets exported. The outer wrapper sits off-screen;
// the inner node (ref) is what html-to-image captures, so it stays in normal flow.
const ExportCard = forwardRef(function ExportCard({ chat }, ref) {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', left: -10000, top: 0, pointerEvents: 'none' }}>
      <div
        ref={ref}
        className="w-[440px] p-6 font-sans text-paper"
        style={{
          background:
            'radial-gradient(120% 60% at 100% 0%, rgba(124,58,237,0.38), transparent 60%), radial-gradient(90% 50% at 0% 100%, rgba(192,38,211,0.22), transparent 60%), #0a0a0c',
        }}
      >
        <div className="overflow-hidden rounded-[28px] bg-ink-900 ring-1 ring-ink-700">
          <div className="border-b border-ink-800 px-4 py-3.5">
            <ChatHeader chat={chat} />
          </div>
          <div className="px-3.5 py-4">
            <MessageList chat={chat} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between px-1">
          <Wordmark size="sm" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">Fictional conversation</span>
        </div>
      </div>
    </div>
  )
})

export default ExportCard
