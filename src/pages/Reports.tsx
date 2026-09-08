import { useEffect, useState } from 'react'
import { Search, Plus } from 'lucide-react'
import Select from 'react-select'
import { ReportRow } from '../components/ReportRow'
import { Pagination } from '../components/Pagination'
import { Modal } from '../components/Modal'
import { LoadingState, EmptyState, ErrorState } from '../components/QueryState'
import { createSelectStyles } from '../lib/selectStyles'
import { REPORT_STATUS_CONFIG, REPORT_STATUSES } from '../lib/reportStatus'
import { useReports, REPORTS_PAGE_SIZE } from '../hooks/useReports'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../lib/useToast'
import {
  useCreateReportMutation,
  useSearchPollingUnitsQuery,
  type ReportStatus,
  type PollingUnitRead,
} from '../api/kuria'

type StatusOption = { label: string; value: ReportStatus | 'all' }
type LgaOption = { label: string; value: string }
type AssigneeOption = { label: string; value: number | 'all' }
type PuOption = { label: string; value: PollingUnitRead }

const statusFilters: StatusOption[] = [
  { label: 'All statuses', value: 'all' },
  ...REPORT_STATUSES.map((s) => ({ label: REPORT_STATUS_CONFIG[s].label, value: s })),
]

const statusSelectStyles = createSelectStyles<StatusOption>()
const lgaSelectStyles = createSelectStyles<LgaOption>()
const assigneeSelectStyles = createSelectStyles<AssigneeOption>()
const puSelectStyles = createSelectStyles<PuOption>()

function puLabel(pu: PollingUnitRead) {
  return `${pu.pu_name} — ${pu.lga}, ${pu.state}`
}

// Admin-only, per backend/frontend-api.md: POST /reports is "an operational
// fallback; normal reports are created from a citizen's confirmed WhatsApp
// journey" — this is for logging an incident that didn't come through WhatsApp.
function LogReportModal({ onClose }: { onClose: () => void }) {
  const { showToast } = useToast()
  const [createReport, { isLoading: isSubmitting }] = useCreateReportMutation()

  const [puQuery, setPuQuery] = useState('')
  const [debouncedPuQuery, setDebouncedPuQuery] = useState('')
  const [selectedPu, setSelectedPu] = useState<PollingUnitRead | null>(null)
  const [incidentType, setIncidentType] = useState('')
  const [urgency, setUrgency] = useState('')
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedPuQuery(puQuery), 300)
    return () => clearTimeout(timer)
  }, [puQuery])

  const { data: pollingUnits, isFetching: isSearchingPu } = useSearchPollingUnitsQuery(
    { q: debouncedPuQuery, limit: 10 },
    { skip: debouncedPuQuery.trim().length < 2 },
  )
  const puOptions: PuOption[] = (pollingUnits ?? []).map((pu) => ({ label: puLabel(pu), value: pu }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!transcript.trim()) return
    try {
      await createReport({
        reportCreate: {
          transcript: transcript.trim(),
          incident_type: incidentType.trim() || undefined,
          urgency: urgency.trim() || undefined,
          location_text: selectedPu ? puLabel(selectedPu) : undefined,
          pu_reference: selectedPu?.pu_code,
          lat: selectedPu?.lat ?? undefined,
          lng: selectedPu?.lng ?? undefined,
        },
      }).unwrap()
      showToast('Report logged.')
      onClose()
    } catch {
      showToast("Couldn't log this report — please try again.")
    }
  }

  return (
    <Modal title="Log a report (fallback)" onClose={onClose}>
      <p className="mb-4 text-xs text-secondary">
        For incidents reported outside WhatsApp (e.g. a phone call). Normal reports arrive
        automatically once a citizen completes the WhatsApp flow.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="log-transcript" className="text-sm font-semibold text-primary">
            What happened
          </label>
          <textarea
            id="log-transcript"
            required
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={3}
            placeholder="Describe the incident..."
            className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
          />
        </div>
        <div>
          <label htmlFor="log-pu" className="text-sm font-semibold text-primary">
            Polling unit
          </label>
          <Select<PuOption, false>
            inputId="log-pu"
            className="mt-1.5"
            styles={puSelectStyles}
            options={puOptions}
            value={selectedPu ? { label: puLabel(selectedPu), value: selectedPu } : null}
            onInputChange={(value) => setPuQuery(value)}
            onChange={(option) => setSelectedPu(option?.value ?? null)}
            isLoading={isSearchingPu}
            placeholder="Search by polling unit name..."
            noOptionsMessage={() =>
              debouncedPuQuery.trim().length < 2 ? 'Type at least 2 characters…' : 'No matches'
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="log-incident-type" className="text-sm font-semibold text-primary">
              Incident type
            </label>
            <input
              id="log-incident-type"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              placeholder="e.g. violence"
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
            />
          </div>
          <div>
            <label htmlFor="log-urgency" className="text-sm font-semibold text-primary">
              Urgency
            </label>
            <input
              id="log-urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              placeholder="e.g. high"
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!transcript.trim() || isSubmitting}
            className="min-h-[44px] flex-1 rounded-lg bg-tertiary text-sm font-semibold text-white hover:bg-tertiary-dark disabled:opacity-60"
          >
            {isSubmitting ? 'Logging…' : 'Log report'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-lg border border-secondary/30 px-6 text-sm font-semibold text-secondary hover:bg-neutral"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export function Reports() {
  const { currentUser } = useAuth()
  const { users } = useUsers()
  const [logModalOpen, setLogModalOpen] = useState(false)
  const {
    reports,
    pageItemCount,
    total,
    page,
    setPage,
    status,
    setStatus,
    lga,
    setLga,
    lgaOptions,
    assignedTo,
    setAssignedTo,
    query,
    setQuery,
    isLoading,
    isError,
    refetch,
  } = useReports()

  const canFilterByAssignee = currentUser?.role === 'admin' || currentUser?.role === 'verification_lead'
  const canLogReport = currentUser?.role === 'admin'

  const lgaSelectOptions: LgaOption[] = [
    { label: 'All LGAs (this page)', value: 'all' },
    ...lgaOptions.map((l) => ({ label: l, value: l })),
  ]
  const assigneeSelectOptions: AssigneeOption[] = [
    { label: 'All assignees', value: 'all' },
    ...users.map((u) => ({ label: u.full_name, value: u.id })),
  ]

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
          className="w-full sm:w-56"
          styles={lgaSelectStyles}
          options={lgaSelectOptions}
          value={lgaSelectOptions.find((o) => o.value === lga)}
          onChange={(option) => setLga(option ? option.value : 'all')}
          isSearchable={false}
        />

        <Select<StatusOption, false>
          aria-label="Filter by status"
          className="w-full sm:w-56"
          styles={statusSelectStyles}
          options={statusFilters}
          value={statusFilters.find((f) => f.value === status)}
          onChange={(option) => setStatus(option ? option.value : 'all')}
          isSearchable={false}
        />

        {canFilterByAssignee && (
          <Select<AssigneeOption, false>
            aria-label="Filter by assignee"
            className="w-full sm:w-56"
            styles={assigneeSelectStyles}
            options={assigneeSelectOptions}
            value={assigneeSelectOptions.find((o) => o.value === assignedTo)}
            onChange={(option) => setAssignedTo(option ? option.value : 'all')}
            isSearchable={false}
          />
        )}

        {canLogReport && (
          <button
            type="button"
            onClick={() => setLogModalOpen(true)}
            className="ml-auto flex min-h-[44px] items-center gap-2 rounded-full bg-tertiary px-4 text-sm font-semibold text-white hover:bg-tertiary-dark"
          >
            <Plus size={16} />
            Log report
          </button>
        )}
      </div>

      {isLoading ? (
        <LoadingState label="Loading reports…" />
      ) : isError ? (
        <ErrorState description="Couldn't load reports from the server." onRetry={refetch} />
      ) : reports.length === 0 ? (
        <EmptyState
          title="No reports match these filters"
          description="Try adjusting the search, LGA, or status filter above."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-secondary/30 bg-surface">
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
                <ReportRow key={report.id} report={report} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <p className="text-sm text-secondary">
            Showing {reports.length} of {pageItemCount} on this page
            {(lga !== 'all' || query) && ' (filtered by LGA/search apply to this page only)'}
          </p>
          <Pagination page={page} pageSize={REPORTS_PAGE_SIZE} total={total} onPageChange={setPage} />
        </>
      )}

      {logModalOpen && <LogReportModal onClose={() => setLogModalOpen(false)} />}
    </div>
  )
}
