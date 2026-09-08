import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  page,
  pageSize,
  total,
  hasMore,
  onPageChange,
}: {
  page: number
  pageSize: number
  /** Exact total, when the API provides one (e.g. `ReportListResponse.total`). */
  total?: number
  /** Fallback when there's no total (e.g. the plain-array Users list): whether this page was full. */
  hasMore?: boolean
  onPageChange: (page: number) => void
}) {
  const totalPages = total !== undefined ? Math.max(1, Math.ceil(total / pageSize)) : undefined
  const canGoNext = totalPages !== undefined ? page + 1 < totalPages : Boolean(hasMore)

  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm text-secondary">
        {totalPages !== undefined ? (
          <>
            Page {page + 1} of {totalPages} · {total} total
          </>
        ) : (
          <>Page {page + 1}</>
        )}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          className="flex min-h-[40px] items-center gap-1 rounded-lg border border-secondary/30 px-3 text-sm font-semibold text-primary hover:bg-neutral disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
          className="flex min-h-[40px] items-center gap-1 rounded-lg border border-secondary/30 px-3 text-sm font-semibold text-primary hover:bg-neutral disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
