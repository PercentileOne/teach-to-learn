const TESTIMONIALS = [
  {
    quote: 'TalkToLearn changed everything for me. My understanding of Azure Cloud Services improved dramatically — I can talk about it confidently for an hour now. Speaking it out loud made the concepts finally click.',
    name: 'Marcus T.',
    role: 'Cloud Engineer',
    accent: '#60A5FA',
  },
  {
    quote: 'I passed my interview thanks to TalkToLearn. Practising under pressure made the real thing feel easy. I didn\'t just memorise answers — I understood what I was talking about.',
    name: 'Priya S.',
    role: 'Software Developer',
    accent: '#A78BFA',
  },
  {
    quote: 'I used TalkToLearn to revise for my exams. Explaining topics out loud helped me remember them so much better. It\'s like the knowledge finally stuck.',
    name: 'Jordan K.',
    role: 'University Student',
    accent: '#34D399',
  },
  {
    quote: 'I rehearsed my presentation with TalkToLearn and it was a game-changer. Speaking under pressure helped me organise my thoughts and deliver with confidence.',
    name: 'Rachel M.',
    role: 'Marketing Director',
    accent: '#FDE68A',
  },
  {
    quote: 'I\'ve tried videos, books, and courses. Nothing helped me understand as quickly as talking out loud. TalkToLearn made me realise I learn best with my voice.',
    name: 'Daniel O.',
    role: 'Self-directed Learner',
    accent: '#F9A8D4',
  },
  {
    quote: 'Explaining my ideas out loud helped me refine them. TalkToLearn is now part of my creative process — it forces clarity.',
    name: 'Amara J.',
    role: 'Content Creator',
    accent: '#6EE7B7',
  },
  {
    quote: 'TalkToLearn has been incredible for my child. Their confidence has grown so much — they\'re speaking more clearly, explaining their ideas, and actually enjoying learning. Hearing them talk through topics out loud has been amazing. It\'s like their voice finally unlocked their understanding.',
    name: 'Sarah B.',
    role: 'Parent',
    accent: '#FCA5A5',
    featured: true,
  },
]

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="18" viewBox="0 0 32 24" fill="none" style={{ opacity: 0.35 }}>
      <path d="M0 24V13.5C0 6 4.5 1.5 13.5 0l1.5 3C9.5 4.5 7 7 7 10.5V12h6V24H0zm18 0V13.5C18 6 22.5 1.5 31.5 0L33 3C27.5 4.5 25 7 25 10.5V12h6V24H18z" fill={color}/>
    </svg>
  )
}

function InitialBubble({ name, color }: { name: string; color: string }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: `${color}20`, border: `1px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 800, color, flexShrink: 0,
    }}>
      {name.charAt(0)}
    </div>
  )
}

export default function TestimonialsSection() {
  const regular = TESTIMONIALS.filter(t => !t.featured)
  const featured = TESTIMONIALS.find(t => t.featured)!

  return (
    <section style={{ background: '#F8FAFC', padding: '108px 20px 120px' }}>
      <div className="max-w-[1120px] mx-auto">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '4px 14px', borderRadius: 20, marginBottom: 20,
            border: '1px solid rgba(30,77,216,.18)', background: 'rgba(30,77,216,.06)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1E4DD8', display: 'inline-block' }} />
            <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#1E4DD8' }}>
              What People Are Saying
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
            fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
            color: '#0A0F1C', margin: '0 0 14px',
          }}>
            Real results from real learners.
          </h2>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.1rem)', color: '#6B7280', lineHeight: 1.65, maxWidth: 460, margin: '0 auto' }}>
            Real stories from people who learned faster by talking out loud.
          </p>
        </div>

        {/* 3-column grid of regular cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {regular.map((t) => (
            <div
              key={t.name}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8EDF5',
                borderRadius: 20,
                padding: '28px 28px 24px',
                boxShadow: '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)',
                display: 'flex', flexDirection: 'column', gap: 16,
                transition: 'transform .22s ease, box-shadow .22s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,.06), 0 18px 44px rgba(0,0,0,.10)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 6px rgba(0,0,0,.03), 0 8px 24px rgba(0,0,0,.06)'
              }}
            >
              <QuoteIcon color={t.accent} />
              <p style={{ fontSize: 15, color: '#1A2332', lineHeight: 1.72, margin: 0, flex: 1, fontWeight: 400 }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8, borderTop: '1px solid #F0F2F7' }}>
                <InitialBubble name={t.name} color={t.accent} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0A0F1C' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured parent testimonial — full width */}
        <div style={{
          background: 'linear-gradient(135deg,#0E2040 0%,#1A3A6E 60%,#0E2A58 100%)',
          borderRadius: 24,
          padding: '40px 44px',
          boxShadow: '0 8px 32px rgba(14,32,64,.22), 0 32px 72px rgba(14,32,64,.28)',
          border: '1px solid rgba(96,165,250,.15)',
          display: 'flex', flexDirection: 'column', gap: 20,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle glow */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(ellipse at right,rgba(252,165,165,.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <QuoteIcon color={featured.accent} />

          <p style={{ fontSize: 'clamp(1.05rem,2vw,1.22rem)', color: 'rgba(255,255,255,0.92)', lineHeight: 1.80, margin: 0, fontWeight: 400, maxWidth: 800 }}>
            "{featured.quote}"
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${featured.accent}25`, border: `1px solid ${featured.accent}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: featured.accent }}>
              {featured.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#FFF' }}>{featured.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{featured.role}</div>
            </div>
          </div>
        </div>

        {/* Closing tagline */}
        <div style={{ textAlign: 'center', paddingTop: 52, borderTop: '1px solid #E8EDF5', marginTop: 52 }}>
          <p style={{ fontSize: 15, fontStyle: 'italic', color: '#9CA3AF' }}>
            Speak It. To Understand It.
          </p>
        </div>

      </div>
    </section>
  )
}
