import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-secondary/30 bg-surface p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-secondary hover:bg-neutral"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
