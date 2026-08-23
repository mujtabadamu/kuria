import { Link } from 'react-router-dom'
import { Mic, ShieldCheck, Megaphone, MessageCircle } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { stats } from '../data/mockData'

const steps = [
  {
    icon: Mic,
    title: 'Speak',
    body: 'Citizens send a WhatsApp voice note in Hausa or English describing what they see at their polling unit.',
  },
  {
    icon: ShieldCheck,
    title: 'Verify',
    body: 'Digital Integrity Fellows transcribe, geolocate, and verify each report against on-ground evidence.',
  },
  {
    icon: Megaphone,
    title: 'Act',
    body: 'Verified reports and disinformation alerts are routed to electoral bodies and published on the dashboard.',
  },
]

export function Landing() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          YAPD4Africa &middot; 2027 Elections
        </span>
        <h1 className="text-display mx-auto mt-6 max-w-2xl text-4xl text-primary sm:text-5xl">
          Verified voices for the 2027 election
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-secondary">
          Kuri&apos;a lets citizens report electoral issues by voice, in Hausa or English, and gives
          fellows and electoral bodies a live, verified picture of the ground.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/2348000000000"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[44px] items-center gap-2 rounded-full bg-tertiary px-6 text-base font-semibold text-white hover:bg-tertiary-dark"
          >
            <MessageCircle size={18} />
            Report an issue via WhatsApp
          </a>
          <Link
            to="/dashboard"
            className="flex min-h-[44px] items-center rounded-full border-2 border-primary px-6 text-base font-semibold text-primary hover:bg-chrome hover:text-on-chrome"
          >
            View the Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard value={stats.reportsCollected.toLocaleString()} label="Reports collected" />
          <StatCard value={String(stats.lgasCovered)} label="LGAs covered" />
          <StatCard value={String(stats.fellowsTrained)} label="Fellows trained" />
          <StatCard value={`${stats.verificationRate}%`} label="Verification rate" tone="success" />
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-primary">How it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon size={28} className="text-primary" aria-hidden="true" />
                </div>
                <p className="label-text mt-4 text-secondary">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-secondary">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
