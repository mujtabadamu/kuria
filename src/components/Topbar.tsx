import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Menu, Moon, Sun } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useTheme } from '../lib/useTheme'

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/reports': 'Reports',
  '/map': 'Live Map',
  '/alerts': 'Disinformation Alerts',
  '/fellows': 'Digital Integrity Fellows',
  '/voter-education': 'Voter Education',
  '/settings': 'Settings',
}

function titleForPath(pathname: string) {
  if (titles[pathname]) return titles[pathname]
  if (pathname.startsWith('/reports/')) return 'Report Detail'
  return 'Dashboard'
}

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const title = titleForPath(pathname)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-secondary/30 bg-surface px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-primary hover:bg-neutral md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-neutral"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-neutral"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-chrome text-sm font-semibold text-on-chrome">
          AY
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <Sidebar onClose={() => setMenuOpen(false)} />
          <button
            type="button"
            aria-label="Close menu overlay"
            className="flex-1 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </header>
  )
}
