const PLANS = [
  {
    name: 'Free',
    desc: 'Perfect for getting started',
    price: '£0',
    priceSub: 'forever',
    features: ['Daily 2-minute talk', 'Basic scoring & feedback', 'Practice in any language', 'Share your scores'],
    cta: 'Get Started Free',
    featured: false,
    badge: null,
  },
  {
    name: 'Parent Plan',
    desc: 'Help your child build real confidence',
    price: '£7.99',
    priceSub: '/ month  ·  or £14.99 / family',
    features: ['For ages 3–18', 'Everything in Free', 'Child dashboard', 'Weekly progress reports', 'Confidence tracking', 'School presentation prep', 'Multi-language support', 'Share talks with teachers'],
    cta: 'Start Free Trial',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Pro',
    desc: 'For creators, coaches & professionals',
    price: '£19.99',
    priceSub: '/ month',
    features: ['Everything in Parent', 'Advanced analytics & deep scoring', 'Script rehearsal mode', 'Coaching mode', 'Exportable reports', 'Unlimited talks'],
    cta: 'Go Pro',
    featured: false,
    badge: null,
  },
]

function CheckIcon({ dark }: { dark?: boolean }) {
  return (
    <div style={{
      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
      background: dark ? 'rgba(96,165,250,.22)' : '#EEF2FF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2.5 2.5L8 3" stroke={dark ? '#93C5FD' : '#1E4DD8'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function PricingSection() {
  return (
    <section style={{ background: 'linear-gradient(180deg,#F0F5FF 0%,#EBF4FF 100%)', padding: '80px 20px 100px' }}>
      <div className="max-w-[1160px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div style={{
            display: 'inline-block', fontSize: '9px', fontWeight: 800, letterSpacing: '.16em',
            textTransform: 'uppercase', color: '#1E4DD8',
            border: '1px solid rgba(30,77,216,.22)', borderRadius: '20px', padding: '5px 16px', marginBottom: '16px',
          }}>Pricing</div>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em] mb-3">
            Simple, fair, and built for everyone
          </h2>
          <p className="text-[clamp(1rem,2vw,1.15rem)] text-text-muted max-w-md mx-auto">
            Start free. Upgrade when you're ready.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.map(plan => {
            const dark = plan.featured
            return (
              <div key={plan.name} style={{
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'left',
                transition: 'transform .2s, box-shadow .2s',
                background: dark
                  ? 'linear-gradient(160deg,#0E2040 0%,#1A3A6E 60%,#0E2A58 100%)'
                  : '#FFFFFF',
                boxShadow: dark
                  ? '0 4px 8px rgba(14,32,64,.22),0 16px 40px rgba(14,32,64,.28),0 40px 80px rgba(14,32,64,.18),0 0 0 1px rgba(96,165,250,.18)'
                  : '0 2px 4px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.07)',
              }}>
                {/* Top accent stripe */}
                <div style={{
                  position: 'absolute', top: 0, left: '24px', right: '24px', height: '2.5px', borderRadius: '0 0 3px 3px',
                  background: dark
                    ? 'linear-gradient(90deg,#60A5FA,#818CF8)'
                    : 'rgba(30,77,216,.12)',
                }} />

                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg,#1E4DD8,#2A5BFF)',
                    color: '#FFF', fontSize: '10px', fontWeight: 800, letterSpacing: '.10em',
                    textTransform: 'uppercase', padding: '5px 18px', borderRadius: '20px',
                    whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(30,77,216,.40)',
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div style={{
                  fontSize: '10px', fontWeight: 800, letterSpacing: '.14em',
                  textTransform: 'uppercase', marginBottom: '4px',
                  color: dark ? '#93C5FD' : '#1E4DD8',
                }}>{plan.name}</div>

                {/* Desc */}
                <div style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,.52)' : '#6B7280', marginBottom: '22px', lineHeight: 1.4 }}>
                  {plan.desc}
                </div>

                {/* Price */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1, color: dark ? '#FFFFFF' : '#0A0F1C' }}>
                    {plan.price}
                  </div>
                  <div style={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,.40)' : '#9CA3AF', marginTop: '5px' }}>
                    {plan.priceSub}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: dark ? 'rgba(255,255,255,.09)' : '#F0F2F5', marginBottom: '22px' }} />

                {/* Features */}
                <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', padding: 0, listStyle: 'none' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: dark ? 'rgba(255,255,255,.80)' : '#374151', lineHeight: 1.4 }}>
                      <CheckIcon dark={dark} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button style={{
                  width: '100%', padding: '14px 0', borderRadius: '50px',
                  border: dark ? 'none' : '2px solid #1E4DD8',
                  background: dark ? 'linear-gradient(135deg,#1E4DD8,#2A5BFF)' : 'transparent',
                  color: dark ? '#FFFFFF' : '#1E4DD8',
                  fontSize: '14px', fontWeight: 800, letterSpacing: '.02em', cursor: 'pointer',
                  boxShadow: dark ? '0 4px 16px rgba(30,77,216,.40),inset 0 1px 0 rgba(255,255,255,.15)' : 'none',
                  transition: 'all .2s',
                }}>
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-3">
          <button className="btn-primary">Start for Free — No Credit Card Needed</button>
          <p className="text-sm text-text-muted">Cancel anytime. No commitment.</p>
        </div>

      </div>
    </section>
  )
}
