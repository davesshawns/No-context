import { colorOf } from '../../data/palette.js'

export default function Avatar({ participant, size = 28, className = '' }) {
  const c = colorOf(participant.color)
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold ${className}`}
      style={{ width: size, height: size, background: c.hex, color: c.ink, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {participant.initials || '?'}
    </span>
  )
}
