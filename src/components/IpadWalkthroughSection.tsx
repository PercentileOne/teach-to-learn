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
      <div style={{ textAlign: 'center', maxWidth: '560px' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '9px', fontWeight: 800, letterSpacing: '.18em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.4)',
          border: '1px solid rgba(255,255,255,.14)',
          borderRadius: '20px', padding: '5px 14px', marginBottom: '18px',
        }}>
          Full Product Walkthrough
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem,5vw,2.8rem)',
          fontWeight: 900, color: '#FFFFFF',
          letterSpacing: '-.03em', lineHeight: 1.08,
          margin: '0 0 14px',
        }}>
          From subject to mastery<br/>in one session.
        </h2>
        <p style={{
          fontSize: '15px', color: 'rgba(255,255,255,.52)',
          lineHeight: 1.65, margin: 0,
        }}>
          Watch the complete learning flow — enter a subject, generate a flashcard,
          read and learn, then choose to Talk or Test your understanding.
        </p>
      </div>

      {/* iPad demo */}
      <IpadWalkthrough />
    </section>
  )
}
