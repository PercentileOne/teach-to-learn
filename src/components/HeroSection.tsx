import PhoneMockup from './PhoneMockup'

export default function HeroSection() {
  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">Talk to Learn · 2-Minute Challenge</div>
            <h1 className="hero-title">Learn by Talking</h1>
            <p className="hero-tagline">Practice Privately. Thrive Publicly.</p>
            <p className="hero-sub">
              Works on the <strong>Teach to Learn</strong> principle — the science-backed method where
              speaking out loud rapidly boosts clarity, memory, and understanding. Talk about any
              subject — maths, science, computing, languages, anything — and the app instantly scores
              you across five skills: Accuracy, Depth, Clarity, Structure, and Confidence.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary hero-cta-primary">Start Learning by Talking</button>
              <button className="btn-secondary">▶ Watch How It Works</button>
            </div>
            <p className="hero-micro">Talk privately. Grow publicly. Master anything.</p>
            <p className="hero-challenge">Think you know your stuff? We'll tell you the truth.</p>
          </div>
          <PhoneMockup variant="timer" animated />
        </div>
      </div>
    </section>
  )
}
