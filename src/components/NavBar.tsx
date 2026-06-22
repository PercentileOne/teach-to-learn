import { useEffect, useState } from 'react'

export default function NavBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: '60px',
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(0,0,0,.07)',
      boxShadow: '0 2px 16px rgba(0,0,0,.06)',
      display: 'flex', alignItems: 'center',
      padding: '0 16px',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform .32s cubic-bezier(.4,0,.2,1)',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div className="max-w-[1120px] mx-auto w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            </svg>
          </div>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#0A0F1C', letterSpacing: '-.01em' }}>
            Learn by Talking
          </span>
        </div>

        {/* Nav links — desktop only */}
        <div className="hidden md:flex" style={{ gap: '32px' }}>
          {['How It Works', "Who It's For", 'Pricing'].map(label => (
            <span key={label} style={{
              fontSize: '14px', fontWeight: 600, color: '#6B7280',
              cursor: 'pointer', transition: 'color .18s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0A0F1C'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6B7280'}
            >
              {label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button style={{
          padding: '9px 22px', borderRadius: '50px',
          background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)',
          color: '#FFFFFF', fontSize: '13.5px', fontWeight: 800,
          border: 'none', cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(30,77,216,.32)',
          transition: 'transform .18s, box-shadow .18s',
          letterSpacing: '.01em',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(30,77,216,.42)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(30,77,216,.32)'
        }}
        >
          Start for Free
        </button>

      </div>
    </nav>
  )
}
