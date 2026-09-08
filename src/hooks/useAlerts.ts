import { useState } from 'react'
import { useListAlertsQuery, type AlertRead } from '../api/kuria'

export const ALERTS_PAGE_SIZE = 20

type AlertStatus = AlertRead['status']
type AlertSeverity = AlertRead['severity']

export function useAlerts() {
  const [status, setStatusRaw] = useState<AlertStatus | 'all'>('all')
  const [severity, setSeverityRaw] = useState<AlertSeverity | 'all'>('all')
  const [skip, setSkip] = useState(0)

  const { data, isLoading, isFetching, isError, refetch } = useListAlertsQuery({
    status: status === 'all' ? undefined : status,
    severity: severity === 'all' ? undefined : severity,
    skip,
    limit: ALERTS_PAGE_SIZE,
  })

  function setStatus(next: AlertStatus | 'all') {
    setStatusRaw(next)
    setSkip(0)
  }

  function setSeverity(next: AlertSeverity | 'all') {
    setSeverityRaw(next)
    setSkip(0)
  }

  function setPage(page: number) {
    setSkip(page * ALERTS_PAGE_SIZE)
  }

  return {
    alerts: data?.items ?? [],
    total: data?.total ?? 0,
    page: Math.floor(skip / ALERTS_PAGE_SIZE),
    pageSize: ALERTS_PAGE_SIZE,
    setPage,
    status,
    setStatus,
    severity,
    setSeverity,
    isLoading,
    isFetching,
    isError,
    refetch,
  }
}
