const plans = [
  {
    name: 'Free', desc: 'Perfect for getting started',
    price: '£0', priceSub: 'forever',
    features: ['Daily 2-minute talk','Basic scoring & feedback','Practice in any language','Share your scores'],
    cta: 'Get Started Free', featured: false, badge: null,
  },
  {
    name: 'Parent Plan', desc: 'Help your child build confidence',
    price: '£7.99', priceSub: '/ month or £14.99 / family',
    features: ['For ages 3–18','Everything in Free','Child dashboard','Weekly progress reports','Confidence tracking','School presentation prep','Multi-language support','Share talks with teachers'],
    cta: 'Start Free Trial', featured: true, badge: 'Most Popular',
  },
  {
    name: 'Pro', desc: 'For creators, coaches & professionals',
    price: '£19.99', priceSub: '/ month',
    features: ['Everything in Parent','Advanced analytics & deep scoring','Script rehearsal mode','Coaching mode','Exportable reports','Unlimited talks'],
    cta: 'Go Pro', featured: false, badge: null,
  },
]
export default function PricingSection() {
  return (
    <section className="bg-bg-blue py-12 md:py-20 text-center">
      <div className="max-w-[1160px] mx-auto px-5">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">Simple, Fair, and Built for Everyone</h2>
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-xl mx-auto">Start free. Upgrade when you're ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-9">
          {plans.map(plan => (
            <div key={plan.name} className={`relative flex flex-col bg-bg-white rounded-card p-8 text-left transition-all hover:-translate-y-1 ${plan.featured ? 'outline outline-2 outline-primary bg-gradient-to-b from-white to-[#F0F7FF] shadow-blue-xl' : 'shadow-card hover:shadow-card-lg'}`}>
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[0.7rem] font-extrabold tracking-[0.08em] uppercase px-4 py-1 rounded-btn whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className="text-[0.9rem] font-extrabold text-primary uppercase tracking-[0.08em] mb-1">{plan.name}</div>
              <div className="text-sm text-text-muted mb-5">{plan.desc}</div>
              <div className="mb-6">
                <div className="text-[2.2rem] font-black text-text-dark tracking-[-0.03em] leading-none">{plan.price}</div>
                <div className="text-xs text-text-muted mt-1">{plan.priceSub}</div>
              </div>
              <ul className="flex-1 flex flex-col gap-2.5 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-text-dark">
                    <span className="text-primary font-bold flex-shrink-0 mt-px">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3.5 text-center rounded-btn font-bold text-base transition-all ${plan.featured ? 'bg-primary text-white shadow-blue-sm hover:bg-primary-dark' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-3">
          <button className="btn-primary">Start Learning by Talking — Free</button>
          <p className="text-sm text-text-muted">Cancel anytime. No commitment.</p>
        </div>
      </div>
    </section>
  )
}
