import { useState, useEffect } from 'react'

/* ─── constants ──────────────────────────────────────────────────────────── */
const TYPING_TEXT = 'Photosynthesis'
const TYPE_MS     = 115          // ms per character

// SVG ring maths (r=54 → circumference ≈ 339)
const RING_R    = 54
const RING_CIRC = 2 * Math.PI * RING_R  // 339.29

/* ─── CSS keyframes ──────────────────────────────────────────────────────── */
const KF = `
@keyframes iw-cursor   { 0%,49%{opacity:1} 50%,100%{opacity:0} }
@keyframes iw-shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
@keyframes iw-fade-in  { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
@keyframes iw-slide-up { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }
@keyframes iw-bounce-in{
  0%  {opacity:0;transform:translateY(22px) scale(.94)}
  58% {opacity:1;transform:translateY(-5px) scale(1.03)}
  78% {transform:translateY(2px) scale(.99)}
  100%{transform:translateY(0) scale(1)}
}
@keyframes iw-pulse-kp { 0%,100%{box-shadow:0 0 0 0 rgba(30,77,216,0)} 50%{box-shadow:0 0 0 4px rgba(30,77,216,.10)} }
@keyframes iw-glow-sum { 0%,100%{box-shadow:0 0 0 0 rgba(0,180,90,0)} 50%{box-shadow:0 0 8px 2px rgba(0,180,90,.14)} }
@keyframes iw-ring-draw{ from{stroke-dashoffset:${RING_CIRC.toFixed(1)}} to{stroke-dashoffset:${(RING_CIRC * 0.28).toFixed(1)}} }
@keyframes iw-bar-fill { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes iw-wave     { 0%,100%{transform:scaleY(.25)} 50%{transform:scaleY(1)} }
@keyframes iw-input-glow{
  0%,100%{box-shadow:0 0 0 0 rgba(30,77,216,0);border-color:rgba(255,255,255,.18)}
  50%    {box-shadow:0 0 0 3px rgba(30,77,216,.22);border-color:rgba(30,77,216,.7)}
}
@keyframes iw-dot-live { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
`

/* ─── design tokens ─────────────────────────────────────────────────────── */
const FC = {
  surface: '#F7F9FC',
  header:  '#F2F4F7',
  body:    '#FFFFFF',
  border:  '#E5E9F0',
  text:    '#0A0F1C',
  sub:     '#4A5568',
  blue:    '#1E4DD8',
  blueSoft:'#2A5BFF',
  shadow:  '0 1px 0 rgba(255,255,255,.9) inset,0 2px 4px rgba(10,15,28,.04),0 8px 24px rgba(10,15,28,.07),0 24px 64px rgba(10,15,28,.09)',
}

const SECTIONS = [
  {
    label: 'EXPLANATION',
    body:  'Photosynthesis converts light energy into chemical energy, storing it as glucose in plant cells.',
  },
  {
    label:  'KEY POINTS',
    body:   '• Occurs in chloroplasts\n• Requires light, CO₂ and H₂O\n• Produces glucose + O₂\n• Has light-dependent & independent stages',
    accent: 'rgba(30,77,216,.05)',
    border: 'rgba(30,77,216,.12)',
    pulse:  'iw-pulse-kp',
  },
  {
    label:  'MISCONCEPTIONS',
    body:   'Plants don\'t only absorb CO₂ — they also respire and release CO₂, especially at night.',
    accent: 'rgba(255,170,0,.06)',
    border: 'rgba(255,170,0,.14)',
  },
  {
    label:  'SUMMARY',
    body:   '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
    accent: 'rgba(0,180,90,.05)',
    border: 'rgba(0,180,90,.16)',
    pulse:  'iw-glow-sum',
  },
]

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 1 — Subject Entry
   ════════════════════════════════════════════════════════════════════════════ */
function Phase1({ text, done }: { text: string; done: boolean }) {
  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(170deg,#0C1829 0%,#0E2040 55%,#091424 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 28px', gap: '24px',
      animation: 'iw-fade-in .5s ease both',
    }}>
      {/* Branding */}
      <div style={{ textAlign: 'center', marginBottom: '4px' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '.16em', color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', marginBottom: '10px' }}>
          Teach · To · Learn
        </div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-.03em', lineHeight: 1.1 }}>
          What do you want<br/>to learn today?
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', marginTop: '8px', fontStyle: 'italic' }}>
          Enter any subject. We'll build your flashcard.
        </div>
      </div>

      {/* Floating input */}
      <div style={{ width: '100%', maxWidth: '290px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '-8px', left: '12px',
          fontSize: '9px', fontWeight: 700, letterSpacing: '.08em',
          color: 'rgba(255,255,255,.5)', background: '#0E2040',
          padding: '0 5px', textTransform: 'uppercase',
        }}>SUBJECT</div>
        <div style={{
          width: '100%', padding: '13px 15px',
          background: 'rgba(255,255,255,.07)',
          border: `1px solid rgba(255,255,255,.18)`,
          borderRadius: '12px', boxSizing: 'border-box',
          fontSize: '15px', fontWeight: 600, color: '#FFFFFF',
          display: 'flex', alignItems: 'center', minHeight: '46px',
          backdropFilter: 'blur(12px)',
          animation: text.length > 0 ? 'iw-input-glow 2s ease-in-out infinite' : 'none',
        }}>
          <span>{text}</span>
          <span style={{
            display: 'inline-block', width: '2px', height: '18px',
            background: '#60A5FA', marginLeft: '1px', borderRadius: '1px',
            animation: 'iw-cursor 1s step-end infinite',
          }} />
        </div>
      </div>

      {/* Status */}
      <div style={{
        fontSize: '10px', color: 'rgba(255,255,255,.32)',
        display: 'flex', alignItems: 'center', gap: '6px',
        opacity: done ? 1 : 0, transition: 'opacity .5s ease',
      }}>
        <span style={{
          display: 'inline-block', width: '6px', height: '6px',
          borderRadius: '50%', background: '#60A5FA',
          boxShadow: '0 0 6px #60A5FA',
          animation: done ? 'iw-dot-live 1s ease-in-out infinite' : 'none',
        }} />
        Generating your flashcard…
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 2 — Flashcard Build
   ════════════════════════════════════════════════════════════════════════════ */
function FlashCard({ visible }: { visible: number }) {
  return (
    <div style={{
      background: FC.body, borderRadius: '16px',
      boxShadow: FC.shadow, overflow: 'hidden',
      border: `1px solid ${FC.border}`,
      animation: 'iw-fade-in .55s cubic-bezier(.34,1.56,.64,1) both',
    }}>
      {/* Accent stripe */}
      <div style={{ height: '3px', background: `linear-gradient(90deg,${FC.blue},${FC.blueSoft},#60A5FA)` }} />

      {/* Header */}
      <div style={{
        background: FC.header, padding: '12px 16px',
        borderBottom: `1px solid ${FC.border}`,
        boxShadow: '0 1px 2px rgba(0,0,0,.04)',
        animation: 'iw-slide-up .45s cubic-bezier(.34,1.56,.64,1) both',
      }}>
        <div style={{ fontSize: '7.5px', fontWeight: 800, letterSpacing: '.12em', color: FC.blue, textTransform: 'uppercase', marginBottom: '2px' }}>Flashcard</div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: FC.text, letterSpacing: '-.02em' }}>Photosynthesis</div>
        <div style={{ fontSize: '10px', color: FC.sub, marginTop: '2px' }}>Biology · Core Concept</div>
      </div>

      {/* Sections */}
      <div style={{ padding: '10px 14px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {SECTIONS.map((s, i) => i < visible && (
          <div key={i} style={{
            borderRadius: s.accent ? '10px' : '0',
            padding: s.accent ? '9px 12px' : '0',
            background: s.accent || 'transparent',
            border: s.border ? `1px solid ${s.border}` : 'none',
            animation: 'iw-slide-up .4s cubic-bezier(.34,1.56,.64,1) both',
          }}>
            <div style={{ fontSize: '7.5px', fontWeight: 800, letterSpacing: '.12em', color: FC.blue, textTransform: 'uppercase', marginBottom: '3px' }}>{s.label}</div>
            <div style={{ fontSize: '10.5px', color: FC.text, lineHeight: 1.55, whiteSpace: 'pre-line' }}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Phase2({ shimmer, visible }: { shimmer: boolean; visible: number }) {
  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg,${FC.surface} 0%,#EEF2F8 100%)`,
      padding: '14px 14px 12px', overflowY: 'auto',
      animation: 'iw-fade-in .4s ease both',
    }}>
      {shimmer ? (
        /* Loading shimmer */
        <div style={{
          height: '320px',
          background: 'linear-gradient(90deg,#F0F2F5 25%,#E4E8ED 50%,#F0F2F5 75%)',
          backgroundSize: '200% 100%',
          animation: 'iw-shimmer 1.3s ease-in-out infinite',
          borderRadius: '14px',
        }} />
      ) : (
        <FlashCard visible={visible} />
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 3 — Reading / Highlight Mode
   ════════════════════════════════════════════════════════════════════════════ */
function Phase3({ line }: { line: number }) {
  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg,${FC.surface} 0%,#EEF2F8 100%)`,
      padding: '14px 14px 12px', overflowY: 'auto',
      animation: 'iw-fade-in .4s ease both',
    }}>
      <div style={{
        background: FC.body, borderRadius: '16px',
        boxShadow: FC.shadow, overflow: 'hidden',
        border: `1px solid ${FC.border}`,
      }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg,${FC.blue},${FC.blueSoft},#60A5FA)` }} />
        <div style={{ background: FC.header, padding: '12px 16px', borderBottom: `1px solid ${FC.border}` }}>
          <div style={{ fontSize: '7.5px', fontWeight: 800, letterSpacing: '.12em', color: FC.blue, textTransform: 'uppercase', marginBottom: '2px' }}>Reading Mode</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: FC.text }}>Photosynthesis</div>
        </div>
        <div style={{ padding: '10px 14px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{
              borderRadius: '10px', padding: '9px 12px',
              background: i < line ? (s.accent || 'rgba(30,77,216,.04)') : 'transparent',
              border: i < line && s.border ? `1px solid ${s.border}` : '1px solid transparent',
              transition: 'background .5s ease, border .5s ease',
              animation: i < line && s.pulse ? `${s.pulse} 2.2s ease-in-out infinite` : 'none',
            }}>
              <div style={{
                fontSize: '7.5px', fontWeight: 800, letterSpacing: '.12em',
                color: i < line ? FC.blue : FC.sub, textTransform: 'uppercase', marginBottom: '3px',
                transition: 'color .4s ease',
              }}>{s.label}</div>
              <div style={{
                fontSize: '10.5px', color: FC.text, lineHeight: 1.55, whiteSpace: 'pre-line',
                opacity: i < line ? 1 : 0.4, transition: 'opacity .5s ease',
              }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 4 — Talk or Test
   ════════════════════════════════════════════════════════════════════════════ */
function Phase4() {
  return (
    <div style={{
      height: '100%',
      background: `linear-gradient(180deg,${FC.surface} 0%,#EEF2F8 100%)`,
      position: 'relative', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
      justifyContent: 'flex-end', padding: '0 20px 32px',
      animation: 'iw-fade-in .4s ease both',
    }}>
      {/* Blurred card */}
      <div style={{
        position: 'absolute', top: '14px', left: '14px', right: '14px',
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: FC.shadow, opacity: .40, filter: 'blur(1.5px)',
        border: `1px solid ${FC.border}`,
        background: FC.body, height: '52%',
      }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg,${FC.blue},${FC.blueSoft})` }} />
        <div style={{ background: FC.header, padding: '12px 16px', borderBottom: `1px solid ${FC.border}` }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: FC.text }}>Photosynthesis</div>
        </div>
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[90, 75, 85].map((w, i) => (
            <div key={i} style={{ height: '8px', background: '#E5E9F0', borderRadius: '4px', width: `${w}%` }} />
          ))}
        </div>
      </div>

      {/* Fade gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '62%',
        background: 'linear-gradient(0deg,rgba(238,242,248,1) 52%,rgba(238,242,248,0) 100%)',
        pointerEvents: 'none',
      }} />

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center' }}>
        <div style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '.14em',
          color: FC.sub, textTransform: 'uppercase', marginBottom: '12px',
          animation: 'iw-slide-up .5s cubic-bezier(.34,1.56,.64,1) both',
        }}>How do you want to practise?</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button style={{
            flex: 1, maxWidth: '125px', padding: '13px 0',
            borderRadius: '50px', border: 'none',
            background: `linear-gradient(135deg,${FC.blue},${FC.blueSoft})`,
            color: '#FFF', fontSize: '12px', fontWeight: 800, letterSpacing: '.04em',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(30,77,216,.45),inset 0 1px 0 rgba(255,255,255,.15)',
            animation: 'iw-bounce-in .6s cubic-bezier(.34,1.56,.64,1) 200ms both',
          }}>🎙 TALK</button>
          <button style={{
            flex: 1, maxWidth: '125px', padding: '13px 0',
            borderRadius: '50px', border: `2px solid ${FC.blue}`,
            background: 'transparent', color: FC.blue,
            fontSize: '12px', fontWeight: 800, letterSpacing: '.04em',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(30,77,216,.14)',
            animation: 'iw-bounce-in .6s cubic-bezier(.34,1.56,.64,1) 360ms both',
          }}>📝 TEST</button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PHASE 5 — Test Mode / Timer
   ════════════════════════════════════════════════════════════════════════════ */
const SCORES = [
  { label: 'Accuracy',   val: 87, color: '#60A5FA' },
  { label: 'Depth',      val: 74, color: '#818CF8' },
  { label: 'Clarity',    val: 91, color: '#34D399' },
  { label: 'Structure',  val: 82, color: '#FBBF24' },
  { label: 'Confidence', val: 79, color: '#F87171' },
]
const WAVE_DELAYS = [0, 200, 80, 320, 140, 40, 260, 100, 220]

function Phase5() {
  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(160deg,#0D1117 0%,#0A0E1A 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px 24px', gap: '14px',
      animation: 'iw-fade-in .5s ease both',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.14em', color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', marginBottom: '4px' }}>Learn by Talking</div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFF', letterSpacing: '-.02em' }}>Test Mode</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.45)', marginTop: '2px' }}>Photosynthesis · 5-minute session</div>
      </div>

      {/* Timer ring */}
      <div style={{ position: 'relative', width: '134px', height: '134px' }}>
        <svg width="134" height="134" viewBox="0 0 134 134" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="iw-rg" x1="0" y1="67" x2="134" y2="67" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#60A5FA" />
              <stop offset="100%" stopColor={FC.blue} />
            </linearGradient>
            <filter id="iw-rglow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Track */}
          <circle cx="67" cy="67" r={RING_R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7" />
          {/* Glow ring (blurred duplicate) */}
          <circle cx="67" cy="67" r={RING_R} fill="none" stroke="rgba(96,165,250,.3)" strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={RING_CIRC} strokeDashoffset={RING_CIRC * 0.28}
            style={{ animation: `iw-ring-draw 6s cubic-bezier(.4,0,.2,1) both` }}
          />
          {/* Sharp ring */}
          <circle cx="67" cy="67" r={RING_R} fill="none" stroke="url(#iw-rg)" strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={RING_CIRC} strokeDashoffset={RING_CIRC * 0.28}
            style={{ animation: `iw-ring-draw 6s cubic-bezier(.4,0,.2,1) both` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#FFF', letterSpacing: '-.04em', lineHeight: 1 }}>4:32</div>
          <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,.4)', marginTop: '3px', letterSpacing: '.08em' }}>REMAINING</div>
        </div>
      </div>

      {/* Speaking pill + waveform */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(30,77,216,.18)', border: '1px solid rgba(30,77,216,.35)',
          borderRadius: '20px', padding: '5px 14px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 7px #60A5FA', animation: 'iw-cursor 1.2s step-end infinite' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#93C5FD', letterSpacing: '.08em' }}>SPEAKING…</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '30px' }}>
          {WAVE_DELAYS.map((d, i) => (
            <div key={i} style={{
              width: '3px', height: '100%', borderRadius: '2px',
              background: `linear-gradient(to top,${FC.blue},#60A5FA)`,
              transformOrigin: 'center',
              animation: `iw-wave ${.55 + (i % 3) * .18}s ease-in-out ${d}ms infinite`,
            }} />
          ))}
        </div>
      </div>

      {/* Score bars */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {SCORES.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,.52)', width: '56px', textAlign: 'right', flexShrink: 0 }}>{s.label}</span>
            <div style={{ flex: 1, height: '3.5px', background: 'rgba(255,255,255,.07)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                width: `${s.val}%`, height: '100%', background: s.color,
                borderRadius: '2px', transformOrigin: 'left',
                animation: `iw-bar-fill 1.1s cubic-bezier(.34,1.56,.64,1) ${i * 130}ms both`,
              }} />
            </div>
            <span style={{ fontSize: '9px', fontWeight: 800, color: s.color, width: '22px' }}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   IPAD FRAME — photographic Space Gray aluminium
   ════════════════════════════════════════════════════════════════════════════ */
const FW = 348      // frame width
const FH = 504      // frame height
const BT = 22       // bezel top
const BS = 15       // bezel sides
const BB = 20       // bezel bottom

function IpadFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative',
      width: `${FW}px`,
      height: `${FH}px`,
      borderRadius: '30px',
      /* ── Multi-stop aluminium gradient (Space Gray photographic look) ── */
      background: `linear-gradient(
        152deg,
        #505054 0%,
        #3C3C40 6%,
        #2E2E32 14%,
        #242428 24%,
        #1C1C20 36%,
        #1E1E22 48%,
        #242428 60%,
        #2C2C30 72%,
        #3A3A3E 84%,
        #4A4A4E 93%,
        #565658 100%
      )`,
      boxShadow: [
        /* Inset chamfer highlights */
        'inset 0 1.5px 0 rgba(255,255,255,.22)',
        'inset 0 -1px 0 rgba(0,0,0,.40)',
        'inset 1.5px 0 0 rgba(255,255,255,.14)',
        'inset -1.5px 0 0 rgba(0,0,0,.28)',
        /* Outer depth layers */
        '0 2px 4px rgba(0,0,0,.22)',
        '0 8px 20px rgba(0,0,0,.32)',
        '0 28px 56px rgba(0,0,0,.30)',
        '0 60px 100px rgba(0,0,0,.18)',
        '0 80px 120px rgba(0,0,0,.08)',
      ].join(','),
    }}>
      {/* ── Top chamfer light bar ── */}
      <div style={{
        position: 'absolute', top: '1.5px', left: '30px', right: '30px', height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.38) 28%,rgba(255,255,255,.52) 50%,rgba(255,255,255,.38) 72%,transparent)',
        borderRadius: '1px', pointerEvents: 'none',
      }} />
      {/* ── Left edge subtle highlight ── */}
      <div style={{
        position: 'absolute', top: '30px', bottom: '30px', left: '1.5px', width: '1px',
        background: 'linear-gradient(180deg,transparent,rgba(255,255,255,.18) 30%,rgba(255,255,255,.10) 70%,transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── Side buttons: Touch ID / Power (top-right in portrait) ── */}
      <div style={{
        position: 'absolute', top: '60px', right: '-4px',
        width: '5px', height: '30px', borderRadius: '0 3px 3px 0',
        background: 'linear-gradient(90deg,#1A1A1E,#3E3E42 40%,#2A2A2E)',
        boxShadow: '2px 0 5px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.10)',
      }} />
      {/* Volume up */}
      <div style={{
        position: 'absolute', top: '108px', right: '-4px',
        width: '5px', height: '24px', borderRadius: '0 3px 3px 0',
        background: 'linear-gradient(90deg,#1A1A1E,#3E3E42 40%,#2A2A2E)',
        boxShadow: '2px 0 5px rgba(0,0,0,.45)',
      }} />
      {/* Volume down */}
      <div style={{
        position: 'absolute', top: '142px', right: '-4px',
        width: '5px', height: '24px', borderRadius: '0 3px 3px 0',
        background: 'linear-gradient(90deg,#1A1A1E,#3E3E42 40%,#2A2A2E)',
        boxShadow: '2px 0 5px rgba(0,0,0,.45)',
      }} />

      {/* ── Smart Connector dots (bottom, left of centre) ── */}
      {[0,1,2].map(i => (
        <div key={i} style={{
          position: 'absolute', bottom: '9px',
          left: `${108 + i * 18}px`,
          width: '5px', height: '5px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%,#3A3A3E,#1A1A1C)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,.8),0 1px 0 rgba(255,255,255,.05)',
        }} />
      ))}

      {/* ── Front camera ── */}
      <div style={{
        position: 'absolute',
        top: `${BT / 2 - 4}px`, left: '50%', transform: 'translateX(-50%)',
        width: '7px', height: '7px', borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%,#2C2C38,#080810)',
        boxShadow: '0 0 0 1.5px rgba(255,255,255,.07),inset 0 1px 3px rgba(255,255,255,.12)',
      }}>
        {/* Lens glint */}
        <div style={{ position: 'absolute', top: '1px', left: '1.5px', width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(255,255,255,.25)' }} />
      </div>

      {/* ── Screen ─────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: `${BT}px`, left: `${BS}px`,
        width: `${FW - BS * 2}px`,
        height: `${FH - BT - BB}px`,
        borderRadius: '16px',
        background: '#0A0A10',
        overflow: 'hidden',
        boxShadow: [
          'inset 0 1.5px 4px rgba(0,0,0,.75)',
          'inset 1px 0 4px rgba(0,0,0,.45)',
          'inset -1px 0 4px rgba(0,0,0,.45)',
          'inset 0 -1px 4px rgba(0,0,0,.45)',
        ].join(','),
      }}>
        {/* Screen glare */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(135deg,rgba(255,255,255,.05) 0%,transparent 55%)',
          borderRadius: '16px',
        }} />
        <div style={{ position: 'relative', height: '100%', zIndex: 1 }}>
          {children}
        </div>
      </div>

      {/* ── Home indicator ── */}
      <div style={{
        position: 'absolute',
        bottom: `${BB / 2 - 3}px`, left: '50%', transform: 'translateX(-50%)',
        width: '44px', height: '3.5px', borderRadius: '2px',
        background: 'rgba(255,255,255,.14)',
      }} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN — IpadWalkthrough
   ════════════════════════════════════════════════════════════════════════════ */
export default function IpadWalkthrough() {
  const [phase,    setPhase]    = useState<1|2|3|4|5>(1)
  const [typed,    setTyped]    = useState('')
  const [typeDone, setTypeDone] = useState(false)
  const [shimmer,  setShimmer]  = useState(false)
  const [visible,  setVisible]  = useState(0)
  const [line,     setLine]     = useState(0)

  const reset = () => {
    setPhase(1); setTyped(''); setTypeDone(false)
    setShimmer(false); setVisible(0); setLine(0)
  }

  /* Phase 1 — typing */
  useEffect(() => {
    if (phase !== 1) return
    let i = 0
    const iv = setInterval(() => {
      i++; setTyped(TYPING_TEXT.slice(0, i))
      if (i >= TYPING_TEXT.length) {
        clearInterval(iv)
        setTypeDone(true)
        setTimeout(() => { setPhase(2); setShimmer(true) }, 1400)
      }
    }, TYPE_MS)
    return () => clearInterval(iv)
  }, [phase])

  /* Phase 2 — shimmer then build sections */
  useEffect(() => {
    if (phase !== 2) return
    const t1 = setTimeout(() => {
      setShimmer(false)
      let i = 0
      const iv = setInterval(() => {
        i++; setVisible(i)
        if (i >= SECTIONS.length) {
          clearInterval(iv)
          setTimeout(() => setPhase(3), 1600)
        }
      }, 500)
      return () => clearInterval(iv)
    }, 950)
    return () => clearTimeout(t1)
  }, [phase])

  /* Phase 3 — progressive reading highlight */
  useEffect(() => {
    if (phase !== 3) return
    setLine(0)
    let i = 0
    const iv = setInterval(() => {
      i++; setLine(i)
      if (i >= SECTIONS.length) {
        clearInterval(iv)
        setTimeout(() => setPhase(4), 1200)
      }
    }, 950)
    return () => clearInterval(iv)
  }, [phase])

  /* Phase 4 — auto-advance to Test */
  useEffect(() => {
    if (phase !== 4) return
    const t = setTimeout(() => setPhase(5), 3400)
    return () => clearTimeout(t)
  }, [phase])

  /* Phase 5 — loop back */
  useEffect(() => {
    if (phase !== 5) return
    const t = setTimeout(reset, 7000)
    return () => clearTimeout(t)
  }, [phase])

  const PHASE_LABELS: Record<number,string> = {
    1: 'Enter Subject',
    2: 'Build Flashcard',
    3: 'Learn Mode',
    4: 'Choose Path',
    5: 'Test Mode',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }}>
      <style>{KF}</style>

      {/* Phase label */}
      <div style={{
        fontSize: '9px', fontWeight: 700, letterSpacing: '.16em',
        color: 'rgba(255,255,255,.45)', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ color: 'rgba(255,255,255,.25)' }}>PHASE {phase.toString().padStart(2,'0')}</span>
        <span style={{ color: 'rgba(255,255,255,.2)' }}>—</span>
        <span>{PHASE_LABELS[phase]}</span>
      </div>

      <IpadFrame>
        {phase === 1 && <Phase1 text={typed} done={typeDone} />}
        {phase === 2 && <Phase2 shimmer={shimmer} visible={visible} />}
        {phase === 3 && <Phase3 line={line} />}
        {phase === 4 && <Phase4 />}
        {phase === 5 && <Phase5 />}
      </IpadFrame>

      {/* Phase dots */}
      <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
        {([1,2,3,4,5] as const).map(p => (
          <button
            key={p}
            onClick={() => { reset(); setTimeout(() => setPhase(p), 50) }}
            style={{
              width: p === phase ? '22px' : '7px',
              height: '7px', borderRadius: '4px', border: 'none', padding: 0,
              background: p === phase ? '#FFFFFF' : 'rgba(255,255,255,.22)',
              cursor: 'pointer',
              transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
