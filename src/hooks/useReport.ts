import { useGetReportQuery, useGetReportHistoryQuery } from '../api/kuria'

export function useReport(publicRef: string | undefined) {
  const reportQuery = useGetReportQuery({ publicRef: publicRef ?? '' }, { skip: !publicRef })
  const historyQuery = useGetReportHistoryQuery({ publicRef: publicRef ?? '' }, { skip: !publicRef })

  return {
    report: reportQuery.data,
    isLoading: reportQuery.isLoading,
    isFetching: reportQuery.isFetching,
    isError: reportQuery.isError,
    refetch: reportQuery.refetch,
    history: historyQuery.data ?? [],
    isHistoryLoading: historyQuery.isLoading,
  }
}
