import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Play } from 'lucide-react'
import { useAiJobActions } from '../hooks/useAiJobActions'
import { useUsers } from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../lib/useToast'
import { getErrorMessage, isConflict } from '../lib/apiError'
import { AI_JOB_STATUS_LABELS, AI_JOB_STATUS_CLASSES, AI_JOB_RESOLUTION_LABELS } from '../lib/aiJobStatus'
import { LoadingState, ErrorState, EmptyState } from '../components/QueryState'
import { useListAiJobsQuery, getAuthToken, type AiJobResolve } from '../api/kuria'

// There's no GET /ai/jobs/{id} — only list/assign/resolve/media — so the
// detail view is found by scanning a wide, unfiltered page of the list
// rather than fetching the one job directly. Fine for MVP volumes; would
// need a real single-job endpoint if the queue grows past a page or two.
const LOOKUP_LIMIT = 200

export function AiJobDetail() {
  const { id } = useParams()
  const jobId = Number(id)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const basePath = pathname.startsWith('/fellow') ? '/fellow/ai-jobs' : '/ai-jobs'
  const { showToast } = useToast()
  const { currentUser } = useAuth()
  const { users } = useUsers()
  const { assignJob, isAssigning, resolveJob, isResolving } = useAiJobActions()

  const { data, isLoading, isError, refetch } = useListAiJobsQuery({ skip: 0, limit: LOOKUP_LIMIT })
  const job = data?.items.find((j) => j.id === jobId)

  const [assigneeId, setAssigneeId] = useState('')
  const [resolution, setResolution] = useState<AiJobResolve['resolution']>('incident_report')
  const [correctedTranscript, setCorrectedTranscript] = useState('')

  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  async function loadAudio() {
    if (!Number.isFinite(jobId)) return
    setIsLoadingAudio(true)
    setAudioError(false)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/ai/jobs/${jobId}/media`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      if (!response.ok) throw new Error('Audio unavailable')
      const blob = await response.blob()
      setAudioUrl(URL.createObjectURL(blob))
    } catch {
      setAudioError(true)
    } finally {
      setIsLoadingAudio(false)
    }
  }

  if (isLoading) return <LoadingState label="Loading job…" />
  if (isError) return <ErrorState description="Couldn't load the review queue." onRetry={refetch} />
  if (!job) {
    return (
      <EmptyState title="Job not found" description="It may have already been resolved.">
        <Link to={basePath} className="mt-2 inline-block text-sm font-semibold text-tertiary hover:underline">
          ← Back to queue
        </Link>
      </EmptyState>
    )
  }

  const isManager = currentUser?.role === 'admin' || currentUser?.role === 'verification_lead'
  const isAssignedFellow = currentUser?.role === 'fellow' && job.assigned_to === currentUser?.id
  const canResolve = (isManager || isAssignedFellow) && job.status === 'low_confidence'
  const needsTranscript = resolution !== 'unusable'

  async function handleAssign() {
    if (!assigneeId) return
    try {
      await assignJob(jobId, Number(assigneeId))
      showToast('Job assigned.')
      refetch()
    } catch (err) {
      showToast(getErrorMessage(err, "Couldn't assign this job — please try again."))
      if (isConflict(err)) navigate(basePath)
    }
  }

  async function handleResolve(e: React.FormEvent) {
    e.preventDefault()
    if (needsTranscript && !correctedTranscript.trim()) return
    try {
      await resolveJob(jobId, {
        resolution,
        corrected_transcript: needsTranscript ? correctedTranscript.trim() : null,
      })
      showToast('Job resolved.')
      navigate(basePath)
    } catch (err) {
      showToast(getErrorMessage(err, "Couldn't resolve this job — please try again."))
      if (isConflict(err)) navigate(basePath)
    }
  }

  return (
    <div>
      <Link
        to={basePath}
        className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to queue
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">Job #{job.id}</h2>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold ${AI_JOB_STATUS_CLASSES[job.status]}`}
              >
                {AI_JOB_STATUS_LABELS[job.status]}
              </span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-secondary">Attempts</dt>
                <dd className="font-medium text-primary">{job.attempts}</dd>
              </div>
              <div>
                <dt className="text-secondary">Received</dt>
                <dd className="font-medium text-primary">{new Date(job.created_at).toLocaleString()}</dd>
              </div>
              {job.last_error && (
                <div className="sm:col-span-2">
                  <dt className="text-secondary">Last error</dt>
                  <dd className="font-medium text-danger">{job.last_error}</dd>
                </div>
              )}
            </dl>

            <div className="mt-5 border-t border-secondary/20 pt-4">
              <p className="label-text text-secondary">Original recording</p>
              {!audioUrl ? (
                <button
                  type="button"
                  onClick={loadAudio}
                  disabled={isLoadingAudio}
                  className="mt-2 flex min-h-[44px] items-center gap-2 rounded-lg border border-secondary/30 px-4 text-sm font-semibold text-primary hover:bg-neutral disabled:opacity-50"
                >
                  <Play size={16} />
                  {isLoadingAudio ? 'Loading…' : 'Load audio'}
                </button>
              ) : (
                <audio controls autoPlay src={audioUrl} className="mt-2 w-full" />
              )}
              {audioError && <p className="mt-2 text-sm text-danger">Couldn't load this recording.</p>}
            </div>
          </div>

          {canResolve && (
            <div className="rounded-2xl border border-secondary/30 bg-surface p-6">
              <h3 className="text-sm font-bold text-primary">Resolve</h3>
              <p className="mt-1 text-xs text-secondary">
                Listen to the recording above, then say what it actually was.
              </p>
              <form onSubmit={handleResolve} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="resolution" className="text-sm font-semibold text-primary">
                    This recording is…
                  </label>
                  <select
                    id="resolution"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value as AiJobResolve['resolution'])}
                    className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
                  >
                    {Object.entries(AI_JOB_RESOLUTION_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                {needsTranscript && (
                  <div>
                    <label htmlFor="corrected-transcript" className="text-sm font-semibold text-primary">
                      Corrected transcript
                    </label>
                    <textarea
                      id="corrected-transcript"
                      required
                      value={correctedTranscript}
                      onChange={(e) => setCorrectedTranscript(e.target.value)}
                      rows={3}
                      placeholder={
                        resolution === 'voter_education'
                          ? 'The question the reporter asked...'
                          : 'What actually happened...'
                      }
                      className="mt-1.5 w-full rounded-lg border border-secondary/30 p-3 text-base outline-none focus:border-tertiary"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={(needsTranscript && !correctedTranscript.trim()) || isResolving}
                  className="min-h-[44px] w-full rounded-lg bg-tertiary text-sm font-semibold text-white hover:bg-tertiary-dark disabled:opacity-60"
                >
                  {isResolving ? 'Resolving…' : 'Resolve'}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-secondary/30 bg-surface p-6">
            <div>
              <dt className="label-text text-secondary">Assigned to</dt>
              <dd className="mt-1 text-sm font-medium text-primary">
                {users.find((u) => u.id === job.assigned_to)?.full_name ??
                  (job.assigned_to ? `User #${job.assigned_to}` : 'Unassigned')}
              </dd>
            </div>

            {isManager && job.status === 'low_confidence' && (
              <div className="border-t border-secondary/20 pt-4">
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
                    <option value="">Select a fellow…</option>
                    {users
                      .filter((u) => u.role === 'fellow' && u.is_active)
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.full_name}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    disabled={!assigneeId || isAssigning}
                    onClick={handleAssign}
                    className="min-h-[44px] shrink-0 rounded-lg border border-secondary/30 px-3 text-sm font-semibold text-primary hover:bg-neutral disabled:opacity-50"
                  >
                    Assign
                  </button>
                </div>
              </div>
            )}

            {!canResolve && job.status !== 'low_confidence' && (
              <p className="rounded-lg bg-secondary/10 px-3 py-2 text-sm text-secondary">
                This job is {AI_JOB_STATUS_LABELS[job.status].toLowerCase()} — nothing left to review.
              </p>
            )}
            {!canResolve && job.status === 'low_confidence' && !isManager && !isAssignedFellow && (
              <p className="rounded-lg bg-secondary/10 px-3 py-2 text-sm text-secondary">
                This job isn't assigned to you, so you have read-only access.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
