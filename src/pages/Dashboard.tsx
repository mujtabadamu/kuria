import { Link } from 'react-router-dom'
import { FileText, CheckCircle2, Users, ShieldAlert } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { ReportRow } from '../components/ReportRow'
import { ReportMap } from '../components/ReportMap'
import { reports, alerts, stats } from '../data/mockData'

export function Dashboard() {
  const recent = reports.slice(0, 6)
  const recentAlerts = alerts.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Reports today" value={stats.reportsToday} icon={FileText} />
        <MetricCard label="Verified %" value={`${stats.verificationRate}%`} icon={CheckCircle2} tone="success" />
        <MetricCard label="Active fellows" value={stats.fellowsTrained} icon={Users} />
        <MetricCard
          label="Open disinfo alerts"
          value={stats.activeAlerts}
          icon={ShieldAlert}
          accent={stats.activeAlerts > 0}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">Map preview</h2>
            <Link to="/map" className="text-sm font-semibold text-primary hover:text-tertiary hover:underline">
              Open full map →
            </Link>
          </div>
          <ReportMap reports={reports} height="320px" zoom={8} />
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
              <div
                key={alert.id}
                className={`rounded-xl border-l-4 bg-surface p-4 shadow-sm ${
                  alert.severity === 'high' ? 'border-l-danger' : 'border-l-secondary'
                }`}
              >
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
        <div className="overflow-x-auto rounded-2xl border border-secondary/30 bg-surface">
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
                <ReportRow key={report.id} report={report} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
