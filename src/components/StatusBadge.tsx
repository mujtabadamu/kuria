import { CheckCircle2, Clock, Flag } from 'lucide-react'
import type { ReportStatus } from '../data/mockData'

const config: Record<
  ReportStatus,
  { label: string; icon: typeof CheckCircle2; classes: string }
> = {
  verified: {
    label: 'Verified',
    icon: CheckCircle2,
    classes: 'bg-surface text-success border-success/40',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    classes: 'bg-surface text-secondary border-secondary/40',
  },
  flagged: {
    label: 'Flagged',
    icon: Flag,
    classes: 'bg-surface text-danger border-danger/40',
  },
}

export function StatusBadge({ status }: { status: ReportStatus }) {
  const { label, icon: Icon, classes } = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-semibold ${classes}`}
    >
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  )
}
