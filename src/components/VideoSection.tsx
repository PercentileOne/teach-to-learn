const thumbs = [
  { title: 'Your A-ha Moment',     quote: 'I thought I understood my topic… until I tried explaining it out loud.' },
  { title: "A Parent's Story",     quote: 'He stood in front of 400 students and delivered the best talk of his life.' },
  { title: 'The Professional Edge',quote: 'Now I walk into every room with clarity.' },
]
export default function VideoSection() {
  return (
    <section className="bg-bg-white py-12 md:py-20">
      <div className="max-w-[1160px] mx-auto px-5 text-center">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">See the Difference in 2 Minutes</h2>
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-xl mx-auto">Real people. Real confidence. Real transformation.</p>
        <div className="mt-10 mb-8 relative bg-slate-200 rounded-card aspect-video flex items-center justify-center cursor-pointer shadow-card hover:shadow-card-lg transition-shadow overflow-hidden group">
          <div className="w-18 h-18 bg-bg-white rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.18)] group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-[12px_0_12px_22px] border-transparent border-l-primary ml-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {thumbs.map(t => (
            <div key={t.title} className="bg-bg-alt rounded-card shadow-card hover:-translate-y-1 hover:shadow-card-lg transition-all cursor-pointer overflow-hidden">
              <div className="bg-slate-300 aspect-video flex items-center justify-center">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-[7px_0_7px_13px] border-transparent border-l-primary ml-0.5" />
                </div>
              </div>
              <div className="p-4 text-left">
                <div className="text-sm font-bold text-text-dark mb-1.5">{t.title}</div>
                <p className="text-[0.82rem] text-text-muted italic leading-snug">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-text-muted italic">Practice in any language.</p>
      </div>
    </section>
  )
}
