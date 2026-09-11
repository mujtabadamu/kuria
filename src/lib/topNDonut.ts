// Colors for an open-ended breakdown (incident type, state — anything without a
// fixed enum) shown as a donut: top 4 individually, everything else folded into
// "Other". Validated with the dataviz skill's validator as a 5-slot categorical
// set (all checks pass except the intentional chroma-floor flag on "Other" —
// it's *meant* to read as neutral/de-emphasized, not compete as its own
// identity, matching the skill's "emphasis" pattern: real categories in hue,
// the leftover bucket in gray):
//   node scripts/validate_palette.js "#2a78d6,#eb6834,#1baf7a,#eda100,#63685f" --mode light
//   node scripts/validate_palette.js "#3987e5,#d95926,#199e70,#c98500,#7d8590" --mode dark
const TOP_N = 4
const SLOT_COLORS = [
  { light: '#2a78d6', dark: '#3987e5' },
  { light: '#eb6834', dark: '#d95926' },
  { light: '#1baf7a', dark: '#199e70' },
  { light: '#eda100', dark: '#c98500' },
]
const OTHER_COLOR = { light: '#63685f', dark: '#7d8590' }

export interface TopNEntry {
  id: string
  label: string
  count: number
  color: string
}

export function topNWithOther(counts: Record<string, number>, theme: 'light' | 'dark'): TopNEntry[] {
  const sorted = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])

  const top = sorted.slice(0, TOP_N).map(([label, count], i) => ({
    id: label,
    label,
    count,
    color: theme === 'dark' ? SLOT_COLORS[i].dark : SLOT_COLORS[i].light,
  }))

  const otherCount = sorted.slice(TOP_N).reduce((sum, [, count]) => sum + count, 0)
  if (otherCount > 0) {
    top.push({
      id: '__other__',
      label: 'Other',
      count: otherCount,
      color: theme === 'dark' ? OTHER_COLOR.dark : OTHER_COLOR.light,
    })
  }

  return top
}
