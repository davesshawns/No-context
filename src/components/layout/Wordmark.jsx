// NO CONTEXT wordmark: "NO" + a lime "redaction sticker" for CONTEXT.
export default function Wordmark({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-base gap-1',
    md: 'text-xl gap-1.5',
    lg: 'text-5xl sm:text-7xl gap-3',
  }
  return (
    <span className={`inline-flex items-center font-display font-bold uppercase leading-none tracking-tight ${sizes[size]} ${className}`}>
      <span>No</span>
      <span className="-rotate-3 rounded-[0.3em] bg-lime px-[0.3em] py-[0.12em] text-ink-950 shadow-[0_0.15em_0_0_rgba(124,58,237,0.9)]">
        Context
      </span>
    </span>
  )
}
