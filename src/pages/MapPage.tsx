import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Select from 'react-select'
import { ReportMap } from '../components/ReportMap'
import { StatusBadge } from '../components/StatusBadge'
import { LoadingState, ErrorState } from '../components/QueryState'
import { createSelectStyles } from '../lib/selectStyles'
import { REPORT_STATUS_CONFIG, REPORT_STATUSES } from '../lib/reportStatus'
import { useReports } from '../hooks/useReports'
import type { ReportStatus } from '../api/kuria'

type StatusOption = { label: string; value: ReportStatus | 'all' }

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  ...REPORT_STATUSES.map((s) => ({ label: REPORT_STATUS_CONFIG[s].label, value: s })),
]

const selectStyles = createSelectStyles<StatusOption>()

export function MapPage() {
  const { reports, status, setStatus, isLoading, isError, refetch } = useReports()
  const [panelOpen, setPanelOpen] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )

  return (
    <div className="relative flex h-[calc(100vh-64px)] -m-4 sm:-m-6">
      {panelOpen && (
        <div
          aria-hidden="true"
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 z-[1050] bg-black/40 md:hidden"
        />
      )}

      {panelOpen && (
        <div className="fixed inset-y-0 left-0 z-[1100] w-72 shrink-0 overflow-y-auto border-r border-secondary/30 bg-surface p-5 md:static md:inset-auto md:z-10">
          <h2 className="text-lg font-bold text-primary">Live reports</h2>
          <p className="mt-1 text-sm text-secondary">
            <strong className="text-primary">{reports.length}</strong> reports on this page
          </p>

          <div className="mt-4">
            <p className="label-text text-secondary">Legend</p>
            <div className="mt-2 space-y-2">
              {REPORT_STATUSES.map((s) => (
                <div key={s}>
                  <StatusBadge status={s} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="status-filter" className="label-text text-secondary">
              Filter by status
            </label>
            <Select<StatusOption, false>
              inputId="status-filter"
              className="mt-2"
              styles={selectStyles}
              options={statusFilters}
              value={statusFilters.find((f) => f.value === status)}
              onChange={(option) => setStatus(option ? option.value : 'all')}
              isSearchable={false}
              aria-label="Filter reports by status"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setPanelOpen((v) => !v)}
        aria-label={panelOpen ? 'Collapse panel' : 'Expand panel'}
        className="absolute left-0 top-4 z-[1100] flex h-11 w-11 items-center justify-center rounded-r-lg border border-l-0 border-secondary/30 bg-surface text-primary shadow-sm"
        style={{ left: panelOpen ? '288px' : '0px' }}
      >
        {panelOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="flex-1">
        {isLoading ? (
          <LoadingState label="Loading reports…" />
        ) : isError ? (
          <ErrorState description="Couldn't load reports from the server." onRetry={refetch} />
        ) : (
          <ReportMap reports={reports} height="100%" zoom={9} styleSwitcher />
        )}
      </div>
    </div>
  )
}
