import { useState } from 'react'
import { Flag, Search } from 'lucide-react'
import Select from 'react-select'
import { createSelectStyles } from '../lib/selectStyles'
import { alerts, type DisinfoAlert } from '../data/mockData'

type StatusOption = { label: string; value: DisinfoAlert['status'] | 'all' }

const statusLabel: Record<DisinfoAlert['status'], string> = {
  under_review: 'Under review',
  confirmed: 'Confirmed',
  dismissed: 'Dismissed',
}

const severityConfig: Record<DisinfoAlert['severity'], { label: string; classes: string }> = {
  high: { label: 'High', classes: 'bg-danger/10 text-danger' },
  medium: { label: 'Medium', classes: 'bg-warning/10 text-warning' },
  low: { label: 'Low', classes: 'bg-success/10 text-success' },
}

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Under review', value: 'under_review' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Dismissed', value: 'dismissed' },
]

const selectStyles = createSelectStyles<StatusOption>()

export function Alerts() {
  const [status, setStatus] = useState<DisinfoAlert['status'] | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = alerts.filter((a) => {
    if (status !== 'all' && a.status !== status) return false
    if (query) {
      const q = query.toLowerCase()
      const haystack = `${a.title} ${a.source} ${a.pattern} ${a.flaggedBy}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-h-[44px] w-full max-w-sm items-center gap-2 rounded-full border border-secondary/30 bg-surface px-4 sm:w-auto">
          <Search size={16} className="text-secondary" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search alerts, source, pattern..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-secondary"
          />
        </div>

        <Select<StatusOption, false>
          aria-label="Filter by status"
          className="w-full sm:w-52"
          styles={selectStyles}
          options={statusFilters}
          value={statusFilters.find((f) => f.value === status)}
          onChange={(option) => setStatus(option ? option.value : 'all')}
          isSearchable={false}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-secondary/30 bg-surface p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-primary">{alert.title}</h3>
                <p className="mt-1 text-sm text-secondary">{alert.contentPreview}</p>
              </div>
              {alert.status === 'confirmed' ? (
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-danger/10 px-3 py-1 text-sm font-semibold text-danger">
                  <Flag size={14} />
                  Confirmed disinformation
                </span>
              ) : (
                <span className="whitespace-nowrap rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                  {statusLabel[alert.status]}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-secondary">
              <span>
                <strong className="text-primary">Source:</strong> {alert.source}
              </span>
              <span>
                <strong className="text-primary">Pattern:</strong> {alert.pattern}
              </span>
              <span>
                <strong className="text-primary">Flagged by:</strong> {alert.flaggedBy}
              </span>
              <span className="flex items-center gap-2">
                <strong className="text-primary">Severity:</strong>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityConfig[alert.severity].classes}`}
                >
                  {severityConfig[alert.severity].label}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
