import { useCallback, useState, type ReactNode } from 'react'
import { AppDataContext, type VerifyReportInput } from './AppDataContext'
import {
  alerts as initialAlerts,
  fellows as initialFellows,
  reports as initialReports,
  type Fellow,
  type VoiceReport,
} from '../data/mockData'

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState(initialReports)
  const [fellows, setFellows] = useState(initialFellows)
  const [alerts] = useState(initialAlerts)

  const verifyReport = useCallback((id: string, input: VerifyReportInput) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: input.status, verifiedBy: input.verifiedBy, notes: input.notes ?? r.notes }
          : r,
      ),
    )
  }, [])

  const addReport = useCallback((report: VoiceReport) => {
    setReports((prev) => [report, ...prev])
  }, [])

  const addFellow = useCallback((fellow: Fellow) => {
    setFellows((prev) => [fellow, ...prev])
  }, [])

  const toggleFellowActive = useCallback((id: string) => {
    setFellows((prev) => prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f)))
  }, [])

  const toggleFellowTraining = useCallback((id: string) => {
    setFellows((prev) => prev.map((f) => (f.id === id ? { ...f, trainingComplete: !f.trainingComplete } : f)))
  }, [])

  return (
    <AppDataContext.Provider
      value={{
        reports,
        fellows,
        alerts,
        verifyReport,
        addReport,
        addFellow,
        toggleFellowActive,
        toggleFellowTraining,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}
