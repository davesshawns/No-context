import { Link } from 'react-router'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 select-none ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ' +
  'disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40'

const variants = {
  primary: 'bg-lime text-ink-950 shadow-[0_8px_30px_-8px_rgba(198,255,0,0.55)] hover:bg-lime-soft',
  secondary: 'bg-ink-800 text-paper ring-1 ring-inset ring-ink-700 hover:bg-ink-700',
  ghost: 'text-ink-300 hover:bg-ink-800 hover:text-paper',
  danger: 'bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30 hover:bg-rose-500/25',
}

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

export default function Button({ to, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}
