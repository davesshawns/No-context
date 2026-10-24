import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'

const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const toast = useCallback((message, type = 'success') => {
    const id = ++nextId.current
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="flex animate-rise items-center gap-2.5 rounded-full bg-ink-800 py-2.5 pl-3.5 pr-5 text-sm font-medium shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] ring-1 ring-ink-700"
          >
            {t.type === 'error' ? (
              <CircleAlert size={18} className="text-rose-400" aria-hidden="true" />
            ) : (
              <CircleCheck size={18} className="text-lime" aria-hidden="true" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components
export function useToast() {
  return useContext(ToastContext)
}
