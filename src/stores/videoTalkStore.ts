import type { VideoTalk, TalkUser, Engagement } from '../types/VideoTalk'

// In-memory store — swap for API calls backed by Azure/Supabase in production

const talks: VideoTalk[] = []
const users: Map<string, TalkUser> = new Map()
const engagements: Map<string, Engagement> = new Map()

// ── Talks ──────────────────────────────────────────────────────────────────

export function saveTalk(talk: VideoTalk): VideoTalk {
  const existing = talks.findIndex(t => t.id === talk.id)
  if (existing >= 0) {
    talks[existing] = talk
  } else {
    talks.unshift(talk)
  }
  return talk
}

export function getTalk(id: string): VideoTalk | undefined {
  return talks.find(t => t.id === id)
}

export function getPublicFeed(limit = 20, offset = 0): VideoTalk[] {
  return talks
    .filter(t => t.visibility === 'public' || t.visibility === 'marketplace')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(offset, offset + limit)
}

export function getUserTalks(userId: string): VideoTalk[] {
  return talks.filter(t => t.userId === userId)
}

export function deleteTalk(id: string): void {
  const idx = talks.findIndex(t => t.id === id)
  if (idx >= 0) talks.splice(idx, 1)
}

// ── Users ──────────────────────────────────────────────────────────────────

export function getUser(id: string): TalkUser | undefined {
  return users.get(id)
}

export function saveUser(user: TalkUser): TalkUser {
  users.set(user.id, user)
  return user
}

export function getCurrentUser(): TalkUser {
  const id = 'local-user'
  if (!users.has(id)) {
    users.set(id, {
      id,
      name: 'You',
      bio: '',
      stats: { totalTalks: 0, averageScore: 0, highestScore: 0, totalViews: 0 },
      badges: [],
      followers: 0,
      following: 0,
      publicTalks: [],
    })
  }
  return users.get(id)!
}

export function updateUserStats(userId: string, talk: VideoTalk): void {
  const user = users.get(userId)
  if (!user || !talk.score) return
  const userTalks = getUserTalks(userId)
  const scores = userTalks.filter(t => t.score).map(t => t.score!.total)
  user.stats.totalTalks = userTalks.length
  user.stats.averageScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  user.stats.highestScore = scores.length ? Math.max(...scores) : 0
  user.stats.totalViews = userTalks.reduce((sum, t) => sum + t.views, 0)
  users.set(userId, user)
}

// ── Engagement ─────────────────────────────────────────────────────────────

export function toggleLike(talkId: string, userId: string): boolean {
  const key = `${talkId}:${userId}`
  const e = engagements.get(key) ?? { talkId, userId, liked: false, saved: false, viewed: false }
  e.liked = !e.liked
  engagements.set(key, e)
  const talk = getTalk(talkId)
  if (talk) { talk.likes += e.liked ? 1 : -1; saveTalk(talk) }
  return e.liked
}

export function toggleSave(talkId: string, userId: string): boolean {
  const key = `${talkId}:${userId}`
  const e = engagements.get(key) ?? { talkId, userId, liked: false, saved: false, viewed: false }
  e.saved = !e.saved
  engagements.set(key, e)
  const talk = getTalk(talkId)
  if (talk) { talk.saves += e.saved ? 1 : -1; saveTalk(talk) }
  return e.saved
}

export function recordView(talkId: string, userId: string): void {
  const key = `${talkId}:${userId}`
  const e = engagements.get(key) ?? { talkId, userId, liked: false, saved: false, viewed: false }
  if (!e.viewed) {
    e.viewed = true
    engagements.set(key, e)
    const talk = getTalk(talkId)
    if (talk) { talk.views++; saveTalk(talk) }
  }
}

export function getEngagement(talkId: string, userId: string): Engagement {
  return engagements.get(`${talkId}:${userId}`) ?? { talkId, userId, liked: false, saved: false, viewed: false }
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
