import { useLayoutEffect, useRef } from 'react'

// Textarea that grows with its content (works in every browser).
export default function AutoTextarea({ value, className = '', inputRef, ...props }) {
  const local = useRef(null)
  const ref = inputRef ?? local
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value, ref])
  return <textarea ref={ref} rows={1} value={value} className={`resize-none overflow-hidden ${className}`} {...props} />
}
