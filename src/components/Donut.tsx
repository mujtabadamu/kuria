export interface DonutEntry {
  id: string
  label: string
  count: number
  color: string
}

const SIZE = 152
const STROKE = 20
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
// 2px surface-color gap between segments, per the dataviz skill's mark spec.
const GAP = 3

/** Generic donut renderer — takes pre-resolved {id, label, count, color} entries
 *  (already theme-resolved by the caller) so it stays agnostic to where the
 *  color scheme comes from (fixed status groups vs. a ranked top-N palette). */
export function Donut({ entries, totalLabel = 'reports' }: { entries: DonutEntry[]; totalLabel?: string }) {
  const total = entries.reduce((sum, e) => sum + e.count, 0)

  if (total === 0) {
    return <p className="text-sm text-secondary">No data yet.</p>
  }

  const arcs = entries.reduce<{ id: string; color: string; dash: number; offset: number }[]>((acc, e) => {
    const cumulative = acc.reduce((sum, a) => sum + a.dash + GAP, 0)
    const length = (e.count / total) * CIRCUMFERENCE
    const dash = Math.max(length - GAP, 0)
    acc.push({ id: e.id, color: e.color, dash, offset: -cumulative })
    return acc
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`${entries.map((e) => `${e.label} ${e.count}`).join(', ')} — ${total} total`}
      >
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          {arcs.map(({ id, color, dash, offset }) => (
            <circle
              key={id}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth={STROKE}
              strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          ))}
        </g>
        <text x={SIZE / 2} y={SIZE / 2 - 3} textAnchor="middle" fontSize="24" fontWeight="700" fill="currentColor" className="text-primary">
          {total}
        </text>
        <text x={SIZE / 2} y={SIZE / 2 + 17} textAnchor="middle" fontSize="11" fill="currentColor" className="text-secondary">
          {totalLabel}
        </text>
      </svg>

      <ul className="w-full space-y-1.5 text-sm">
        {entries.map((e) => (
          <li key={e.id} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: e.color }} aria-hidden="true" />
            <span className="flex-1 truncate text-secondary">{e.label}</span>
            <span className="font-semibold tabular-nums text-primary">{e.count}</span>
            <span className="w-10 shrink-0 text-right text-xs tabular-nums text-secondary">
              {Math.round((e.count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
