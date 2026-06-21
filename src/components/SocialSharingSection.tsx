const cards = [
  { icon: '📊', title: 'Share Your Score', desc: 'A clean card with Verbal Mastery Score + five sub-scores.', comingSoon: false },
  { icon: '🎙️', title: 'Share Your Talk',  desc: 'Share audio, transcript, feedback, and score.',           comingSoon: false },
  { icon: '🌟', title: 'Public Profiles',  desc: 'My Talks, My Progress, My Scores.',                       comingSoon: true  },
]
export default function SocialSharingSection() {
  return (
    <section className="bg-bg-alt py-12 md:py-20 text-center">
      <div className="max-w-[1160px] mx-auto px-5">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">Share Your Progress. Inspire Someone.</h2>
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-xl mx-auto">Your scores, your talks, your growth — beautifully shareable.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {cards.map(c => (
            <div key={c.title} className="relative bg-bg-white rounded-card p-7 shadow-card text-left hover:-translate-y-1 hover:shadow-card-lg transition-all">
              {c.comingSoon && <span className="absolute top-4 right-4 bg-accent-gold text-white text-[0.65rem] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-btn">Coming Soon</span>}
              <div className="text-3xl mb-3.5">{c.icon}</div>
              <div className="text-base font-bold text-text-dark mb-2">{c.title}</div>
              <p className="text-sm text-text-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-text-muted italic font-semibold">Your voice can inspire someone else.</p>
      </div>
    </section>
  )
}
