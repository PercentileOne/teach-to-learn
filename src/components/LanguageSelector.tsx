import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'zh', label: 'Chinese', native: '中文' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'pt', label: 'Portuguese', native: 'Português' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'ko', label: 'Korean', native: '한국어' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'sq', label: 'Albanian', native: 'Shqip' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands' },
  { code: 'pl', label: 'Polish', native: 'Polski' },
]

interface Props {
  variant?: 'light' | 'dark'
}

export default function LanguageSelector({ variant = 'light' }: Props) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isDark = variant === 'dark'
  const current = LANGUAGES.find(l => l.code === i18n.language) ?? LANGUAGES[0]

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function select(code: string) {
    i18n.changeLanguage(code)
    const root = document.documentElement
    root.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr')
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(30,77,216,0.06)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(30,77,216,0.18)'}`,
          borderRadius: '8px', padding: '6px 10px', cursor: 'pointer',
          color: isDark ? 'rgba(255,255,255,0.85)' : '#374151', fontSize: '13px', fontWeight: 500,
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(30,77,216,0.1)')}
        onMouseLeave={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(30,77,216,0.06)')}
      >
        <Globe size={14} style={{ opacity: 0.75 }} />
        <span>{current.native}</span>
        <ChevronDown size={12} style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: isDark ? '#1a1f35' : '#ffffff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '10px', overflow: 'hidden', minWidth: '160px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 1000,
            maxHeight: '320px', overflowY: 'auto',
          }}
        >
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === i18n.language}
              onClick={() => select(lang.code)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '9px 14px', border: 'none',
                cursor: 'pointer', textAlign: 'left', gap: '10px',
                background: lang.code === i18n.language ? 'rgba(99,102,241,0.12)' : 'transparent',
                color: lang.code === i18n.language ? (isDark ? '#a5b4fc' : '#1E4DD8') : (isDark ? 'rgba(255,255,255,0.78)' : '#374151'),
                fontSize: '13px', transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (lang.code !== i18n.language) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(30,77,216,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.background = lang.code === i18n.language ? 'rgba(99,102,241,0.12)' : 'transparent' }}
            >
              <span style={{ fontWeight: 500 }}>{lang.native}</span>
              <span style={{ opacity: 0.45, fontSize: '11px' }}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
