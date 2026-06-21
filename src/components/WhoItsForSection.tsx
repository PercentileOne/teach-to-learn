const cards = [
  { emoji: '🎓', title: 'Students',           desc: 'Master any topic by explaining it out loud. Perfect for revision, presentations, and real understanding.' },
  { emoji: '👨‍👩‍👧', title: 'Parents',            desc: 'Help your child build confidence — privately, safely, at home.' },
  { emoji: '👩‍🏫', title: 'Teachers',           desc: 'Give students a powerful new way to learn and express themselves.' },
  { emoji: '🎙️', title: 'Creators',           desc: 'Practice scripts, hooks, and storytelling — before you hit record.' },
  { emoji: '💼', title: 'Professionals',       desc: 'Speak with clarity and confidence in meetings, pitches, and interviews.' },
  { emoji: '🏋️', title: 'Coaches & Trainers', desc: 'Give clients structured, measurable feedback on their speaking.' },
]
export default function WhoItsForSection() {
  return (
    <section className="bg-bg-alt py-12 md:py-20 text-center">
      <div className="max-w-[1160px] mx-auto px-5">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">Who It's For</h2>
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-2xl mx-auto">
          Everyone learns better by speaking. Talk to Learn is the behaviour — Learn by Talking is the platform built on the Teach to Learn principle.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {cards.map(c => (
            <div key={c.title} className="bg-bg-white rounded-card p-6 shadow-card border border-primary/[0.08] text-left hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(14,165,233,0.14)] hover:border-primary/20 transition-all">
              <div className="text-3xl mb-3">{c.emoji}</div>
              <div className="text-base font-bold text-text-dark mb-2">{c.title}</div>
              <p className="text-sm text-text-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-base text-text-muted italic">If you speak, you can learn. If you learn, you can grow.</p>
      </div>
    </section>
  )
}
