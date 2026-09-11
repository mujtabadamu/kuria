import type { ReportStatus } from '../api/kuria'

export type StatusGroupId = 'received' | 'in_progress' | 'verified' | 'rejected' | 'escalated' | 'archived'

export interface StatusGroupConfig {
  label: string
  light: string
  dark: string
}

// Chart-safe categorical set for the status donut. Reusing the raw per-status
// dot colors from reportStatus.ts won't work here: several statuses share an
// identical hex (assigned/verified are both teal, received/archived are both
// gray) — harmless when only one badge is on screen at a time, but it breaks
// a chart showing them all together. This groups the 10 pipeline statuses into
// 6 buckets with a palette validated end-to-end with the dataviz skill's
// validator (`validate_palette.js "...", --mode light|dark` — all checks pass,
// in this exact ring order) rather than reusing/eyeballing the badge colors.
export const STATUS_GROUPS: Record<StatusGroupId, StatusGroupConfig> = {
  received: { label: 'Received', light: '#2a78d6', dark: '#3987e5' },
  in_progress: { label: 'In progress', light: '#eda100', dark: '#c98500' },
  verified: { label: 'Verified', light: '#008300', dark: '#008300' },
  rejected: { label: 'Rejected', light: '#e34948', dark: '#e66767' },
  archived: { label: 'Archived', light: '#4a3aa7', dark: '#9085e9' },
  escalated: { label: 'Escalated', light: '#eb6834', dark: '#d95926' },
}

// Ring order matters: this exact sequence is what the validator checked
// adjacent pairs against. Reordering these six invalidates that check.
export const STATUS_GROUP_ORDER: StatusGroupId[] = [
  'received',
  'in_progress',
  'verified',
  'rejected',
  'archived',
  'escalated',
]

const STATUS_TO_GROUP: Record<ReportStatus, StatusGroupId> = {
  received_unverified: 'received',
  assigned: 'in_progress',
  under_review: 'in_progress',
  clarification_requested: 'in_progress',
  awaiting_clarification: 'in_progress',
  recommended: 'in_progress',
  verified: 'verified',
  rejected: 'rejected',
  escalated: 'escalated',
  archived: 'archived',
}

export function groupStatusCounts(byStatus: Record<string, number>): Record<StatusGroupId, number> {
  const totals: Record<StatusGroupId, number> = {
    received: 0,
    in_progress: 0,
    verified: 0,
    rejected: 0,
    archived: 0,
    escalated: 0,
  }
  for (const [status, count] of Object.entries(byStatus)) {
    const group = STATUS_TO_GROUP[status as ReportStatus]
    if (group) totals[group] += count
  }
  return totals
}
