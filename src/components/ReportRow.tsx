import { Link } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import type { ReportRead } from '../api/kuria'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function ReportRow({
  report,
  basePath = '/reports',
}: {
  report: ReportRead
  basePath?: string
}) {
  return (
    <tr className="border-b border-secondary/20 last:border-0">
      <td className="px-4 py-3 text-sm tabular-nums text-secondary">{formatTime(report.created_at)}</td>
      <td className="px-4 py-3 text-sm text-primary">{report.pu?.lga ?? report.location_text ?? '—'}</td>
      <td className="px-4 py-3">
        <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
          {report.incident_type ?? '—'}
        </span>
      </td>
      <td className="max-w-xs truncate px-4 py-3 text-sm text-secondary">
        {report.transcript_corrected || report.transcript || 'No transcript'}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={report.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          to={`${basePath}/${report.public_ref}`}
          className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary hover:text-tertiary hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  )
}
