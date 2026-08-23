import { useState } from 'react'
import { Search, UserPlus, BadgeCheck } from 'lucide-react'
import { fellows } from '../data/mockData'

export function Fellows() {
  const [query, setQuery] = useState('')

  const filtered = fellows.filter((f) =>
    `${f.name} ${f.lga}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-h-[44px] w-full max-w-sm items-center gap-2 rounded-full border border-secondary/30 bg-surface px-4 sm:w-auto">
          <Search size={16} className="text-secondary" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fellows or LGA..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-secondary"
          />
        </div>
        <button
          type="button"
          className="flex min-h-[44px] items-center gap-2 rounded-full bg-tertiary px-4 text-sm font-semibold text-white hover:bg-tertiary-dark"
        >
          <UserPlus size={16} />
          Add fellow
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((fellow) => (
          <div key={fellow.id} className="rounded-2xl border border-secondary/30 bg-surface p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-chrome text-lg font-bold text-on-chrome">
                {fellow.avatarInitials}
              </div>
              <div>
                <p className="font-bold text-primary">{fellow.name}</p>
                <p className="text-sm text-secondary">{fellow.lga} LGA</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-secondary">
                <strong className="text-primary">{fellow.reportsVerified}</strong> verified
              </span>
              {fellow.trainingComplete ? (
                <span className="inline-flex items-center gap-1 font-semibold text-success">
                  <BadgeCheck size={16} />
                  Trained
                </span>
              ) : (
                <span className="font-semibold text-secondary">In training</span>
              )}
            </div>

            <button
              type="button"
              className="mt-4 min-h-[44px] w-full rounded-lg border border-primary text-sm font-semibold text-primary hover:bg-chrome hover:text-on-chrome"
            >
              View profile
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
