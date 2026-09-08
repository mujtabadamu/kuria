import { useGetAnalyticsMetricsQuery } from '../api/kuria'

// `MetricsApiV1AnalyticsMetricsGetApiResponse` is `any` in the generated
// types because the backend's OpenAPI spec never defines a response schema
// for this endpoint (`content: { application/json: { schema: {} } }`). We
// can't know the real field names without a live authenticated call — so
// this hook deliberately does NOT assume specific keys exist; consumers
// should render whatever comes back generically (see Dashboard.tsx) until
// the real shape is confirmed and this can be tightened to named fields.
export function useAnalyticsMetrics() {
  const { data, isLoading, isFetching, isError, refetch } = useGetAnalyticsMetricsQuery()
  const metrics = data && typeof data === 'object' ? (data as Record<string, unknown>) : undefined

  return {
    metrics,
    isLoading: isLoading || isFetching,
    isError,
    refetch,
  }
}
