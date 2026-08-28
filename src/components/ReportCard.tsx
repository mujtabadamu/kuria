import { Link } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import type { VoiceReport } from '../data/mockData'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function ReportCard({
  report,
  basePath = '/reports',
}: {
  report: VoiceReport
  basePath?: string
}) {
  return (
    <div className="rounded-2xl border border-secondary/30 bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">{report.lga}</p>
          <p className="text-xs text-secondary">
            {formatTime(report.timestamp)} ·{' '}
            <span className="rounded-full bg-secondary/10 px-1.5 py-0.5 font-semibold">{report.language}</span>
          </p>
        </div>
        <StatusBadge status={report.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-secondary">{report.transcriptEn || report.transcriptHa}</p>

      <Link
        to={`${basePath}/${report.id}`}
        className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-primary hover:text-tertiary hover:underline"
      >
        View report →
      </Link>
    </div>
  )
}
