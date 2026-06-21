// CardFlowSection — Flashcard as the core learning unit

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
    title: 'Generate a Flashcard',
    desc: 'The AI instantly builds a comprehensive Flashcard covering all relevant subject matter.',
  },
  {
    num: '03',
    icon: '👁️',
    title: 'Learn First',
    desc: 'Read the Flashcard. Absorb the concept, the structure, and the depth before you speak or test.',
  },
  {
    num: '04',
    icon: '🔀',
    title: 'Choose: Talk or Test',
    desc: 'Prove your understanding — explain it out loud for up to 6 minutes, or answer AI-generated questions.',
  },
]

function FlashCard() {
  return (
    <div className="flashcard">

      {/* AI header bar */}
      <div className="flashcard-ai-bar">
        <span className="flashcard-ai-dot" />
        <span className="flashcard-ai-label">AI-Generated Flashcard</span>
        <span className="flashcard-ai-time">Generated in 1.2s</span>
      </div>

      {/* Card header */}
      <div className="flashcard-header">
        <div className="flashcard-subject-badge">Science · Year 9</div>
        <h3 className="flashcard-title">Photosynthesis</h3>
        <p className="flashcard-tagline">How plants convert light into energy</p>
      </div>

      {/* Card body — all subject matter */}
      <div className="flashcard-body">

        <div className="flashcard-section">
          <div className="flashcard-section-label">📖 Explanation</div>
          <p className="flashcard-section-text">
            Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide
            to produce glucose and oxygen — taking place in the chloroplasts of plant cells.
          </p>
        </div>

        <div className="flashcard-section">
          <div className="flashcard-section-label">🔑 Key Points</div>
          <ul className="flashcard-key-points">
            <li>Requires sunlight, water (H₂O), and CO₂</li>
            <li>Produces glucose (energy) and oxygen</li>
            <li>Occurs in chloroplasts — contains chlorophyll</li>
            <li>Formula: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</li>
          </ul>
        </div>

        <div className="flashcard-section flashcard-section--row">
          <div className="flashcard-section-half">
            <div className="flashcard-section-label">💡 Example</div>
            <p className="flashcard-section-text">A leaf absorbs sunlight through its surface and pulls water up from roots — converting both into sugar it uses to grow.</p>
          </div>
          <div className="flashcard-section-half">
            <div className="flashcard-section-label">🏗️ Structure</div>
            <p className="flashcard-section-text">Two stages: light-dependent reactions (thylakoid) → Calvin cycle (stroma) → glucose output.</p>
          </div>
        </div>

        <div className="flashcard-section flashcard-section--row">
          <div className="flashcard-section-half">
            <div className="flashcard-section-label">⚠️ Misconceptions</div>
            <ul className="flashcard-key-points">
              <li>Plants do not only absorb CO₂ — they also respire</li>
              <li>Photosynthesis stops at night — it needs light</li>
            </ul>
          </div>
          <div className="flashcard-section-half">
            <div className="flashcard-section-label">🔬 Breakdown</div>
            <ul className="flashcard-key-points">
              <li>Chlorophyll absorbs red + blue light</li>
              <li>Water is split to release electrons</li>
              <li>CO₂ is fixed into 3-carbon sugars</li>
            </ul>
          </div>
        </div>

        <div className="flashcard-section flashcard-section--summary">
          <div className="flashcard-section-label">✅ Summary</div>
          <p className="flashcard-section-text">
            Plants are solar-powered sugar factories. Light + water + CO₂ → glucose + oxygen.
            The equation balances perfectly — and so does nature.
          </p>
        </div>

      </div>

      {/* Action buttons */}
      <div className="flashcard-actions">
        <button className="flashcard-action-talk">
          <span className="flashcard-action-icon">🎙</span>
          <div className="flashcard-action-text">
            <span className="flashcard-action-title">TALK</span>
            <span className="flashcard-action-sub">2–6 min · 5 AI scores</span>
          </div>
        </button>
        <button className="flashcard-action-test">
          <span className="flashcard-action-icon">🧠</span>
          <div className="flashcard-action-text">
            <span className="flashcard-action-title">TEST</span>
            <span className="flashcard-action-sub">Questions · instant results</span>
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
          <h2 className="section-title">The Flashcard — Your Learning Unit</h2>
          <p className="section-subtitle">
            Enter any subject and the AI generates a comprehensive Flashcard — covering everything you need to know, instantly.
            Then prove you know it: Talk or Test.
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

        {/* Premium flashcard */}
        <div className="cardflow-preview-wrap">
          <div className="cardflow-preview-label">A real Flashcard — generated in seconds</div>
          <FlashCard />
        </div>

        {/* TALK / TEST mode explanation */}
        <div className="cardflow-modes">

          <div className="cardflow-mode cardflow-mode--talk">
            <div className="cardflow-mode-icon">🎙</div>
            <h3 className="cardflow-mode-title">TALK</h3>
            <p className="cardflow-mode-desc">
              Explain the Flashcard out loud — choose your own duration from <strong>2 to 6 minutes</strong>.
              The AI listens and scores you across five skills, then delivers your Verbal Mastery Score.
            </p>
            <div className="cardflow-mode-tags">
              {['2–6 Minutes', 'Accuracy', 'Depth', 'Clarity', 'Structure', 'Confidence'].map(t => (
                <span key={t} className={`cardflow-tag ${t === '2–6 Minutes' ? 'cardflow-tag--time' : 'cardflow-tag--blue'}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="cardflow-mode-divider"><span>or</span></div>

          <div className="cardflow-mode cardflow-mode--test">
            <div className="cardflow-mode-icon">🧠</div>
            <h3 className="cardflow-mode-title">TEST</h3>
            <p className="cardflow-mode-desc">
              The AI generates targeted questions based on your Flashcard — testing recall, application, and real depth.
              Instant feedback on every answer, not just right or wrong.
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
