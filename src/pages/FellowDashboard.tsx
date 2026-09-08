import { Link } from 'react-router-dom'
import { ArrowRight, FileText, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { ReportRow } from '../components/ReportRow'
import { ReportCard } from '../components/ReportCard'
import { LoadingState, ErrorState } from '../components/QueryState'
import { TrendChart, type TrendSeries } from '../components/TrendChart'
import { REPORT_STATUS_CONFIG } from '../lib/reportStatus'
import { useReports } from '../hooks/useReports'
import type { ReportRead, ReportStatus } from '../api/kuria'

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

// Trend line covers 3 representative real statuses rather than an invented
// grouping, matching the full-pipeline status model used everywhere else.
const TREND_STATUSES: ReportStatus[] = ['under_review', 'verified', 'rejected']

export function FellowDashboard() {
  const { reports, total, isLoading, isError, refetch } = useReports()

  const verified = reports.filter((r) => r.status === 'verified').length
  const underReview = reports.filter((r) => r.status === 'under_review').length
  const rejected = reports.filter((r) => r.status === 'rejected').length

  const categories = Array.from(new Set(reports.map((r) => dayLabel(r.created_at)))).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  )

  function seriesFor(status: ReportStatus) {
    return categories.map(
      (day) => reports.filter((r) => dayLabel(r.created_at) === day && r.status === status).length,
    )
  }

  const series: TrendSeries[] = TREND_STATUSES.map((status) => ({
    label: REPORT_STATUS_CONFIG[status].label,
    color: REPORT_STATUS_CONFIG[status].dotColor,
    values: seriesFor(status),
  }))

  const recent = reports.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-primary">Dashboard</h1>

      {isLoading ? (
        <LoadingState label="Loading your reports…" />
      ) : isError ? (
        <ErrorState description="Couldn't load reports." onRetry={refetch} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Total reports" value={total} icon={FileText} />
            <MetricCard label="Verified" value={verified} icon={CheckCircle2} tone="success" />
            <MetricCard label="Under review" value={underReview} icon={Eye} />
            <MetricCard label="Rejected" value={rejected} icon={XCircle} accent={rejected > 0} />
          </div>

          <TrendChart title="Reports over time (this page)" categories={categories} series={series} />

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-primary">Recent reports</h2>
              <Link
                to="/fellow/reports"
                className="flex min-h-[44px] items-center gap-1.5 rounded-full bg-tertiary px-4 text-sm font-semibold text-white hover:bg-tertiary-dark"
              >
                View all reports
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="hidden overflow-x-auto rounded-2xl border border-secondary/30 bg-surface md:block">
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
                  {recent.map((report: ReportRead) => (
                    <ReportRow key={report.id} report={report} basePath="/fellow/reports" />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {recent.map((report) => (
                <ReportCard key={report.id} report={report} basePath="/fellow/reports" />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
