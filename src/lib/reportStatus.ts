import {
  Inbox,
  UserCheck,
  Eye,
  HelpCircle,
  Clock,
  ThumbsUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Archive,
  type LucideIcon,
} from 'lucide-react'
import type { ReportStatus } from '../api/kuria'

export interface ReportStatusConfig {
  label: string
  icon: LucideIcon
  /** Full literal Tailwind class string — written out per-status (not composed
   *  from a variable) so Tailwind's content scanner can actually find and
   *  generate these classes; an interpolated `bg-${color}/10` is invisible to it. */
  badgeClasses: string
  /** Resolved hex used for map pin fills, which are inline styles, not classes. */
  dotColor: string
}

// The real pipeline has 10 stages (vs. the old mock's verified/pending/flagged).
// Colors reuse the app's semantic tokens (success/danger/warning/secondary/tertiary)
// where the meaning lines up, and fall back to a few standard Tailwind hues for the
// stages that don't map onto an existing token.
export const REPORT_STATUS_CONFIG: Record<ReportStatus, ReportStatusConfig> = {
  received_unverified: {
    label: 'Received',
    icon: Inbox,
    badgeClasses: 'bg-secondary/10 text-secondary border-secondary/40',
    dotColor: '#757575',
  },
  assigned: {
    label: 'Assigned',
    icon: UserCheck,
    badgeClasses: 'bg-tertiary/10 text-tertiary border-tertiary/40',
    dotColor: '#00897B',
  },
  under_review: {
    label: 'Under review',
    icon: Eye,
    badgeClasses: 'bg-blue-600/10 text-blue-600 border-blue-600/40',
    dotColor: '#2563EB',
  },
  clarification_requested: {
    label: 'Clarification requested',
    icon: HelpCircle,
    badgeClasses: 'bg-warning/10 text-warning border-warning/40',
    dotColor: '#FB8C00',
  },
  awaiting_clarification: {
    label: 'Awaiting reply',
    icon: Clock,
    badgeClasses: 'bg-warning/10 text-warning border-warning/40',
    dotColor: '#FB8C00',
  },
  recommended: {
    label: 'Recommended',
    icon: ThumbsUp,
    badgeClasses: 'bg-purple-600/10 text-purple-600 border-purple-600/40',
    dotColor: '#9333EA',
  },
  verified: {
    label: 'Verified',
    icon: CheckCircle2,
    badgeClasses: 'bg-success/10 text-success border-success/40',
    dotColor: '#00897B',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    badgeClasses: 'bg-danger/10 text-danger border-danger/40',
    dotColor: '#D32F2F',
  },
  escalated: {
    label: 'Escalated',
    icon: AlertTriangle,
    badgeClasses: 'bg-orange-600/10 text-orange-600 border-orange-600/40',
    dotColor: '#EA580C',
  },
  archived: {
    label: 'Archived',
    icon: Archive,
    badgeClasses: 'bg-secondary/10 text-secondary border-secondary/40',
    dotColor: '#757575',
  },
}

export const REPORT_STATUSES = Object.keys(REPORT_STATUS_CONFIG) as ReportStatus[]
