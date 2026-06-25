import { useState, useRef, useEffect, useCallback } from 'react'
import type { VideoTalk, TalkType } from '../types/VideoTalk'
import { getPublicFeed, getUserTalks, getCurrentUser } from '../stores/videoTalkStore'
import VideoTalkCard from './VideoTalkCard'
import VideoRecorder from './VideoRecorder'
import { TALK_TYPES } from '../types/VideoTalk'

type FeedTab = 'forYou' | 'following' | 'myTalks'

interface Props {
  initialSubject?: string
  onClose: () => void
}

export default function VideoFeed({ initialSubject = '', onClose }: Props) {
  const [talks, setTalks] = useState<VideoTalk[]>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [tab, setTab] = useState<FeedTab>('forYou')
  const [recording, setRecording] = useState(false)
  const [subject, setSubject] = useState(initialSubject)
  const [talkType, setTalkType] = useState<TalkType>('short')
  const [showRecordSheet, setShowRecordSheet] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const userId = getCurrentUser().id

  const loadTalks = useCallback(() => {
    const feed = tab === 'myTalks' ? getUserTalks(userId) : getPublicFeed()
    setTalks(feed)
    setActiveIdx(0)
  }, [tab, userId])

  useEffect(() => { loadTalks() }, [loadTalks])

  // Swipe / wheel detection
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let startY = 0

    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      const delta = startY - e.changedTouches[0].clientY
      if (Math.abs(delta) > 50) navigate(delta > 0 ? 1 : -1)
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      navigate(e.deltaY > 0 ? 1 : -1)
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('wheel', onWheel)
    }
  }, [talks.length])

  function navigate(dir: 1 | -1) {
    setActiveIdx(i => Math.max(0, Math.min(talks.length - 1, i + dir)))
  }

  if (recording) {
    return (
      <VideoRecorder
        subject={subject}
        talkType={talkType}
        onClose={() => setRecording(false)}
        onSaved={() => { setRecording(false); loadTalks() }}
      />
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1500,
      background: '#000', fontFamily: 'Inter,system-ui,sans-serif',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 0',
      }}>
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>←</button>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: '20px', padding: '4px' }}>
          {([['forYou', 'For You'], ['following', 'Following'], ['myTalks', 'My Talks']] as [FeedTab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              background: tab === key ? '#4F8EF7' : 'none',
              border: 'none', borderRadius: '16px',
              color: tab === key ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize: '12px', fontWeight: 700, padding: '5px 12px',
              cursor: 'pointer', transition: 'all .2s',
              fontFamily: 'inherit',
            }}>{label}</button>
          ))}
        </div>

        {/* Record button */}
        <button onClick={() => setShowRecordSheet(true)} style={{
          background: '#4F8EF7', border: 'none', borderRadius: '50%',
          width: '36px', height: '36px', color: '#fff', fontSize: '18px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>+</button>
      </div>

      {/* Feed */}
      <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {talks.length === 0 ? (
          <EmptyFeed tab={tab} onRecord={() => setShowRecordSheet(true)} />
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column',
            transform: `translateY(-${activeIdx * 100}%)`,
            transition: 'transform .35s cubic-bezier(0.4,0,0.2,1)',
            height: `${talks.length * 100}%`,
          }}>
            {talks.map((talk, idx) => (
              <div key={talk.id} style={{ height: `${100 / talks.length}%`, flexShrink: 0 }}>
                <VideoTalkCard talk={talk} active={idx === activeIdx} />
              </div>
            ))}
          </div>
        )}

        {/* Scroll indicators */}
        {talks.length > 1 && (
          <div style={{
            position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            {talks.map((_, i) => (
              <div key={i} onClick={() => setActiveIdx(i)} style={{
                width: '3px', height: i === activeIdx ? '20px' : '8px',
                borderRadius: '99px',
                background: i === activeIdx ? '#4F8EF7' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer', transition: 'all .2s',
              }}/>
            ))}
          </div>
        )}
      </div>

      {/* Record sheet */}
      {showRecordSheet && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
          background: '#0A0F1C', borderRadius: '24px 24px 0 0',
          padding: '24px 20px 40px',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.8)',
        }}>
          <div style={{ width: '36px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '99px', margin: '0 auto 20px' }}/>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>New Video Talk</div>

          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Subject</label>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. Photosynthesis, React Hooks, Leadership..."
            style={{
              width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', padding: '12px 14px', color: '#fff', fontSize: '15px',
              outline: 'none', fontFamily: 'inherit', marginBottom: '16px',
            }}
          />

          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Talk Type</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {(Object.entries(TALK_TYPES) as [TalkType, typeof TALK_TYPES[TalkType]][]).map(([key, cfg]) => (
              <button key={key} onClick={() => setTalkType(key)} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: talkType === key ? 'rgba(79,142,247,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${talkType === key ? '#4F8EF7' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '10px', padding: '10px 14px', cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{cfg.label}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{cfg.description}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setShowRecordSheet(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', color: '#fff', fontSize: '14px', fontWeight: 600, padding: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={() => { setShowRecordSheet(false); setRecording(true) }} disabled={!subject.trim()} style={{ flex: 2, background: subject.trim() ? '#4F8EF7' : 'rgba(79,142,247,0.3)', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '15px', fontWeight: 700, padding: '13px', cursor: subject.trim() ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
              🎙 Start Recording
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyFeed({ tab, onRecord }: { tab: FeedTab; onRecord: () => void }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px' }}>
      <div style={{ fontSize: '48px' }}>{tab === 'myTalks' ? '🎙️' : '📺'}</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          {tab === 'myTalks' ? 'No Talks yet' : 'Feed is empty'}
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
          {tab === 'myTalks' ? 'Record your first Talk to get started' : 'Be the first to post a Talk!'}
        </div>
      </div>
      <button onClick={onRecord} style={{ background: '#4F8EF7', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '12px 28px', cursor: 'pointer', fontFamily: 'Inter,system-ui,sans-serif' }}>
        🎙 Record a Talk
      </button>
    </div>
  )
}
