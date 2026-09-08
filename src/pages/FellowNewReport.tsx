import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic } from 'lucide-react'
import Select from 'react-select'
import { useAuth } from '../hooks/useAuth'
import { useCreateReportMutation, useSearchPollingUnitsQuery, type PollingUnitRead } from '../api/kuria'
import { createSelectStyles } from '../lib/selectStyles'
import { VoiceRecorder } from '../components/VoiceRecorder'
import { useToast } from '../lib/useToast'

type PuOption = { label: string; value: PollingUnitRead }

function puLabel(pu: PollingUnitRead) {
  return `${pu.pu_name} — ${pu.lga}, ${pu.state}`
}

// The API needs a `reporter_hash` but doesn't document what a dashboard
// (as opposed to WhatsApp) submission should send. This derives a stable,
// non-reversible hash from the authenticated fellow's user id as a
// reasonable default — flagged for backend confirmation, not invented data
// about the reporter's identity.
async function hashReporterId(id: number) {
  const encoded = new TextEncoder().encode(`kuria-fellow-${id}`)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const selectStyles = createSelectStyles<PuOption>()

export function FellowNewReport() {
  const { currentUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [createReport, { isLoading: isSubmitting }] = useCreateReportMutation()

  const [puQuery, setPuQuery] = useState('')
  const [debouncedPuQuery, setDebouncedPuQuery] = useState('')
  const [selectedPu, setSelectedPu] = useState<PollingUnitRead | null>(null)
  const [description, setDescription] = useState('')

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
    if (!selectedPu || !description.trim() || !currentUser) return

    try {
      const reporterHash = await hashReporterId(currentUser.id)
      await createReport({
        reportCreate: {
          reporter_hash: reporterHash,
          transcript: description.trim(),
          location_text: puLabel(selectedPu),
          pu_reference: selectedPu.pu_code,
          lat: selectedPu.lat ?? undefined,
          lng: selectedPu.lng ?? undefined,
        },
      }).unwrap()
      showToast('Report submitted successfully.')
      navigate('/fellow/reports')
    } catch {
      showToast("Couldn't submit the report — please try again.")
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-2">
        <Mic size={20} className="text-tertiary" aria-hidden="true" />
        <h1 className="text-xl font-bold text-primary">New Report</h1>
      </div>
      <p className="mb-6 text-sm text-secondary">
        Search for the polling unit and add a short description of what you observed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-secondary/30 bg-surface p-6">
        <div>
          <label htmlFor="pollingUnit" className="text-sm font-semibold text-primary">
            Polling unit
          </label>
          <Select<PuOption, false>
            inputId="pollingUnit"
            className="mt-1.5"
            styles={selectStyles}
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

        <div>
          <span className="text-sm font-semibold text-primary">Voice recording</span>
          <div className="mt-1.5">
            <VoiceRecorder onChange={() => {}} />
          </div>
          <p className="mt-1.5 text-xs text-secondary">
            The recording isn't attached to your submission yet — the report API doesn't accept audio
            uploads from this form. Please describe what you observed below.
          </p>
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-semibold text-primary">
            Description
          </label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Briefly describe what you observed..."
            className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedPu || !description.trim() || isSubmitting}
          className="min-h-[44px] w-full rounded-lg bg-tertiary text-base font-semibold text-white hover:bg-tertiary-dark disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting…' : 'Submit report'}
        </button>
      </form>
    </div>
  )
}
