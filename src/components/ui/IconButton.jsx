export default function IconButton({ label, className = '', children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink-400 transition-all duration-150 hover:bg-ink-800 hover:text-paper active:scale-90 disabled:pointer-events-none disabled:opacity-30 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
