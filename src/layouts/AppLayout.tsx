import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { useAuth } from '../hooks/useAuth'

export function AppLayout() {
  const { isAuthenticated, isLoadingUser, currentUser, mustChangePassword } = useAuth()

  if (!isAuthenticated && !isLoadingUser) return <Navigate to="/login" replace />
  if (isLoadingUser) return null
  // A temporary-password token can only call /auth/me and /auth/change-password —
  // every other request here would 403, so redirect before anything else loads.
  if (mustChangePassword) return <Navigate to="/change-password" replace />
  if (currentUser?.role === 'fellow') return <Navigate to="/fellow" replace />

  return (
    <div className="flex min-h-screen bg-neutral">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
