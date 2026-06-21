import PhoneMockup from './PhoneMockup'

/* ── Skin palette ─────────────────────────────────────────────────────────
   Warm medium tone — premium, natural, photographic feel
   ──────────────────────────────────────────────────────────────────────── */
const SK = {
  highlight: '#EAC4A0',
  light:     '#D8A880',
  base:      '#C49070',
  shadow:    '#A07050',
  deep:      '#7A5030',
  nail:      '#DFBFAD',
}

/* ── Palm SVG ─────────────────────────────────────────────────────────────
   The palm and wrist visible below the phone.
   Width matches phone frame (270px total incl. pm-wrap padding).
   Height: 185px visible below phone bottom.
   ──────────────────────────────────────────────────────────────────────── */
function PalmSVG() {
  return (
    <svg
      viewBox="0 0 270 185"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '270px', height: '185px', display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Main skin gradient: lighter top-left → deeper bottom-right */}
        <linearGradient id="hh-palm-main" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor={SK.highlight} />
          <stop offset="40%"  stopColor={SK.light} />
          <stop offset="75%"  stopColor={SK.base} />
          <stop offset="100%" stopColor={SK.shadow} />
        </linearGradient>

        {/* Top highlight overlay — fades out downward */}
        <linearGradient id="hh-palm-hi" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* Bottom shadow overlay */}
        <linearGradient id="hh-palm-sh" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
        </linearGradient>

        {/* Left edge subtle shadow */}
        <linearGradient id="hh-palm-le" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.08)" />
          <stop offset="15%"  stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* Right edge subtle shadow */}
        <linearGradient id="hh-palm-re" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.06)" />
          <stop offset="15%"  stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>

      {/* ── Main palm body ─────────────────────────────── */}
      {/* Top edge (0,0)→(270,0) = where palm meets phone bottom.
          Wrist curves inward at bottom to 220px wide. */}
      <path
        d="
          M 20,0
          L 250,0
          C 261,0 270,8 270,18
          L 270,130
          C 270,158 254,174 232,177
          L 38,177
          C 16,174 0,158 0,130
          L 0,18
          C 0,8 9,0 20,0
          Z
        "
        fill="url(#hh-palm-main)"
      />

      {/* Top highlight overlay */}
      <path
        d="
          M 20,0 L 250,0 C 261,0 270,8 270,18 L 270,130
          C 270,158 254,174 232,177 L 38,177
          C 16,174 0,158 0,130 L 0,18 C 0,8 9,0 20,0 Z
        "
        fill="url(#hh-palm-hi)"
      />

      {/* Bottom shadow overlay */}
      <path
        d="
          M 20,0 L 250,0 C 261,0 270,8 270,18 L 270,130
          C 270,158 254,174 232,177 L 38,177
          C 16,174 0,158 0,130 L 0,18 C 0,8 9,0 20,0 Z
        "
        fill="url(#hh-palm-sh)"
      />

      {/* Left edge shadow */}
      <path
        d="M 0,18 C 0,8 9,0 20,0 L 20,177 L 38,177 C 16,174 0,158 0,130 Z"
        fill="url(#hh-palm-le)"
      />

      {/* Thenar eminence (thumb muscle bulge — lower right of palm) */}
      <ellipse cx="212" cy="148" rx="44" ry="22" fill="rgba(255,255,255,0.09)" />

      {/* Hypothenar (little finger side — lower left) */}
      <ellipse cx="55" cy="148" rx="36" ry="18" fill="rgba(0,0,0,0.04)" />

      {/* Subtle knuckle fold line at top (where fingers meet palm) */}
      <path
        d="M 28,4 C 100,11 178,11 244,4"
        stroke={SK.shadow}
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Subtle life lines — extremely faint */}
      <path
        d="M 60,30 C 80,50 100,75 120,90"
        stroke={SK.deep}
        strokeWidth="0.6"
        fill="none"
        opacity="0.12"
        strokeLinecap="round"
      />
      <path
        d="M 50,60 C 90,70 140,68 180,62"
        stroke={SK.deep}
        strokeWidth="0.5"
        fill="none"
        opacity="0.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Thumb SVG ────────────────────────────────────────────────────────────
   The thumb, visible in FRONT of the phone on the right side.
   Positioned along the right edge, extending ~200px upward.
   Width: 36px at base, ~24px at tip.
   ──────────────────────────────────────────────────────────────────────── */
function ThumbSVG() {
  return (
    <svg
      viewBox="0 0 42 215"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '42px', height: '215px', display: 'block' }}
    >
      <defs>
        {/* Left-to-right: shadow → base → highlight → base → shadow */}
        <linearGradient id="hh-thumb" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={SK.shadow} />
          <stop offset="28%"  stopColor={SK.base} />
          <stop offset="58%"  stopColor={SK.highlight} />
          <stop offset="82%"  stopColor={SK.light} />
          <stop offset="100%" stopColor={SK.base} />
        </linearGradient>

        {/* Top-to-bottom highlight */}
        <linearGradient id="hh-thumb-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
      </defs>

      {/* Main thumb body */}
      <path
        d="
          M 6,215
          C 2,178 -2,140 2,100
          C 5,65 12,28 20,10
          C 23,2 33,-1 38,6
          C 44,16 43,52 41,88
          C 39,132 38,168 37,215
          Z
        "
        fill="url(#hh-thumb)"
      />

      {/* Highlight overlay */}
      <path
        d="
          M 6,215 C 2,178 -2,140 2,100 C 5,65 12,28 20,10
          C 23,2 33,-1 38,6 C 44,16 43,52 41,88
          C 39,132 38,168 37,215 Z
        "
        fill="url(#hh-thumb-v)"
      />

      {/* Thumbnail */}
      <path
        d="M 15,9 C 17,0 33,0 36,9 C 38,19 36,34 27,35 C 19,35 13,23 15,9 Z"
        fill={SK.nail}
        opacity="0.92"
      />

      {/* Nail shine */}
      <path
        d="M 18,9 C 20,3 30,3 32,9 C 33,15 31,25 27,26 C 21,26 17,17 18,9 Z"
        fill="rgba(255,255,255,0.30)"
      />

      {/* Knuckle crease (lower) */}
      <path
        d="M 4,108 C 16,102 36,102 43,108"
        stroke={SK.deep}
        strokeWidth="1.1"
        fill="none"
        opacity="0.40"
        strokeLinecap="round"
      />

      {/* Second knuckle crease */}
      <path
        d="M 6,142 C 16,137 36,137 42,142"
        stroke={SK.deep}
        strokeWidth="0.7"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />

      {/* Subtle edge shadow on left side of thumb */}
      <path
        d="M 6,215 C 2,178 -2,140 2,100 C 5,65 12,28 20,10 L 22,10 C 14,28 8,65 5,100 C 1,140 5,178 9,215 Z"
        fill="rgba(0,0,0,0.08)"
      />
    </svg>
  )
}

/* ── HandHeldPhone ────────────────────────────────────────────────────────
   Wraps PhoneMockup with SVG palm (behind) and thumb (in front).
   Slight counter-clockwise tilt matches reference image angle.
   ──────────────────────────────────────────────────────────────────────── */
export default function HandHeldPhone() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        flexShrink: 0,
        /* Tilt matches reference image */
        transform: 'rotate(-2deg)',
        /* Extra bottom space for the palm to extend into */
        paddingBottom: '145px',
        /* Drop shadow beneath the whole hand+phone */
        filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.14))',
      }}
    >
      {/* ── Ground shadow ellipse ──────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '12%',
        right: '12%',
        height: '32px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.35) 0%, transparent 70%)',
        filter: 'blur(14px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* ── Palm — behind the phone ────────────────────────── */}
      {/* Positioned so its top aligns with the phone frame bottom */}
      <div style={{
        position: 'absolute',
        bottom: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        <PalmSVG />
      </div>

      {/* ── Phone — in front of palm ───────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PhoneMockup variant="timer" animated />
      </div>

      {/* ── Thumb — in front of phone ──────────────────────── */}
      {/* Positioned on right side of phone, overlapping right edge ~18px */}
      <div style={{
        position: 'absolute',
        right: '16px',
        bottom: '178px',
        zIndex: 3,
        pointerEvents: 'none',
      }}>
        <ThumbSVG />
      </div>
    </div>
  )
}
