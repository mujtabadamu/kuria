import { useState } from 'react'

export function Settings() {
  const [notifications, setNotifications] = useState(true)

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
              defaultValue="Amina Yusuf"
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-primary">
              Email
            </label>
            <input
              id="email"
              defaultValue="amina.yusuf@yapd4africa.org"
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

      <button
        type="button"
        className="min-h-[44px] rounded-lg bg-tertiary px-6 text-sm font-semibold text-white hover:bg-tertiary-dark"
      >
        Save changes
      </button>
    </div>
  )
}
