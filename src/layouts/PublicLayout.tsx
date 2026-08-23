import { Outlet } from 'react-router-dom'
import { PublicHeader } from '../components/PublicHeader'
import { Footer } from '../components/Footer'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
