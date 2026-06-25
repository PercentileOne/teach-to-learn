import type { ScoreBreakdown } from '../types/VideoTalk'

interface Props {
  score: ScoreBreakdown
  subject: string
  onClose: () => void
  onPublish: (visibility: 'private' | 'unlisted' | 'public') => void
}

const DIMENSIONS = [
  { key: 'understanding', label: 'Understanding', max: 40, color: '#4F8EF7', emoji: '🧠' },
  { key: 'structure',     label: 'Structure',     max: 20, color: '#34D399', emoji: '🏗️' },
  { key: 'communication', label: 'Communication', max: 20, color: '#A78BFA', emoji: '🗣️' },
  { key: 'presence',      label: 'Presence',      max: 20, color: '#FB923C', emoji: '✨' },
] as const

function ScoreRing({ score, max = 100 }: { score: number; max?: number }) {
  const pct = score / max
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct)
  const colour = pct >= 0.8 ? '#34D399' : pct >= 0.6 ? '#4F8EF7' : pct >= 0.4 ? '#FB923C' : '#F87171'

  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10"/>
      <circle cx="55" cy="55" r={r} fill="none" stroke={colour} strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 55 55)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <text x="55" y="50" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily="Inter,system-ui,sans-serif">{score}</text>
      <text x="55" y="68" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="Inter,system-ui,sans-serif">/ {max}</text>
    </svg>
  )
}

export default function VideoScorePanel({ score, subject, onClose, onPublish }: Props) {
  const grade = score.total >= 90 ? 'A+' : score.total >= 80 ? 'A' : score.total >= 70 ? 'B' : score.total >= 60 ? 'C' : 'D'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: '#0A0F1C',
      overflowY: 'auto',
      fontFamily: 'Inter,system-ui,sans-serif',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Talk Results
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>×</button>
      </div>

      {/* Main score */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px 24px' }}>
        <div style={{ fontSize: '13px', color: '#4F8EF7', fontWeight: 600, marginBottom: '8px' }}>{subject}</div>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <ScoreRing score={score.total} max={100} />
          <div style={{
            position: 'absolute', top: '-8px', right: '-8px',
            background: '#4F8EF7', borderRadius: '12px',
            padding: '2px 8px', fontSize: '13px', fontWeight: 800, color: '#fff',
          }}>{grade}</div>
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', maxWidth: '280px', textAlign: 'center', lineHeight: 1.6 }}>
          {score.feedback.overall}
        </div>
      </div>

      {/* Dimension bars */}
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {DIMENSIONS.map(dim => {
          const val = score[dim.key as keyof ScoreBreakdown] as number
          const pct = (val / dim.max) * 100
          return (
            <div key={dim.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{dim.emoji} {dim.label}</span>
                <span style={{ fontSize: '13px', color: dim.color, fontWeight: 700 }}>{val}<span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>/{dim.max}</span></span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${pct}%`, borderRadius: '99px',
                  background: dim.color, transition: 'width 1s ease',
                }}/>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '5px', lineHeight: 1.5 }}>
                {score.feedback[dim.key as keyof typeof score.feedback]}
              </div>
            </div>
          )
        })}
      </div>

      {/* Publish options */}
      <div style={{ padding: '0 20px 40px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '12px' }}>Publish your Talk</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(['private', 'unlisted', 'public'] as const).map(v => {
            const cfg = {
              private:  { icon: '🔒', label: 'Private',  desc: 'Only you can see this' },
              unlisted: { icon: '🔗', label: 'Unlisted', desc: 'Anyone with the link' },
              public:   { icon: '🌍', label: 'Public',   desc: 'Appears in the feed' },
            }[v]
            return (
              <button key={v} onClick={() => onPublish(v)} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '14px 16px', cursor: 'pointer',
                transition: 'background .15s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'}
              >
                <span style={{ fontSize: '20px' }}>{cfg.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{cfg.label}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{cfg.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.25)', fontSize: '18px' }}>›</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
