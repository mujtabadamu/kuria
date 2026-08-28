export function Footer() {
  return (
    <footer className="border-t border-secondary/30 bg-chrome text-on-chrome">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="text-lg font-bold">Kuri&apos;a AI-Monitor</p>
            <p className="mt-1 max-w-xs text-sm text-white/70">
              A YAPD4Africa initiative for verified electoral integrity reporting across Northern
              Nigeria.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="label-text text-white/50">Project</p>
              <ul className="mt-2 space-y-1.5 text-white/70">
                <li><a href="/about" className="text-white/70 hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <p className="label-text text-white/50">Contact</p>
              <ul className="mt-2 space-y-1.5 text-white/70">
                <li>info@yapd4africa.org</li>
                <li>+234 813 941 4056</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50">
          &copy; {new Date().getFullYear()} YAPD4Africa. Supported by DDISA.
        </p>
      </div>
    </footer>
  )
}
