const ANIM = `
@keyframes watch-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
@keyframes watch-pulse { 0%,100% { opacity:.7; transform:scaleX(1); } 50% { opacity:1; transform:scaleX(1.06); } }
@keyframes watch-bar { 0%,100% { height:6px; } 50% { height:18px; } }
`

// Tiny waveform bars that animate independently
function WaveBars() {
  const delays = [0, 0.15, 0.07, 0.22, 0.1, 0.18, 0.05, 0.2]
  return (
    <svg width="40" height="20" viewBox="0 0 40 20" style={{ overflow: 'visible' }}>
      {delays.map((d, i) => (
        <rect
          key={i}
          x={i * 5}
          y={7}
          width={3}
          height={6}
          rx={1.5}
          fill="#4F8EF7"
          style={{
            animation: `watch-bar .6s ${d}s ease-in-out infinite`,
            transformOrigin: 'center',
            transformBox: 'fill-box',
          }}
        />
      ))}
    </svg>
  )
}

export default function WatchMockup() {
  return (
    <>
      <style>{ANIM}</style>
      <div style={{
        width: 110,
        animation: 'watch-float 4s 1.5s ease-in-out infinite',
        filter: 'drop-shadow(0 8px 22px rgba(0,0,0,0.30)) drop-shadow(0 2px 6px rgba(79,142,247,0.20))',
      }}>
        {/* Watch band top */}
        <div style={{
          width: 46, height: 28, background: 'linear-gradient(180deg,#1a1a2e,#111827)',
          borderRadius: '6px 6px 0 0', margin: '0 auto',
          borderLeft: '1.5px solid rgba(255,255,255,0.08)',
          borderRight: '1.5px solid rgba(255,255,255,0.08)',
          borderTop: '1.5px solid rgba(255,255,255,0.12)',
        }} />

        {/* Watch case */}
        <div style={{
          width: 78, height: 94,
          background: 'linear-gradient(145deg,#1c1c2e 0%,#12121f 100%)',
          borderRadius: 20,
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.5)',
          position: 'relative',
          margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Crown button */}
          <div style={{
            position: 'absolute', right: -5, top: 28,
            width: 5, height: 20, borderRadius: 3,
            background: 'linear-gradient(180deg,#2a2a3e,#1a1a2e)',
            border: '1px solid rgba(255,255,255,0.10)',
          }} />

          {/* Screen */}
          <div style={{
            width: 62, height: 78,
            background: 'linear-gradient(160deg,#080e1a 0%,#0d1525 100%)',
            borderRadius: 14,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 6,
            padding: '8px 6px',
          }}>
            {/* Timer */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 900,
              color: '#4F8EF7',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              00:42
            </div>

            {/* Waveform */}
            <WaveBars />

            {/* Stop dot */}
            <div style={{
              width: 18, height: 18,
              borderRadius: '50%',
              background: 'rgba(239,68,68,0.85)',
              border: '1.5px solid rgba(239,68,68,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 8px rgba(239,68,68,0.5)',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 1, background: '#fff' }} />
            </div>
          </div>
        </div>

        {/* Watch band bottom */}
        <div style={{
          width: 46, height: 30, background: 'linear-gradient(180deg,#111827,#1a1a2e)',
          borderRadius: '0 0 8px 8px', margin: '0 auto',
          borderLeft: '1.5px solid rgba(255,255,255,0.08)',
          borderRight: '1.5px solid rgba(255,255,255,0.08)',
          borderBottom: '1.5px solid rgba(255,255,255,0.06)',
        }} />

        {/* Label */}
        <p style={{
          textAlign: 'center', marginTop: 8,
          fontSize: 10, fontWeight: 700,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>Apple Watch</p>
      </div>
    </>
  )
}
