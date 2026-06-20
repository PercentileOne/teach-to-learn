const cards = [
  {
    icon: '📊',
    title: 'Share Your Score',
    desc: 'A clean card with Verbal Mastery Score + five sub-scores.',
    comingSoon: false,
  },
  {
    icon: '🎙️',
    title: 'Share Your Talk',
    desc: 'Share audio, transcript, feedback, and score.',
    comingSoon: false,
  },
  {
    icon: '🌟',
    title: 'Public Profiles',
    desc: 'My Talks, My Progress, My Scores.',
    comingSoon: true,
  },
]

export default function SocialSharingSection() {
  return (
    <section className="social-section section">
      <div className="container">
        <h2 className="section-title">Share Your Progress. Inspire Someone.</h2>
        <p className="section-subtitle">
          Your scores, your talks, your growth — beautifully shareable.
        </p>

        <div className="social-cards">
          {cards.map((c) => (
            <div key={c.title} className="social-card">
              {c.comingSoon && <span className="social-card-coming">Coming Soon</span>}
              <div className="social-card-icon">{c.icon}</div>
              <div className="social-card-title">{c.title}</div>
              <p className="social-card-desc">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="social-micro">Your voice can inspire someone else.</p>
      </div>
    </section>
  )
}
