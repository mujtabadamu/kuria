import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, User } from 'lucide-react'
import { AudioPlayer } from '../components/AudioPlayer'
import { StatusBadge } from '../components/StatusBadge'
import { reports } from '../data/mockData'

export function ReportDetail() {
  const { id } = useParams()
  const report = reports.find((r) => r.id === id)
  const [notes, setNotes] = useState('')

  if (!report) {
    return (
      <div className="rounded-2xl border border-dashed border-secondary/30 bg-surface p-12 text-center">
        <p className="text-lg font-semibold text-primary">Report not found</p>
        <Link to="/reports" className="mt-2 inline-block text-sm font-semibold text-tertiary hover:underline">
          ← Back to reports
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/reports"
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to reports
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">{report.id}</h2>
              <StatusBadge status={report.status} />
            </div>

            <div className="mt-4">
              <AudioPlayer duration={report.audioDuration} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="label-text text-secondary">
                  Hausa transcript
                </p>
                <p className="mt-1.5 text-base text-primary">
                  {report.transcriptHa || <span className="text-secondary">Not provided</span>}
                </p>
              </div>
              <div>
                <p className="label-text text-secondary">
                  English translation
                </p>
                <p className="mt-1.5 text-base text-primary">
                  {report.transcriptEn || <span className="text-secondary">Not provided</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-5 rounded-2xl border border-secondary/30 bg-surface p-6">
            <StatusBadge status={report.status} />

            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <User size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <dt className="text-secondary">Reporter</dt>
                  <dd className="font-medium text-primary">{report.reporter}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <dt className="text-secondary">Location</dt>
                  <dd className="font-medium text-primary">
                    {report.pollingUnit}, {report.lga}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <dt className="text-secondary">Timestamp</dt>
                  <dd className="font-medium text-primary">
                    {new Date(report.timestamp).toLocaleString()}
                  </dd>
                </div>
              </div>
            </dl>

            {report.verifiedBy && (
              <p className="rounded-lg bg-primary/5 px-3 py-2 text-sm text-primary">
                Verified by <strong>{report.verifiedBy}</strong>
              </p>
            )}

            <div>
              <label htmlFor="notes" className="text-sm font-semibold text-primary">
                Verification notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder={report.notes ?? 'Add verification notes...'}
                className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
              />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="min-h-[44px] w-full rounded-lg bg-tertiary text-sm font-semibold text-white hover:bg-tertiary-dark"
              >
                Mark verified
              </button>
              <button
                type="button"
                className="min-h-[44px] w-full rounded-lg border-2 border-danger text-sm font-semibold text-danger hover:bg-danger hover:text-white"
              >
                Flag as disinformation
              </button>
              <button
                type="button"
                className="min-h-[44px] w-full rounded-lg border-2 border-secondary text-sm font-semibold text-secondary hover:bg-secondary hover:text-white"
              >
                Escalate to electoral body
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
