import { useEffect, useRef, useState } from 'react'

const scores = [
  { label: 'Accuracy', value: 87 },
  { label: 'Depth', value: 74 },
  { label: 'Clarity', value: 91 },
  { label: 'Structure', value: 82 },
  { label: 'Confidence', value: 78 },
]

export default function ScoringSection() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="scoring-section section">
      <div className="container">
        <h2 className="section-title">Your Voice. Measured. Mastered.</h2>
        <p className="section-subtitle">
          AI breaks down your speaking performance into the five skills that matter most.
        </p>

        <div className="scoring-phone" ref={ref}>
          <div className="scoring-label">Verbal Mastery Report</div>

          <div className="scoring-rows">
            {scores.map((s) => (
              <div key={s.label} className="scoring-row">
                <div className="scoring-row-header">
                  <span className="scoring-row-name">{s.label}</span>
                  <span className="scoring-row-val">{s.value}</span>
                </div>
                <div className="scoring-bar-track">
                  <div
                    className="scoring-bar-fill"
                    style={{ width: animated ? `${s.value}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="scoring-total">
            <div className="scoring-total-label">Verbal Mastery Score</div>
            <div className="scoring-total-score">82</div>
            <div className="scoring-total-sub">out of 100</div>
          </div>
        </div>

        <p className="scoring-micro">We don't guess. We measure.</p>
      </div>
    </section>
  )
}
