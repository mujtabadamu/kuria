import type { LucideIcon } from 'lucide-react'

export function MetricCard({
  label,
  value,
  icon: Icon,
  accent = false,
  tone = 'default',
}: {
  label: string
  value: string | number
  icon?: LucideIcon
  accent?: boolean
  tone?: 'default' | 'success'
}) {
  const valueColor = accent ? 'text-danger' : tone === 'success' ? 'text-success' : 'text-primary'
  const iconColor = accent ? 'text-danger' : tone === 'success' ? 'text-success' : 'text-primary'

  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? 'border-danger/40 bg-surface' : 'border-secondary/30 bg-surface'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`label-text ${accent ? 'text-danger' : 'text-secondary'}`}>{label}</p>
        {Icon && <Icon size={20} className={iconColor} aria-hidden="true" />}
      </div>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${valueColor}`}>{value}</p>
    </div>
  )
}
