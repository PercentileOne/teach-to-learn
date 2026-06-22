const CERTS = [
  { emoji: '🟠', name: 'AWS Solutions Architect', issuer: 'Amazon', level: 'Associate', levelColour: '#1E4DD8' },
  { emoji: '🔵', name: 'Microsoft AZ-900', issuer: 'Microsoft', level: 'Foundation', levelColour: '#2D9E6A' },
  { emoji: '🔴', name: 'CompTIA Security+', issuer: 'CompTIA', level: 'Foundation', levelColour: '#2D9E6A' },
  { emoji: '🟢', name: 'GCSE Mathematics', issuer: 'AQA/Edexcel', level: 'GCSE', levelColour: '#0891B2' },
  { emoji: '🟢', name: 'A-Level Computer Science', issuer: 'OCR', level: 'A-Level', levelColour: '#DB2777' },
  { emoji: '🔵', name: 'CFA Level 1', issuer: 'CFA Institute', level: 'Professional', levelColour: '#7C3AED' },
  { emoji: '🟤', name: 'PMP Project Management', issuer: 'PMI', level: 'Professional', levelColour: '#7C3AED' },
  { emoji: '🟣', name: 'MSc Machine Learning', issuer: 'University', level: 'Masters', levelColour: '#DC2626' },
]

const DEPTH_LAYERS = [
  {
    num: '01',
    label: 'Overview Card',
    colour: '#2D9E6A',
    desc: 'Instant orientation — exam domains with official weightings, pass mark, cost, study time, and key topic chips. Scannable in 60 seconds.',
  },
  {
    num: '02',
    label: 'Deep Dive',
    colour: '#1E4DD8',
    desc: 'Tap any concept to expand — full textbook-level explanation, a real-world example, a sticky memory hook, and the exact exam trap to avoid.',
  },
  {
    num: '03',
    label: 'Test Yourself',
    colour: '#7C3AED',
    desc: 'Exam-style spoken questions and multiple choice — calibrated to the exact format of the real exam. Share your score. Earn points. Beat the leaderboard.',
  },
]

export default function CertificationSection() {
  return (
    <section style={{ background: '#080E1C', padding: '108px 20px 120px', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,77,216,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-[1120px] mx-auto" style={{ position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 16px', borderRadius: '20px', marginBottom: '22px',
            border: '1px solid rgba(30,77,216,.35)', background: 'rgba(30,77,216,.12)',
          }}>
            <span style={{ fontSize: '14px' }}>🏅</span>
            <span style={{ fontSize: '0.67rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#60A5FA' }}>
              Certification Prep
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem,5vw,3.2rem)',
            fontWeight: 900, letterSpacing: '-.035em', lineHeight: 1.05,
            color: '#FFFFFF', margin: '0 0 18px',
          }}>
            Never buy another<br />
            <span style={{ color: '#60A5FA' }}>certification book again.</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1rem,2vw,1.18rem)', color: 'rgba(255,255,255,0.60)',
            lineHeight: 1.65, maxWidth: '560px', margin: '0 auto 10px',
          }}>
            Type any certification, qualification, or exam. We generate a complete study card
            — domains, deep explanations, real examples, memory hooks, and exam-style questions.
          </p>
          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.35)',
            fontStyle: 'italic', margin: 0,
          }}>
            AWS · GCSE · A-Level · CFA · CompTIA · PMP · CISSP · MBA · 200+ more
          </p>
        </div>

        {/* Cert tiles scroll */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px',
          justifyContent: 'center', marginBottom: '72px',
        }}>
          {CERTS.map((c) => (
            <div key={c.name} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '12px', padding: '10px 16px',
            }}>
              <span style={{ fontSize: '18px' }}>{c.emoji}</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{c.issuer}</div>
              </div>
              <div style={{
                fontSize: '9px', fontWeight: 800, letterSpacing: '0.3px',
                color: c.levelColour, border: `1px solid ${c.levelColour}55`,
                background: `${c.levelColour}18`,
                borderRadius: '20px', padding: '2px 8px', marginLeft: '4px',
              }}>
                {c.level}
              </div>
            </div>
          ))}
        </div>

        {/* 3-layer depth feature */}
        <div style={{ marginBottom: '72px' }}>
          <p style={{
            textAlign: 'center', fontSize: '0.67rem', fontWeight: 800,
            letterSpacing: '.15em', textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.28)', marginBottom: '32px',
          }}>
            Three Layers of Learning Depth
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {DEPTH_LAYERS.map((layer) => (
              <div key={layer.num} style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${layer.colour}25`,
                borderRadius: '20px', padding: '28px',
                borderTop: `3px solid ${layer.colour}`,
              }}>
                <div style={{
                  fontSize: '11px', fontWeight: 900, letterSpacing: '.15em',
                  color: layer.colour, marginBottom: '14px',
                }}>
                  LAYER {layer.num}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px' }}>
                  {layer.label}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LinkedIn social proof angle */}
        <div style={{
          background: 'rgba(30,77,216,0.12)', border: '1px solid rgba(30,77,216,0.28)',
          borderRadius: '20px', padding: '40px 44px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px',
        }}>
          <div style={{ fontSize: '36px' }}>🏆</div>
          <h3 style={{
            fontSize: 'clamp(1.2rem,3vw,1.7rem)',
            fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.2,
          }}>
            "I scored 94% on AWS Solutions Architect.<br />
            <span style={{ color: '#60A5FA' }}>Can you beat me? 👉 talktolearn.app"</span>
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: 0, maxWidth: '480px', lineHeight: 1.6 }}>
            Every score is shareable to LinkedIn, WhatsApp, and X. The social pressure of a public score
            is the most powerful study motivation ever invented.
          </p>
          <button style={{
            marginTop: '8px', padding: '14px 32px', borderRadius: '50px',
            background: '#1E4DD8', color: '#FFFFFF', fontWeight: 800, fontSize: '15px',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(30,77,216,0.45)',
          }}>
            Start Certification Prep — Free
          </button>
        </div>

      </div>
    </section>
  )
}
