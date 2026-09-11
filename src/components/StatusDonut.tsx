import { useTheme } from '../lib/useTheme'
import { STATUS_GROUPS, STATUS_GROUP_ORDER, type StatusGroupId } from '../lib/statusGroups'
import { Donut } from './Donut'

export function StatusDonut({ counts }: { counts: Record<StatusGroupId, number> }) {
  const { theme } = useTheme()
  const entries = STATUS_GROUP_ORDER.filter((id) => counts[id] > 0).map((id) => ({
    id,
    label: STATUS_GROUPS[id].label,
    count: counts[id],
    color: theme === 'dark' ? STATUS_GROUPS[id].dark : STATUS_GROUPS[id].light,
  }))

  return <Donut entries={entries} />
}
