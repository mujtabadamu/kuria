import { Search } from 'lucide-react'
import Select from 'react-select'
import { ReportRow } from '../components/ReportRow'
import { ReportCard } from '../components/ReportCard'
import { Pagination } from '../components/Pagination'
import { LoadingState, EmptyState, ErrorState } from '../components/QueryState'
import { createSelectStyles } from '../lib/selectStyles'
import { REPORT_STATUS_CONFIG, REPORT_STATUSES } from '../lib/reportStatus'
import { useReports, REPORTS_PAGE_SIZE } from '../hooks/useReports'
import type { ReportStatus } from '../api/kuria'

type StatusOption = { label: string; value: ReportStatus | 'all' }

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  ...REPORT_STATUSES.map((s) => ({ label: REPORT_STATUS_CONFIG[s].label, value: s })),
]

const selectStyles = createSelectStyles<StatusOption>()

export function FellowReports() {
  const { reports, page, total, setPage, status, setStatus, query, setQuery, isLoading, isError, refetch } =
    useReports()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-primary">My Reports</h1>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-h-[44px] w-full max-w-sm items-center gap-2 rounded-full border border-secondary/30 bg-surface px-4 sm:w-auto">
          <Search size={16} className="text-secondary" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports, LGAs..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-secondary"
          />
        </div>

        <Select<StatusOption, false>
          aria-label="Filter by status"
          className="w-full sm:w-56"
          styles={selectStyles}
          options={statusFilters}
          value={statusFilters.find((f) => f.value === status)}
          onChange={(option) => setStatus(option ? option.value : 'all')}
          isSearchable={false}
        />
      </div>

      {isLoading ? (
        <LoadingState label="Loading reports…" />
      ) : isError ? (
        <ErrorState description="Couldn't load reports from the server." onRetry={refetch} />
      ) : reports.length === 0 ? (
        <EmptyState
          title="No reports match these filters"
          description="Try adjusting the search or status filter above."
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-2xl border border-secondary/30 bg-surface md:block">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-secondary/30 text-xs font-semibold uppercase tracking-wide text-secondary">
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">LGA</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Summary</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <ReportRow key={report.id} report={report} basePath="/fellow/reports" />
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} basePath="/fellow/reports" />
            ))}
          </div>
        </>
      )}

      {!isLoading && !isError && (
        <Pagination page={page} pageSize={REPORTS_PAGE_SIZE} total={total} onPageChange={setPage} />
      )}
    </div>
  )
}
