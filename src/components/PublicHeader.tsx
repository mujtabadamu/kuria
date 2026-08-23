import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/useTheme'

const links = [
  { to: '/about', label: 'About' },
  { to: '/voter-education', label: 'Voter Education' },
]

export function PublicHeader() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-secondary/30 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-tertiary">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tertiary text-white">
            K
          </span>
          Kuri&apos;a
        </Link>
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `min-h-[44px] flex items-center text-sm font-semibold ${
                  isActive ? 'text-tertiary' : 'text-primary hover:text-tertiary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-neutral"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            to="/login"
            className="flex min-h-[44px] items-center rounded-full border border-tertiary px-4 text-sm font-semibold text-tertiary hover:bg-tertiary hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}
