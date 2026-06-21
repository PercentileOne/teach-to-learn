const languages = ['English','Twi','French','Spanish','Mandarin','Arabic','Hindi','Portuguese']
export default function GlobalLanguageSection() {
  return (
    <section className="bg-bg-white py-12 md:py-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(14,165,233,0.07)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="max-w-[1160px] mx-auto px-5 relative">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-text-dark leading-tight tracking-[-0.02em]">Talk to Learn in Any Language</h2>
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted mt-3 max-w-xl mx-auto">
          Your voice, your language, your world — Learn by Talking works everywhere the Teach to Learn principle applies. Which is everywhere.
        </p>
        <div className="flex flex-wrap gap-3 justify-center my-10">
          {languages.map(lang => (
            <div key={lang} className="bg-bg-blue border border-primary-light text-primary-dark text-sm font-semibold px-5 py-2.5 rounded-btn hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all cursor-default">{lang}</div>
          ))}
        </div>
        <p className="text-sm text-text-muted italic mb-8">More languages coming soon.</p>
        <div className="flex flex-col gap-3">
          <p className="text-[clamp(0.95rem,2vw,1.1rem)] font-bold text-text-dark"><span className="text-primary">Confidence has no language barrier.</span></p>
          <p className="text-[clamp(0.95rem,2vw,1.1rem)] font-bold text-text-dark">Your voice is your passport.</p>
        </div>
      </div>
    </section>
  )
}
