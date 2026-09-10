import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getErrorMessage } from '../lib/apiError'

export function Login() {
  const navigate = useNavigate()
  const { login, isLoggingIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login({ email, password })
      // Role-based routing (admin/verification_lead/stakeholder_reader vs.
      // fellow) and the forced password-change screen are both enforced by
      // AppLayout/FellowLayout's own guards, reading the real role/flag from
      // /auth/me — so we always land on /dashboard and let the guard redirect.
      navigate('/dashboard')
    } catch (err) {
      // A 401 here means invalid credentials, not an expired session — the
      // shared helper's 401 copy is for the latter, so this is handled
      // separately rather than through getErrorMessage's default mapping.
      if (err && typeof err === 'object' && 'status' in err && (err as { status?: number }).status === 401) {
        setError('Invalid email or password.')
      } else {
        setError(getErrorMessage(err, 'Something went wrong — please try again.'))
      }
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-73px-260px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl border border-secondary/30 bg-surface p-8">
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
              <label htmlFor="email" className="text-sm font-semibold text-primary">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
                placeholder="amina.yusuf@yapd4africa.org"
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

            {error && (
              <p role="alert" className="rounded-lg bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="min-h-[44px] w-full rounded-lg bg-tertiary text-base font-semibold text-white hover:bg-tertiary-dark disabled:opacity-60"
            >
              {isLoggingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
