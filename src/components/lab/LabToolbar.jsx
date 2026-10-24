import { useState } from 'react'
import { Download, FilePlus2, LoaderCircle, RotateCcw } from 'lucide-react'
import Button from '../ui/Button.jsx'

export default function LabToolbar({ canExport, onExport, onNew, onReset, resetLabel = 'Reset' }) {
  const [busy, setBusy] = useState(false)

  async function handleExport() {
    setBusy(true)
    try {
      await onExport()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={handleExport} disabled={!canExport || busy} title={canExport ? 'Download as PNG' : 'Add a message to export'}>
        {busy ? <LoaderCircle size={17} className="animate-spin" /> : <Download size={17} strokeWidth={2.5} />}
        {busy ? 'Exporting…' : 'Export PNG'}
      </Button>
      <Button variant="secondary" onClick={onNew}>
        <FilePlus2 size={16} /> New
      </Button>
      <Button variant="ghost" onClick={onReset}>
        <RotateCcw size={16} /> {resetLabel}
      </Button>
      {!canExport && <span className="w-full text-xs text-ink-400 sm:w-auto">Add a message to export</span>}
    </div>
  )
}
