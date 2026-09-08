import {
  useAssignReportMutation,
  useRecommendReportDecisionMutation,
  useDecideReportMutation,
  useEscalateReportMutation,
  useRequestReportClarificationMutation,
  useAddReportEvidenceMutation,
  useCorrectReportTranscriptMutation,
  type ReportStatus,
} from '../api/kuria'

// The API exposes named action endpoints (recommend/decide/escalate/assign/
// clarification), each taking an arbitrary `to_status` — it doesn't publish
// which transitions are actually valid from which current status. This hook
// offers a defensible default shape (recommend/decide choose between
// verified/rejected, escalate always targets 'escalated') rather than a raw
// "pick any of the 10 statuses" control; the real transition rules should be
// confirmed against backend/product before this ships.
export function useReportActions(publicRef: string | undefined) {
  const [assignMutation, assignState] = useAssignReportMutation()
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

  async function recommend(toStatus: Extract<ReportStatus, 'verified' | 'rejected'>, reason: string) {
    if (!publicRef) return
    await recommendMutation({ publicRef, statusTransition: { to_status: toStatus, reason } }).unwrap()
  }

  async function decide(toStatus: Extract<ReportStatus, 'verified' | 'rejected'>, reason: string) {
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
