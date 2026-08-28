export interface TrendSeries {
  label: string
  color: string
  values: number[]
}

const TOP_PAD = 10
const BOTTOM_PAD = 8

export function TrendChart({
  title,
  categories,
  series,
}: {
  title: string
  categories: string[]
  series: TrendSeries[]
}) {
  const max = Math.max(1, ...series.flatMap((s) => s.values))
  const n = categories.length

  const xFor = (i: number) => (n > 1 ? 4 + (i / (n - 1)) * 92 : 50)
  const yFor = (value: number) => TOP_PAD + (1 - value / max) * (100 - TOP_PAD - BOTTOM_PAD)

  return (
    <div className="rounded-2xl border border-secondary/30 bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-primary">{title}</h2>
        <div className="flex flex-wrap items-center gap-3">
          {series.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div
        className="relative mt-4 h-36"
        role="img"
        aria-label={`${title}: ${series
          .map((s) => `${s.label} — ${categories.map((c, i) => `${c} ${s.values[i]}`).join(', ')}`)
          .join('; ')}`}
      >
        <div className="absolute inset-x-0 bottom-6 border-b border-secondary/20" />

        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {series.map((s) => (
            <polyline
              key={s.label}
              points={s.values.map((v, i) => `${xFor(i)},${yFor(v)}`).join(' ')}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {series.map((s) =>
          s.values.map((v, i) => (
            <div
              key={`${s.label}-${categories[i]}`}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface"
              style={{ left: `${xFor(i)}%`, top: `${yFor(v)}%`, backgroundColor: s.color }}
              title={`${s.label} · ${categories[i]}: ${v}`}
            />
          )),
        )}

        {categories.map((c, i) => (
          <span
            key={c}
            className="absolute -translate-x-1/2 text-xs font-medium text-secondary"
            style={{ left: `${xFor(i)}%`, top: 'calc(100% - 14px)' }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
