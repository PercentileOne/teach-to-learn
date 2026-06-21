import PhoneMockup from './PhoneMockup'

export default function HeroSection() {
  return (
    <section className="bg-hero-gradient py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-white/15 text-white text-[0.75rem] font-bold tracking-[0.12em] uppercase px-[18px] py-1.5 rounded-btn border border-white/40 backdrop-blur-sm mb-6">
              Talk to Learn · 2-Minute Challenge
            </div>

            {/* Headline: black for maximum contrast + premium confidence */}
            <h1
              className="text-[clamp(2.5rem,8vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] mb-4"
              style={{ color: '#000000' }}
            >
              Learn by Talking
            </h1>

            <p className="text-[clamp(1.1rem,3vw,1.5rem)] text-white/95 font-semibold mb-5 [text-shadow:0_1px_8px_rgba(0,0,0,0.15)]">
              Practice Privately. Thrive Publicly.
            </p>
            <p className="text-[clamp(0.95rem,2vw,1.1rem)] text-white/90 max-w-[520px] mx-auto md:mx-0 mb-8 leading-[1.65]">
              Works on the <strong>Teach to Learn</strong> principle — the science-backed method where
              speaking out loud rapidly boosts clarity, memory, and understanding. Talk about any
              subject — maths, science, computing, languages, anything — and the app instantly scores
              you across five skills: Accuracy, Depth, Clarity, Structure, and Confidence.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center md:justify-start mb-6">
              <button className="btn-primary">Start Learning by Talking</button>
              <button className="btn-secondary border-white/80 text-white hover:bg-white/20 hover:text-white">▶ Watch How It Works</button>
            </div>
            <p className="text-sm text-white/85 mb-2">Talk privately. Grow publicly. Master anything.</p>
            <p className="text-sm text-white/70 italic">Think you know your stuff? We'll tell you the truth.</p>
          </div>

          {/* Floating phone mockup — animated screen */}
          <div style={{
            flexShrink: 0,
            transform: 'rotate(-4deg) translateY(-8px)',
            filter: [
              'drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
              'drop-shadow(0 32px 64px rgba(0,0,0,0.14))',
            ].join(' '),
          }}>
            <PhoneMockup variant="timer" animated />
          </div>

        </div>
      </div>
    </section>
  )
}
