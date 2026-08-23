import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Select from 'react-select'
import { ReportRow } from '../components/ReportRow'
import { createSelectStyles } from '../lib/selectStyles'
import { reports, type ReportStatus } from '../data/mockData'

type StatusOption = { label: string; value: ReportStatus | 'all' }
type LgaOption = { label: string; value: string }

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Verified', value: 'verified' },
  { label: 'Pending', value: 'pending' },
  { label: 'Flagged', value: 'flagged' },
]

const statusSelectStyles = createSelectStyles<StatusOption>()
const lgaSelectStyles = createSelectStyles<LgaOption>()

export function Reports() {
  const [status, setStatus] = useState<ReportStatus | 'all'>('all')
  const [lga, setLga] = useState('all')
  const [query, setQuery] = useState('')

  const lgaOptions = useMemo<LgaOption[]>(
    () => [
      { label: 'All LGAs', value: 'all' },
      ...Array.from(new Set(reports.map((r) => r.lga)))
        .sort()
        .map((l) => ({ label: l, value: l })),
    ],
    [],
  )

  const filtered = reports.filter((r) => {
    if (status !== 'all' && r.status !== status) return false
    if (lga !== 'all' && r.lga !== lga) return false
    if (query) {
      const q = query.toLowerCase()
      const haystack = `${r.id} ${r.lga} ${r.pollingUnit} ${r.reporter} ${r.transcriptEn} ${r.transcriptHa}`.toLowerCase()
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
            placeholder="Search reports, LGAs..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-secondary"
          />
        </div>

        <Select<LgaOption, false>
          aria-label="Filter by LGA"
          className="w-full sm:w-48"
          styles={lgaSelectStyles}
          options={lgaOptions}
          value={lgaOptions.find((o) => o.value === lga)}
          onChange={(option) => setLga(option ? option.value : 'all')}
          isSearchable={false}
        />

        <Select<StatusOption, false>
          aria-label="Filter by status"
          className="w-full sm:w-44"
          styles={statusSelectStyles}
          options={statusFilters}
          value={statusFilters.find((f) => f.value === status)}
          onChange={(option) => setStatus(option ? option.value : 'all')}
          isSearchable={false}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-secondary/30 bg-surface p-12 text-center">
          <p className="text-lg font-semibold text-primary">No reports match these filters</p>
          <p className="mt-1 text-sm text-secondary">Try adjusting the search, LGA, or status filter above.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-secondary/30 bg-surface">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-secondary/30 text-xs font-semibold uppercase tracking-wide text-secondary">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">LGA</th>
                <th className="px-4 py-3">Lang</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((report) => (
                <ReportRow key={report.id} report={report} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-sm text-secondary">
        Showing {filtered.length} of {reports.length} reports
      </p>
    </div>
  )
}
