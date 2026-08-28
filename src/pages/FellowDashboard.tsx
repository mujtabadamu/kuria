import { Link } from 'react-router-dom'
import { ArrowRight, FileText, CheckCircle2, Clock, Flag } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { ReportRow } from '../components/ReportRow'
import { ReportCard } from '../components/ReportCard'
import { TrendChart, type TrendSeries } from '../components/TrendChart'
import { useAppData } from '../lib/useAppData'
import type { ReportStatus } from '../data/mockData'

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

export function FellowDashboard() {
  const { reports } = useAppData()

  const verified = reports.filter((r) => r.status === 'verified').length
  const pending = reports.filter((r) => r.status === 'pending').length
  const flagged = reports.filter((r) => r.status === 'flagged').length

  const categories = Array.from(new Set(reports.map((r) => dayLabel(r.timestamp)))).sort(
    (a, b) => new Date(`${a} 2026`).getTime() - new Date(`${b} 2026`).getTime(),
  )

  function seriesFor(status: ReportStatus) {
    return categories.map(
      (day) => reports.filter((r) => dayLabel(r.timestamp) === day && r.status === status).length,
    )
  }

  const series: TrendSeries[] = [
    { label: 'Verified', color: 'var(--color-success)', values: seriesFor('verified') },
    { label: 'Pending', color: 'var(--color-secondary)', values: seriesFor('pending') },
    { label: 'Flagged', color: 'var(--color-danger)', values: seriesFor('flagged') },
  ]

  const recent = reports.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-primary">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Total reports" value={reports.length} icon={FileText} />
        <MetricCard label="Verified" value={verified} icon={CheckCircle2} tone="success" />
        <MetricCard label="Pending" value={pending} icon={Clock} />
        <MetricCard label="Flagged" value={flagged} icon={Flag} accent={flagged > 0} />
      </div>

      <TrendChart title="Reports over time" categories={categories} series={series} />

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
                <th className="px-4 py-3">Lang</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {recent.map((report) => (
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
    </div>
  )
}
