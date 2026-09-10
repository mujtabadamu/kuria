import { Link, useLocation } from 'react-router-dom'
import Select from 'react-select'
import { Headphones } from 'lucide-react'
import { useAiJobs } from '../hooks/useAiJobs'
import { useUsers } from '../hooks/useUsers'
import { Pagination } from '../components/Pagination'
import { LoadingState, EmptyState, ErrorState } from '../components/QueryState'
import { createSelectStyles } from '../lib/selectStyles'
import { AI_JOB_STATUS_LABELS, AI_JOB_STATUS_CLASSES, AI_JOB_STATUSES } from '../lib/aiJobStatus'
import type { AiJobStatus } from '../api/kuria'

type StatusOption = { label: string; value: AiJobStatus | 'all' }

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  ...AI_JOB_STATUSES.map((s) => ({ label: AI_JOB_STATUS_LABELS[s], value: s })),
]

const selectStyles = createSelectStyles<StatusOption>()

export function AiReviewQueue() {
  const { pathname } = useLocation()
  const basePath = pathname.startsWith('/fellow') ? '/fellow/ai-jobs' : '/ai-jobs'
  const { jobs, total, page, setPage, pageSize, status, setStatus, isLoading, isError, refetch } = useAiJobs()
  const { users } = useUsers()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-primary">
            <Headphones size={20} className="text-tertiary" aria-hidden="true" />
            AI Review Queue
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Low-confidence voice notes the AI couldn't transcribe reliably — listen to the original and supply
            the correct transcript.
          </p>
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

      {isLoading ? (
        <LoadingState label="Loading jobs…" />
      ) : isError ? (
        <ErrorState description="Couldn't load the review queue." onRetry={refetch} />
      ) : jobs.length === 0 ? (
        <EmptyState title="Nothing to review" description="No jobs match this filter right now." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-secondary/30 bg-surface">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-secondary/30 text-xs font-semibold uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Attempts</th>
                <th className="px-4 py-3">Assigned to</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => {
                const assignee = users.find((u) => u.id === job.assigned_to)
                return (
                  <tr key={job.id} className="border-b border-secondary/30 last:border-0">
                    <td className="px-4 py-3 text-sm font-semibold text-primary">#{job.id}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold ${AI_JOB_STATUS_CLASSES[job.status]}`}
                      >
                        {AI_JOB_STATUS_LABELS[job.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-primary">{job.attempts}</td>
                    <td className="px-4 py-3 text-sm text-primary">
                      {assignee?.full_name ?? (job.assigned_to ? `User #${job.assigned_to}` : 'Unassigned')}
                    </td>
                    <td className="px-4 py-3 text-sm tabular-nums text-secondary">
                      {new Date(job.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`${basePath}/${job.id}`}
                        className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary hover:text-tertiary hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !isError && (
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
      )}
    </div>
  )
}
