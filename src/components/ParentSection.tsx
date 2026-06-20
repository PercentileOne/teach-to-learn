const promises = [
  {
    icon: '🛡️',
    title: 'Build Confidence',
    desc: 'Your child practices privately — no pressure, no audience, no judgement.',
  },
  {
    icon: '📈',
    title: 'Improve Speaking Skills',
    desc: 'Clarity, structure, expression, and confidence improve naturally.',
  },
  {
    icon: '🏫',
    title: 'Prepare for School Success',
    desc: 'Presentations, reading aloud, oral exams — all become easier.',
  },
]

export default function ParentSection() {
  return (
    <section className="parent-section section">
      <div className="container">
        <div className="parent-inner">
          <h2 className="section-title">
            For Every Parent Who Worries About Their Child's Confidence
          </h2>
          <p className="section-subtitle">
            Help your child find their voice — privately, safely, and at their own pace.
          </p>

          <div className="parent-story">
            <p>
              My son used to freeze when speaking. He'd whisper. He'd avoid eye contact. He'd panic
              before presentations. We tried Teach to Learn for 10 minutes a day… and last week he
              stood in front of 400 students and delivered the best talk of his life. I cried. This
              app changed everything.
            </p>
          </div>

          <div className="parent-promises">
            {promises.map((p) => (
              <div key={p.title} className="parent-promise">
                <div className="parent-promise-icon">{p.icon}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="parent-ctas">
            <button className="btn-primary">Try the 2-Minute Challenge with Your Child</button>
            <p className="parent-micro">Every child deserves to feel confident when they speak.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
