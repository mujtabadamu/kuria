import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Select from 'react-select'
import { ReportMap } from '../components/ReportMap'
import { StatusBadge } from '../components/StatusBadge'
import { createSelectStyles } from '../lib/selectStyles'
import { type ReportStatus } from '../data/mockData'
import { useAppData } from '../lib/useAppData'

type StatusOption = { label: string; value: ReportStatus | 'all' }

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Verified', value: 'verified' },
  { label: 'Pending', value: 'pending' },
  { label: 'Flagged', value: 'flagged' },
]

const selectStyles = createSelectStyles<StatusOption>()

export function MapPage() {
  const { reports } = useAppData()
  const [status, setStatus] = useState<ReportStatus | 'all'>('all')
  const [panelOpen, setPanelOpen] = useState(true)

  const filtered = useMemo(
    () => reports.filter((r) => status === 'all' || r.status === status),
    [reports, status],
  )

  return (
    <div className="relative flex h-[calc(100vh-64px)] -m-4 sm:-m-6">
      {panelOpen && (
        <div className="z-10 w-72 shrink-0 overflow-y-auto border-r border-secondary/30 bg-surface p-5">
          <h2 className="text-lg font-bold text-primary">Live reports</h2>
          <p className="mt-1 text-sm text-secondary">
            <strong className="text-primary">{filtered.length}</strong> reports in the last hour
          </p>

          <div className="mt-4">
            <p className="label-text text-secondary">Legend</p>
            <div className="mt-2 space-y-2">
              <StatusBadge status="verified" />
              <br />
              <StatusBadge status="pending" />
              <br />
              <StatusBadge status="flagged" />
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
        className="absolute left-0 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-r-lg border border-l-0 border-secondary/30 bg-surface text-primary shadow-sm"
        style={{ left: panelOpen ? '288px' : '0px' }}
      >
        {panelOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="flex-1">
        <ReportMap reports={filtered} height="100%" zoom={9} styleSwitcher />
      </div>
    </div>
  )
}
