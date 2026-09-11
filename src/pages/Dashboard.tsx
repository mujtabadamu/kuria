import { Link } from 'react-router-dom'
import { FileText, CheckCircle2, Users, MapPinned, ShieldAlert } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { ReportRow } from '../components/ReportRow'
import { ReportMap } from '../components/ReportMap'
import { LoadingState, ErrorState } from '../components/QueryState'
import { useListReportsQuery } from '../api/kuria'
import { useAnalyticsMetrics } from '../hooks/useAnalyticsMetrics'
import { useAlerts } from '../hooks/useAlerts'
import { StatusDonut } from '../components/StatusDonut'
import { TopNDonut } from '../components/TopNDonut'
import { groupStatusCounts } from '../lib/statusGroups'

export function Dashboard() {
  // Recent reports + map preview: a small unfiltered page of the real list.
  const { data, isLoading, isError, refetch } = useListReportsQuery({ limit: 6 })
  const { metrics, isLoading: isMetricsLoading, isError: isMetricsError } = useAnalyticsMetrics()
  const { alerts, total: openAlertsTotal } = useAlerts()

  const recent = data?.items ?? []
  const recentAlerts = alerts.slice(0, 3)

  return (
    <div className="space-y-6">
      {isMetricsLoading ? (
        <LoadingState label="Loading dashboard metrics…" />
      ) : isMetricsError ? (
        <ErrorState description="Couldn't load dashboard metrics." />
      ) : (
        metrics && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <MetricCard label="Total Reports" value={metrics.total_reports} icon={FileText} />
              <MetricCard label="Verified" value={metrics.verified_reports} icon={CheckCircle2} tone="success" />
              <MetricCard label="Active users" value={metrics.active_users} icon={Users} />
              <MetricCard label="LGAs covered" value={metrics.lgas_covered} icon={MapPinned} />
            </div>

            <div className="grid gap-6 rounded-2xl border border-secondary/30 bg-surface p-5 sm:grid-cols-3">
              <div>
                <p className="label-text text-secondary">By status</p>
                <div className="mt-3">
                  <StatusDonut counts={groupStatusCounts(metrics.by_status)} />
                </div>
              </div>
              <div>
                <p className="label-text text-secondary">By incident type</p>
                <div className="mt-3">
                  <TopNDonut counts={metrics.by_incident_type} />
                </div>
              </div>
              <div>
                <p className="label-text text-secondary">By state</p>
                <div className="mt-3">
                  <TopNDonut counts={metrics.by_state} />
                </div>
              </div>
            </div>
          </>
        )
      )}

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
            <h2 className="flex items-center gap-1.5 text-lg font-bold text-primary">
              <ShieldAlert size={18} className={openAlertsTotal > 0 ? 'text-danger' : 'text-secondary'} />
              Recent alerts
            </h2>
            <Link to="/alerts" className="text-sm font-semibold text-primary hover:text-tertiary hover:underline">
              View all ({openAlertsTotal}) →
            </Link>
          </div>
          <div className="space-y-3">
            {recentAlerts.length === 0 ? (
              <p className="rounded-xl border border-dashed border-secondary/30 p-4 text-sm text-secondary">
                No alerts match the current filters.
              </p>
            ) : (
              recentAlerts.map((alert) => (
                <div key={alert.id} className="rounded-xl border border-secondary/30 bg-surface p-4 shadow-sm">
                  <p className="text-sm font-semibold text-primary">{alert.title}</p>
                  <p className="mt-1 text-xs text-secondary">{alert.source ?? 'Unknown source'}</p>
                </div>
              ))
            )}
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
