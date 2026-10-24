import { colorOf } from '../../data/palette.js'
import Avatar from './Avatar.jsx'
import ChatBubble from './ChatBubble.jsx'

// Groups consecutive messages from the same sender with the same timestamp.
function toRuns(messages) {
  const runs = []
  for (const msg of messages) {
    const last = runs.at(-1)
    if (last && last.senderId === msg.senderId && last.time === msg.time) last.messages.push(msg)
    else runs.push({ senderId: msg.senderId, time: msg.time, messages: [msg] })
  }
  return runs
}

export function ChatHeader({ chat }) {
  const others = chat.participants.filter((p) => !p.isMe)
  const isGroup = chat.participants.length > 2
  const subtitle = isGroup
    ? chat.participants.map((p) => (p.isMe ? 'You' : p.name)).join(', ')
    : 'active now'
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {(isGroup ? others.slice(0, 3) : others.slice(0, 1)).map((p) => (
          <Avatar key={p.id} participant={p} size={isGroup ? 30 : 36} className="ring-2 ring-ink-900" />
        ))}
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-[15px] font-bold leading-tight text-paper">{chat.chatName || 'Untitled chat'}</p>
        <p className="truncate text-[11px] text-ink-400">{subtitle}</p>
      </div>
    </div>
  )
}

export function MessageList({ chat, animateFrom = Infinity }) {
  const byId = Object.fromEntries(chat.participants.map((p) => [p.id, p]))
  const isGroup = chat.participants.length > 2
  const runs = toRuns(chat.messages)
  const lastMeId = [...chat.messages].reverse().find((m) => byId[m.senderId]?.isMe)?.id
  let index = 0

  return (
    <div className="flex flex-col gap-3">
      {runs.map((run) => {
        const sender = byId[run.senderId]
        const isMe = !!sender?.isMe
        return (
          <div key={run.messages[0].id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : ''}`}>
            {!isMe && isGroup && sender && <Avatar participant={sender} size={24} />}
            <div className={`flex min-w-0 flex-1 flex-col gap-[3px] ${isMe ? 'items-end' : 'items-start'}`}>
              {!isMe && isGroup && sender && (
                <span className="pl-1 text-[11px] font-semibold" style={{ color: colorOf(sender.color).hex }}>
                  {sender.name}
                </span>
              )}
              {run.messages.map((msg, i) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  participant={sender}
                  isMe={isMe}
                  isFirst={i === 0}
                  animate={index++ >= animateFrom}
                />
              ))}
              <span className="px-1 text-[10px] text-ink-400">
                {run.time}
                {isMe && chat.showSeen && run.messages.some((msg) => msg.id === lastMeId) && (
                  <span className="font-semibold text-ink-300"> · Seen</span>
                )}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
