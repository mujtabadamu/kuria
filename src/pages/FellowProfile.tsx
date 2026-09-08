import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUpdateUserMutation } from '../api/kuria'

function initialsFor(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function FellowProfile() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [syncedUserId, setSyncedUserId] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)

  // Derived-during-render sync (not an effect): seed `name`/`phone` once from
  // the freshly-loaded user, without re-running on every render or
  // clobbering in-progress edits on refetches.
  if (currentUser && currentUser.id !== syncedUserId) {
    setSyncedUserId(currentUser.id)
    setName(currentUser.full_name)
    setPhone(currentUser.phone ?? '')
  }

  async function handleSave() {
    if (!currentUser) return
    await updateUser({
      userId: currentUser.id,
      userUpdate: { full_name: name, phone: phone.trim() || null },
    }).unwrap()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-xl font-bold text-primary">Profile</h1>

      <div className="flex items-center gap-4 rounded-2xl border border-secondary/30 bg-surface p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chrome text-xl font-bold text-on-chrome">
          {name ? initialsFor(name) : '—'}
        </div>
        <div>
          <p className="text-lg font-bold text-primary">{name || 'Loading…'}</p>
          <p className="text-sm text-secondary">Digital Integrity Fellow</p>
        </div>
      </div>

      <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
        <h2 className="text-lg font-bold text-primary">Details</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-primary">
              Full name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-primary">
              Email
            </label>
            <input
              id="email"
              value={currentUser?.email ?? ''}
              disabled
              title="Email can't be changed here — the API doesn't support updating it."
              className="mt-1.5 min-h-[44px] w-full cursor-not-allowed rounded-lg border border-secondary/30 bg-neutral px-3 text-base text-secondary outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-semibold text-primary">
              Phone
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !currentUser}
            className="min-h-[44px] rounded-lg bg-tertiary px-6 text-sm font-semibold text-white hover:bg-tertiary-dark disabled:opacity-60"
          >
            {isSaving ? 'Saving…' : 'Save changes'}
          </button>
          {saved && (
            <p className="flex items-center gap-1.5 text-sm font-semibold text-success">
              <CheckCircle2 size={16} aria-hidden="true" />
              Saved
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border-2 border-danger text-sm font-semibold text-danger hover:bg-danger hover:text-white"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  )
}
