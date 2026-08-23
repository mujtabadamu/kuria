import { useState } from 'react'
import { Pause, Play } from 'lucide-react'

export function AudioPlayer({ duration }: { duration: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex min-h-[44px] items-center gap-3 rounded-xl border border-secondary/30 bg-neutral px-4 py-2">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause audio' : 'Play audio'}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tertiary text-white"
      >
        {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
      <div className="flex-1">
        <div className="h-1.5 w-full rounded-full bg-secondary/20">
          <div
            className={`h-1.5 rounded-full bg-tertiary transition-all ${playing ? 'w-1/3' : 'w-0'}`}
          />
        </div>
      </div>
      <span className="text-sm tabular-nums text-secondary">{duration}</span>
    </div>
  )
}
