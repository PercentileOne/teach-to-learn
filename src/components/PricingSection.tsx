const plans = [
  {
    name: 'Free',
    desc: 'Perfect for getting started',
    price: '£0',
    priceSub: 'forever',
    features: [
      'Daily 2-minute talk',
      'Basic scoring & feedback',
      'Practice in any language',
      'Share your scores',
    ],
    cta: 'Get Started Free',
    featured: false,
    badge: null,
  },
  {
    name: 'Parent Plan',
    desc: 'Help your child build confidence',
    price: '£7.99',
    priceSub: '/ month or £14.99 / family',
    features: [
      'For ages 3–18',
      'Everything in Free',
      'Child dashboard',
      'Weekly progress reports',
      'Confidence tracking',
      'School presentation prep',
      'Multi-language support',
      'Share talks with teachers',
    ],
    cta: 'Start Free Trial',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Pro',
    desc: 'For creators, coaches & professionals',
    price: '£19.99',
    priceSub: '/ month',
    features: [
      'Everything in Parent',
      'Advanced analytics & deep scoring',
      'Script rehearsal mode',
      'Coaching mode',
      'Exportable reports',
      'Unlimited talks',
    ],
    cta: 'Go Pro',
    featured: false,
    badge: null,
  },
]

export default function PricingSection() {
  return (
    <section className="pricing-section section">
      <div className="container">
        <h2 className="section-title">Simple, Fair, and Built for Everyone</h2>
        <p className="section-subtitle">Start free. Upgrade when you're ready.</p>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
            >
              {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
              <div className="pricing-card-name">{plan.name}</div>
              <div className="pricing-card-desc">{plan.desc}</div>
              <div className="pricing-price">
                <div className="pricing-price-main">{plan.price}</div>
                <div className="pricing-price-sub">{plan.priceSub}</div>
              </div>
              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f} className="pricing-feature">
                    <span className="pricing-check">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`pricing-cta ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-bottom">
          <button className="btn-primary">Start Talking to Learn — Free</button>
          <p className="pricing-micro">Cancel anytime. No commitment.</p>
        </div>
      </div>
    </section>
  )
}
