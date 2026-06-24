import { useEffect, useRef, useState } from 'react'

const KF = `
@keyframes bob-0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
@keyframes bob-1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
@keyframes bob-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
@keyframes bob-3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-1.5px)} }
@keyframes lean-l { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-2deg)} }
@keyframes lean-r { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(2deg)} }
@keyframes blink {
  0%,94%,100%{transform:scaleY(1)}
  96%,98%{transform:scaleY(0.08)}
}
@keyframes applause {
  0%{transform:translateY(0) rotate(0deg)}
  25%{transform:translateY(-6px) rotate(-15deg)}
  50%{transform:translateY(0) rotate(0deg)}
  75%{transform:translateY(-4px) rotate(12deg)}
  100%{transform:translateY(0) rotate(0deg)}
}
@keyframes applause-pop {
  0%{opacity:0;transform:translateX(-50%) scale(0.7) translateY(0)}
  20%{opacity:1;transform:translateX(-50%) scale(1.1) translateY(-4px)}
  80%{opacity:1;transform:translateX(-50%) scale(1) translateY(0)}
  100%{opacity:0;transform:translateX(-50%) scale(0.9) translateY(-10px)}
}
@keyframes interrupt-pop { 0%{opacity:0;transform:translateX(-50%) translateY(10px) scale(0.95)} 15%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} 80%{opacity:1;transform:translateX(-50%) translateY(0)} 100%{opacity:0;transform:translateX(-50%) translateY(-8px)} }
@keyframes spotlight { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
@keyframes stage-in { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes wave { 0%,100%{transform:scaleY(0.15)} 50%{transform:scaleY(1)} }
@keyframes cta-pulse { 0%,100%{box-shadow:0 8px 32px rgba(30,77,216,0.55)} 50%{box-shadow:0 8px 48px rgba(30,77,216,0.85)} }
@keyframes phone-glow { 0%,100%{opacity:0} 10%,90%{opacity:0.9} }
`

const SIZES = [
  { label: 'Just Me', value: 0,    emoji: '🧘', desc: 'Solo — pure focus' },
  { label: 'Small',   value: 5,    emoji: '👥', desc: '5 people' },
  { label: 'Room',    value: 25,   emoji: '🏫', desc: '25 people' },
  { label: 'Hall',    value: 100,  emoji: '🎤', desc: '100 people' },
  { label: 'Arena',   value: 1000, emoji: '🏟', desc: '1,000 people' },
]

const MOODS = [
  { value: 'friendly',     emoji: '😊', label: 'Friendly',     colour: '#10B981', tint: 'rgba(16,185,129,0.18)' },
  { value: 'professional', emoji: '🧐', label: 'Professional', colour: '#3B82F6', tint: 'rgba(59,130,246,0.18)' },
  { value: 'tough',        emoji: '😤', label: 'Tough',        colour: '#EF4444', tint: 'rgba(239,68,68,0.18)' },
]

const INTERRUPTS: Record<string, string[]> = {
  friendly:     ['"You\'re doing great! 👏"', '"Can you tell us more?"', '*warm applause* 👏', '"This is brilliant!"', '"Fascinating topic!"'],
  professional: ['"Could you elaborate on that?"', '*quiet note-taking* ✍️', '"Interesting point."', '"Please continue."', '"Can you clarify?"'],
  tough:        ['"Could you speak up? 🙉"', '"Sorry, what was that?"', '*cough cough* 😷', '📱 phone buzzes loudly', '"Get to the point!"', '"We\'re losing you..."'],
}

type Mood = 'friendly' | 'professional' | 'tough'

// Stable person assignment — 200 real portraits from randomuser.me
function getPersonUrl(idx: number) {
  const pseudo = (idx * 2654435761) >>> 0
  const gender = pseudo % 2 === 0 ? 'men' : 'women'
  const num = (pseudo % 70) + 1
  return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`
}

// Shirt colours per mood
const SHIRT_PALETTES: Record<Mood, string[]> = {
  friendly:     ['#065F46','#047857','#1D4ED8','#7C3AED','#B45309','#0E7490'],
  professional: ['#1E3A5F','#1E40AF','#374151','#1F2937','#312E81','#1E3A5F'],
  tough:        ['#7F1D1D','#991B1B','#1F2937','#374151','#78350F','#4C1D95'],
}
function getShirtCol(mood: Mood, idx: number) {
  const palette = SHIRT_PALETTES[mood]
  return palette[idx % palette.length]
}

function Person({ sz, personUrl, shirtCol, blinkDelay, applauding, moodFilter }: {
  sz: number; personUrl: string; shirtCol: string
  blinkDelay: number; applauding: boolean; moodFilter: string
}) {
  const faceSize = sz * 1.6
  const bodyW = sz * 1.8
  const bodyH = sz * 1.2
  const shoulderCurve = sz * 0.3

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: bodyW }}>
      {/* Real face photo */}
      <div style={{ position: 'relative', width: faceSize, height: faceSize, marginBottom: -sz * 0.1 }}>
        <img
          src={personUrl}
          alt=""
          loading="lazy"
          style={{
            width: faceSize, height: faceSize,
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            filter: moodFilter,
            transition: 'filter 0.6s ease',
          }}
        />
        {/* Blink overlay */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'inherit',
          animation: `blink ${3.2 + blinkDelay}s ease-in-out ${blinkDelay * 0.9}s infinite`,
          pointerEvents: 'none',
          // uses the parent bg to simulate eyelid
          backgroundColor: 'transparent',
          boxShadow: 'inset 0 0 0 0 transparent',
        }} />
      </div>

      {/* Shoulders / body — SVG */}
      <svg width={bodyW} height={bodyH + shoulderCurve} style={{ display: 'block', marginTop: -2 }}>
        <path
          d={`M ${bodyW * 0.08} ${shoulderCurve}
              Q 0 ${shoulderCurve * 0.4} ${bodyW * 0.08} 0
              L ${bodyW * 0.92} 0
              Q ${bodyW} ${shoulderCurve * 0.4} ${bodyW * 0.92} ${shoulderCurve}
              L ${bodyW} ${bodyH + shoulderCurve}
              L 0 ${bodyH + shoulderCurve} Z`}
          fill={shirtCol}
          style={{ transition: 'fill 0.5s ease' }}
        />
      </svg>

      {/* Applause */}
      {applauding && (
        <div style={{
          fontSize: sz * 0.9, marginTop: -sz * 0.3,
          animation: 'applause 0.4s ease-in-out infinite',
          transformOrigin: 'center bottom',
        }}>👏</div>
      )}
    </div>
  )
}

// Per-seat data (stable, seeded by index)
function getSeatData(idx: number) {
  const pseudo = (idx * 2654435761) >>> 0
  const heightVariance = 0.85 + ((pseudo >> 8) % 30) / 100
  const animations = ['bob-0', 'bob-1', 'bob-2', 'bob-3']
  const anim = animations[(pseudo >> 4) % 4]
  const dur = 2.2 + ((pseudo >> 12) % 16) / 10
  const delay = ((pseudo >> 6) % 28) / 10
  return { heightVariance, anim, dur, delay }
}

function buildSeats(size: number, containerW: number) {
  if (size === 0) return []
  const rows = size <= 5 ? 1 : size <= 25 ? 3 : size <= 100 ? 5 : 7
  const baseCount = size <= 5 ? size : size <= 25 ? 6 : 10
  type Seat = { x: number; y: number; sz: number; op: number; idx: number }
  const seats: Seat[] = []
  let globalIdx = 0
  for (let r = 0; r < rows; r++) {
    const count = Math.min(baseCount + r * 2, 20)
    const sz = Math.max(8, 28 - r * 3.2)
    const rowH = sz * 2.8
    const op = Math.max(0.18, 1 - r * 0.13)
    const gap = (containerW - 24) / (count + 1)
    for (let c = 0; c < count; c++) {
      seats.push({ x: 12 + gap * (c + 1) - (sz * 0.7), y: r * (rowH * 0.72), sz, op, idx: globalIdx++ })
    }
  }
  return seats
}

const MOOD_FILTERS: Record<Mood, string> = {
  friendly:     'brightness(1.05) saturate(1.1)',
  professional: 'brightness(0.95) saturate(0.8) contrast(1.05)',
  tough:        'brightness(0.85) saturate(0.6) contrast(1.15) hue-rotate(340deg)',
}

function Silhouette({ x, y, sz, op, idx, shirtCol, mood, applauding }: {
  x: number; y: number; sz: number; op: number; idx: number; shirtCol: string
  mood: Mood; applauding: boolean
}) {
  const { heightVariance, anim, dur, delay } = getSeatData(idx)
  const scaledSz = sz * heightVariance
  const blinkDelay = (idx * 1.3) % 4
  const personUrl = getPersonUrl(idx)

  return (
    <div style={{
      position: 'absolute', left: x, top: y, opacity: op,
      animation: `${anim} ${dur}s ease-in-out ${delay}s infinite`,
      transformOrigin: 'bottom center',
    }}>
      <Person sz={scaledSz} personUrl={personUrl} shirtCol={shirtCol}
        blinkDelay={blinkDelay} applauding={applauding}
        moodFilter={MOOD_FILTERS[mood]} />
    </div>
  )
}



function WaveBar({ i, active }: { i: number; active: boolean }) {
  return (
    <div style={{
      width: 3, height: 34, borderRadius: 2,
      background: active ? '#1E4DD8' : 'rgba(255,255,255,0.12)',
      margin: '0 2px',
      animation: active ? `wave ${0.38 + i * 0.06}s ease-in-out ${i * 0.035}s infinite` : 'none',
      transformOrigin: 'center',
      transition: 'background 0.3s',
    }} />
  )
}

export default function LiveStageSection() {
  const [sizeIdx, setSizeIdx] = useState(3)
  const [mood, setMood] = useState<Mood>('professional')
  const [interruptions, setInterruptions] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [applauding, setApplauding] = useState(false)
  const [interrupt, setInterrupt] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const intRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = useState(600)

  const selected = SIZES[sizeIdx]
  const moodData = MOODS.find(m => m.value === mood)!
  const seats = buildSeats(selected.value, containerW)
  const lastSeat = seats[seats.length - 1]
  const audienceH = lastSeat ? lastSeat.y + lastSeat.sz * 2.8 + 12 : 0

  useEffect(() => {
    const obs = new ResizeObserver(e => setContainerW(e[0].contentRect.width))
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (speaking) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      clearInterval(timerRef.current!)
    }
    return () => clearInterval(timerRef.current!)
  }, [speaking])

  useEffect(() => {
    if (!speaking || !interruptions || selected.value === 0) {
      clearTimeout(intRef.current!)
      setInterrupt(null)
      return
    }
    const schedule = () => {
      const delay = (mood === 'tough' ? 3500 : 7000) + Math.random() * 5000
      intRef.current = setTimeout(() => {
        const list = INTERRUPTS[mood]
        setInterrupt(list[Math.floor(Math.random() * list.length)])
        setTimeout(() => { setInterrupt(null); schedule() }, 3800)
      }, delay)
    }
    schedule()
    return () => clearTimeout(intRef.current!)
  }, [speaking, interruptions, mood, selected.value])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <section style={{ background: 'linear-gradient(180deg,#060D1A 0%,#0A0F1C 100%)', padding: '100px 20px 120px', overflow: 'hidden' }}>
      <style>{KF}</style>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, animation: 'stage-in .7s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.30)',
            borderRadius: 20, padding: '6px 18px', marginBottom: 20,
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#FDE68A', letterSpacing: '0.08em' }}>🎭 LIVE STAGE — TRY IT NOW</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', fontWeight: 900, color: '#FFF', letterSpacing: '-0.04em', marginBottom: 16, lineHeight: 1.05 }}>
            Practice to a crowd.<br />Build real confidence.
          </h2>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
            Set your audience, choose their mood, and speak. Your nervous system can't tell the difference.{' '}
            <span style={{ color: '#FDE68A', fontWeight: 700 }}>The confidence you build here is real.</span>
          </p>
        </div>

        {/* Demo card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
        }}>

          {/* Stage */}
          <div ref={containerRef} style={{
            background: 'linear-gradient(180deg,#0D1829 0%,#080E1C 100%)',
            padding: '40px 12px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative', minHeight: 320, overflow: 'hidden',
          }}>

            {/* Floor gradient — gives depth */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.55))',
              pointerEvents: 'none', zIndex: 2,
            }} />

            {/* Spotlight cone */}
            <div style={{
              position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
              width: '55%', height: '80%',
              background: `radial-gradient(ellipse at top, ${moodData.tint} 0%, transparent 72%)`,
              animation: speaking ? 'spotlight 3s ease-in-out infinite' : 'none',
              transition: 'background 0.8s ease',
              pointerEvents: 'none', zIndex: 1,
            }} />

            {/* Audience status */}
            <div style={{ textAlign: 'center', marginBottom: 16, position: 'relative', zIndex: 3 }}>
              {selected.value > 0
                ? <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.50)' }}>
                    {selected.emoji} {selected.value.toLocaleString()} {selected.label === 'Just Me' ? 'person' : 'people'} &nbsp;·&nbsp; {moodData.emoji} {moodData.label}
                    {interruptions ? ' &nbsp;·&nbsp; 🔔 interruptions on' : ''}
                  </div>
                : <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>Solo — no audience, pure focus</div>
              }
            </div>

            {/* Audience silhouettes */}
            {seats.length > 0 && (
              <div style={{ position: 'relative', height: audienceH, marginBottom: 8, transition: 'height 0.5s ease', zIndex: 3 }}>
                {seats.map((s, i) => (
                  <Silhouette key={i} {...s} shirtCol={getShirtCol(mood, s.idx)}
                    mood={mood} applauding={applauding} />
                ))}
              </div>
            )}

            {/* Applause banner */}
            {applauding && (
              <div style={{
                position: 'absolute', bottom: 100, left: '50%',
                background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.50)',
                borderRadius: 22, padding: '12px 28px',
                animation: 'applause-pop 4s ease forwards',
                zIndex: 10, whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#6EE7B7' }}>👏 The crowd loves it!</span>
              </div>
            )}

            {/* Interruption bubble — floats above crowd */}
            {interrupt && (
              <div style={{
                position: 'absolute',
                bottom: selected.value > 0 ? 100 : 80,
                left: '50%',
                background: 'rgba(251,191,36,0.16)', border: '1px solid rgba(251,191,36,0.45)',
                borderRadius: 22, padding: '11px 24px',
                animation: 'interrupt-pop 3.8s ease forwards',
                zIndex: 10, whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#FDE68A' }}>{interrupt}</span>
              </div>
            )}

            {/* Waveform + mic + timer — at the bottom */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, position: 'relative', zIndex: 4, marginTop: selected.value > 0 ? 8 : 60 }}>
              <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                {Array.from({ length: 22 }).map((_, i) => <WaveBar key={i} i={i} active={speaking} />)}
              </div>

              {speaking && (
                <div style={{ fontSize: 30, fontWeight: 900, color: '#FFF', letterSpacing: -1, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                  {fmt(seconds)}
                </div>
              )}

              <button
                onClick={() => {
                  if (speaking) {
                    setSpeaking(false)
                    setSeconds(0)
                    if (mood === 'friendly' && selected.value > 0) {
                      setApplauding(true)
                      setTimeout(() => setApplauding(false), 4000)
                    }
                  } else {
                    setSpeaking(true)
                    setApplauding(false)
                  }
                }}
                style={{
                  width: 76, height: 76, borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: 30,
                  background: speaking ? '#DC2626' : '#1E4DD8',
                  animation: speaking ? 'cta-pulse 1.4s ease-in-out infinite' : 'none',
                  boxShadow: speaking ? '0 0 32px rgba(220,38,38,0.6)' : '0 8px 32px rgba(30,77,216,0.55)',
                  transition: 'background 0.3s, box-shadow 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {speaking ? '⏹' : '🎙'}
              </button>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)' }}>
                {speaking ? 'TAP TO STOP' : 'TAP TO START SPEAKING'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ padding: '32px 28px 36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 32 }}>

            {/* Size */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', marginBottom: 14 }}>AUDIENCE SIZE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {SIZES.map((s, i) => (
                  <button key={s.value} onClick={() => setSizeIdx(i)} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 14px', borderRadius: 11, border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: sizeIdx === i ? 'rgba(30,77,216,0.22)' : 'rgba(255,255,255,0.03)',
                    outline: sizeIdx === i ? '1px solid rgba(30,77,216,0.60)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}>
                    <span style={{ fontSize: 15 }}>{s.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: sizeIdx === i ? 800 : 500, color: sizeIdx === i ? '#FFF' : 'rgba(255,255,255,0.40)' }}>{s.label}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginLeft: 'auto' }}>{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood + toggle */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', marginBottom: 14 }}>CROWD MOOD</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MOODS.map(m => (
                  <button key={m.value} onClick={() => setMood(m.value as Mood)} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 16px', borderRadius: 13, border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: mood === m.value ? `${m.colour}1A` : 'rgba(255,255,255,0.03)',
                    outline: mood === m.value ? `1px solid ${m.colour}55` : '1px solid transparent',
                    transition: 'all 0.25s ease',
                  }}>
                    <span style={{ fontSize: 22 }}>{m.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: mood === m.value ? '#FFF' : 'rgba(255,255,255,0.40)', marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: mood === m.value ? m.colour : 'rgba(255,255,255,0.22)' }}>
                        {m.value === 'friendly' ? 'Warm and supportive' : m.value === 'professional' ? 'Attentive, neutral' : 'Earn their attention'}
                      </div>
                    </div>
                    {mood === m.value && <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: m.colour, flexShrink: 0 }} />}
                  </button>
                ))}
              </div>

              <div style={{
                marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 13,
                background: 'rgba(255,255,255,0.03)', outline: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF', marginBottom: 2 }}>🔔 Interruptions</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>Coughs · whispers · phones</div>
                </div>
                <button onClick={() => setInterruptions(v => !v)} style={{
                  width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                  background: interruptions ? '#1E4DD8' : 'rgba(255,255,255,0.12)',
                  position: 'relative', transition: 'background 0.25s ease', flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%',
                    background: '#FFF', transition: 'left 0.25s ease', left: interruptions ? 21 : 3,
                  }} />
                </button>
              </div>
            </div>
          </div>

          {/* CTA footer */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFF', marginBottom: 4 }}>Ready to take the real stage?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>Download TalkToLearn and speak to the world.</div>
            </div>
            <a href="#pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 50, textDecoration: 'none',
              background: '#1E4DD8', color: '#FFF', fontWeight: 800, fontSize: 14,
              boxShadow: '0 8px 32px rgba(30,77,216,0.55)',
              animation: 'cta-pulse 2.5s ease-in-out infinite',
            }}>
              🎭 Get TalkToLearn Free
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 48 }}>
          {[
            { emoji: '🏟', stat: '1,000', label: 'Max audience size' },
            { emoji: '😤', stat: '3',     label: 'Crowd moods' },
            { emoji: '💬', stat: '∞',     label: 'Interruption types' },
            { emoji: '🧠', stat: '100%',  label: 'Real confidence gained' },
          ].map(s => (
            <div key={s.stat} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '20px 28px', textAlign: 'center', minWidth: 130,
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FFF', marginBottom: 4 }}>{s.stat}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
