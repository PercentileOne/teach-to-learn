import { useTranslation } from 'react-i18next'

const ACCENTS = ['#60A5FA', '#A78BFA', '#34D399', '#FDE68A', '#F9A8D4', '#6EE7B7']
const FEATURED_ACCENT = '#FCA5A5'

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
  const { t } = useTranslation()

  const regular = [
    { quoteKey: 'testimonials.t1Quote', nameKey: 'testimonials.t1Name', roleKey: 'testimonials.t1Role', accent: ACCENTS[0] },
    { quoteKey: 'testimonials.t2Quote', nameKey: 'testimonials.t2Name', roleKey: 'testimonials.t2Role', accent: ACCENTS[1] },
    { quoteKey: 'testimonials.t3Quote', nameKey: 'testimonials.t3Name', roleKey: 'testimonials.t3Role', accent: ACCENTS[2] },
    { quoteKey: 'testimonials.t4Quote', nameKey: 'testimonials.t4Name', roleKey: 'testimonials.t4Role', accent: ACCENTS[3] },
    { quoteKey: 'testimonials.t5Quote', nameKey: 'testimonials.t5Name', roleKey: 'testimonials.t5Role', accent: ACCENTS[4] },
    { quoteKey: 'testimonials.t6Quote', nameKey: 'testimonials.t6Name', roleKey: 'testimonials.t6Role', accent: ACCENTS[5] },
  ]

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
              {t('testimonials.badge')}
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem,4.5vw,2.85rem)',
            fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.07,
            color: '#0A0F1C', margin: '0 0 14px',
          }}>
            {t('testimonials.title')}
          </h2>

          <p style={{ fontSize: 'clamp(1rem,2vw,1.1rem)', color: '#6B7280', lineHeight: 1.65, maxWidth: 460, margin: '0 auto' }}>
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* 3-column grid of regular cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {regular.map((item) => {
            const name = t(item.nameKey)
            return (
              <div
                key={item.quoteKey}
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
                <QuoteIcon color={item.accent} />
                <p style={{ fontSize: 15, color: '#1A2332', lineHeight: 1.72, margin: 0, flex: 1, fontWeight: 400 }}>
                  "{t(item.quoteKey)}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8, borderTop: '1px solid #F0F2F7' }}>
                  <InitialBubble name={name} color={item.accent} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#0A0F1C' }}>{name}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{t(item.roleKey)}</div>
                  </div>
                </div>
              </div>
            )
          })}
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
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(ellipse at right,rgba(252,165,165,.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <QuoteIcon color={FEATURED_ACCENT} />

          <p style={{ fontSize: 'clamp(1.05rem,2vw,1.22rem)', color: 'rgba(255,255,255,0.92)', lineHeight: 1.80, margin: 0, fontWeight: 400, maxWidth: 800 }}>
            "{t('testimonials.t7Quote')}"
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${FEATURED_ACCENT}25`, border: `1px solid ${FEATURED_ACCENT}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: FEATURED_ACCENT }}>
              {t('testimonials.t7Name').charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#FFF' }}>{t('testimonials.t7Name')}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{t('testimonials.t7Role')}</div>
            </div>
          </div>
        </div>

        {/* Closing tagline */}
        <div style={{ textAlign: 'center', paddingTop: 52, borderTop: '1px solid #E8EDF5', marginTop: 52 }}>
          <p style={{ fontSize: 15, fontStyle: 'italic', color: '#9CA3AF' }}>
            {t('testimonials.tagline')}
          </p>
        </div>

      </div>
    </section>
  )
}
