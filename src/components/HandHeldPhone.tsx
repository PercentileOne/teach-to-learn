import PhoneMockup from './PhoneMockup'

/* ── Skin palette ─────────────────────────────────────────────────────────── */
const SK = {
  highlight: '#DFBF9E',
  base:      '#C8986E',
  shadow:    '#A07250',
  deep:      '#7A5030',
  nail:      '#DFC0AF',
}

/* ── ThumbSVG ─────────────────────────────────────────────────────────────── */
function ThumbSVG() {
  return (
    <svg
      viewBox="0 0 36 195"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '36px', height: '195px', display: 'block' }}
    >
      <defs>
        <linearGradient id="t-lr" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={SK.shadow} />
          <stop offset="30%"  stopColor={SK.base} />
          <stop offset="60%"  stopColor={SK.highlight} />
          <stop offset="85%"  stopColor={SK.base} />
          <stop offset="100%" stopColor={SK.shadow} />
        </linearGradient>
        <linearGradient id="t-tb" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.10)" />
        </linearGradient>
      </defs>

      {/* Thumb body */}
      <path
        d="M 5,195 C 1,162 -2,124 1,88 C 4,55 11,22 19,7 C 22,-1 30,-1 34,7 C 38,17 37,55 35,90 C 33,133 32,162 32,195 Z"
        fill="url(#t-lr)"
      />
      <path
        d="M 5,195 C 1,162 -2,124 1,88 C 4,55 11,22 19,7 C 22,-1 30,-1 34,7 C 38,17 37,55 35,90 C 33,133 32,162 32,195 Z"
        fill="url(#t-tb)"
      />

      {/* Nail */}
      <path d="M 13,7 C 15,-1 30,-1 33,7 C 35,16 33,30 24,31 C 16,31 12,19 13,7 Z" fill={SK.nail} opacity="0.92" />
      <path d="M 16,7 C 18,2 28,2 30,7 C 32,13 30,22 24,23 C 18,23 15,14 16,7 Z" fill="rgba(255,255,255,0.28)" />

      {/* Knuckle creases */}
      <path d="M 3,93 C 14,87 30,87 37,93" stroke={SK.deep} strokeWidth="1.1" fill="none" opacity="0.36" strokeLinecap="round" />
      <path d="M 4,124 C 14,118 30,118 37,124" stroke={SK.deep} strokeWidth="0.7" fill="none" opacity="0.22" strokeLinecap="round" />

      {/* Left edge shadow */}
      <path d="M 5,195 C 1,162 -2,124 1,88 C 4,55 11,22 19,7 L 22,7 C 15,22 7,55 4,88 C 1,124 5,162 9,195 Z" fill="rgba(0,0,0,0.08)" />
    </svg>
  )
}

/* ── HandHeldPhone ────────────────────────────────────────────────────────────
   Uses flex-column so the palm div sits naturally below the phone.
   margin-top: -24px pulls the palm up into the phone frame bottom,
   creating the "hand holding the phone" illusion (palm z:1, phone z:2).

   Palm shape:
   - 230px wide at top = exact phone frame width (seamless junction)
   - border-radius creates a dramatic half-ellipse at bottom = natural wrist taper
   - Multiple CSS gradients + inset shadows for 3D depth without SVG complexity
   ─────────────────────────────────────────────────────────────────────────── */
export default function HandHeldPhone() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        transform: 'rotate(-2deg)',
        filter: [
          'drop-shadow(0 8px 20px rgba(0,0,0,0.14))',
          'drop-shadow(0 24px 48px rgba(0,0,0,0.10))',
        ].join(' '),
      }}
    >
      {/* ── z:2 Phone ──────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PhoneMockup variant="timer" animated />
      </div>

      {/* ── z:1 Palm / wrist ──────────────────────────────────────
          230px wide = phone frame width (exact match at junction).
          margin-top: -24px overlaps into the phone frame bottom,
          hiding the palm's top edge behind the phone (natural grip).
          border-radius creates the organic wrist taper at bottom.
          ────────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '230px',
          height: '128px',
          marginTop: '-24px',
          position: 'relative',
          zIndex: 1,
          borderRadius: '0 0 115px 115px',
          background: [
            'radial-gradient(ellipse 70% 60% at 38% 25%, rgba(255,255,255,0.22) 0%, transparent 60%)',
            `linear-gradient(170deg, ${SK.highlight} 0%, ${SK.base} 38%, ${SK.shadow} 100%)`,
          ].join(', '),
          boxShadow: [
            /* top edge shadow — where hand meets phone frame */
            'inset 0 12px 20px rgba(0,0,0,0.14)',
            /* left/right edge shadow — curvature depth */
            'inset 8px 0 18px rgba(0,0,0,0.08)',
            'inset -8px 0 18px rgba(0,0,0,0.08)',
            /* outer drop shadow */
            '0 14px 36px rgba(0,0,0,0.16)',
          ].join(', '),
        }}
      >
        {/* Thenar eminence — subtle thumb-muscle highlight on right */}
        <div style={{
          position: 'absolute',
          right: '18px',
          top: '16px',
          width: '52px',
          height: '32px',
          background: 'radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.16) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── z:3 Thumb — in front of phone ─────────────────────────
          right: 20px = phone frame right edge (pm-wrap right pad is 20px).
          Positioned to cover the lower-right portion of the phone screen.
          ────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '106px',   /* sits above the palm, in the phone screen area */
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <ThumbSVG />
      </div>

    </div>
  )
}
