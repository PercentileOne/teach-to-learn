const promises = [
  { icon: '🛡️', title: 'Build Confidence',          desc: 'Your child practices privately — no pressure, no audience, no judgement.' },
  { icon: '📈', title: 'Improve Speaking Skills',    desc: 'Clarity, structure, expression, and confidence improve naturally.' },
  { icon: '🏫', title: 'Prepare for School Success', desc: 'Presentations, reading aloud, oral exams — all become easier.' },
]
export default function ParentSection() {
  return (
    <section className="bg-bg-parent py-12 md:py-20">
      <div className="max-w-[1160px] mx-auto px-5 text-center">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">
          For Every Parent Who Worries About Their Child's Confidence
        </h2>
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-xl mx-auto">
          Help your child find their voice — privately, safely, and at their own pace.
        </p>
        <div className="relative bg-bg-white border-l-4 border-accent-coral rounded-xl mt-9 mb-8 p-7 text-left shadow-card max-w-2xl mx-auto">
          <span className="absolute top-[-8px] left-4 text-[4rem] text-accent-coral/25 leading-none font-serif">"</span>
          <p className="text-[clamp(0.95rem,2vw,1.1rem)] text-text-dark leading-[1.7] italic pt-4">
            My son used to freeze when speaking. He'd whisper. He'd avoid eye contact. He'd panic before presentations.
            We tried Talk to Learn for just 10 minutes a day on Learn by Talking… and last week he stood in front of
            400 students and delivered the best talk of his life. I cried. This changed everything.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {promises.map(p => (
            <div key={p.title} className="bg-bg-white rounded-card p-5 flex gap-4 items-start shadow-card text-left">
              <span className="text-2xl flex-shrink-0">{p.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-text-dark mb-1">{p.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-3">
          <button className="btn-primary">Try the 2-Minute Challenge with Your Child</button>
          <p className="text-sm text-text-muted italic">Every child deserves to feel confident when they speak.</p>
        </div>
      </div>
    </section>
  )
}
