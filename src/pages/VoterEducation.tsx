import { useState } from 'react'
import { MapPin, CalendarDays, Mic2, MessageCircle, ChevronDown } from 'lucide-react'
import { AudioPlayer } from '../components/AudioPlayer'
import { manifestos, pollingUnitFinder, faqs } from '../data/mockData'

const quickLinks = [
  { icon: MapPin, label: 'Polling Unit Finder' },
  { icon: CalendarDays, label: 'Election Dates' },
  { icon: Mic2, label: 'Candidate Manifestos' },
  { icon: MessageCircle, label: 'How to Report an Issue' },
]

export function VoterEducation() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div>
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            Everything you need to vote in 2027
          </h1>
          <p className="mt-3 text-lg text-secondary">Available in Hausa and English</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickLinks.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-2xl border border-secondary/30 bg-neutral p-4 text-center hover:border-tertiary"
              >
                <Icon size={28} className="text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-primary">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-primary">Polling unit finder</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pollingUnitFinder.map((row) => (
            <div
              key={row.lga}
              className="flex items-center justify-between rounded-xl border border-secondary/30 bg-surface px-4 py-3"
            >
              <span className="font-medium text-primary">{row.lga}</span>
              <span className="text-sm text-secondary">{row.units} units</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-primary">Candidate manifestos (audio)</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {manifestos.map((m) => (
            <div key={m.id} className="rounded-2xl border border-secondary/30 bg-surface p-5">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: m.color }}
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-primary">{m.party}</span>
              </div>
              <p className="mt-1 font-semibold text-primary">{m.candidate}</p>
              <div className="mt-3">
                <AudioPlayer duration={m.audioDuration} />
              </div>
              <p className="mt-3 text-sm text-secondary">{m.summaryEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-bold text-primary">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="rounded-xl border border-secondary/30 bg-surface">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-primary">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-secondary transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && <p className="px-5 pb-4 text-base text-secondary">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
