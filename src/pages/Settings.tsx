import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const STORAGE_KEY = 'kuria-settings'

interface StoredSettings {
  name: string
  email: string
  notifications: boolean
}

function loadSettings(): StoredSettings {
  const fallback: StoredSettings = {
    name: 'Amina Yusuf',
    email: 'amina.yusuf@yapd4africa.org',
    notifications: true,
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback
  } catch {
    return fallback
  }
}

export function Settings() {
  const [initial] = useState(loadSettings)
  const [name, setName] = useState(initial.name)
  const [email, setEmail] = useState(initial.email)
  const [notifications, setNotifications] = useState(initial.notifications)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    const settings: StoredSettings = { name, email, notifications }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
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
            onChange={(e) => setNotifications(e.target.checked)}
            className="h-6 w-6 accent-tertiary"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="min-h-[44px] rounded-lg bg-tertiary px-6 text-sm font-semibold text-white hover:bg-tertiary-dark"
        >
          Save changes
        </button>
        {saved && (
          <p className="flex items-center gap-1.5 text-sm font-semibold text-success">
            <CheckCircle2 size={16} aria-hidden="true" />
            Saved
          </p>
        )}
      </div>
    </div>
  )
}
