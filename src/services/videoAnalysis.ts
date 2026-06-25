import type { ScoreBreakdown, TalkType } from '../types/VideoTalk'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string

export interface AnalysisInput {
  transcript: string
  subject: string
  talkType: TalkType
  duration: number
}

// ── Transcript extraction ──────────────────────────────────────────────────
// TODO: Replace with Whisper API or Azure Speech-to-Text for production.
// Currently uses the Web Speech API for a best-effort transcript.

export async function extractTranscript(_blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      resolve('[Transcript not available — speech recognition not supported in this browser]')
      return
    }
    // Web Speech API only works on live audio — for recorded video we use
    // a placeholder here. Production pipeline should send blob to Whisper.
    resolve('[Transcript will be generated server-side via Whisper]')
  })
}

// ── AI Scoring ────────────────────────────────────────────────────────────

export async function analyseAndScore(input: AnalysisInput): Promise<ScoreBreakdown> {
  const prompt = `You are an expert educational coach scoring a video talk for TalkToLearn.

Subject: "${input.subject}"
Talk type: ${input.talkType} (${input.duration}s)
Transcript:
"""
${input.transcript || 'No transcript available — score based on talk type defaults.'}
"""

Score this talk out of 100 using EXACTLY this breakdown:
- Understanding (40 pts): accuracy, depth, clarity of explanation
- Structure (20 pts): flow, organisation, transitions
- Communication (20 pts): voice clarity, pacing, articulation
- Presence (20 pts): confidence, engagement (infer from transcript tone)

Return ONLY valid JSON in this exact shape:
{
  "understanding": <0-40>,
  "structure": <0-20>,
  "communication": <0-20>,
  "presence": <0-20>,
  "feedback": {
    "understanding": "<2 sentence feedback>",
    "structure": "<2 sentence feedback>",
    "communication": "<2 sentence feedback>",
    "presence": "<2 sentence feedback>",
    "overall": "<3 sentence overall feedback with one specific improvement>"
  }
}`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    const text = data.content?.[0]?.text ?? ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const parsed = JSON.parse(jsonMatch[0])
    const total = (parsed.understanding ?? 0) + (parsed.structure ?? 0) +
                  (parsed.communication ?? 0) + (parsed.presence ?? 0)

    return {
      understanding: parsed.understanding ?? 0,
      structure: parsed.structure ?? 0,
      communication: parsed.communication ?? 0,
      presence: parsed.presence ?? 0,
      total: Math.min(100, total),
      feedback: {
        understanding: parsed.feedback?.understanding ?? '',
        structure: parsed.feedback?.structure ?? '',
        communication: parsed.feedback?.communication ?? '',
        presence: parsed.feedback?.presence ?? '',
        overall: parsed.feedback?.overall ?? '',
      },
    }
  } catch {
    // Fallback scores if API fails
    return {
      understanding: 28, structure: 14, communication: 14, presence: 13,
      total: 69,
      feedback: {
        understanding: 'Good coverage of the subject matter.',
        structure: 'Talk had reasonable flow and organisation.',
        communication: 'Pacing and clarity were acceptable.',
        presence: 'Showed reasonable confidence.',
        overall: 'Solid talk. Focus on deepening your explanation of key concepts to boost your Understanding score.',
      },
    }
  }
}

// ── Video analysis stubs ───────────────────────────────────────────────────
// TODO: Send video frames to a computer vision API (e.g. Google Video Intelligence,
// Azure Video Indexer, or a custom model) for eye contact / body language scoring.

export interface VideoMetrics {
  eyeContactPercent: number   // 0–100
  confidenceSignal: number    // 0–100
  pacingScore: number         // 0–100
  bodyLanguageScore: number   // 0–100
}

export async function analyseVideoMetrics(_blob: Blob): Promise<VideoMetrics> {
  // Stub — returns neutral values until computer vision pipeline is wired up
  return {
    eyeContactPercent: 72,
    confidenceSignal: 68,
    pacingScore: 74,
    bodyLanguageScore: 70,
  }
}

// ── Tag generation ────────────────────────────────────────────────────────

export async function generateTags(subject: string, transcript: string): Promise<string[]> {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: `Generate 5 short topic tags for a video talk about "${subject}". Transcript snippet: "${transcript.slice(0, 200)}". Return only a JSON array of strings, e.g. ["tag1","tag2"].`,
        }],
      }),
    })
    const data = await res.json()
    const text = data.content?.[0]?.text ?? '[]'
    const match = text.match(/\[.*?\]/)
    return match ? JSON.parse(match[0]) : [subject]
  } catch {
    return [subject]
  }
}
