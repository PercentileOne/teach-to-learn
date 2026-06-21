const FLOW_STEPS = [
  { num: '01', title: 'Enter a Subject',      desc: 'Type any topic — maths, science, history, a language, a skill, anything.' },
  { num: '02', title: 'Generate a Flashcard', desc: 'The AI instantly builds a comprehensive Flashcard covering all relevant subject matter.' },
  { num: '03', title: 'Learn First',          desc: 'Read the Flashcard. Absorb the concept, the structure, and the depth before you speak or test.' },
  { num: '04', title: 'Talk or Test',         desc: 'Prove your understanding — explain it out loud for up to 6 minutes, or answer AI-generated questions.' },
]

/* ─── Micro primitives ──────────────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase mb-2"
       style={{ color: '#1E4DD8' }}>
      {children}
    </p>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.65]" style={{ color: '#4A5568' }}>
      {children}
    </p>
  )
}

function Dot() {
  return <span className="mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: '#1E4DD8', opacity: 0.5 }} />
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.65]" style={{ color: '#4A5568' }}>
          <Dot />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Rule() {
  return <div style={{ borderTop: '1px solid #E5E9F0', marginTop: '24px', paddingTop: '24px' }} />
}

/* ─── The Flashcard ─────────────────────────────────────────────────────── */

function FlashCard() {
  return (
    <div
      className="relative text-left max-w-2xl mx-auto overflow-hidden transition-all duration-300 group"
      style={{
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 100%)',
        boxShadow: '0 2px 8px rgba(10,15,28,0.06), 0 12px 40px rgba(10,15,28,0.10), 0 1px 0 rgba(255,255,255,0.9) inset',
      }}
    >
      {/* Hover elevation handled via inline style swap would need JS — use CSS group trick */}
      <style>{`.group:hover { box-shadow: 0 4px 16px rgba(10,15,28,0.08), 0 24px 56px rgba(10,15,28,0.14), 0 1px 0 rgba(255,255,255,0.9) inset; transform: translateY(-2px); }`}</style>

      {/* ── Top accent bar ──────────────────────────────── */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #1E4DD8 0%, #2A5BFF 50%, #60A5FA 100%)',
        borderRadius: '20px 20px 0 0',
      }} />

      {/* ── Header ──────────────────────────────────────── */}
      <div className="px-9 pt-7 pb-6" style={{ borderBottom: '1px solid #E5E9F0' }}>
        {/* AI badge row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
               style={{ background: '#F0F4FE', border: '1px solid #D4DCF7' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] ai-pulse" />
            <span className="text-[0.65rem] font-semibold tracking-[0.07em] uppercase" style={{ color: '#1E4DD8' }}>
              AI-Generated Flashcard
            </span>
          </div>
          <span className="text-[0.65rem] font-semibold" style={{ color: '#10B981' }}>Generated in 1.2s</span>
        </div>

        {/* Subject badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
             style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', border: '1px solid #C7D2FE' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1E4DD8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <span className="text-[0.68rem] font-semibold tracking-[0.06em] uppercase" style={{ color: '#1E4DD8' }}>
            Science · Year 9
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2" style={{
          fontSize: '1.85rem',
          fontWeight: 600,
          letterSpacing: '-0.3px',
          lineHeight: 1.15,
          color: '#0A0F1C',
        }}>
          Photosynthesis
        </h3>
        <Body>How plants convert light into energy</Body>
      </div>

      {/* ── Body sections ───────────────────────────────── */}
      <div className="px-9 py-7">

        {/* Explanation */}
        <div>
          <Label>Explanation</Label>
          <Body>
            Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and oxygen — taking place in the chloroplasts of plant cells.
          </Body>
        </div>

        <Rule />

        {/* Key Points */}
        <div>
          <Label>Key Points</Label>
          <BulletList items={[
            'Requires sunlight, water (H₂O), and CO₂',
            'Produces glucose (energy) and oxygen',
            'Occurs in chloroplasts — contains chlorophyll',
            'Formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
          ]} />
        </div>

        <Rule />

        {/* Example + Structure */}
        <div className="grid grid-cols-2 gap-7">
          <div>
            <Label>Example</Label>
            <Body>A leaf absorbs sunlight and pulls water from roots — converting both into sugar it uses to grow.</Body>
          </div>
          <div>
            <Label>Structure</Label>
            <Body>Two stages: light-dependent reactions (thylakoid) → Calvin cycle (stroma) → glucose output.</Body>
          </div>
        </div>

        <Rule />

        {/* Misconceptions + Breakdown */}
        <div className="grid grid-cols-2 gap-7">
          <div>
            <Label>Misconceptions</Label>
            <BulletList items={[
              'Plants do not only absorb CO₂ — they also respire',
              'Photosynthesis stops at night — it needs light',
            ]} />
          </div>
          <div>
            <Label>Breakdown</Label>
            <BulletList items={[
              'Chlorophyll absorbs red + blue light',
              'Water is split to release electrons',
              'CO₂ is fixed into 3-carbon sugars',
            ]} />
          </div>
        </div>

        <Rule />

        {/* Summary panel */}
        <div className="rounded-2xl px-6 py-5" style={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #EDF4FF 100%)',
          border: '1px solid #C7D2FE',
        }}>
          <Label>Summary</Label>
          <Body>
            Plants are solar-powered sugar factories. Light + water + CO₂ → glucose + oxygen. The equation balances perfectly — and so does nature.
          </Body>
        </div>

      </div>

      {/* ── Talk / Test footer ──────────────────────────── */}
      <div className="px-9 py-6 flex flex-col sm:flex-row gap-3" style={{
        borderTop: '1px solid #E5E9F0',
        background: 'linear-gradient(180deg, #FAFBFE 0%, #F7F9FC 100%)',
      }}>
        <button
          className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 text-white text-[0.9rem] font-semibold rounded-full transition-all duration-200 hover:-translate-y-[1px] hover:brightness-110"
          style={{
            background: 'linear-gradient(135deg, #1E4DD8 0%, #2A5BFF 100%)',
            boxShadow: '0 2px 8px rgba(30,77,216,0.35), 0 1px 0 rgba(255,255,255,0.12) inset',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
          Talk · 2–6 min
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 text-[0.9rem] font-semibold rounded-full transition-all duration-200 hover:-translate-y-[1px]"
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #D1D9F0',
            color: '#4A5568',
            boxShadow: '0 1px 4px rgba(10,15,28,0.06)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#1E4DD8'
            e.currentTarget.style.color = '#1E4DD8'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#D1D9F0'
            e.currentTarget.style.color = '#4A5568'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Test · Instant Results
        </button>
      </div>
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────────────────── */

export default function CardFlowSection() {
  return (
    /* Deep navy background — the contrast is what makes the card float */
    <section style={{ background: 'linear-gradient(180deg, #080C18 0%, #0D1220 100%)' }} className="py-16 md:py-24">
      <div className="max-w-[1160px] mx-auto px-5">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
               style={{ background: 'rgba(30,77,216,0.15)', border: '1px solid rgba(30,77,216,0.25)' }}>
            <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase" style={{ color: '#7AA4FF' }}>
              How It Works
            </span>
          </div>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-[-0.02em] mb-4 text-white">
            The Flashcard — Your Learning Unit
          </h2>
          <p className="text-[clamp(1rem,2vw,1.15rem)] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Enter any subject and the AI generates a comprehensive Flashcard instantly. Then prove you know it: Talk or Test.
          </p>
        </div>

        {/* Flow steps */}
        <div className="flex flex-col md:flex-row gap-0 mb-16">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="flex md:flex-col md:flex-1 md:items-center md:text-center items-start gap-5 md:gap-0 relative pb-9 md:pb-0 md:px-4">
              {i < FLOW_STEPS.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px md:hidden"
                     style={{ background: 'linear-gradient(180deg, rgba(30,77,216,0.4) 0%, transparent 100%)' }} />
              )}
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden md:block absolute h-px top-[18px]"
                     style={{
                       left: 'calc(50% + 20px)', right: 'calc(-50% + 20px)',
                       background: 'linear-gradient(90deg, rgba(30,77,216,0.4) 0%, transparent 100%)',
                     }} />
              )}
              {/* Step number dot */}
              <div className="w-9 h-9 min-w-[36px] rounded-full flex items-center justify-center text-[0.7rem] font-black md:mx-auto md:mb-4"
                   style={{
                     background: 'rgba(30,77,216,0.15)',
                     border: '1px solid rgba(30,77,216,0.3)',
                     color: '#7AA4FF',
                   }}>
                {step.num}
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold mb-1.5 md:mt-0 text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The Flashcard — glows against the dark bg */}
        <div className="mb-16">
          <p className="text-center text-[0.7rem] font-semibold tracking-[0.1em] uppercase mb-7"
             style={{ color: 'rgba(255,255,255,0.3)' }}>
            A real Flashcard — generated in seconds
          </p>
          {/* Ambient glow behind card */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] pointer-events-none"
                 style={{ boxShadow: '0 0 80px rgba(30,77,216,0.18)', filter: 'blur(24px)' }} />
            <FlashCard />
          </div>
        </div>

        {/* TALK / TEST explainer cards — also dark */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch">
          {/* TALK */}
          <div className="flex-1 rounded-[16px] p-7"
               style={{
                 background: 'rgba(30,77,216,0.08)',
                 border: '1px solid rgba(30,77,216,0.2)',
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                   style={{ background: 'rgba(30,77,216,0.2)', border: '1px solid rgba(30,77,216,0.3)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7AA4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                </svg>
              </div>
              <span className="text-base font-extrabold tracking-[0.06em] text-white">TALK</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Explain the Flashcard out loud — choose your own duration from <strong className="text-white font-semibold">2 to 6 minutes</strong>.
              The AI listens and scores you across five skills, then delivers your Verbal Mastery Score.
            </p>
            <div className="flex flex-wrap gap-2">
              {['2–6 Minutes', 'Accuracy', 'Depth', 'Clarity', 'Structure', 'Confidence'].map(t => (
                <span key={t} className="text-[0.68rem] font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: t === '2–6 Minutes' ? 'rgba(30,77,216,0.3)' : 'rgba(255,255,255,0.06)',
                        border: t === '2–6 Minutes' ? '1px solid rgba(30,77,216,0.5)' : '1px solid rgba(255,255,255,0.1)',
                        color: t === '2–6 Minutes' ? '#93B4FF' : 'rgba(255,255,255,0.55)',
                      }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center py-2 md:py-0 text-xs font-semibold tracking-[0.1em] uppercase"
               style={{ color: 'rgba(255,255,255,0.25)' }}>or</div>

          {/* TEST */}
          <div className="flex-1 rounded-[16px] p-7"
               style={{
                 background: 'rgba(245,158,11,0.06)',
                 border: '1px solid rgba(245,158,11,0.18)',
               }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                   style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <span className="text-base font-extrabold tracking-[0.06em] text-white">TEST</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              The AI generates targeted questions based on your Flashcard — testing recall, application, and real depth.
              Instant feedback on every answer, not just right or wrong.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Understanding', 'Application', 'Recall', 'Instant Feedback'].map(t => (
                <span key={t} className="text-[0.68rem] font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.2)',
                        color: '#D97706',
                      }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
