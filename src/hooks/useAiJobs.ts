import { useState } from 'react'
import { useListAiJobsQuery, type AiJobStatus } from '../api/kuria'

export const AI_JOBS_PAGE_SIZE = 25

// Fellows automatically receive only jobs assigned to them (backend/new.md
// §7) — same server-side scoping pattern as the reports queue.
export function useAiJobs() {
  const [status, setStatusRaw] = useState<AiJobStatus | 'all'>('low_confidence')
  const [skip, setSkip] = useState(0)

  const { data, isLoading, isFetching, isError, refetch } = useListAiJobsQuery({
    status: status === 'all' ? undefined : status,
    skip,
    limit: AI_JOBS_PAGE_SIZE,
  })

  function setStatus(next: AiJobStatus | 'all') {
    setStatusRaw(next)
    setSkip(0)
  }

  function setPage(page: number) {
    setSkip(page * AI_JOBS_PAGE_SIZE)
  }

  return {
    jobs: data?.items ?? [],
    total: data?.total ?? 0,
    page: Math.floor(skip / AI_JOBS_PAGE_SIZE),
    pageSize: AI_JOBS_PAGE_SIZE,
    setPage,
    status,
    setStatus,
    isLoading,
    isFetching,
    isError,
    refetch,
  }
}
