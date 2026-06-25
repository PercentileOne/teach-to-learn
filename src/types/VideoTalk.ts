export type TalkType = 'short' | 'standard' | 'expert' | 'master'
export type Visibility = 'private' | 'unlisted' | 'public' | 'marketplace'
export type RecordingStatus = 'idle' | 'countdown' | 'recording' | 'paused' | 'processing' | 'complete'

export interface ScoreBreakdown {
  understanding: number   // 0–40
  structure: number       // 0–20
  communication: number   // 0–20
  presence: number        // 0–20
  total: number           // 0–100
  feedback: {
    understanding: string
    structure: string
    communication: string
    presence: string
    overall: string
  }
}

export interface VideoTalk {
  id: string
  userId: string
  videoUrl: string        // object URL locally; Azure Blob URL in production
  thumbnailUrl?: string
  transcript?: string
  score?: ScoreBreakdown
  duration: number        // seconds
  talkType: TalkType
  tags: string[]
  category: string
  subject: string
  title: string
  visibility: Visibility
  views: number
  likes: number
  saves: number
  shares: number
  createdAt: string
  updatedAt: string
}

export interface TalkUser {
  id: string
  name: string
  avatar?: string
  bio: string
  stats: {
    totalTalks: number
    averageScore: number
    highestScore: number
    totalViews: number
  }
  badges: Badge[]
  followers: number
  following: number
  publicTalks: VideoTalk[]
}

export interface Badge {
  id: string
  label: string
  emoji: string
  earnedAt: string
}

export interface Engagement {
  talkId: string
  userId: string
  liked: boolean
  saved: boolean
  viewed: boolean
  sharedAt?: string
}

// Talk type config
export const TALK_TYPES: Record<TalkType, { label: string; min: number; max: number; description: string }> = {
  short:    { label: 'Short Talk',    min: 60,   max: 180,  description: '1–3 minutes' },
  standard: { label: 'Standard Talk', min: 300,  max: 600,  description: '5–10 minutes' },
  expert:   { label: 'Expert Talk',   min: 1500, max: 1800, description: '25–30 minutes' },
  master:   { label: 'Master Talk',   min: 1800, max: Infinity, description: '30+ minutes · Invite only' },
}
