export function StatCard({
  value,
  label,
  tone = 'default',
}: {
  value: string
  label: string
  tone?: 'default' | 'success'
}) {
  return (
    <div className="rounded-2xl border border-secondary/30 bg-surface px-6 py-5 text-center">
      <p className={`text-3xl font-bold tabular-nums ${tone === 'success' ? 'text-success' : 'text-primary'}`}>
        {value}
      </p>
      <p className="label-text mt-1 text-secondary">{label}</p>
    </div>
  )
}
