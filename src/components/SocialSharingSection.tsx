const CARDS = [
  {
    title: 'Share Your Score',
    desc: 'A clean, beautiful card showing your Verbal Mastery Score and all five sub-scores — ready to post anywhere.',
    comingSoon: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
  },
  {
    title: 'Share Your Talk',
    desc: 'Share your audio, transcript, AI feedback, and score — all in one shareable link that tells your learning story.',
    comingSoon: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    title: 'Public Profiles',
    desc: "My Talks. My Progress. My Scores. A personal page that shows how far you've come.",
    comingSoon: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

export default function SocialSharingSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '108px 20px 120px' }}>
      <div className="max-w-[1120px] mx-auto">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '20px', marginBottom: '20px',
            border: '1px solid rgba(99,102,241,.22)', background: 'rgba(99,102,241,.07)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6366F1', display: 'inline-block' }}/>
            <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#6366F1' }}>
              Share Your Growth
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
            fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
            color: '#0A0F1C', margin: '0 0 14px',
          }}>
            Share Your Progress. Inspire Someone.
          </h2>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#6B7280', lineHeight: 1.65, maxWidth: '460px', margin: '0 auto' }}>
            Your scores, your talks, your growth — beautifully shareable.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                background: '#FFFFFF', border: '1px solid #E8EDF5',
                borderRadius: '16px', padding: '28px 28px 26px',
                boxShadow: '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)',
                position: 'relative',
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
              {card.comingSoon && (
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  padding: '3px 10px', borderRadius: '20px',
                  background: 'rgba(99,102,241,.10)', border: '1px solid rgba(99,102,241,.22)',
                  fontSize: '9px', fontWeight: 800, letterSpacing: '.10em',
                  textTransform: 'uppercase' as const, color: '#6366F1',
                }}>
                  Coming Soon
                </div>
              )}
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#6366F1', marginBottom: '18px',
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
            "Your voice can inspire someone else."
          </p>
        </div>

      </div>
    </section>
  )
}
