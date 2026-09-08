import { Link } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import type { ReportRead } from '../api/kuria'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function ReportCard({
  report,
  basePath = '/reports',
}: {
  report: ReportRead
  basePath?: string
}) {
  return (
    <div className="rounded-2xl border border-secondary/30 bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">{report.pu?.lga ?? report.location_text ?? '—'}</p>
          <p className="text-xs text-secondary">
            {formatTime(report.created_at)} ·{' '}
            <span className="rounded-full bg-secondary/10 px-1.5 py-0.5 font-semibold">
              {report.incident_type ?? '—'}
            </span>
          </p>
        </div>
        <StatusBadge status={report.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-secondary">
        {report.transcript_corrected || report.transcript || 'No transcript'}
      </p>

      <Link
        to={`${basePath}/${report.public_ref}`}
        className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-primary hover:text-tertiary hover:underline"
      >
        View report →
      </Link>
    </div>
  )
}
