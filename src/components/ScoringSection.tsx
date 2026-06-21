import PhoneMockup from './PhoneMockup'
export default function ScoringSection() {
  const skills = [
    { icon: '🎯', name: 'Accuracy',   desc: 'Did you explain the topic correctly?' },
    { icon: '🔍', name: 'Depth',      desc: 'Did you go beyond the surface?' },
    { icon: '💡', name: 'Clarity',    desc: 'Did you speak clearly and logically?' },
    { icon: '🏗️', name: 'Structure',  desc: 'Did your explanation flow?' },
    { icon: '⚡', name: 'Confidence', desc: 'Did you sound sure of yourself?' },
  ]
  return (
    <section className="bg-bg-white py-12 md:py-20">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left max-w-lg">
            <span className="section-eyebrow">AI-Powered Analysis</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em] mb-3">Your Voice. Measured. Mastered.</h2>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mb-7">AI breaks down your speaking performance into the five skills that matter most.</p>
            <div className="flex flex-col gap-3">
              {skills.map(s => (
                <div key={s.name} className="flex items-start gap-3 text-sm text-text-dark leading-snug">
                  <span className="text-lg flex-shrink-0">{s.icon}</span>
                  <div><strong>{s.name}</strong> — {s.desc}</div>
                </div>
              ))}
            </div>
            <p className="mt-7 text-sm text-text-muted italic font-semibold">We don't guess. We measure.</p>
          </div>
          <PhoneMockup variant="scores" />
        </div>
      </div>
    </section>
  )
}
