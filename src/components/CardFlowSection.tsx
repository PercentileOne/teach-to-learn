const FLOW_STEPS = [
  { num: '01', icon: '✏️', title: 'Enter a Subject',       desc: 'Type any topic — maths, science, history, a language, a skill, anything.' },
  { num: '02', icon: '⚡', title: 'Generate a Flashcard',  desc: 'The AI instantly builds a comprehensive Flashcard covering all relevant subject matter.' },
  { num: '03', icon: '👁️', title: 'Learn First',           desc: 'Read the Flashcard. Absorb the concept, the structure, and the depth before you speak or test.' },
  { num: '04', icon: '🔀', title: 'Choose: Talk or Test',  desc: 'Prove your understanding — explain it out loud for up to 6 minutes, or answer AI-generated questions.' },
]

function FlashCard() {
  return (
    <div className="bg-bg-white rounded-xl2 shadow-[0_8px_48px_rgba(0,0,0,0.1)] border border-primary/[0.12] overflow-hidden text-left max-w-2xl mx-auto">

      {/* AI bar */}
      <div className="flex items-center gap-2 px-5 py-2 bg-[#0D1117] border-b border-white/[0.06]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] ai-pulse flex-shrink-0" />
        <span className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-white/50 flex-1">AI-Generated Flashcard</span>
        <span className="text-[0.65rem] text-emerald-400 font-semibold">Generated in 1.2s</span>
      </div>

      {/* Header */}
      <div className="bg-blue-gradient px-7 py-6">
        <span className="inline-block bg-white/[0.18] text-white/90 text-[0.68rem] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-btn border border-white/[0.28] mb-2.5">Science · Year 9</span>
        <h3 className="text-[1.6rem] font-black text-white tracking-[-0.02em] mb-1">Photosynthesis</h3>
        <p className="text-sm text-white/70">How plants convert light into energy</p>
      </div>

      {/* Body */}
      <div className="px-7 divide-y divide-slate-100">
        <div className="py-4">
          <div className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-primary mb-1.5">📖 Explanation</div>
          <p className="text-sm text-text-dark leading-relaxed">Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and oxygen — taking place in the chloroplasts of plant cells.</p>
        </div>
        <div className="py-4">
          <div className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-primary mb-1.5">🔑 Key Points</div>
          <ul className="space-y-1.5">
            {['Requires sunlight, water (H₂O), and CO₂','Produces glucose (energy) and oxygen','Occurs in chloroplasts — contains chlorophyll','Formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'].map(p => (
              <li key={p} className="text-sm text-text-dark pl-4 relative leading-snug">
                <span className="absolute left-0 text-primary text-xs top-0.5">→</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-4 grid grid-cols-2 gap-5">
          <div>
            <div className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-primary mb-1.5">💡 Example</div>
            <p className="text-sm text-text-dark leading-relaxed">A leaf absorbs sunlight and pulls water from roots — converting both into sugar it uses to grow.</p>
          </div>
          <div>
            <div className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-primary mb-1.5">🏗️ Structure</div>
            <p className="text-sm text-text-dark leading-relaxed">Two stages: light-dependent reactions (thylakoid) → Calvin cycle (stroma) → glucose output.</p>
          </div>
        </div>
        <div className="py-4 grid grid-cols-2 gap-5">
          <div>
            <div className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-primary mb-1.5">⚠️ Misconceptions</div>
            <ul className="space-y-1">
              {['Plants do not only absorb CO₂ — they also respire','Photosynthesis stops at night — it needs light'].map(p => (
                <li key={p} className="text-sm text-text-dark pl-4 relative leading-snug">
                  <span className="absolute left-0 text-primary text-xs top-0.5">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-primary mb-1.5">🔬 Breakdown</div>
            <ul className="space-y-1">
              {['Chlorophyll absorbs red + blue light','Water is split to release electrons','CO₂ is fixed into 3-carbon sugars'].map(p => (
                <li key={p} className="text-sm text-text-dark pl-4 relative leading-snug">
                  <span className="absolute left-0 text-primary text-xs top-0.5">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="py-4 bg-bg-blue -mx-7 px-7">
          <div className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-primary mb-1.5">✅ Summary</div>
          <p className="text-sm text-text-dark leading-relaxed">Plants are solar-powered sugar factories. Light + water + CO₂ → glucose + oxygen. The equation balances perfectly — and so does nature.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 border-t border-slate-100">
        <button className="flex items-center gap-3.5 px-5 py-4 bg-blue-gradient hover:brightness-110 transition-all rounded-bl-xl2 text-left">
          <span className="text-2xl">🎙</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-black text-white tracking-[0.06em]">TALK</span>
            <span className="text-[0.68rem] text-white/75">2–6 min · 5 AI scores</span>
          </div>
        </button>
        <button className="flex items-center gap-3.5 px-5 py-4 bg-gold-gradient hover:brightness-110 transition-all rounded-br-xl2 text-left">
          <span className="text-2xl">🧠</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-black text-white tracking-[0.06em]">TEST</span>
            <span className="text-[0.68rem] text-white/75">Questions · instant results</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function CardFlowSection() {
  return (
    <section className="bg-bg-alt py-12 md:py-20">
      <div className="max-w-[1160px] mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">The Flashcard — Your Learning Unit</h2>
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-2xl mx-auto">Enter any subject and the AI generates a comprehensive Flashcard instantly. Then prove you know it: Talk or Test.</p>
        </div>

        {/* Flow steps */}
        <div className="flex flex-col md:flex-row gap-0 mb-16">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="flex md:flex-col md:flex-1 md:items-center md:text-center items-start gap-5 md:gap-0 relative pb-9 md:pb-0 md:px-3">
              {/* Mobile vertical line */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="absolute left-[13px] top-7 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent md:hidden" />
              )}
              {/* Desktop horizontal line */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden md:block absolute left-[calc(50%+24px)] right-[calc(-50%+24px)] top-5 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              <div className="text-[0.65rem] font-black tracking-[0.1em] text-primary min-w-[28px] md:mb-3">{step.num}</div>
              <div>
                <div className="w-10 h-10 flex items-center justify-center text-xl bg-bg-white rounded-xl shadow-[0_2px_12px_rgba(14,165,233,0.1)] border border-primary/[0.12] mb-0 md:mb-3 md:mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-text-dark mb-1 md:mt-3">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Flashcard */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-text-muted mb-6">A real Flashcard — generated in seconds</p>
          <FlashCard />
        </div>

        {/* TALK / TEST mode cards */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="flex-1 bg-bg-white rounded-card p-8 shadow-card border border-primary/20">
            <div className="text-3xl mb-3">🎙</div>
            <h3 className="text-lg font-black tracking-[0.08em] text-primary mb-2.5">TALK</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Explain the Flashcard out loud — choose your own duration from <strong className="text-text-dark">2 to 6 minutes</strong>.
              The AI listens and scores you across five skills, then delivers your Verbal Mastery Score.
            </p>
            <div className="flex flex-wrap gap-2">
              {['2–6 Minutes','Accuracy','Depth','Clarity','Structure','Confidence'].map(t => (
                <span key={t} className={`text-[0.7rem] font-bold px-3 py-1 rounded-btn border ${t === '2–6 Minutes' ? 'bg-primary/15 text-primary-dark border-primary/30 font-extrabold' : 'bg-primary/10 text-primary-dark border-primary/20'}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center py-2 md:py-0 text-sm font-semibold text-text-muted uppercase tracking-wider">or</div>

          <div className="flex-1 bg-bg-white rounded-card p-8 shadow-card border border-accent-gold/20">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-black tracking-[0.08em] text-accent-gold mb-2.5">TEST</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              The AI generates targeted questions based on your Flashcard — testing recall, application, and real depth.
              Instant feedback on every answer, not just right or wrong.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Understanding','Application','Recall','Instant Feedback'].map(t => (
                <span key={t} className="text-[0.7rem] font-bold px-3 py-1 rounded-btn border bg-accent-gold/10 text-amber-800 border-accent-gold/20">{t}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
