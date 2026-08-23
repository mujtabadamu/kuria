import type { LucideIcon } from 'lucide-react'

export function MetricCard({
  label,
  value,
  icon: Icon,
  accent = false,
}: {
  label: string
  value: string | number
  icon?: LucideIcon
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? 'border-danger bg-danger' : 'border-secondary/30 bg-surface'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`label-text ${accent ? 'text-white/70' : 'text-secondary'}`}>{label}</p>
        {Icon && (
          <Icon
            size={20}
            className={accent ? 'text-white' : 'text-primary'}
            aria-hidden="true"
          />
        )}
      </div>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${accent ? 'text-white' : 'text-primary'}`}>
        {value}
      </p>
    </div>
  )
}
