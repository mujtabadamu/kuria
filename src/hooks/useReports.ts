import { useMemo, useState } from 'react'
import { useListReportsQuery, type ReportStatus } from '../api/kuria'

export const REPORTS_PAGE_SIZE = 25

// Used by both the admin (Reports, Dashboard, MapPage) and fellow
// (FellowReports, FellowDashboard) trees — a cross-feature hook per
// CLAUDE.md's convention, so it lives in src/hooks, not a page folder.
export function useReports() {
  const [status, setStatusRaw] = useState<ReportStatus | 'all'>('all')
  const [lga, setLga] = useState('all')
  const [query, setQuery] = useState('')
  const [skip, setSkip] = useState(0)

  const { data, isLoading, isFetching, isError, refetch } = useListReportsQuery({
    status: status === 'all' ? undefined : status,
    skip,
    limit: REPORTS_PAGE_SIZE,
  })

  const items = useMemo(() => data?.items ?? [], [data])

  // The API has no `lga` filter param, so LGA + text search only apply within
  // whatever page is currently loaded — not across the full result set. This
  // is a real limitation vs. the old (unpaginated, fully-client-side) mock.
  const lgaOptions = useMemo(
    () =>
      Array.from(new Set(items.map((r) => r.pu?.lga).filter((v): v is string => Boolean(v)))).sort(),
    [items],
  )

  const filtered = useMemo(
    () =>
      items.filter((r) => {
        if (lga !== 'all' && r.pu?.lga !== lga) return false
        if (query) {
          const q = query.toLowerCase()
          const haystack = [
            r.public_ref,
            r.pu?.lga,
            r.pu?.pu_name,
            r.location_text,
            r.incident_type,
            r.transcript,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          if (!haystack.includes(q)) return false
        }
        return true
      }),
    [items, lga, query],
  )

  function setStatus(next: ReportStatus | 'all') {
    setStatusRaw(next)
    setSkip(0)
  }

  function setPage(page: number) {
    setSkip(page * REPORTS_PAGE_SIZE)
  }

  return {
    reports: filtered,
    pageItemCount: items.length,
    total: data?.total ?? 0,
    page: Math.floor(skip / REPORTS_PAGE_SIZE),
    pageSize: REPORTS_PAGE_SIZE,
    setPage,
    status,
    setStatus,
    lga,
    setLga,
    lgaOptions,
    query,
    setQuery,
    isLoading,
    isFetching,
    isError,
    refetch,
  }
}
