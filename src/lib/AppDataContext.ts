import { createContext } from 'react'
import type { DisinfoAlert, Fellow, ReportStatus, VoiceReport } from '../data/mockData'

export interface VerifyReportInput {
  status: ReportStatus
  verifiedBy: string
  notes?: string
}

export interface AppDataContextValue {
  reports: VoiceReport[]
  fellows: Fellow[]
  alerts: DisinfoAlert[]
  verifyReport: (id: string, input: VerifyReportInput) => void
  addReport: (report: VoiceReport) => void
  addFellow: (fellow: Fellow) => void
  toggleFellowActive: (id: string) => void
  toggleFellowTraining: (id: string) => void
}

export const AppDataContext = createContext<AppDataContextValue | null>(null)
