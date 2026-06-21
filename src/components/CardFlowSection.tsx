// CardFlowSection — explains the Card as the core learning unit
// Flow: Enter Subject → Generate Card → Learn First → Talk or Test

const FLOW_STEPS = [
  {
    num: '01',
    icon: '✏️',
    title: 'Enter a Subject',
    desc: 'Type any topic — maths, science, history, a language, a skill, anything.',
  },
  {
    num: '02',
    icon: '⚡',
    title: 'Generate a Card',
    desc: 'The app instantly builds a structured learning card: explanation, key points, examples, and a summary.',
  },
  {
    num: '03',
    icon: '👁️',
    title: 'Read & Learn First',
    desc: 'Read the card. Absorb the concept. Understand the structure before you speak or test.',
  },
  {
    num: '04',
    icon: '🔀',
    title: 'Choose: Talk or Test',
    desc: 'Prove your understanding by talking it out loud — or challenge yourself with AI-generated questions.',
  },
]

function CardPreview() {
  return (
    <div className="card-preview">
      {/* Card header */}
      <div className="card-preview-header">
        <div className="card-preview-subject-badge">Science · Year 9</div>
        <h3 className="card-preview-title">Photosynthesis</h3>
        <p className="card-preview-tagline">How plants convert light into energy</p>
      </div>

      {/* Card body */}
      <div className="card-preview-body">
        <div className="card-section">
          <div className="card-section-label">📖 Explanation</div>
          <p className="card-section-text">
            Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide
            to produce glucose and oxygen. It takes place in the chloroplasts of plant cells.
          </p>
        </div>

        <div className="card-section">
          <div className="card-section-label">🔑 Key Points</div>
          <ul className="card-key-points">
            <li>Requires sunlight, water (H₂O), and CO₂</li>
            <li>Produces glucose (energy) and oxygen</li>
            <li>Occurs in chloroplasts — contains chlorophyll</li>
            <li>Formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</li>
          </ul>
        </div>

        <div className="card-section card-section--row">
          <div className="card-section-half">
            <div className="card-section-label">💡 Example</div>
            <p className="card-section-text">A leaf absorbs sunlight through its surface and pulls water up from roots — converting both into sugar it uses to grow.</p>
          </div>
          <div className="card-section-half">
            <div className="card-section-label">🏗️ Structure</div>
            <p className="card-section-text">Light reactions → Calvin cycle → Glucose output. Two-stage process inside the chloroplast.</p>
          </div>
        </div>

        <div className="card-section card-section--summary">
          <div className="card-section-label">✅ Summary</div>
          <p className="card-section-text">
            Plants are solar-powered sugar factories. Light + water + CO₂ → glucose + oxygen. The equation balances perfectly — and so does nature.
          </p>
        </div>
      </div>

      {/* Card actions */}
      <div className="card-preview-actions">
        <button className="card-action-talk">
          <span className="card-action-icon">🎙</span>
          <div className="card-action-text">
            <span className="card-action-title">TALK</span>
            <span className="card-action-sub">2–6 min · 5 AI scores</span>
          </div>
        </button>
        <button className="card-action-test">
          <span className="card-action-icon">🧠</span>
          <div className="card-action-text">
            <span className="card-action-title">TEST</span>
            <span className="card-action-sub">Questions · instant results</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function CardFlowSection() {
  return (
    <section className="cardflow-section section">
      <div className="container">

        {/* Header */}
        <div className="cardflow-header">
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title">The Card — Your Learning Unit</h2>
          <p className="section-subtitle">
            Every subject becomes a structured Card. Read it, understand it, then prove it — by talking or testing.
          </p>
        </div>

        {/* Flow steps */}
        <div className="cardflow-steps">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="cardflow-step">
              <div className="cardflow-step-num">{step.num}</div>
              {i < FLOW_STEPS.length - 1 && <div className="cardflow-connector" />}
              <div className="cardflow-step-icon">{step.icon}</div>
              <h3 className="cardflow-step-title">{step.title}</h3>
              <p className="cardflow-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Premium card preview */}
        <div className="cardflow-preview-wrap">
          <div className="cardflow-preview-label">A real Card — generated in seconds</div>
          <CardPreview />
        </div>

        {/* TALK / TEST explanation row */}
        <div className="cardflow-modes">
          <div className="cardflow-mode cardflow-mode--talk">
            <div className="cardflow-mode-icon">🎙</div>
            <h3 className="cardflow-mode-title">TALK</h3>
            <p className="cardflow-mode-desc">
              Explain the card out loud for 2 to 6 minutes. The AI listens and scores you across five skills:
              Accuracy, Depth, Clarity, Structure, and Confidence — then gives your Verbal Mastery Score.
            </p>
            <div className="cardflow-mode-tags">
              {['Accuracy', 'Depth', 'Clarity', 'Structure', 'Confidence'].map(t => (
                <span key={t} className="cardflow-tag cardflow-tag--blue">{t}</span>
              ))}
            </div>
          </div>

          <div className="cardflow-mode-divider">
            <span>or</span>
          </div>

          <div className="cardflow-mode cardflow-mode--test">
            <div className="cardflow-mode-icon">🧠</div>
            <h3 className="cardflow-mode-title">TEST</h3>
            <p className="cardflow-mode-desc">
              The app generates targeted questions based on your card. Answer them to prove real understanding —
              not just recall, but application and depth. Instant AI feedback on every answer.
            </p>
            <div className="cardflow-mode-tags">
              {['Understanding', 'Application', 'Recall', 'Instant Feedback'].map(t => (
                <span key={t} className="cardflow-tag cardflow-tag--gold">{t}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
