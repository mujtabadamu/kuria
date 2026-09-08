import { useState } from 'react'
import { Search, UserPlus, Mail, Calendar, UserX, UserCheck, Eye } from 'lucide-react'
import { useUsers } from '../hooks/useUsers'
import { Modal } from '../components/Modal'
import { DropdownMenu } from '../components/DropdownMenu'
import { Pagination } from '../components/Pagination'
import { LoadingState, EmptyState, ErrorState } from '../components/QueryState'
import { useToast } from '../lib/useToast'
import type { UserRead, UserRole } from '../api/kuria'

const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  verification_lead: 'Verification lead',
  fellow: 'Fellow',
  stakeholder_reader: 'Stakeholder (read-only)',
}

function initialsFor(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-sm font-semibold ${
        active ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'
      }`}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}

function NotAvailable() {
  return (
    <span className="text-secondary/60" title="Not supported by the API yet">
      Not available
    </span>
  )
}

function ProfileDetails({ user }: { user: UserRead }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-chrome text-lg font-bold text-on-chrome">
          {initialsFor(user.full_name)}
        </div>
        <div>
          <p className="font-bold text-primary">{user.full_name}</p>
          <p className="text-sm text-secondary">{ROLE_LABELS[user.role]}</p>
        </div>
      </div>
      <dl className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail size={14} className="shrink-0 text-secondary" aria-hidden="true" />
          <dd className="text-primary">{user.email}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="shrink-0 text-secondary" aria-hidden="true" />
          <dd className="text-primary">Joined {new Date(user.created_at).toLocaleDateString()}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center gap-4 border-t border-secondary/30 pt-4 text-sm">
        <span className="text-secondary">
          LGA / State: <NotAvailable />
        </span>
        <span className="text-secondary">
          Phone: <NotAvailable />
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-secondary">
          Reports verified: <NotAvailable />
        </span>
        <span className="text-secondary">
          Reports flagged: <NotAvailable />
        </span>
        <span className="text-secondary">
          Training: <NotAvailable />
        </span>
      </div>
    </div>
  )
}

export function Fellows() {
  const { users, page, hasMore, setPage, pageSize, createUser, isCreating, updateUser, isLoading, isError, refetch } =
    useUsers()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [viewingUser, setViewingUser] = useState<UserRead | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('fellow')

  const filtered = users.filter((u) =>
    `${u.full_name} ${u.email}`.toLowerCase().includes(query.toLowerCase()),
  )

  async function handleAddFellow(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) return
    try {
      await createUser({ email: email.trim(), password, full_name: name.trim(), role })
      showToast('Fellow added.')
      setName('')
      setEmail('')
      setPassword('')
      setRole('fellow')
      setAddModalOpen(false)
    } catch {
      showToast("Couldn't add this fellow — please try again.")
    }
  }

  async function handleToggleActive(user: UserRead) {
    try {
      await updateUser(user.id, { is_active: !user.is_active })
    } catch {
      showToast("Couldn't update this fellow — please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-h-[44px] w-full max-w-sm items-center gap-2 rounded-full border border-secondary/30 bg-surface px-4 sm:w-auto">
          <Search size={16} className="text-secondary" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fellows (this page)..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-secondary"
          />
        </div>
        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="flex min-h-[44px] items-center gap-2 rounded-full bg-tertiary px-4 text-sm font-semibold text-white hover:bg-tertiary-dark"
        >
          <UserPlus size={16} />
          Add fellow
        </button>
      </div>

      {isLoading ? (
        <LoadingState label="Loading fellows…" />
      ) : isError ? (
        <ErrorState description="Couldn't load users from the server." onRetry={refetch} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No fellows match this search" />
      ) : (
        <>
          {/* Desktop: table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-secondary/30 bg-surface md:block">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-secondary/30 text-xs font-semibold uppercase tracking-wide text-secondary">
                  <th className="px-4 py-3">Fellow</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Reports</th>
                  <th className="px-4 py-3">Training</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-secondary/30 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chrome text-sm font-bold text-on-chrome">
                          {initialsFor(user.full_name)}
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{user.full_name}</p>
                          <p className="text-sm text-secondary">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-primary">{ROLE_LABELS[user.role]}</td>
                    <td className="px-4 py-3 text-sm">
                      <NotAvailable />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <NotAvailable />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill active={user.is_active} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu
                        label={`Actions for ${user.full_name}`}
                        items={[
                          { label: 'View profile', icon: Eye, onClick: () => setViewingUser(user) },
                          {
                            label: user.is_active ? 'Deactivate' : 'Reactivate',
                            icon: user.is_active ? UserX : UserCheck,
                            tone: user.is_active ? 'danger' : 'success',
                            onClick: () => handleToggleActive(user),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <div className="grid gap-5 sm:grid-cols-2 md:hidden">
            {filtered.map((user) => (
              <div key={user.id} className="rounded-2xl border border-secondary/30 bg-surface p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-chrome text-lg font-bold text-on-chrome">
                      {initialsFor(user.full_name)}
                    </div>
                    <div>
                      <p className="font-bold text-primary">{user.full_name}</p>
                      <p className="text-sm text-secondary">{ROLE_LABELS[user.role]}</p>
                    </div>
                  </div>
                  <StatusPill active={user.is_active} />
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => setViewingUser(user)}
                    className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-primary text-sm font-semibold text-primary hover:bg-chrome hover:text-on-chrome"
                  >
                    View profile
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(user)}
                    className={`flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold ${
                      user.is_active
                        ? 'border-danger text-danger hover:bg-danger hover:text-white'
                        : 'border-success text-success hover:bg-success hover:text-white'
                    }`}
                  >
                    {user.is_active ? <UserX size={16} /> : <UserCheck size={16} />}
                    {user.is_active ? 'Deactivate' : 'Reactivate'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination page={page} pageSize={pageSize} hasMore={hasMore} onPageChange={setPage} />
        </>
      )}

      {viewingUser && (
        <Modal title="Fellow profile" onClose={() => setViewingUser(null)}>
          <ProfileDetails user={viewingUser} />
        </Modal>
      )}

      {addModalOpen && (
        <Modal title="Add fellow" onClose={() => setAddModalOpen(false)}>
          <form onSubmit={handleAddFellow} className="space-y-4">
            <div>
              <label htmlFor="fellow-name" className="text-sm font-semibold text-primary">
                Full name
              </label>
              <input
                id="fellow-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div>
              <label htmlFor="fellow-email" className="text-sm font-semibold text-primary">
                Email
              </label>
              <input
                id="fellow-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div>
              <label htmlFor="fellow-password" className="text-sm font-semibold text-primary">
                Temporary password
              </label>
              <input
                id="fellow-password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div>
              <label htmlFor="fellow-role" className="text-sm font-semibold text-primary">
                Role
              </label>
              <select
                id="fellow-role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              >
                {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fellow-state" className="text-sm font-semibold text-primary">
                State
              </label>
              <input
                id="fellow-state"
                disabled
                placeholder="Not supported by the API yet"
                className="mt-1.5 min-h-[44px] w-full cursor-not-allowed rounded-lg border border-secondary/30 bg-neutral px-3 text-base text-secondary outline-none"
              />
            </div>
            <div>
              <label htmlFor="fellow-lga" className="text-sm font-semibold text-primary">
                LGA
              </label>
              <input
                id="fellow-lga"
                disabled
                placeholder="Not supported by the API yet"
                className="mt-1.5 min-h-[44px] w-full cursor-not-allowed rounded-lg border border-secondary/30 bg-neutral px-3 text-base text-secondary outline-none"
              />
            </div>
            <div>
              <label htmlFor="fellow-phone" className="text-sm font-semibold text-primary">
                Phone
              </label>
              <input
                id="fellow-phone"
                disabled
                placeholder="Not supported by the API yet"
                className="mt-1.5 min-h-[44px] w-full cursor-not-allowed rounded-lg border border-secondary/30 bg-neutral px-3 text-base text-secondary outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isCreating}
                className="min-h-[44px] flex-1 rounded-lg bg-tertiary text-sm font-semibold text-white hover:bg-tertiary-dark disabled:opacity-60"
              >
                {isCreating ? 'Saving…' : 'Save fellow'}
              </button>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="min-h-[44px] rounded-lg border border-secondary/30 px-6 text-sm font-semibold text-secondary hover:bg-neutral"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
