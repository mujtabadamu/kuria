import {
  useAssignReportMutation,
  useStartReportReviewMutation,
  useRecommendReportDecisionMutation,
  useDecideReportMutation,
  useEscalateReportMutation,
  useRequestReportClarificationMutation,
  useAddReportEvidenceMutation,
  useCorrectReportTranscriptMutation,
  type ReportStatus,
} from '../api/kuria'

// Action set and valid `to_status` values per backend/new.md §5: recommend
// always targets exactly "recommended" (no target choice); decide picks the
// final outcome (verified/rejected/escalated); escalate always targets
// "escalated". Which of these are offered at all is further gated in
// ReportDetail by `REPORT_TRANSITIONS` (src/lib/reportStatus.ts).
export function useReportActions(publicRef: string | undefined) {
  const [assignMutation, assignState] = useAssignReportMutation()
  const [startReviewMutation, startReviewState] = useStartReportReviewMutation()
  const [recommendMutation, recommendState] = useRecommendReportDecisionMutation()
  const [decideMutation, decideState] = useDecideReportMutation()
  const [escalateMutation, escalateState] = useEscalateReportMutation()
  const [clarificationMutation, clarificationState] = useRequestReportClarificationMutation()
  const [evidenceMutation, evidenceState] = useAddReportEvidenceMutation()
  const [correctTranscriptMutation, correctState] = useCorrectReportTranscriptMutation()

  async function assignTo(assigneeId: number) {
    if (!publicRef) return
    await assignMutation({ publicRef, assigneeId }).unwrap()
  }

  async function startReview() {
    if (!publicRef) return
    await startReviewMutation({ publicRef }).unwrap()
  }

  async function recommend(reason: string) {
    if (!publicRef) return
    await recommendMutation({ publicRef, statusTransition: { to_status: 'recommended', reason } }).unwrap()
  }

  async function decide(toStatus: Extract<ReportStatus, 'verified' | 'rejected' | 'escalated'>, reason: string) {
    if (!publicRef) return
    await decideMutation({ publicRef, statusTransition: { to_status: toStatus, reason } }).unwrap()
  }

  async function escalate(reason: string) {
    if (!publicRef) return
    await escalateMutation({ publicRef, statusTransition: { to_status: 'escalated', reason } }).unwrap()
  }

  async function requestClarification(message: string) {
    if (!publicRef) return
    await clarificationMutation({ publicRef, clarificationCreate: { message } }).unwrap()
  }

  async function addEvidence(kind: string, storageKeyOrText: string) {
    if (!publicRef) return
    await evidenceMutation({
      publicRef,
      evidenceCreate: { kind, storage_key_or_text: storageKeyOrText },
    }).unwrap()
  }

  async function correctTranscript(transcriptCorrected: string) {
    if (!publicRef) return
    await correctTranscriptMutation({ publicRef, transcriptCorrected }).unwrap()
  }

  return {
    assignTo,
    isAssigning: assignState.isLoading,
    startReview,
    isStartingReview: startReviewState.isLoading,
    recommend,
    isRecommending: recommendState.isLoading,
    decide,
    isDeciding: decideState.isLoading,
    escalate,
    isEscalating: escalateState.isLoading,
    requestClarification,
    isRequestingClarification: clarificationState.isLoading,
    addEvidence,
    isAddingEvidence: evidenceState.isLoading,
    correctTranscript,
    isCorrectingTranscript: correctState.isLoading,
  }
}
