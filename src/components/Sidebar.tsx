import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Map,
  ShieldAlert,
  Users,
  GraduationCap,
  Settings,
  X,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/alerts', label: 'Alerts', icon: ShieldAlert },
  { to: '/fellows', label: 'Fellows', icon: Users },
  { to: '/voter-education', label: 'Voter Ed', icon: GraduationCap },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const STORAGE_KEY = 'kuria-sidebar-collapsed'

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const isDesktop = !onClose
  const [collapsed, setCollapsed] = useState(() => isDesktop && localStorage.getItem(STORAGE_KEY) === '1')
  const isCollapsed = isDesktop && collapsed

  function toggleCollapsed() {
    setCollapsed((v) => {
      localStorage.setItem(STORAGE_KEY, v ? '0' : '1')
      return !v
    })
  }

  return (
    <aside
      className={`flex h-full shrink-0 flex-col bg-chrome text-on-chrome transition-[width] duration-200 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`flex items-center py-5 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-5'}`}>
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tertiary text-white">
            K
          </span>
          {!isCollapsed && "Kuri'a"}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 md:hidden"
          >
            <X size={20} />
          </button>
        )}
        {isDesktop && !isCollapsed && (
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label="Collapse sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10"
          >
            <ChevronsLeft size={18} />
          </button>
        )}
      </div>

      {isDesktop && isCollapsed && (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label="Expand sidebar"
          className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10"
        >
          <ChevronsRight size={18} />
        </button>
      )}

      <nav className="flex-1 space-y-1 px-3" aria-label="Dashboard">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            title={isCollapsed ? label : undefined}
            aria-label={isCollapsed ? label : undefined}
            className={({ isActive }) =>
              `flex min-h-[44px] items-center gap-3 rounded-lg text-sm font-medium text-white transition-colors ${
                isCollapsed ? 'justify-center px-0' : 'px-3'
              } ${isActive ? 'bg-tertiary' : 'hover:bg-white/10'}`
            }
          >
            <Icon size={18} aria-hidden="true" />
            {!isCollapsed && label}
          </NavLink>
        ))}
      </nav>
      {!isCollapsed && (
        <div className="px-5 py-5 text-xs text-white/40">YAPD4Africa &middot; Kuri&apos;a v1.0</div>
      )}
    </aside>
  )
}
