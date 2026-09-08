import { useGetAnalyticsMetricsQuery } from '../api/kuria'

// Now properly typed as `MetricsResponse` by the backend (previously an
// undocumented `any`) — totals plus breakdowns by status/incident type/state/ward.
export function useAnalyticsMetrics() {
  const { data, isLoading, isFetching, isError, refetch } = useGetAnalyticsMetricsQuery()

  return {
    metrics: data,
    isLoading: isLoading || isFetching,
    isError,
    refetch,
  }
}
