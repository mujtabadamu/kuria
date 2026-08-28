import { useEffect, useRef, useState } from 'react'
import { MoreVertical, type LucideIcon } from 'lucide-react'

export interface DropdownMenuItem {
  label: string
  icon?: LucideIcon
  onClick: () => void
  tone?: 'default' | 'danger' | 'success'
}

const toneClasses: Record<NonNullable<DropdownMenuItem['tone']>, string> = {
  default: 'text-primary hover:bg-neutral',
  danger: 'text-danger hover:bg-danger/10',
  success: 'text-success hover:bg-success/10',
}

export function DropdownMenu({ items, label = 'Open actions menu' }: { items: DropdownMenuItem[]; label?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary/30 text-secondary hover:bg-neutral hover:text-primary"
      >
        <MoreVertical size={18} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-lg border border-secondary/30 bg-surface py-1 shadow-lg"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false)
                item.onClick()
              }}
              className={`flex min-h-[40px] w-full items-center gap-2.5 px-3 text-left text-sm font-semibold ${toneClasses[item.tone ?? 'default']}`}
            >
              {item.icon && <item.icon size={16} aria-hidden="true" />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
