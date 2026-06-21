import IpadWalkthrough from './IpadWalkthrough'

export default function IpadWalkthroughSection() {
  return (
    <section style={{
      background: 'linear-gradient(160deg,#0C1829 0%,#0E2040 40%,#091828 100%)',
      padding: '80px 20px 100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '56px',
    }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', maxWidth: '580px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '9px', fontWeight: 800, letterSpacing: '.18em',
          textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.45)',
          border: '1px solid rgba(255,255,255,.14)',
          borderRadius: '20px', padding: '5px 16px', marginBottom: '20px',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 6px #60A5FA', display: 'inline-block' }} />
          See It In Action
        </div>

        <h2 style={{
          fontSize: 'clamp(1.9rem,5vw,3rem)',
          fontWeight: 900, color: '#FFFFFF',
          letterSpacing: '-.035em', lineHeight: 1.06,
          margin: '0 0 18px',
        }}>
          One subject. One session.{' '}
          <span style={{ background: 'linear-gradient(90deg,#60A5FA,#818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Total mastery.
          </span>
        </h2>

        <p style={{
          fontSize: '15px', color: 'rgba(255,255,255,.50)',
          lineHeight: 1.7, margin: 0, maxWidth: '460px', marginInline: 'auto',
        }}>
          Watch the AI build your flashcard, guide your reading, then test what you know — in real time.
        </p>
      </div>

      {/* iPad — responsive scale on smaller screens */}
      <div className="scale-[0.75] sm:scale-90 md:scale-100 origin-top" style={{ lineHeight: 0 }}>
        <IpadWalkthrough />
      </div>
    </section>
  )
}
