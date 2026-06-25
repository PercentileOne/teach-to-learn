import { useEffect, useRef, useState } from 'react'
import { useVideoRecorder, formatDuration } from '../hooks/useVideoRecorder'
import { analyseAndScore, extractTranscript, generateTags } from '../services/videoAnalysis'
import { saveTalk, generateId, getCurrentUser, updateUserStats } from '../stores/videoTalkStore'
import VideoScorePanel from './VideoScorePanel'
import type { TalkType, VideoTalk, Visibility } from '../types/VideoTalk'
import { TALK_TYPES } from '../types/VideoTalk'

interface Props {
  subject: string
  talkType?: TalkType
  onClose: () => void
  onSaved?: (talk: VideoTalk) => void
}

export default function VideoRecorder({ subject, talkType = 'short', onClose, onSaved }: Props) {
  const rec = useVideoRecorder(talkType)
  const previewRef = useRef<HTMLVideoElement>(null)
  const playbackRef = useRef<HTMLVideoElement>(null)
  const [blurBg, setBlurBg] = useState(false)
  const [analysing, setAnalysing] = useState(false)
  const [savedTalk, setSavedTalk] = useState<VideoTalk | null>(null)

  // Attach live stream to preview
  useEffect(() => {
    if (previewRef.current && rec.stream) {
      previewRef.current.srcObject = rec.stream
    }
  }, [rec.stream])

  // Attach recorded URL to playback
  useEffect(() => {
    if (playbackRef.current && rec.recordedUrl && rec.status === 'complete') {
      playbackRef.current.src = rec.recordedUrl
    }
  }, [rec.recordedUrl, rec.status])

  async function handleSubmit() {
    if (!rec.recordedBlob || !rec.recordedUrl) return
    setAnalysing(true)
    try {
      const transcript = await extractTranscript(rec.recordedBlob)
      const [score, tags] = await Promise.all([
        analyseAndScore({ transcript, subject, talkType, duration: rec.duration }),
        generateTags(subject, transcript),
      ])

      const user = getCurrentUser()
      const talk: VideoTalk = {
        id: generateId(),
        userId: user.id,
        videoUrl: rec.recordedUrl,
        transcript,
        score,
        duration: rec.duration,
        talkType,
        tags,
        category: 'general',
        subject,
        title: `${subject} — ${TALK_TYPES[talkType].label}`,
        visibility: 'private',
        views: 0, likes: 0, saves: 0, shares: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      saveTalk(talk)
      updateUserStats(user.id, talk)
      setSavedTalk(talk)
    } catch {
      setAnalysing(false)
    }
  }

  if (savedTalk?.score) {
    return (
      <VideoScorePanel
        score={savedTalk.score}
        subject={subject}
        onClose={onClose}
        onPublish={(visibility: Visibility) => {
          const updated = { ...savedTalk, visibility, updatedAt: new Date().toISOString() }
          saveTalk(updated)
          onSaved?.(updated)
          onClose()
        }}
      />
    )
  }

  const typeConfig = TALK_TYPES[talkType]
  const isRecording = rec.status === 'recording'
  const isPaused = rec.status === 'paused'
  const isComplete = rec.status === 'complete'
  const isCountdown = rec.status === 'countdown'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter,system-ui,sans-serif',
    }}>
      {/* Camera request */}
      {rec.status === 'idle' && !rec.stream && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '24px', padding: '40px',
        }}>
          <div style={{ fontSize: '48px' }}>🎙️</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Record your Talk</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{subject}</div>
            <div style={{ fontSize: '13px', color: '#4F8EF7' }}>{typeConfig.label} · {typeConfig.description}</div>
          </div>
          {rec.error && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '12px 16px', color: '#FCA5A5', fontSize: '13px', textAlign: 'center', maxWidth: '300px' }}>
              {rec.error}
            </div>
          )}
          <button onClick={rec.requestCamera} style={{
            background: '#4F8EF7', border: 'none', borderRadius: '50px',
            color: '#fff', fontSize: '15px', fontWeight: 700,
            padding: '14px 32px', cursor: 'pointer',
          }}>
            Enable Camera
          </button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}

      {/* Video area */}
      {(rec.stream || isComplete) && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

          {/* Live preview */}
          {!isComplete && rec.stream && (
            <video
              ref={previewRef}
              autoPlay playsInline muted
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transform: 'scaleX(-1)',
                filter: blurBg ? 'blur(0px)' : 'none',
              }}
            />
          )}

          {/* Playback */}
          {isComplete && rec.recordedUrl && (
            <video
              ref={playbackRef}
              controls playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
            />
          )}

          {/* Countdown overlay */}
          {isCountdown && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)',
            }}>
              <div style={{
                fontSize: '96px', fontWeight: 900, color: '#fff',
                textShadow: '0 0 40px rgba(79,142,247,0.8)',
                animation: 'pulse 1s ease-in-out',
              }}>{rec.countdown || '🎙'}</div>
            </div>
          )}

          {/* Top bar */}
          {!isComplete && rec.stream && rec.status !== 'countdown' && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              padding: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isRecording && (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', display: 'inline-block', animation: 'blink 1s step-start infinite' }}/>
                )}
                <span style={{ color: '#fff', fontSize: '15px', fontWeight: 700, letterSpacing: '.02em' }}>
                  {formatDuration(rec.duration)}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                  / {formatDuration(typeConfig.max === Infinity ? 5400 : typeConfig.max)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setBlurBg(b => !b)} style={{
                  background: blurBg ? 'rgba(79,142,247,0.8)' : 'rgba(255,255,255,0.15)',
                  border: 'none', borderRadius: '20px', padding: '6px 12px',
                  color: '#fff', fontSize: '12px', cursor: 'pointer',
                }}>
                  {blurBg ? '✓ ' : ''}Blur BG
                </button>
              </div>
            </div>
          )}

          {/* Controls */}
          {!isComplete && rec.stream && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '24px 24px 40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            }}>
              {rec.status === 'idle' && (
                <>
                  <button onClick={onClose} style={ghostBtn}>Cancel</button>
                  <button onClick={rec.startCountdown} style={recordBtn}>⏺</button>
                  <div style={{ width: '70px' }}/>
                </>
              )}

              {(isRecording || isPaused) && (
                <>
                  <button onClick={rec.retake} style={ghostBtn}>Retake</button>
                  <button onClick={isPaused ? rec.resume : rec.pause} style={pauseBtn}>
                    {isPaused ? '▶' : '⏸'}
                  </button>
                  <button onClick={rec.stop} style={stopBtn}>■ Stop</button>
                </>
              )}
            </div>
          )}

          {/* Playback controls */}
          {isComplete && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px 20px 40px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                {subject} · {formatDuration(rec.duration)}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={rec.retake} style={{ ...ghostBtn, flex: 1 }}>↩ Retake</button>
                <button onClick={handleSubmit} disabled={analysing} style={{
                  flex: 2, background: analysing ? 'rgba(79,142,247,0.5)' : '#4F8EF7',
                  border: 'none', borderRadius: '50px', color: '#fff',
                  fontSize: '15px', fontWeight: 700, padding: '14px',
                  cursor: analysing ? 'not-allowed' : 'pointer', transition: 'background .2s',
                }}>
                  {analysing ? 'Analysing…' : '✓ Submit Talk'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%{transform:scale(0.8);opacity:0} 50%{transform:scale(1.1);opacity:1} 100%{transform:scale(1)} }
      `}</style>
    </div>
  )
}

const recordBtn: React.CSSProperties = {
  width: '72px', height: '72px', borderRadius: '50%',
  background: '#EF4444', border: '4px solid rgba(255,255,255,0.8)',
  color: '#fff', fontSize: '22px', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 0 0 6px rgba(239,68,68,0.25)',
}

const pauseBtn: React.CSSProperties = {
  width: '60px', height: '60px', borderRadius: '50%',
  background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)',
  color: '#fff', fontSize: '20px', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

const stopBtn: React.CSSProperties = {
  background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)',
  borderRadius: '50px', color: '#FCA5A5', fontSize: '14px', fontWeight: 700,
  padding: '10px 18px', cursor: 'pointer',
}

const ghostBtn: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50px', color: '#fff', fontSize: '14px', fontWeight: 600,
  padding: '10px 18px', cursor: 'pointer',
}
