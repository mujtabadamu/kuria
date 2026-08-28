import { useEffect, useRef, useState } from 'react'
import { Mic, Pause, Play, Square, Trash2 } from 'lucide-react'

export interface Recording {
  url: string
  duration: string
}

// Decorative bar heights for the WhatsApp-style waveform — not derived from
// real amplitude data, just a pleasant fixed pattern.
const WAVEFORM_BARS = [
  6, 14, 9, 18, 11, 20, 8, 16, 22, 10, 15, 7, 19, 12, 17, 9, 21, 13, 8, 16, 11, 18, 6, 14, 20, 9, 15, 12,
]

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function VoiceRecorder({ onChange }: { onChange: (recording: Recording | null) => void }) {
  const [status, setStatus] = useState<'idle' | 'recording' | 'recorded' | 'error'>('idle')
  const [seconds, setSeconds] = useState(0)
  const [recording, setRecording] = useState<Recording | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const startedAtRef = useRef(0)
  const discardRef = useRef(false)
  const timerRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTimeUpdate = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    const onEnded = () => {
      setPlaying(false)
      setProgress(0)
    }
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', () => setPlaying(true))
    audio.addEventListener('pause', () => setPlaying(false))
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [recording])

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      discardRef.current = false

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
        if (discardRef.current) {
          setStatus('idle')
          setSeconds(0)
          return
        }
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        const url = URL.createObjectURL(blob)
        const elapsed = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000))
        const result = { url, duration: formatDuration(elapsed) }
        setRecording(result)
        onChange(result)
        setStatus('recorded')
      }

      mediaRecorderRef.current = recorder
      startedAtRef.current = Date.now()
      recorder.start()
      setSeconds(0)
      setStatus('recording')
      timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    } catch {
      setStatus('error')
    }
  }

  function finish() {
    discardRef.current = false
    mediaRecorderRef.current?.stop()
    if (timerRef.current) window.clearInterval(timerRef.current)
  }

  function cancelRecording() {
    discardRef.current = true
    mediaRecorderRef.current?.stop()
    if (timerRef.current) window.clearInterval(timerRef.current)
  }

  function reRecord() {
    if (recording) URL.revokeObjectURL(recording.url)
    setRecording(null)
    onChange(null)
    setProgress(0)
    setStatus('idle')
    setSeconds(0)
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) audio.pause()
    else audio.play()
  }

  if (status === 'idle') {
    return (
      <div className="flex flex-col items-center gap-2 py-4">
        <button
          type="button"
          onClick={start}
          aria-label="Start recording"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-white shadow-md transition-transform hover:scale-105 hover:bg-success-dark"
        >
          <Mic size={26} />
        </button>
        <p className="text-sm text-secondary">Tap to record a voice note</p>
      </div>
    )
  }

  if (status === 'recording') {
    return (
      <div className="flex items-center gap-3 rounded-full border border-danger/30 bg-danger/5 py-2 pl-4 pr-2">
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold tabular-nums text-danger">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-danger" />
          {formatDuration(seconds)}
        </span>
        <div className="flex h-6 flex-1 items-center gap-[3px] overflow-hidden">
          {WAVEFORM_BARS.map((h, i) => (
            <span
              key={i}
              className="w-[3px] shrink-0 rounded-full bg-danger/50"
              style={{
                height: h,
                animationName: 'waveform-pulse',
                animationDuration: '0.9s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.06}s`,
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={cancelRecording}
          aria-label="Cancel recording"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-secondary hover:bg-secondary/10"
        >
          <Trash2 size={17} />
        </button>
        <button
          type="button"
          onClick={finish}
          aria-label="Finish recording"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success text-white hover:bg-success-dark"
        >
          <Square size={13} fill="currentColor" />
        </button>
      </div>
    )
  }

  if (status === 'recorded' && recording) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-secondary/30 bg-neutral py-2 pl-2 pr-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success text-white hover:bg-success-dark"
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <div className="flex h-6 flex-1 items-center gap-[3px] overflow-hidden">
          {WAVEFORM_BARS.map((h, i) => {
            const played = i / WAVEFORM_BARS.length <= progress
            return (
              <span
                key={i}
                className={`w-[3px] shrink-0 rounded-full ${played ? 'bg-success' : 'bg-secondary/30'}`}
                style={{ height: h }}
              />
            )
          })}
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums text-secondary">{recording.duration}</span>
        <button
          type="button"
          onClick={reRecord}
          aria-label="Delete recording"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-secondary hover:bg-secondary/10"
        >
          <Trash2 size={16} />
        </button>
        <audio ref={audioRef} src={recording.url} className="hidden" />
      </div>
    )
  }

  return (
    <p className="rounded-full bg-danger/10 px-4 py-3 text-sm text-danger">
      Couldn&apos;t access the microphone. You can still submit with a text description.
    </p>
  )
}
