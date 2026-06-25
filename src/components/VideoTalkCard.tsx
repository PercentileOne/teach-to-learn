import { useRef, useState, useEffect } from 'react'
import type { VideoTalk } from '../types/VideoTalk'
import { toggleLike, toggleSave, recordView, getCurrentUser } from '../stores/videoTalkStore'
import { formatDuration } from '../hooks/useVideoRecorder'

interface Props {
  talk: VideoTalk
  active: boolean
}

export default function VideoTalkCard({ talk, active }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userId = getCurrentUser().id
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(talk.likes)
  const [captionsOn, setCaptionsOn] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) {
      v.play().catch(() => {})
      recordView(talk.id, userId)
    } else {
      v.pause()
    }
  }, [active])

  function handleLike() {
    const next = toggleLike(talk.id, userId)
    setLiked(next)
    setLikes(l => l + (next ? 1 : -1))
  }

  function handleSave() {
    const next = toggleSave(talk.id, userId)
    setSaved(next)
  }

  const score = talk.score?.total
  const scoreColor = score !== undefined
    ? score >= 80 ? '#34D399' : score >= 60 ? '#4F8EF7' : '#FB923C'
    : 'rgba(255,255,255,0.4)'

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        src={talk.videoUrl}
        loop playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
      />

      {/* Score badge */}
      {score !== undefined && (
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          borderRadius: '20px', padding: '4px 12px',
          display: 'flex', alignItems: 'center', gap: '6px',
          border: `1px solid ${scoreColor}40`,
        }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: scoreColor }}>{score}</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>/100</span>
        </div>
      )}

      {/* Duration badge */}
      <div style={{
        position: 'absolute', top: '16px', right: '16px',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
        borderRadius: '20px', padding: '4px 10px',
        fontSize: '12px', color: 'rgba(255,255,255,0.7)',
      }}>
        {formatDuration(talk.duration)}
      </div>

      {/* Right actions */}
      <div style={{
        position: 'absolute', right: '12px', bottom: '120px',
        display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center',
      }}>
        <ActionBtn icon={liked ? '❤️' : '🤍'} count={likes} onClick={handleLike} active={liked} />
        <ActionBtn icon={saved ? '🔖' : '🏷️'} count={talk.saves} onClick={handleSave} active={saved} />
        <ActionBtn icon="📤" count={talk.shares} onClick={() => {}} active={false} />
        <ActionBtn icon={captionsOn ? '💬' : '💭'} count={undefined} onClick={() => setCaptionsOn(c => !c)} active={captionsOn} />
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 16px 32px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
      }}>
        <div style={{ fontFamily: 'Inter,system-ui,sans-serif' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
            {talk.title}
          </div>
          {captionsOn && talk.transcript && (
            <div style={{
              background: 'rgba(0,0,0,0.7)', borderRadius: '8px',
              padding: '8px 10px', marginBottom: '8px',
              fontSize: '13px', color: '#fff', lineHeight: 1.5,
              maxHeight: '80px', overflow: 'hidden',
            }}>
              {talk.transcript.slice(0, 200)}…
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {talk.tags.slice(0, 4).map(tag => (
              <span key={tag} style={{
                background: 'rgba(79,142,247,0.2)', border: '1px solid rgba(79,142,247,0.3)',
                borderRadius: '20px', padding: '3px 10px',
                fontSize: '11px', color: '#4F8EF7', fontWeight: 600,
                fontFamily: 'Inter,system-ui,sans-serif',
              }}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ icon, count, onClick, active }: { icon: string; count?: number; onClick: () => void; active: boolean }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
      background: 'none', border: 'none', cursor: 'pointer',
      filter: active ? 'none' : 'grayscale(0.3)',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px',
      }}>{icon}</div>
      {count !== undefined && (
        <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600, fontFamily: 'Inter,system-ui,sans-serif' }}>
          {count > 999 ? `${(count/1000).toFixed(1)}k` : count}
        </span>
      )}
    </button>
  )
}
