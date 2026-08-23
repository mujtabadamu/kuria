import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/dashboard')
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
            <button
              type="submit"
              className="min-h-[44px] w-full rounded-lg bg-tertiary text-base font-semibold text-white hover:bg-tertiary-dark"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary">
            Are you a Digital Integrity Fellow?{' '}
            <button type="button" className="font-semibold text-tertiary hover:underline">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
