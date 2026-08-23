import { Link } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import type { VoiceReport } from '../data/mockData'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function ReportRow({ report }: { report: VoiceReport }) {
  return (
    <tr className="border-b border-secondary/20 last:border-0">
      <td className="px-4 py-3 text-sm tabular-nums text-secondary">{formatTime(report.timestamp)}</td>
      <td className="px-4 py-3 text-sm text-primary">{report.lga}</td>
      <td className="px-4 py-3">
        <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
          {report.language}
        </span>
      </td>
      <td className="max-w-xs truncate px-4 py-3 text-sm text-secondary">
        {report.transcriptEn || report.transcriptHa}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={report.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          to={`/reports/${report.id}`}
          className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary hover:text-tertiary hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  )
}
