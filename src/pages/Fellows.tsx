import { useState } from 'react'
import {
  Search,
  UserPlus,
  BadgeCheck,
  Mail,
  Phone,
  Calendar,
  UserX,
  UserCheck,
  GraduationCap,
  Eye,
} from 'lucide-react'
import { useAppData } from '../lib/useAppData'
import { Modal } from '../components/Modal'
import { DropdownMenu } from '../components/DropdownMenu'
import type { Fellow } from '../data/mockData'

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

function ProfileDetails({ fellow }: { fellow: Fellow }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-chrome text-lg font-bold text-on-chrome">
          {fellow.avatarInitials}
        </div>
        <div>
          <p className="font-bold text-primary">{fellow.name}</p>
          <p className="text-sm text-secondary">
            {fellow.lga} LGA, {fellow.state} State
          </p>
        </div>
      </div>
      <dl className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail size={14} className="shrink-0 text-secondary" aria-hidden="true" />
          <dd className="text-primary">{fellow.email || 'Not provided'}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} className="shrink-0 text-secondary" aria-hidden="true" />
          <dd className="text-primary">{fellow.phone || 'Not provided'}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="shrink-0 text-secondary" aria-hidden="true" />
          <dd className="text-primary">Joined {fellow.joinedDate}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center gap-4 border-t border-secondary/30 pt-4 text-sm">
        <span className="text-secondary">
          <strong className="text-primary">{fellow.reportsVerified}</strong> reports verified
        </span>
        <span className="text-secondary">
          <strong className="text-primary">{fellow.reportsFlagged}</strong> reports flagged
        </span>
        {fellow.trainingComplete ? (
          <span className="inline-flex items-center gap-1 font-semibold text-success">
            <BadgeCheck size={16} />
            Trained
          </span>
        ) : (
          <span className="font-semibold text-secondary">In training</span>
        )}
      </div>
    </div>
  )
}

export function Fellows() {
  const { fellows, addFellow, toggleFellowActive, toggleFellowTraining } = useAppData()
  const [query, setQuery] = useState('')
  const [viewingFellow, setViewingFellow] = useState<Fellow | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [state, setState] = useState('Kaduna')
  const [lga, setLga] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const filtered = fellows.filter((f) =>
    `${f.name} ${f.lga}`.toLowerCase().includes(query.toLowerCase()),
  )

  function handleAddFellow(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !state.trim() || !lga.trim()) return
    addFellow({
      id: `FEL-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      name: name.trim(),
      state: state.trim(),
      lga: lga.trim(),
      reportsVerified: 0,
      reportsFlagged: 0,
      trainingComplete: false,
      avatarInitials: initialsFor(name.trim()),
      phone: phone.trim(),
      email: email.trim(),
      joinedDate: new Date().toISOString().slice(0, 10),
      active: true,
    })
    setName('')
    setState('Kaduna')
    setLga('')
    setEmail('')
    setPhone('')
    setAddModalOpen(false)
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
            placeholder="Search fellows or LGA..."
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

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-secondary/30 bg-surface md:block">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-secondary/30 text-xs font-semibold uppercase tracking-wide text-secondary">
              <th className="px-4 py-3">Fellow</th>
              <th className="px-4 py-3">Reports verified</th>
              <th className="px-4 py-3">Reports flagged</th>
              <th className="px-4 py-3">Training</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((fellow) => (
              <tr key={fellow.id} className="border-b border-secondary/30 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chrome text-sm font-bold text-on-chrome">
                      {fellow.avatarInitials}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{fellow.name}</p>
                      <p className="text-sm text-secondary">{fellow.lga} LGA</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-primary">{fellow.reportsVerified}</td>
                <td className="px-4 py-3 text-sm text-primary">{fellow.reportsFlagged}</td>
                <td className="px-4 py-3">
                  {fellow.trainingComplete ? (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-success">
                      <BadgeCheck size={16} />
                      Trained
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-secondary">In training</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusPill active={fellow.active} />
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu
                    label={`Actions for ${fellow.name}`}
                    items={[
                      {
                        label: 'View profile',
                        icon: Eye,
                        onClick: () => setViewingFellow(fellow),
                      },
                      {
                        label: fellow.trainingComplete ? 'Mark in training' : 'Mark trained',
                        icon: GraduationCap,
                        tone: fellow.trainingComplete ? 'default' : 'success',
                        onClick: () => toggleFellowTraining(fellow.id),
                      },
                      {
                        label: fellow.active ? 'Deactivate' : 'Reactivate',
                        icon: fellow.active ? UserX : UserCheck,
                        tone: fellow.active ? 'danger' : 'success',
                        onClick: () => toggleFellowActive(fellow.id),
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
        {filtered.map((fellow) => (
          <div key={fellow.id} className="rounded-2xl border border-secondary/30 bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-chrome text-lg font-bold text-on-chrome">
                  {fellow.avatarInitials}
                </div>
                <div>
                  <p className="font-bold text-primary">{fellow.name}</p>
                  <p className="text-sm text-secondary">{fellow.lga} LGA</p>
                </div>
              </div>
              <StatusPill active={fellow.active} />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-secondary">
                <strong className="text-primary">{fellow.reportsVerified}</strong> verified ·{' '}
                <strong className="text-primary">{fellow.reportsFlagged}</strong> flagged
              </span>
              {fellow.trainingComplete ? (
                <span className="inline-flex items-center gap-1 font-semibold text-success">
                  <BadgeCheck size={16} />
                  Trained
                </span>
              ) : (
                <span className="font-semibold text-secondary">In training</span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setViewingFellow(fellow)}
                className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-primary text-sm font-semibold text-primary hover:bg-chrome hover:text-on-chrome"
              >
                View profile
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => toggleFellowTraining(fellow.id)}
                  className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold ${
                    fellow.trainingComplete
                      ? 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                      : 'border-success text-success hover:bg-success hover:text-white'
                  }`}
                >
                  <GraduationCap size={16} />
                  {fellow.trainingComplete ? 'In training' : 'Mark trained'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleFellowActive(fellow.id)}
                  className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold ${
                    fellow.active
                      ? 'border-danger text-danger hover:bg-danger hover:text-white'
                      : 'border-success text-success hover:bg-success hover:text-white'
                  }`}
                >
                  {fellow.active ? <UserX size={16} /> : <UserCheck size={16} />}
                  {fellow.active ? 'Deactivate' : 'Reactivate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewingFellow && (
        <Modal title="Fellow profile" onClose={() => setViewingFellow(null)}>
          <ProfileDetails fellow={viewingFellow} />
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
              <label htmlFor="fellow-state" className="text-sm font-semibold text-primary">
                State
              </label>
              <input
                id="fellow-state"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div>
              <label htmlFor="fellow-lga" className="text-sm font-semibold text-primary">
                LGA
              </label>
              <input
                id="fellow-lga"
                required
                value={lga}
                onChange={(e) => setLga(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div>
              <label htmlFor="fellow-phone" className="text-sm font-semibold text-primary">
                Phone
              </label>
              <input
                id="fellow-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-secondary/30 px-3 text-base outline-none focus:border-tertiary"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="min-h-[44px] flex-1 rounded-lg bg-tertiary text-sm font-semibold text-white hover:bg-tertiary-dark"
              >
                Save fellow
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
