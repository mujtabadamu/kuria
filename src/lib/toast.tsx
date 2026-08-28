import { useCallback, useState, type ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { ToastContext } from './ToastContext'

interface ToastItem {
  id: number
  message: string
}

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string) => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-secondary/30 bg-surface px-4 py-2.5 text-sm font-semibold text-primary shadow-lg"
          >
            <CheckCircle2 size={16} className="shrink-0 text-success" aria-hidden="true" />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
