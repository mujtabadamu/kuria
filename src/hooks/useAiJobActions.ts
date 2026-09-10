import { useAssignAiJobMutation, useResolveAiJobMutation, type AiJobResolve } from '../api/kuria'

export function useAiJobActions() {
  const [assignMutation, assignState] = useAssignAiJobMutation()
  const [resolveMutation, resolveState] = useResolveAiJobMutation()

  async function assignJob(jobId: number, assigneeId: number) {
    await assignMutation({ jobId, assigneeId }).unwrap()
  }

  async function resolveJob(jobId: number, resolution: AiJobResolve) {
    await resolveMutation({ jobId, aiJobResolve: resolution }).unwrap()
  }

  return {
    assignJob,
    isAssigning: assignState.isLoading,
    resolveJob,
    isResolving: resolveState.isLoading,
  }
}
