import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Fingerprint, History, Paperclip, Play } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { LoadingState, ErrorState, EmptyState } from '../components/QueryState'
import { useReport } from '../hooks/useReport'
import { useReportActions } from '../hooks/useReportActions'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../lib/useToast'
import { REPORT_STATUS_CONFIG } from '../lib/reportStatus'
import { useListReportEvidenceQuery, useGetReportMediaUrlQuery, type ReportMediaRead } from '../api/kuria'

function MediaItem({ publicRef, media }: { publicRef: string; media: ReportMediaRead }) {
  const [requested, setRequested] = useState(false)
  const { data, isFetching, isError } = useGetReportMediaUrlQuery(
    { publicRef, wamMediaId: media.wam_media_id },
    { skip: !requested },
  )
  const isAudio = !media.mime_type || media.mime_type.startsWith('audio/')

  return (
    <div className="rounded-lg border border-secondary/30 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-primary">
          {media.mime_type ?? 'Unknown type'}
          <span className="text-secondary"> · {new Date(media.created_at).toLocaleString()}</span>
        </p>
        {!requested && (
          <button
            type="button"
            onClick={() => setRequested(true)}
            className="flex min-h-[32px] items-center gap-1 rounded-lg border border-secondary/30 px-3 text-xs font-semibold text-primary hover:bg-neutral"
          >
            <Play size={12} />
            Load
          </button>
        )}
      </div>
      {requested && isFetching && <p className="mt-2 text-xs text-secondary">Loading…</p>}
      {requested && isError && <p className="mt-2 text-xs text-danger">Couldn't load this media.</p>}
      {requested && data && isAudio && <audio controls src={data.url} className="mt-2 w-full" />}
      {requested && data && !isAudio && (
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-sm font-semibold text-tertiary hover:underline"
        >
          Open media →
        </a>
      )}
    </div>
  )
}

function EvidenceList({ publicRef }: { publicRef: string }) {
  const { data, isLoading, isError } = useListReportEvidenceQuery({ publicRef })

  if (isLoading) return <p className="text-sm text-secondary">Loading evidence…</p>
  if (isError) return <p className="text-sm text-danger">Couldn't load evidence.</p>
  if (!data || data.length === 0) return <p className="text-sm text-secondary">No evidence added yet.</p>

  return (
    <ul className="space-y-2">
      {data.map((entry) => (
        <li key={entry.id} className="rounded-lg border border-secondary/20 p-2.5 text-sm">
          <span className="font-semibold capitalize text-primary">{entry.kind}</span>{' '}
          <span className="break-all text-secondary">{entry.storage_key_or_text}</span>
          <p className="mt-0.5 text-xs text-secondary">{new Date(entry.created_at).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  )
}

export function ReportDetail() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const isFellow = pathname.startsWith('/fellow')
  const backPath = isFellow ? '/fellow/reports' : '/reports'

  const { report, isLoading, isError, refetch, history, isHistoryLoading } = useReport(id)
  const { currentUser } = useAuth()
  const { showToast } = useToast()
  const actions = useReportActions(id)

  const [reason, setReason] = useState('')
  const [decisionTarget, setDecisionTarget] = useState<'verified' | 'rejected'>('verified')
  const [clarificationMessage, setClarificationMessage] = useState('')
  const [assigneeId, setAssigneeId] = useState('')
  const [evidenceKind, setEvidenceKind] = useState<'note' | 'file' | 'link'>('note')
  const [evidenceText, setEvidenceText] = useState('')
  const [correctedTranscript, setCorrectedTranscript] = useState('')

  const { users } = useUsers()

  if (isLoading) return <LoadingState label="Loading report…" />
  if (isError) return <ErrorState description="Couldn't load this report." onRetry={refetch} />
  if (!report) {
    return (
      <EmptyState title="Report not found">
        <Link to={backPath} className="mt-2 inline-block text-sm font-semibold text-tertiary hover:underline">
          ← Back to reports
        </Link>
      </EmptyState>
    )
  }

  async function runAction(action: () => Promise<void>, successMessage: string) {
    try {
      await action()
      showToast(successMessage)
      setReason('')
      setClarificationMessage('')
      setEvidenceText('')
    } catch {
      showToast("That action didn't go through — please try again.")
    }
  }

  const assignedUser = users.find((u) => u.id === report.assigned_to)

  // Per backend/frontend-api.md's permissions table: admin/verification_lead
  // can do everything (assign, decide, and the rest); a fellow can act on a
  // report only once it's assigned to them (recommend, escalate, evidence,
  // clarification, correct-transcript) but can't assign or make the final
  // decision. Anyone else (e.g. a fellow viewing an unassigned report,
  // stakeholder_reader) gets read-only.
  const isManager = currentUser?.role === 'admin' || currentUser?.role === 'verification_lead'
  const isAssignedFellow = currentUser?.role === 'fellow' && report.assigned_to === currentUser?.id
  const canContribute = isManager || isAssignedFellow
  const canManage = isManager

  return (
    <div>
      <Link
        to={backPath}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to reports
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">{report.public_ref}</h2>
              <StatusBadge status={report.status} />
            </div>

            {report.media && report.media.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="label-text flex items-center gap-1.5 text-secondary">
                  <Paperclip size={12} aria-hidden="true" />
                  Media
                </p>
                {report.media.map((media) => (
                  <MediaItem key={media.wam_media_id} publicRef={report.public_ref} media={media} />
                ))}
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="label-text text-secondary">Transcript</p>
                <p className="mt-1.5 text-base text-primary">
                  {report.transcript || <span className="text-secondary">Not provided</span>}
                </p>
              </div>
              <div>
                <p className="label-text text-secondary">Corrected transcript</p>
                <p className="mt-1.5 text-base text-primary">
                  {report.transcript_corrected || <span className="text-secondary">Not corrected</span>}
                </p>
              </div>
            </div>

            {canContribute && (
              <div className="mt-5 border-t border-secondary/20 pt-4">
                <label htmlFor="correct-transcript" className="text-sm font-semibold text-primary">
                  Correct transcript
                </label>
                <textarea
                  id="correct-transcript"
                  value={correctedTranscript}
                  onChange={(e) => setCorrectedTranscript(e.target.value)}
                  rows={2}
                  placeholder={report.transcript_corrected ?? report.transcript ?? 'Enter corrected transcript...'}
                  className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
                />
                <button
                  type="button"
                  disabled={!correctedTranscript.trim() || actions.isCorrectingTranscript}
                  onClick={() =>
                    runAction(
                      () => actions.correctTranscript(correctedTranscript.trim()),
                      'Transcript corrected.',
                    )
                  }
                  className="mt-2 min-h-[40px] rounded-lg border border-secondary/30 px-4 text-sm font-semibold text-primary hover:bg-neutral disabled:opacity-50"
                >
                  Save correction
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
            <div className="mb-3 flex items-center gap-2">
              <Paperclip size={16} className="text-secondary" aria-hidden="true" />
              <h3 className="text-sm font-bold text-primary">Evidence</h3>
            </div>
            <EvidenceList publicRef={report.public_ref} />
          </div>

          <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
            <div className="mb-3 flex items-center gap-2">
              <History size={16} className="text-secondary" aria-hidden="true" />
              <h3 className="text-sm font-bold text-primary">Status history</h3>
            </div>
            {isHistoryLoading ? (
              <LoadingState label="Loading history…" />
            ) : history.length === 0 ? (
              <p className="text-sm text-secondary">No status changes recorded yet.</p>
            ) : (
              <ol className="space-y-3">
                {history.map((entry) => (
                  <li key={entry.id} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tertiary" />
                    <div>
                      <p className="text-primary">
                        {entry.from_status ? (
                          <>
                            <span className="font-semibold">
                              {REPORT_STATUS_CONFIG[entry.from_status as keyof typeof REPORT_STATUS_CONFIG]
                                ?.label ?? entry.from_status}
                            </span>{' '}
                            →{' '}
                          </>
                        ) : null}
                        <span className="font-semibold">
                          {REPORT_STATUS_CONFIG[entry.to_status as keyof typeof REPORT_STATUS_CONFIG]?.label ??
                            entry.to_status}
                        </span>
                      </p>
                      {entry.reason && <p className="text-secondary">{entry.reason}</p>}
                      <p className="text-xs text-secondary">
                        {new Date(entry.created_at).toLocaleString()}
                        {entry.actor_user_id != null &&
                          ` · ${users.find((u) => u.id === entry.actor_user_id)?.full_name ?? `User #${entry.actor_user_id}`}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <div className="space-y-5 rounded-2xl border border-secondary/30 bg-surface p-6">
            <StatusBadge status={report.status} />

            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Fingerprint size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <dt className="text-secondary">Reporter (hashed)</dt>
                  <dd className="break-all font-mono text-xs font-medium text-primary">{report.reporter_hash}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <dt className="text-secondary">Location</dt>
                  <dd className="font-medium text-primary">
                    {report.pu?.pu_name ?? report.location_text ?? 'Not provided'}
                    {report.pu?.lga && `, ${report.pu.lga}`}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <dt className="text-secondary">Submitted</dt>
                  <dd className="font-medium text-primary">{new Date(report.created_at).toLocaleString()}</dd>
                </div>
              </div>
              {report.incident_type && (
                <div>
                  <dt className="text-secondary">Incident type</dt>
                  <dd className="font-medium text-primary">{report.incident_type}</dd>
                </div>
              )}
              {report.urgency && (
                <div>
                  <dt className="text-secondary">Urgency</dt>
                  <dd className="font-medium text-primary">{report.urgency}</dd>
                </div>
              )}
              {report.confidence != null && (
                <div>
                  <dt className="text-secondary">Confidence</dt>
                  <dd className="font-medium text-primary">{Math.round(report.confidence * 100)}%</dd>
                </div>
              )}
              <div>
                <dt className="text-secondary">Assigned to</dt>
                <dd className="font-medium text-primary">
                  {assignedUser?.full_name ?? (report.assigned_to ? `User #${report.assigned_to}` : 'Unassigned')}
                </dd>
              </div>
            </dl>

            {!canContribute ? (
              <p className="rounded-lg bg-secondary/10 px-3 py-2 text-sm text-secondary">
                {currentUser?.role === 'fellow'
                  ? "This report isn't assigned to you, so you have read-only access."
                  : 'You have read-only access to this report.'}
              </p>
            ) : (
              <div className="space-y-5 border-t border-secondary/20 pt-4">
                {canManage && (
                  <div>
                    <label htmlFor="assignee" className="text-sm font-semibold text-primary">
                      Assign to
                    </label>
                    <div className="mt-1.5 flex gap-2">
                      <select
                        id="assignee"
                        value={assigneeId}
                        onChange={(e) => setAssigneeId(e.target.value)}
                        className="min-h-[44px] flex-1 rounded-lg border border-secondary/30 px-3 text-sm outline-none focus:border-tertiary"
                      >
                        <option value="">Select a reviewer…</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.full_name} ({u.role})
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={!assigneeId || actions.isAssigning}
                        onClick={() =>
                          runAction(() => actions.assignTo(Number(assigneeId)), 'Report assigned.')
                        }
                        className="min-h-[44px] shrink-0 rounded-lg border border-secondary/30 px-3 text-sm font-semibold text-primary hover:bg-neutral disabled:opacity-50"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="reason" className="text-sm font-semibold text-primary">
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={2}
                    placeholder="Required for recommend / decide / escalate"
                    className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={decisionTarget}
                    onChange={(e) => setDecisionTarget(e.target.value as 'verified' | 'rejected')}
                    className="min-h-[44px] rounded-lg border border-secondary/30 px-2 text-sm outline-none focus:border-tertiary"
                  >
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    type="button"
                    disabled={!reason.trim() || actions.isRecommending}
                    onClick={() =>
                      runAction(
                        () => actions.recommend(decisionTarget, reason.trim()),
                        `Recommended as ${decisionTarget}.`,
                      )
                    }
                    className="min-h-[44px] flex-1 rounded-lg border-2 border-tertiary text-sm font-semibold text-tertiary hover:bg-tertiary hover:text-white disabled:opacity-50"
                  >
                    Recommend
                  </button>
                </div>

                {canManage && (
                  <button
                    type="button"
                    disabled={!reason.trim() || actions.isDeciding}
                    onClick={() =>
                      runAction(
                        () => actions.decide(decisionTarget, reason.trim()),
                        `Decided: ${decisionTarget}.`,
                      )
                    }
                    className="min-h-[44px] w-full rounded-lg bg-success text-sm font-semibold text-white hover:bg-success-dark disabled:opacity-50"
                  >
                    Decide: {decisionTarget}
                  </button>
                )}

                <button
                  type="button"
                  disabled={!reason.trim() || actions.isEscalating}
                  onClick={() => runAction(() => actions.escalate(reason.trim()), 'Escalated to electoral body.')}
                  className="min-h-[44px] w-full rounded-lg border-2 border-danger text-sm font-semibold text-danger hover:bg-danger hover:text-white disabled:opacity-50"
                >
                  Escalate to electoral body
                </button>

                <div className="border-t border-secondary/20 pt-4">
                  <label htmlFor="clarification" className="text-sm font-semibold text-primary">
                    Request clarification
                  </label>
                  <textarea
                    id="clarification"
                    value={clarificationMessage}
                    onChange={(e) => setClarificationMessage(e.target.value)}
                    rows={2}
                    placeholder="Message sent back to the reporter"
                    className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
                  />
                  <button
                    type="button"
                    disabled={!clarificationMessage.trim() || actions.isRequestingClarification}
                    onClick={() =>
                      runAction(
                        () => actions.requestClarification(clarificationMessage.trim()),
                        'Clarification requested.',
                      )
                    }
                    className="mt-2 min-h-[40px] w-full rounded-lg border border-secondary/30 text-sm font-semibold text-primary hover:bg-neutral disabled:opacity-50"
                  >
                    Send request
                  </button>
                </div>

                <div className="border-t border-secondary/20 pt-4">
                  <p className="text-sm font-semibold text-primary">Add evidence</p>
                  <div className="mt-1.5 flex gap-2">
                    <select
                      value={evidenceKind}
                      onChange={(e) => setEvidenceKind(e.target.value as typeof evidenceKind)}
                      className="min-h-[44px] rounded-lg border border-secondary/30 px-2 text-sm outline-none focus:border-tertiary"
                    >
                      <option value="note">Note</option>
                      <option value="file">File</option>
                      <option value="link">Link</option>
                    </select>
                    <input
                      value={evidenceText}
                      onChange={(e) => setEvidenceText(e.target.value)}
                      placeholder={evidenceKind === 'link' ? 'https://…' : 'Evidence text'}
                      className="min-h-[44px] flex-1 rounded-lg border border-secondary/30 px-3 text-sm outline-none focus:border-tertiary"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={!evidenceText.trim() || actions.isAddingEvidence}
                    onClick={() =>
                      runAction(
                        () => actions.addEvidence(evidenceKind, evidenceText.trim()),
                        'Evidence added.',
                      )
                    }
                    className="mt-2 min-h-[40px] w-full rounded-lg border border-secondary/30 text-sm font-semibold text-primary hover:bg-neutral disabled:opacity-50"
                  >
                    Add evidence
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
