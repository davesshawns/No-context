import { useEffect, useRef } from 'react'
import Button from './Button.jsx'

// Accessible confirm modal built on <dialog> (focus trap + Esc for free).
export default function ConfirmDialog({ request, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const d = ref.current
    if (request && !d.open) d.showModal()
    if (!request && d.open) d.close()
  }, [request])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-ink-900 p-0 text-paper ring-1 ring-ink-700 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-rise"
    >
      {request && (
        <div className="p-6">
          <h2 className="font-display text-xl font-bold">{request.title}</h2>
          {request.body && <p className="mt-2 text-sm leading-relaxed text-ink-300">{request.body}</p>}
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} autoFocus>
              Cancel
            </Button>
            <Button
              variant={request.danger ? 'danger' : 'primary'}
              size="sm"
              onClick={() => {
                request.onConfirm()
                onClose()
              }}
            >
              {request.confirmLabel ?? 'Confirm'}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  )
}
