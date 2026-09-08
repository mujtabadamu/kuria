import type { ReportStatus } from '../api/kuria'
import { REPORT_STATUS_CONFIG } from '../lib/reportStatus'

export function StatusBadge({ status }: { status: ReportStatus }) {
  const { label, icon: Icon, badgeClasses } = REPORT_STATUS_CONFIG[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-semibold ${badgeClasses}`}
    >
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  )
}
