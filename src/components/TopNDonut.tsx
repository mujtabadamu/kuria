import { useTheme } from '../lib/useTheme'
import { topNWithOther } from '../lib/topNDonut'
import { Donut } from './Donut'

export function TopNDonut({ counts }: { counts: Record<string, number> }) {
  const { theme } = useTheme()
  const entries = topNWithOther(counts, theme)
  return <Donut entries={entries} />
}
