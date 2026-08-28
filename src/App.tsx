import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './lib/theme'
import { AppDataProvider } from './lib/appData'
import { ToastProvider } from './lib/toast'
import { PublicLayout } from './layouts/PublicLayout'
import { AppLayout } from './layouts/AppLayout'
import { FellowLayout } from './layouts/FellowLayout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Reports } from './pages/Reports'
import { ReportDetail } from './pages/ReportDetail'
import { MapPage } from './pages/MapPage'
import { Alerts } from './pages/Alerts'
import { Fellows } from './pages/Fellows'
import { FellowDashboard } from './pages/FellowDashboard'
import { FellowReports } from './pages/FellowReports'
import { FellowNewReport } from './pages/FellowNewReport'
import { FellowProfile } from './pages/FellowProfile'
import { About } from './pages/About'
import { Settings } from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route element={<PublicLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
              </Route>

              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/:id" element={<ReportDetail />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/fellows" element={<Fellows />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              <Route element={<FellowLayout />}>
                <Route path="/fellow" element={<FellowDashboard />} />
                <Route path="/fellow/reports" element={<FellowReports />} />
                <Route path="/fellow/reports/:id" element={<ReportDetail />} />
                <Route path="/fellow/new" element={<FellowNewReport />} />
                <Route path="/fellow/profile" element={<FellowProfile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppDataProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
