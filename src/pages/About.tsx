export function About() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-primary">About YAPD4Africa</h1>
      <p className="mt-4 text-lg leading-relaxed text-secondary">
        Young African Progress for Development (YAPD4Africa) is a civic technology organization
        working to strengthen electoral integrity across Northern Nigeria through community-driven
        verification and voice-first reporting tools.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">Our history</h2>
      <p className="mt-3 text-base leading-relaxed text-secondary">
        In 2024, our team began manual election observation across Kaduna State, relying on paper
        forms and phone calls to gather reports from the field. In 2026, we launched Kuri&apos;a
        AI-Monitor — a voice-first WhatsApp bot paired with this dashboard — to make reporting
        accessible to low-literacy citizens in Hausa and English, and to give Digital Integrity
        Fellows a faster way to verify and act on what they hear.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">Team &amp; partners</h2>
      <p className="mt-3 text-base leading-relaxed text-secondary">
        Kuri&apos;a is built and operated by the YAPD4Africa civic technology team, with a growing
        network of Digital Integrity Fellows trained across 23 Local Government Areas in Kaduna
        State.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">Funding acknowledgment</h2>
      <p className="mt-3 text-base leading-relaxed text-secondary">
        This project is supported by the Democracy and Digital Information Support Activity
        (DDISA).
      </p>

      <div className="mt-10 rounded-2xl border border-secondary/30 bg-surface p-6">
        <h3 className="text-lg font-bold text-primary">Get in touch</h3>
        <p className="mt-2 text-base text-secondary">
          Email us at{' '}
          <a href="mailto:info@yapd4africa.org" className="font-semibold text-tertiary hover:underline">
            info@yapd4africa.org
          </a>
        </p>
      </div>
    </div>
  )
}
