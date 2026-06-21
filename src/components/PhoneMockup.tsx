import { useEffect, useRef, useState } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────
const CIRCUMFERENCE = 2 * Math.PI * 44  // ≈ 276.46 — matches r="44" in SVG

const TALK_MS     = 6000   // countdown phase: 6 s real time = 2:00 → 0:00
const FADE_MS     = 700    // crossfade duration
const SCORES_MS   = 3500   // how long scores screen stays visible

const SCORES = [
  { label: 'Accuracy',   val: 87, color: '#38BDF8' },
  { label: 'Depth',      val: 74, color: '#818CF8' },
  { label: 'Clarity',    val: 91, color: '#34D399' },
  { label: 'Structure',  val: 82, color: '#FB923C' },
  { label: 'Confidence', val: 78, color: '#F472B6' },
]

// ─── Phase type ───────────────────────────────────────────────────────────────
type Phase = 'talking' | 'fadeToScores' | 'scores' | 'fadeToTalk'

// ─── Animated timer screen ────────────────────────────────────────────────────
interface TimerScreenProps {
  elapsed: number   // ms elapsed in talking phase (0 → TALK_MS)
  opacity: number   // 0–1 for crossfade
}

function TimerScreen({ elapsed, opacity }: TimerScreenProps) {
  const progress  = Math.min(elapsed / TALK_MS, 1)
  const remaining = Math.max(0, 120 - Math.floor(progress * 120))
  const mins      = Math.floor(remaining / 60)
  const secs      = remaining % 60
  const display   = `${mins}:${secs.toString().padStart(2, '0')}`

  // Ring depletes as time runs out: offset goes 0 → CIRCUMFERENCE
  const dashOffset = progress * CIRCUMFERENCE

  return (
    <div className="pm-screen-content" style={{ opacity, transition: `opacity ${FADE_MS}ms ease` }}>
      <div className="pm-app-name">Learn by Talking</div>
      <div className="pm-topic-pill">Topic: Photosynthesis</div>

      <div className="pm-timer-ring">
        <svg viewBox="0 0 100 100" className="pm-ring-svg">
          <circle cx="50" cy="50" r="44" className="pm-ring-track" />
          <circle
            cx="50" cy="50" r="44"
            className="pm-ring-progress"
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <div className="pm-timer-inner">
          <span className="pm-timer-digits">{display}</span>
          <span className="pm-timer-label">remaining</span>
        </div>
      </div>

      <div className="pm-waveform">
        {[18, 32, 24, 42, 28, 36, 16, 38, 22, 30, 14].map((h, i) => (
          <div
            key={i}
            className="pm-bar"
            style={{ '--h': `${h}px`, '--d': `${i * 0.08}s` } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="pm-start-btn">
        <span className="pm-mic-icon">🎙</span>
        Speaking…
      </div>
      <div className="pm-hint">Learn by Talking · Private · No judgement</div>
    </div>
  )
}

// ─── Score screen with animated bars ─────────────────────────────────────────
interface ScoreScreenProps {
  opacity: number
  animate: boolean
}

function ScoreScreen({ opacity, animate }: ScoreScreenProps) {
  return (
    <div
      className="pm-screen-content pm-screen-scores"
      style={{ opacity, transition: `opacity ${FADE_MS}ms ease` }}
    >
      <div className="pm-app-name">Learn by Talking</div>
      <div className="pm-score-headline">Your Results</div>

      <div className="pm-vms-ring">
        <span className="pm-vms-number">82</span>
        <span className="pm-vms-label">Verbal Mastery Score</span>
      </div>

      <div className="pm-score-rows">
        {SCORES.map((s, i) => (
          <div key={s.label} className="pm-score-row">
            <div className="pm-score-row-top">
              <span className="pm-score-name">{s.label}</span>
              <span className="pm-score-val" style={{ color: s.color }}>{s.val}</span>
            </div>
            <div className="pm-score-track">
              <div
                className="pm-score-fill"
                style={{
                  width: animate ? `${s.val}%` : '0%',
                  background: s.color,
                  transition: animate
                    ? `width 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`
                    : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Animated phone (used in hero) ───────────────────────────────────────────
function AnimatedPhone() {
  const [phase, setPhase]     = useState<Phase>('talking')
  const [elapsed, setElapsed] = useState(0)
  const [animBars, setAnimBars] = useState(false)

  const rafRef   = useRef<number>(0)
  const startRef = useRef<number>(0)

  // Drive the talking countdown with rAF for smooth ring progress
  useEffect(() => {
    if (phase !== 'talking') return

    startRef.current = performance.now() - elapsed

    const tick = (now: number) => {
      const e = now - startRef.current
      setElapsed(e)
      if (e < TALK_MS) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('fadeToScores')
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Handle phase transitions after talking ends
  useEffect(() => {
    if (phase === 'fadeToScores') {
      setAnimBars(false)
      const t = setTimeout(() => {
        setPhase('scores')
        // Slight delay before animating bars so opacity transition finishes first
        setTimeout(() => setAnimBars(true), 120)
      }, FADE_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'scores') {
      const t = setTimeout(() => setPhase('fadeToTalk'), SCORES_MS)
      return () => clearTimeout(t)
    }

    if (phase === 'fadeToTalk') {
      const t = setTimeout(() => {
        setElapsed(0)
        setPhase('talking')
      }, FADE_MS)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Derived opacity values
  const timerOpacity = phase === 'talking' ? 1
    : phase === 'fadeToScores' ? 0
    : phase === 'fadeToTalk'   ? 1
    : 0

  const scoreOpacity = phase === 'scores'      ? 1
    : phase === 'fadeToScores' ? 1
    : phase === 'fadeToTalk'   ? 0
    : 0

  return (
    <div className="pm-screen">
      {/* Both screens are stacked — opacity drives the crossfade */}
      <div className="pm-screen-layer">
        <TimerScreen elapsed={elapsed} opacity={timerOpacity} />
      </div>
      <div className="pm-screen-layer pm-screen-layer--top">
        <ScoreScreen opacity={scoreOpacity} animate={animBars} />
      </div>
    </div>
  )
}

// ─── Static phone (used in other sections) ────────────────────────────────────
interface Props {
  variant?: 'timer' | 'scores'
  animated?: boolean
}

export default function PhoneMockup({ variant = 'timer', animated = false }: Props) {
  return (
    <div className="pm-wrap">
      <div className="pm-ambient" />

      <div className="pm-frame">
        <div className="pm-btn pm-btn-vol-up" />
        <div className="pm-btn pm-btn-vol-down" />
        <div className="pm-btn pm-btn-power" />

        <div className="pm-bezel">
          <div className="pm-island" />

          {animated ? (
            <AnimatedPhone />
          ) : (
            <div className="pm-screen">
              {variant === 'timer' ? (
                <TimerScreen elapsed={0} opacity={1} />
              ) : (
                <ScoreScreen opacity={1} animate={true} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
