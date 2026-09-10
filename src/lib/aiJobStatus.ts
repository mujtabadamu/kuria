import type { AiJobStatus } from '../api/kuria'

export const AI_JOB_STATUS_LABELS: Record<AiJobStatus, string> = {
  queued: 'Queued',
  processing: 'Processing',
  succeeded: 'Succeeded',
  low_confidence: 'Needs review',
  failed: 'Failed',
}

// Full literal class strings (not composed from a variable) so Tailwind's
// content scanner can find them — see the same note in lib/reportStatus.ts.
export const AI_JOB_STATUS_CLASSES: Record<AiJobStatus, string> = {
  queued: 'bg-secondary/10 text-secondary',
  processing: 'bg-blue-600/10 text-blue-600',
  succeeded: 'bg-success/10 text-success',
  low_confidence: 'bg-warning/10 text-warning',
  failed: 'bg-danger/10 text-danger',
}

export const AI_JOB_STATUSES = Object.keys(AI_JOB_STATUS_LABELS) as AiJobStatus[]

export const AI_JOB_RESOLUTION_LABELS = {
  incident_report: 'Incident report',
  voter_education: 'Voter education question',
  unusable: 'Unusable audio',
} as const
