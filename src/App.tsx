import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './lib/theme'
import { PublicLayout } from './layouts/PublicLayout'
import { AppLayout } from './layouts/AppLayout'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Reports } from './pages/Reports'
import { ReportDetail } from './pages/ReportDetail'
import { MapPage } from './pages/MapPage'
import { Alerts } from './pages/Alerts'
import { Fellows } from './pages/Fellows'
import { VoterEducation } from './pages/VoterEducation'
import { About } from './pages/About'
import { Settings } from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/voter-education" element={<VoterEducation />} />
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
