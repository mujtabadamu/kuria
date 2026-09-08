import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUpdateUserMutation } from '../api/kuria'

const STORAGE_KEY = 'kuria-settings-notifications'

function loadNotificationPref(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== '0'
  } catch {
    return true
  }
}

export function Settings() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation()
  const [name, setName] = useState('')
  const [syncedUserId, setSyncedUserId] = useState<number | null>(null)
  const [notifications, setNotifications] = useState(loadNotificationPref)
  const [saved, setSaved] = useState(false)

  // Derived-during-render sync (not an effect): seed `name` once from the
  // freshly-loaded user, without re-running on every render or clobbering
  // in-progress edits on refetches.
  if (currentUser && currentUser.id !== syncedUserId) {
    setSyncedUserId(currentUser.id)
    setName(currentUser.full_name)
  }

  function handleNotificationsChange(checked: boolean) {
    setNotifications(checked)
    localStorage.setItem(STORAGE_KEY, checked ? '1' : '0')
  }

  async function handleSave() {
    if (!currentUser) return
    await updateUser({ userId: currentUser.id, userUpdate: { full_name: name } }).unwrap()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="max-w-xl space-y-6">
      <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
        <h2 className="text-lg font-bold text-primary">Profile</h2>
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
        </div>
      </div>

      <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
        <h2 className="text-lg font-bold text-primary">Notifications</h2>
        <label className="mt-4 flex min-h-[44px] items-center justify-between">
          <span className="text-base text-primary">Email me about new disinformation alerts</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => handleNotificationsChange(e.target.checked)}
            className="h-6 w-6 accent-tertiary"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
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
