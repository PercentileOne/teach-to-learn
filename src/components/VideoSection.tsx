const thumbs = [
  {
    title: 'Your A-ha Moment',
    quote: 'I thought I understood my topic… until I tried explaining it out loud.',
  },
  {
    title: "A Parent's Story",
    quote: 'He stood in front of 400 students and delivered the best talk of his life.',
  },
  {
    title: 'The Professional Edge',
    quote: 'Now I walk into every room with clarity.',
  },
]

export default function VideoSection() {
  return (
    <section className="video-section section">
      <div className="container">
        <h2 className="section-title">See the Difference in 2 Minutes</h2>
        <p className="section-subtitle">Real people. Real confidence. Real transformation.</p>

        <div className="video-main">
          <div className="video-play-btn">
            <div className="video-play-icon" />
          </div>
        </div>

        <div className="video-thumbnails">
          {thumbs.map((t) => (
            <div key={t.title} className="video-thumb-card">
              <div className="video-thumb-preview">
                <div className="video-thumb-play">
                  <div className="video-thumb-play-icon" />
                </div>
              </div>
              <div className="video-thumb-body">
                <div className="video-thumb-title">{t.title}</div>
                <p className="video-thumb-quote">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        <p className="video-language-note">Practice in any language.</p>
      </div>
    </section>
  )
}
