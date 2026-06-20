const languages = [
  'English', 'Twi', 'French', 'Spanish', 'Mandarin', 'Arabic', 'Hindi', 'Portuguese',
]

export default function GlobalLanguageSection() {
  return (
    <section className="language-section section">
      <div className="container">
        <h2 className="section-title">Practice in Any Language</h2>
        <p className="section-subtitle">
          Your voice, your language, your world — Teach to Learn works everywhere.
        </p>

        <div className="language-grid">
          {languages.map((lang) => (
            <div key={lang} className="language-pill">{lang}</div>
          ))}
        </div>

        <p className="language-coming-soon">More languages coming soon.</p>

        <div className="language-quotes">
          <p className="language-quote">
            <span>Confidence has no language barrier.</span>
          </p>
          <p className="language-quote">Your voice is your passport.</p>
        </div>
      </div>
    </section>
  )
}
