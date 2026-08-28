import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic } from 'lucide-react'
import { useAppData } from '../lib/useAppData'
import { CURRENT_FELLOW_NAME } from '../lib/currentFellow'
import type { VoiceReport } from '../data/mockData'
import { VoiceRecorder, type Recording } from '../components/VoiceRecorder'
import { useToast } from '../lib/useToast'

function nextReportId(reports: VoiceReport[]) {
  const max = reports.reduce((acc, r) => {
    const n = Number(r.id.replace('RPT-', ''))
    return Number.isFinite(n) && n > acc ? n : acc
  }, 1000)
  return `RPT-${max + 1}`
}

export function FellowNewReport() {
  const { reports, fellows, addReport } = useAppData()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const currentFellow = fellows.find((f) => f.name === CURRENT_FELLOW_NAME)

  const [pollingUnit, setPollingUnit] = useState('')
  const [description, setDescription] = useState('')
  const [recording, setRecording] = useState<Recording | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!pollingUnit.trim() || (!description.trim() && !recording)) return

    const id = nextReportId(reports)
    addReport({
      id,
      timestamp: new Date().toISOString(),
      state: 'Kaduna',
      lga: currentFellow?.lga ?? 'Kaduna North',
      pollingUnit: pollingUnit.trim(),
      lat: 10.5222,
      lng: 7.4383,
      language: 'EN',
      transcriptHa: '',
      transcriptEn: description.trim(),
      status: 'pending',
      reporter: CURRENT_FELLOW_NAME,
      audioDuration: recording?.duration ?? '0:00',
      audioUrl: recording?.url,
    })
    showToast('Report submitted successfully.')
    navigate('/fellow/reports')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-2">
        <Mic size={20} className="text-tertiary" aria-hidden="true" />
        <h1 className="text-xl font-bold text-primary">New Report</h1>
      </div>
      <p className="mb-6 text-sm text-secondary">
        Record a voice note and add a short description. Transcription and translation happen
        automatically once submitted — you don&apos;t need to type it out.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-secondary/30 bg-surface p-6">
        <div>
          <label htmlFor="pollingUnit" className="text-sm font-semibold text-primary">
            Polling unit
          </label>
          <input
            id="pollingUnit"
            required
            value={pollingUnit}
            onChange={(e) => setPollingUnit(e.target.value)}
            placeholder="PU 004 - Unguwar Rimi Primary School"
            className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
          />
        </div>

        <div>
          <span className="text-sm font-semibold text-primary">Voice recording</span>
          <div className="mt-1.5">
            <VoiceRecorder onChange={setRecording} />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-semibold text-primary">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Briefly describe what you observed..."
            className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
          />
        </div>

        <button
          type="submit"
          className="min-h-[44px] w-full rounded-lg bg-tertiary text-base font-semibold text-white hover:bg-tertiary-dark"
        >
          Submit report
        </button>
      </form>
    </div>
  )
}
