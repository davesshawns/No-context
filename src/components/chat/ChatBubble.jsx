import { colorOf, tint } from '../../data/palette.js'

// NO CONTEXT bubble style: squircle stacks. Me = solid colour on the right;
// others = colour-tinted dark bubbles on the left.
export default function ChatBubble({ message, participant, isMe, isFirst, animate }) {
  const c = colorOf(participant?.color)
  const style = isMe
    ? { background: c.hex, color: c.ink }
    : { background: tint(c.hex, 0.2), color: '#f4f4f0', boxShadow: `inset 0 0 0 1px ${tint(c.hex, 0.38)}` }
  const corners = isMe
    ? `rounded-[20px] rounded-br-[6px] ${isFirst ? '' : 'rounded-tr-[6px]'}`
    : `rounded-[20px] rounded-bl-[6px] ${isFirst ? '' : 'rounded-tl-[6px]'}`
  return (
    <div
      className={`max-w-[78%] whitespace-pre-wrap break-words px-3.5 py-2 text-[14px] leading-snug ${corners} ${
        animate ? 'animate-rise' : ''
      }`}
      style={style}
    >
      {message.text || <span className="opacity-50">…</span>}
    </div>
  )
}
