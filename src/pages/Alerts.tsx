import { useState } from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { createSelectStyles } from '../lib/selectStyles'
import { useAlerts } from '../hooks/useAlerts'
import { useUsers } from '../hooks/useUsers'
import { Pagination } from '../components/Pagination'
import { LoadingState, EmptyState, ErrorState } from '../components/QueryState'
import type { AlertRead } from '../api/kuria'

type StatusOption = { label: string; value: AlertRead['status'] | 'all' }
type SeverityOption = { label: string; value: AlertRead['severity'] | 'all' }

const STATUS_LABELS: Record<AlertRead['status'], string> = {
  open: 'Open',
  reviewing: 'Reviewing',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
}

const STATUS_CLASSES: Record<AlertRead['status'], string> = {
  open: 'bg-warning/10 text-warning',
  reviewing: 'bg-tertiary/10 text-tertiary',
  resolved: 'bg-success/10 text-success',
  dismissed: 'bg-secondary/10 text-secondary',
}

const SEVERITY_CONFIG: Record<AlertRead['severity'], { label: string; classes: string }> = {
  high: { label: 'High', classes: 'bg-danger/10 text-danger' },
  medium: { label: 'Medium', classes: 'bg-warning/10 text-warning' },
  low: { label: 'Low', classes: 'bg-success/10 text-success' },
}

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Reviewing', value: 'reviewing' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Dismissed', value: 'dismissed' },
]

const severityFilters: SeverityOption[] = [
  { label: 'All severities', value: 'all' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

const statusSelectStyles = createSelectStyles<StatusOption>()
const severitySelectStyles = createSelectStyles<SeverityOption>()

export function Alerts() {
  const { alerts, total, page, setPage, pageSize, status, setStatus, severity, setSeverity, isLoading, isError, refetch } =
    useAlerts()
  const { users } = useUsers()
  const [query, setQuery] = useState('')

  const filtered = alerts.filter((a) => {
    if (!query) return true
    const q = query.toLowerCase()
    const haystack = `${a.title} ${a.description} ${a.source ?? ''}`.toLowerCase()
    return haystack.includes(q)
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
            placeholder="Search alerts, source... (this page)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-secondary"
          />
        </div>

        <Select<SeverityOption, false>
          aria-label="Filter by severity"
          className="w-full sm:w-44"
          styles={severitySelectStyles}
          options={severityFilters}
          value={severityFilters.find((f) => f.value === severity)}
          onChange={(option) => setSeverity(option ? option.value : 'all')}
          isSearchable={false}
        />

        <Select<StatusOption, false>
          aria-label="Filter by status"
          className="w-full sm:w-52"
          styles={statusSelectStyles}
          options={statusFilters}
          value={statusFilters.find((f) => f.value === status)}
          onChange={(option) => setStatus(option ? option.value : 'all')}
          isSearchable={false}
        />
      </div>

      {isLoading ? (
        <LoadingState label="Loading alerts…" />
      ) : isError ? (
        <ErrorState description="Couldn't load alerts from the server." onRetry={refetch} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No alerts match these filters" />
      ) : (
        <div className="space-y-4">
          {filtered.map((alert) => {
            const flaggedBy = users.find((u) => u.id === alert.created_by)?.full_name
            return (
              <div key={alert.id} className="rounded-2xl border border-secondary/30 bg-surface p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-primary">{alert.title}</h3>
                    <p className="mt-1 text-sm text-secondary">{alert.description}</p>
                  </div>
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${STATUS_CLASSES[alert.status]}`}
                  >
                    {STATUS_LABELS[alert.status]}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-secondary">
                  {alert.source && (
                    <span>
                      <strong className="text-primary">Source:</strong> {alert.source}
                    </span>
                  )}
                  <span>
                    <strong className="text-primary">Flagged by:</strong>{' '}
                    {flaggedBy ?? (alert.created_by ? `User #${alert.created_by}` : 'Unknown')}
                  </span>
                  <span className="flex items-center gap-2">
                    <strong className="text-primary">Severity:</strong>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${SEVERITY_CONFIG[alert.severity].classes}`}
                    >
                      {SEVERITY_CONFIG[alert.severity].label}
                    </span>
                  </span>
                  {alert.report_ref && (
                    <Link
                      to={`/reports/${alert.report_ref}`}
                      className="font-semibold text-tertiary hover:underline"
                    >
                      View related report →
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!isLoading && !isError && (
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
      )}
    </div>
  )
}
