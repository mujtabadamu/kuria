import { Link } from 'react-router-dom'
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { ReportRow } from '../components/ReportRow'
import { ReportMap } from '../components/ReportMap'
import { LoadingState, ErrorState } from '../components/QueryState'
import { alerts } from '../data/mockData'
import { useListReportsQuery } from '../api/kuria'
import { useAnalyticsMetrics } from '../hooks/useAnalyticsMetrics'

function humanizeKey(key: string) {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function Dashboard() {
  // Recent reports + map preview: a small unfiltered page of the real list.
  const { data, isLoading, isError, refetch } = useListReportsQuery({ limit: 6 })
  // `.total` on a `limit: 1` filtered call gives an accurate aggregate count
  // without walking every page — cheaper and correct, unlike counting a
  // truncated page client-side.
  const { data: verifiedTotal } = useListReportsQuery({ status: 'verified', limit: 1 })
  const { data: allTotal } = useListReportsQuery({ limit: 1 })
  const { metrics, isLoading: isMetricsLoading, isError: isMetricsError } = useAnalyticsMetrics()

  const recent = data?.items ?? []
  const recentAlerts = alerts.slice(0, 3)
  // Only top-level number/string entries render as stat tiles — the response
  // shape is genuinely unknown (see useAnalyticsMetrics), so this renders
  // whatever comes back rather than assuming specific field names exist.
  const metricEntries = metrics
    ? Object.entries(metrics).filter(
        (entry): entry is [string, number | string] =>
          typeof entry[1] === 'number' || typeof entry[1] === 'string',
      )
    : []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Total Reports" value={allTotal?.total ?? '—'} icon={FileText} />
        <MetricCard label="Verified" value={verifiedTotal?.total ?? '—'} icon={CheckCircle2} tone="success" />
        {/* Alerts feature has no backend endpoint yet — intentionally left on mock data. */}
        <MetricCard label="Open disinfo alerts" value={alerts.length} icon={ShieldAlert} accent={alerts.length > 0} />
      </div>

      <div className="rounded-2xl border border-secondary/30 bg-surface p-5">
        <h2 className="text-lg font-bold text-primary">Analytics</h2>
        <p className="mt-1 text-xs text-secondary">
          The backend doesn't publish a fixed schema for this endpoint yet, so these are rendered from
          whatever keys it returns.
        </p>
        {isMetricsLoading ? (
          <div className="mt-3">
            <LoadingState label="Loading analytics…" />
          </div>
        ) : isMetricsError ? (
          <div className="mt-3">
            <ErrorState description="Couldn't load analytics." />
          </div>
        ) : metricEntries.length === 0 ? (
          <p className="mt-3 text-sm text-secondary">No analytics data returned.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {metricEntries.map(([key, value]) => (
              <div key={key} className="rounded-xl border border-secondary/20 bg-neutral p-4">
                <p className="label-text text-secondary">{humanizeKey(key)}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-primary">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">Map preview</h2>
            <Link to="/map" className="text-sm font-semibold text-primary hover:text-tertiary hover:underline">
              Open full map →
            </Link>
          </div>
          {isLoading ? (
            <LoadingState label="Loading map…" />
          ) : isError ? (
            <ErrorState description="Couldn't load reports." onRetry={refetch} />
          ) : (
            <ReportMap reports={recent} height="320px" zoom={8} />
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">Recent alerts</h2>
            <Link to="/alerts" className="text-sm font-semibold text-primary hover:text-tertiary hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="rounded-xl border border-secondary/30 bg-surface p-4 shadow-sm">
                <p className="text-sm font-semibold text-primary">{alert.title}</p>
                <p className="mt-1 text-xs text-secondary">{alert.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary">Recent reports</h2>
          <Link to="/reports" className="text-sm font-semibold text-primary hover:text-tertiary hover:underline">
            View all →
          </Link>
        </div>
        {isLoading ? (
          <LoadingState label="Loading reports…" />
        ) : isError ? (
          <ErrorState description="Couldn't load reports." onRetry={refetch} />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-secondary/30 bg-surface">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-secondary/30 text-xs font-semibold uppercase tracking-wide text-secondary">
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">LGA</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Summary</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {recent.map((report) => (
                  <ReportRow key={report.id} report={report} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
