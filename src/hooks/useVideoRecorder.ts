import { useState, useRef, useCallback, useEffect } from 'react'
import type { RecordingStatus, TalkType } from '../types/VideoTalk'

const PREFERRED_MIME_TYPES = [
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm',
  'video/mp4',
]

function getSupportedMimeType(): string {
  for (const type of PREFERRED_MIME_TYPES) {
    if (MediaRecorder.isTypeSupported(type)) return type
  }
  return ''
}

export interface UseVideoRecorderReturn {
  status: RecordingStatus
  stream: MediaStream | null
  recordedBlob: Blob | null
  recordedUrl: string | null
  duration: number
  countdown: number
  error: string | null
  startCountdown: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  retake: () => void
  requestCamera: () => Promise<void>
}

export function useVideoRecorder(_talkType: TalkType): UseVideoRecorderReturn {
  const [status, setStatus] = useState<RecordingStatus>('idle')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (recordedUrl) URL.revokeObjectURL(recordedUrl)
      stopTimer()
      stopStream()
    }
  }, [])

  function stopTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  function stopStream() {
    if (stream) { stream.getTracks().forEach(t => t.stop()) }
  }

  const requestCamera = useCallback(async () => {
    setError(null)
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1080 },
          height: { ideal: 1920 },
          aspectRatio: { ideal: 9 / 16 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })
      setStream(s)
      setStatus('idle')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Camera access denied'
      setError(msg)
    }
  }, [])

  const startCountdown = useCallback(() => {
    if (!stream) return
    setCountdown(3)
    setStatus('countdown')
    let count = 3
    countdownRef.current = setInterval(() => {
      count--
      setCountdown(count)
      if (count <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current)
        startRecording()
      }
    }, 1000)
  }, [stream])

  function startRecording() {
    if (!stream) return
    chunksRef.current = []
    const mimeType = getSupportedMimeType()
    const options: MediaRecorderOptions = mimeType ? { mimeType } : {}

    try {
      const mr = new MediaRecorder(stream, options)
      mediaRecorderRef.current = mr

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'video/webm' })
        const url = URL.createObjectURL(blob)
        setRecordedBlob(blob)
        setRecordedUrl(url)
        setStatus('complete')
        stopTimer()
      }

      mr.start(1000) // collect data every second
      setStatus('recording')
      startTimeRef.current = Date.now()

      timerRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 500)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Recording failed'
      setError(msg)
      setStatus('idle')
    }
  }

  const pause = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause()
      stopTimer()
      setStatus('paused')
    }
  }, [])

  const resume = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume()
      startTimeRef.current = Date.now() - duration * 1000
      timerRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 500)
      setStatus('recording')
    }
  }, [duration])

  const stop = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setStatus('processing')
      stopTimer()
    }
  }, [])

  const retake = useCallback(() => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl)
    setRecordedBlob(null)
    setRecordedUrl(null)
    setDuration(0)
    setCountdown(3)
    setError(null)
    chunksRef.current = []
    mediaRecorderRef.current = null
    setStatus('idle')
  }, [recordedUrl])

  return {
    status, stream, recordedBlob, recordedUrl, duration, countdown, error,
    startCountdown, pause, resume, stop, retake, requestCamera,
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}
