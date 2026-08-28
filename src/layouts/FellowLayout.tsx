import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Moon, Plus, Sun, User } from 'lucide-react'
import { useTheme } from '../lib/useTheme'

const sideNavItems = [{ to: '/fellow', label: 'Dashboard', icon: LayoutDashboard, end: true }]

const trailingNavItems = [{ to: '/fellow/profile', label: 'Profile', icon: User, end: false }]

export function FellowLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col bg-neutral">
      <header className="sticky top-0 z-30 border-b border-secondary/30 bg-surface px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg font-bold text-primary">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tertiary text-white">
              K
            </span>
            Kuri&apos;a <span className="font-normal text-secondary">· Fellow</span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-neutral"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 pb-24 sm:p-6 sm:pb-24">
        <Outlet />
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 items-end border-t border-secondary/30 bg-surface pb-[env(safe-area-inset-bottom)]"
        aria-label="Fellow"
      >
        {sideNavItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold transition-colors ${
                isActive ? 'text-tertiary' : 'text-secondary hover:text-primary'
              }`
            }
          >
            <Icon size={22} aria-hidden="true" />
            {label}
          </NavLink>
        ))}

        <NavLink to="/fellow/new" className="flex flex-col items-center justify-end gap-1 pb-2 text-xs font-semibold">
          {({ isActive }) => (
            <>
              <span
                className={`-mt-7 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-neutral transition-colors ${
                  isActive ? 'bg-tertiary-dark' : 'bg-tertiary'
                }`}
              >
                <Plus size={30} aria-hidden="true" />
              </span>
              <span className={isActive ? 'text-tertiary' : 'text-secondary'}>New Report</span>
            </>
          )}
        </NavLink>

        {trailingNavItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold transition-colors ${
                isActive ? 'text-tertiary' : 'text-secondary hover:text-primary'
              }`
            }
          >
            <Icon size={22} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
