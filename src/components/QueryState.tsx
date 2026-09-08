// Shared loading/empty/error visuals — reuses the dashed-card pattern that
// Reports.tsx/FellowReports.tsx already used for "no results", extended to
// cover the loading and error cases every real (async) query now needs too.
import type { ReactNode } from 'react'

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-secondary/30 bg-surface p-12 text-center">
      <p className="text-sm font-semibold text-secondary">{label}</p>
    </div>
  )
}

export function EmptyState({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-secondary/30 bg-surface p-12 text-center">
      <p className="text-lg font-semibold text-primary">{title}</p>
      {description && <p className="mt-1 text-sm text-secondary">{description}</p>}
      {children}
    </div>
  )
}

export function ErrorState({
  description = "Couldn't load this data. Check your connection and try again.",
  onRetry,
}: {
  description?: string
  onRetry?: () => void
}) {
  return (
    <div className="rounded-2xl border border-dashed border-danger/40 bg-surface p-12 text-center">
      <p className="text-lg font-semibold text-danger">Something went wrong</p>
      <p className="mt-1 text-sm text-secondary">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 min-h-[44px] rounded-lg border border-secondary/30 px-4 text-sm font-semibold text-primary hover:bg-neutral"
        >
          Retry
        </button>
      )}
    </div>
  )
}
