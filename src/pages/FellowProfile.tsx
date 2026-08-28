import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, LogOut } from 'lucide-react'
import { CURRENT_FELLOW_NAME } from '../lib/currentFellow'

const STORAGE_KEY = 'kuria-fellow-profile'

interface StoredProfile {
  name: string
  email: string
  phone: string
}

function loadProfile(): StoredProfile {
  const fallback: StoredProfile = {
    name: CURRENT_FELLOW_NAME,
    email: 'musa.bello@yapd4africa.org',
    phone: '+234 813 555 0271',
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback
  } catch {
    return fallback
  }
}

export function FellowProfile() {
  const navigate = useNavigate()
  const [initial] = useState(loadProfile)
  const [name, setName] = useState(initial.name)
  const [email, setEmail] = useState(initial.email)
  const [phone, setPhone] = useState(initial.phone)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, phone }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-xl font-bold text-primary">Profile</h1>

      <div className="flex items-center gap-4 rounded-2xl border border-secondary/30 bg-surface p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chrome text-xl font-bold text-on-chrome">
          {name
            .split(' ')
            .map((p) => p[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-bold text-primary">{name}</p>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
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

      <button
        type="button"
        onClick={() => navigate('/login')}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border-2 border-danger text-sm font-semibold text-danger hover:bg-danger hover:text-white"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  )
}
