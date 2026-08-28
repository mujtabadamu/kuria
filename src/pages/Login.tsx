import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Role = 'admin' | 'fellow'

export function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('admin')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate(role === 'admin' ? '/dashboard' : '/fellow')
  }

  return (
    <div className="flex min-h-[calc(100vh-73px-260px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-neutral p-1" role="tablist" aria-label="Sign in as">
          <button
            type="button"
            role="tab"
            aria-selected={role === 'admin'}
            onClick={() => setRole('admin')}
            className={`min-h-[40px] rounded-md text-sm font-semibold transition-colors ${
              role === 'admin' ? 'bg-tertiary text-white shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === 'fellow'}
            onClick={() => setRole('fellow')}
            className={`min-h-[40px] rounded-md text-sm font-semibold transition-colors ${
              role === 'fellow' ? 'bg-tertiary text-white shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            Fellow
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-secondary/30 bg-surface p-8">
          <div className="flex justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary text-xl font-bold text-white">
              K
            </span>
          </div>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary">Sign in to Kuri&apos;a</h1>
          <p className="mt-1 text-center text-sm text-secondary">
            Electoral Integrity Dashboard access for fellows and admins
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="identifier" className="text-sm font-semibold text-primary">
                Email or phone
              </label>
              <input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
                placeholder={role === 'admin' ? 'amina.yusuf@yapd4africa.org' : 'musa.bello@yapd4africa.org'}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-primary">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="min-h-[44px] w-full rounded-lg bg-tertiary text-base font-semibold text-white hover:bg-tertiary-dark"
            >
              Sign in as {role === 'admin' ? 'Admin' : 'Fellow'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
