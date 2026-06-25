import { useState } from 'react'
import type { TalkUser, VideoTalk } from '../types/VideoTalk'
import { getCurrentUser, getUserTalks } from '../stores/videoTalkStore'
import { formatDuration } from '../hooks/useVideoRecorder'

interface Props {
  userId?: string
  onClose: () => void
  onPlayTalk?: (talk: VideoTalk) => void
}

const BADGE_MAP: Record<string, string> = {
  first_talk: '🎙️ First Talk',
  score_80: '⭐ 80+ Score',
  score_90: '🏆 90+ Score',
  ten_talks: '🔟 10 Talks',
  expert: '🎓 Expert',
}

export default function UserProfile({ onClose, onPlayTalk }: Props) {
  const user: TalkUser = getCurrentUser()
  const talks = getUserTalks(user.id)
  const publicTalks = talks.filter(t => t.visibility === 'public' || t.visibility === 'unlisted')
  const privateTalks = talks.filter(t => t.visibility === 'private')
  const [tab, setTab] = useState<'talks' | 'private'>('talks')

  const displayTalks = tab === 'talks' ? publicTalks : privateTalks

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1500,
      background: '#0A0F1C', overflowY: 'auto',
      fontFamily: 'Inter,system-ui,sans-serif',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(79,142,247,0.15) 0%, transparent 100%)',
        padding: '20px 20px 0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '24px', cursor: 'pointer' }}>←</button>
          <button style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: '#fff', fontSize: '13px', fontWeight: 600, padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>Edit Profile</button>
        </div>

        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#1E4DD8,#4F8EF7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', flexShrink: 0,
            border: '3px solid rgba(79,142,247,0.5)',
          }}>
            {user.avatar ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="" /> : '🎙️'}
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{user.name}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{user.bio || 'Talk to Learn · Talk About It, To Understand It.'}</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '20px', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {[
            { label: 'Talks', value: user.stats.totalTalks },
            { label: 'Avg Score', value: user.stats.averageScore || '—' },
            { label: 'Best', value: user.stats.highestScore || '—' },
            { label: 'Followers', value: user.followers },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1, padding: '14px 8px', textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        {user.badges.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {user.badges.map(b => (
              <span key={b.id} style={{
                background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.25)',
                borderRadius: '20px', padding: '4px 12px',
                fontSize: '12px', color: '#4F8EF7', fontWeight: 600,
              }}>
                {BADGE_MAP[b.id] ?? b.label}
              </span>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {([['talks', 'Public Talks'], ['private', 'Private']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              flex: 1, background: 'none', border: 'none',
              borderBottom: `2px solid ${tab === key ? '#4F8EF7' : 'transparent'}`,
              color: tab === key ? '#fff' : 'rgba(255,255,255,0.4)',
              fontSize: '13px', fontWeight: 700, padding: '12px 0',
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all .2s', marginBottom: '-1px',
            }}>{label} {key === 'talks' ? `(${publicTalks.length})` : `(${privateTalks.length})`}</button>
          ))}
        </div>
      </div>

      {/* Talks grid */}
      <div style={{ padding: '16px' }}>
        {displayTalks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎙️</div>
            <div style={{ fontSize: '14px' }}>No {tab === 'private' ? 'private' : 'public'} talks yet</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {displayTalks.map(talk => (
              <TalkThumb key={talk.id} talk={talk} onClick={() => onPlayTalk?.(talk)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TalkThumb({ talk, onClick }: { talk: VideoTalk; onClick: () => void }) {
  const score = talk.score?.total
  const scoreColor = score !== undefined
    ? score >= 80 ? '#34D399' : score >= 60 ? '#4F8EF7' : '#FB923C'
    : 'rgba(255,255,255,0.4)'

  return (
    <div onClick={onClick} style={{
      aspectRatio: '9/16', borderRadius: '12px', overflow: 'hidden',
      background: 'rgba(255,255,255,0.05)', cursor: 'pointer',
      position: 'relative',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {talk.videoUrl && (
        <video src={talk.videoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
      )}
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '8px',
      }}>
        {score !== undefined && (
          <div style={{ fontSize: '13px', fontWeight: 800, color: scoreColor, marginBottom: '2px' }}>{score}/100</div>
        )}
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, lineClamp: 2 }}>
          {talk.subject}
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
          {formatDuration(talk.duration)}
        </div>
      </div>
    </div>
  )
}
