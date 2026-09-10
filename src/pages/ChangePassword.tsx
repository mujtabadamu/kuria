import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getErrorMessage } from '../lib/apiError'

export function ChangePassword() {
  const navigate = useNavigate()
  const { changePassword, isChangingPassword, isAuthenticated, isLoadingUser } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isAuthenticated && !isLoadingUser) return <Navigate to="/login" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.")
      return
    }
    if (newPassword === currentPassword) {
      setError('New password must be different from your current password.')
      return
    }

    try {
      await changePassword(currentPassword, newPassword)
      navigate('/dashboard')
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't change your password — please try again."))
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-73px-260px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl border border-secondary/30 bg-surface p-8">
          <div className="flex justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary text-white">
              <KeyRound size={22} aria-hidden="true" />
            </span>
          </div>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary">Choose a new password</h1>
          <p className="mt-1 text-center text-sm text-secondary">
            You're signed in with a temporary password. Set a permanent one to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="current-password" className="text-sm font-semibold text-primary">
                Temporary password
              </label>
              <input
                id="current-password"
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="text-sm font-semibold text-primary">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-sm font-semibold text-primary">
                Confirm new password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isChangingPassword}
              className="min-h-[44px] w-full rounded-lg bg-tertiary text-base font-semibold text-white hover:bg-tertiary-dark disabled:opacity-60"
            >
              {isChangingPassword ? 'Saving…' : 'Set new password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
