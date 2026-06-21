const CARDS = [
  {
    title: 'Students',
    desc: 'Master any topic by explaining it out loud. Perfect for revision, presentations, and real understanding.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    title: 'Parents',
    desc: 'Help your child build confidence — privately, safely, at home, and at their own pace.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Teachers',
    desc: 'Give students a powerful new way to learn and express themselves — beyond reading and writing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
        <path d="M7 8h10"/><path d="M7 12h6"/>
      </svg>
    ),
  },
  {
    title: 'Creators',
    desc: 'Practice scripts, hooks, and storytelling — before you hit record. Hear yourself improve in real time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    title: 'Professionals',
    desc: 'Speak with clarity and confidence in meetings, pitches, and interviews. Sound like you mean it.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    title: 'Coaches & Trainers',
    desc: 'Give clients structured, measurable feedback on their speaking — backed by AI-powered scoring.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
]

export default function WhoItsForSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '108px 20px 120px' }}>
      <div className="max-w-[1120px] mx-auto">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '20px', marginBottom: '20px',
            border: '1px solid rgba(45,158,106,.22)', background: 'rgba(45,158,106,.07)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2D9E6A', display: 'inline-block' }}/>
            <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#2D9E6A' }}>
              Who It's For
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
            fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
            color: '#0A0F1C', margin: '0 0 14px',
          }}>
            Anyone who speaks can learn faster.
          </h2>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#6B7280', lineHeight: 1.65, maxWidth: '520px', margin: '0 auto' }}>
            The Teach to Learn Principle works for every age, every subject, and every goal.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-14">
          {CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                background: '#FFFFFF', border: '1px solid #E8EDF5',
                borderRadius: '16px', padding: '28px 28px 26px',
                boxShadow: '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)',
                transition: 'transform .22s ease, box-shadow .22s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,.06), 0 16px 40px rgba(0,0,0,.10)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)'
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(45,158,106,.08)', border: '1px solid rgba(45,158,106,.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#2D9E6A', marginBottom: '18px',
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0A0F1C', margin: '0 0 10px' }}>{card.title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div style={{ textAlign: 'center', borderTop: '1px solid #F0F2F7', paddingTop: '44px' }}>
          <p style={{ fontSize: '17px', fontStyle: 'italic', color: '#9CA3AF', fontWeight: 400 }}>
            "If you speak, you can learn. If you learn, you can grow."
          </p>
        </div>

      </div>
    </section>
  )
}
