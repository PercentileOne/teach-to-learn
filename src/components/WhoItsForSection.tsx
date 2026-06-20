const cards = [
  { emoji: '🎓', title: 'Students', desc: 'Master any topic by explaining it out loud.' },
  { emoji: '👨‍👩‍👧', title: 'Parents', desc: 'Help your child build confidence — privately, safely, at home.' },
  { emoji: '👩‍🏫', title: 'Teachers', desc: 'Give students a powerful new way to learn and express themselves.' },
  { emoji: '🎙️', title: 'Creators', desc: 'Practice scripts, hooks, and storytelling — before you hit record.' },
  { emoji: '💼', title: 'Professionals', desc: 'Speak with clarity and confidence in meetings, pitches, and interviews.' },
  { emoji: '🏋️', title: 'Coaches & Trainers', desc: 'Give clients structured, measurable feedback on their speaking.' },
]

export default function WhoItsForSection() {
  return (
    <section className="who-section section">
      <div className="container">
        <h2 className="section-title">Who It's For</h2>
        <p className="section-subtitle">
          Everyone learns better by speaking. Teach to Learn makes it effortless.
        </p>

        <div className="who-grid">
          {cards.map((c) => (
            <div key={c.title} className="who-card">
              <div className="who-card-emoji">{c.emoji}</div>
              <div className="who-card-title">{c.title}</div>
              <p className="who-card-desc">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="who-bottom">
          If you speak, you can learn. If you learn, you can grow.
        </p>
      </div>
    </section>
  )
}
