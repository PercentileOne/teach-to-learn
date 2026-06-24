import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Drop D-ID / HeyGen generated MP4s here ──────────────────────────────────
// Each: 6-10s loop, person sitting at desk, looking at camera, breathing
// Generate free at d-id.com or heygen.com

const PEOPLE = [
  { name:'Lord Warren',    title:'Chairman',         personality:'intimidator', video:'/videos/7552530-hd_1920_1080_25fps.mp4',      img:'https://i.pravatar.cc/400?img=57', gender:'m', freeze:false },
  { name:'Diana Stone',    title:'Senior Partner',   personality:'analyst',     video:'/videos/5527757-uhd_3840_2160_25fps.mp4',      img:'https://i.pravatar.cc/400?img=39', gender:'f', freeze:false },
  { name:'R. Blake',       title:'Chief Examiner',   personality:'skeptic',     video:'/videos/6620539-uhd_3840_2160_25fpsMan.mp4',   img:'https://i.pravatar.cc/400?img=15', gender:'m', freeze:false },
  { name:'Lady Warren',    title:'Vice Chairman',    personality:'intimidator', video:'/videos/7224877-uhd_3840_2160_25fps.mp4',      img:'https://i.pravatar.cc/400?img=26', gender:'f', freeze:false },
  { name:'Sarah Chen',     title:'Founder & CEO',    personality:'friendly',    video:'/videos/8048249-hd_1920_1080_25fps.mp4',       img:'https://i.pravatar.cc/400?img=47', gender:'f', freeze:true },
  { name:'Marcus Reid',    title:'Investment Lead',  personality:'notetaker',   video:'/videos/8048256-hd_1920_1080_25fps.mp4',       img:'https://i.pravatar.cc/400?img=11', gender:'m', freeze:true },
  { name:'J. Pearce',      title:'Tech Lead',        personality:'analyst',     video:'/videos/7262257-uhd_3840_2160_25fps.mp4',      img:'https://i.pravatar.cc/400?img=33', gender:'m', freeze:true },
]

// Personality → animation + behaviour
const PERSONALITY = {
  intimidator: { anim:'intimidate',  dur:8,    note:false, label:'👁 The Intimidator', desc:'Barely moves. Just watches.' },
  analyst:     { anim:'analyse',     dur:6.5,  note:false, label:'🧠 The Analyst',     desc:'Processes every word.'       },
  skeptic:     { anim:'skeptic',     dur:7,    note:false, label:'🤨 The Skeptic',      desc:'Needs convincing.'           },
  friendly:    { anim:'friendly',    dur:5,    note:false, label:'😊 The Ally',         desc:'On your side. For now.'      },
  notetaker:   { anim:'notetaker',   dur:5.5,  note:true,  label:'✍️ The Note-Taker',   desc:'Writing everything down.'    },
}

const INTERRUPTS: Record<string, Record<string, string[]>> = {
  friendly: {
    intimidator: ['"Interesting. Go on."',         '"I\'m listening."',              '"Continue."'],
    analyst:     ['"Can you quantify that?"',       '"What\'s your evidence?"',       '"Elaborate."'],
    skeptic:     ['"I\'m not convinced yet."',      '"That\'s a bold claim."',        '"Prove it."'],
    friendly:    ['"Great point!"',                 '"I like where this is going."',  '"Tell us more."'],
    notetaker:   ['"Just a moment... *scribbles*"', '"Noted. Continue."',             '"Say that again?"'],
  },
  professional: {
    intimidator: ['"Is that your best answer?"',    '"We expected more."',            '"Next point."'],
    analyst:     ['"The data doesn\'t support that."','"Walk us through your logic."','"Quantify."'],
    skeptic:     ['"I\'ve heard this before."',     '"What makes you different?"',    '"Convince me."'],
    friendly:    ['"Can you elaborate on that?"',   '"Interesting perspective."',     '"Go on."'],
    notetaker:   ['"One moment... *writes*"',       '"Repeat that please."',          '"Spell that out."'],
  },
  tough: {
    intimidator: ['"Why should we believe you?"',  '"That\'s not good enough."',     '"You have 20 seconds."'],
    analyst:     ['"The numbers don\'t add up."',  '"Where\'s your proof?"',         '"That\'s speculation."'],
    skeptic:     ['"This is a waste of our time."','"I\'ve seen better."',           '"Come on."'],
    friendly:    ['"You\'re losing me."',          '"Focus. What\'s your point?"',   '"Speak up."'],
    notetaker:   ['"*tears page* Start over."',    '"I\'m writing \'weak\' here."',  '"Note to self: no."'],
  },
}

const MOOD_THEME = {
  friendly:     { bg:'#080F0A', table:'rgba(16,185,129,0.08)',  border:'rgba(16,185,129,0.25)', glow:'rgba(16,185,129,0.12)', accent:'#10B981', tag:'FRIENDLY PANEL',     light:'rgba(220,255,230,0.03)' },
  professional: { bg:'#080C14', table:'rgba(59,130,246,0.06)',  border:'rgba(59,130,246,0.20)', glow:'rgba(59,130,246,0.10)', accent:'#3B82F6', tag:'PROFESSIONAL PANEL', light:'rgba(200,220,255,0.03)' },
  tough:        { bg:'#0F0606', table:'rgba(239,68,68,0.08)',   border:'rgba(239,68,68,0.28)',  glow:'rgba(239,68,68,0.14)',  accent:'#EF4444', tag:'TOUGH PANEL',        light:'rgba(255,200,200,0.03)' },
}

type Mood = 'friendly'|'professional'|'tough'
type Personality = keyof typeof PERSONALITY

const KF = `
@keyframes intimidate { 0%,100%{transform:translateY(0) scale(1)} 60%{transform:translateY(-1px) scale(1.003)} }
@keyframes analyse    { 0%,100%{transform:rotate(0deg) translateX(0)} 30%{transform:rotate(-0.8deg) translateX(-1px)} 70%{transform:rotate(0.5deg) translateX(1px)} }
@keyframes skeptic    { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(-1.5deg) translateY(-1px)} 75%{transform:rotate(0.8deg)} }
@keyframes friendly   { 0%,100%{transform:rotate(0deg) translateY(0)} 35%{transform:rotate(-0.5deg) translateY(-2px)} 70%{transform:rotate(0.4deg) translateY(-1px)} }
@keyframes notetaker  { 0%,100%{transform:rotate(0deg)} 20%,60%{transform:rotate(-2deg) translateX(-2px)} 40%,80%{transform:rotate(1deg) translateX(1px)} }
@keyframes blink      { 0%,88%,100%{transform:scaleY(1)} 91%,95%{transform:scaleY(0.06)} }
@keyframes note-hand  { 0%,100%{transform:translateX(0) translateY(0) rotate(-10deg)} 25%{transform:translateX(4px) translateY(1px) rotate(-8deg)} 50%{transform:translateX(8px) translateY(2px) rotate(-11deg)} 75%{transform:translateX(4px) translateY(1px) rotate(-9deg)} }
@keyframes bubble-in  { 0%{opacity:0;transform:translateY(8px) scale(.93)} 14%{opacity:1;transform:translateY(0) scale(1)} 82%{opacity:1} 100%{opacity:0;transform:translateY(-6px)} }
@keyframes live-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes room-glow  { 0%,100%{opacity:0.6} 50%{opacity:1} }
@keyframes eyeshift   { 0%,100%{transform:translateX(0)} 40%{transform:translateX(-1.5px)} 70%{transform:translateX(1px)} }
`

function PanelistTile({ person, idx, mood, speaking, interrupt }: {
  person: typeof PEOPLE[0]
  idx: number
  mood: Mood
  speaking: boolean
  interrupt: { text:string; idx:number } | null
}) {
  const theme = MOOD_THEME[mood]
  const p     = PERSONALITY[person.personality as Personality]
  const isInterrupting = interrupt?.idx === idx
  const hasVideo = !!person.video
  const blinkDelay = [0, 1.8, 3.4, 0.9, 2.6][idx]

  return (
    <div style={{ position:'relative', aspectRatio:'16/9', background:'#1A1A1A', borderRadius:8, overflow:'hidden',
      border: isInterrupting ? `2px solid ${theme.accent}` : speaking ? '2px solid rgba(255,255,255,0.15)' : '2px solid transparent',
      boxShadow: isInterrupting ? `0 0 20px ${theme.glow}` : 'none',
      transition:'border-color 0.3s ease, box-shadow 0.3s ease',
    }}>

      {hasVideo ? (
        <video src={person.video} autoPlay={!person.freeze} muted loop playsInline
          onLoadedData={person.freeze ? e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 } : undefined}
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}
        />
      ) : (
        <div style={{ width:'100%', height:'100%', animation:`${p.anim} ${p.dur}s ease-in-out infinite`, transformOrigin:'bottom center' }}>
          <img src={person.img} alt={person.name}
            style={{
              width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block',
              filter: mood==='tough' ? 'brightness(0.82) contrast(1.10) saturate(0.65)'
                    : mood==='professional' ? 'brightness(0.90) saturate(0.80)' : 'brightness(1.0)',
              animation:`blink ${3+blinkDelay}s ease-in-out ${blinkDelay}s infinite`,
            }}
          />
        </div>
      )}

      {/* Bottom gradient */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'45%', pointerEvents:'none',
        background:'linear-gradient(transparent, rgba(0,0,0,0.85))',
      }}/>

      {/* LIVE dot top-left */}
      <div style={{ position:'absolute', top:8, left:8, display:'flex', alignItems:'center', gap:4,
        background:'rgba(0,0,0,0.55)', borderRadius:20, padding:'3px 7px', backdropFilter:'blur(4px)',
      }}>
        <div style={{ width:6, height:6, borderRadius:'50%',
          background: hasVideo ? '#EF4444' : 'rgba(255,255,255,0.2)',
          animation: hasVideo ? 'live-pulse 1.2s ease-in-out infinite' : 'none',
        }}/>
        <span style={{ fontSize:8, fontWeight:800, letterSpacing:'0.1em', color: hasVideo ? '#FCA5A5' : 'rgba(255,255,255,0.3)' }}>
          {hasVideo ? 'LIVE' : 'PHOTO'}
        </span>
      </div>

      {/* Name bottom-left */}
      <div style={{ position:'absolute', bottom:8, left:10 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#FFF', textShadow:'0 1px 4px rgba(0,0,0,0.8)' }}>{person.name}</div>
        <div style={{ fontSize:9, color:`${theme.accent}CC`, fontWeight:600 }}>{p.label}</div>
      </div>

      {/* Mic muted icon bottom-right */}
      <div style={{ position:'absolute', bottom:8, right:8,
        background:'rgba(239,68,68,0.85)', borderRadius:'50%', width:20, height:20,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:10,
      }}>🔇</div>

      {/* Speech bubble */}
      {isInterrupting && interrupt && (
        <div style={{
          position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)',
          background:'rgba(5,5,10,0.95)', border:`1px solid ${theme.border}`,
          borderRadius:10, padding:'7px 12px',
          animation:'bubble-in 4.2s ease forwards',
          zIndex:10, whiteSpace:'nowrap',
          boxShadow:`0 4px 20px ${theme.glow}`,
        }}>
          <p style={{ margin:0, fontSize:11, fontWeight:700, color:'#FFF', fontStyle:'italic', textAlign:'center' }}>
            {interrupt.text}
          </p>
        </div>
      )}
    </div>
  )
}

function fmt(s:number){ const m=Math.floor(s/60); return `${String(m).padStart(2,'0')}:${String(s%60).padStart(2,'0')}` }

export default function InterviewPanel({ mood, speaking, interruptions, count=3 }: {
  mood:Mood; speaking:boolean; interruptions:boolean; count?:number
}) {
  const theme   = MOOD_THEME[mood]
  const panel   = PEOPLE.slice(0, count)
  const [interrupt, setInterrupt] = useState<{ text:string; idx:number }|null>(null)
  const [elapsed, setElapsed]     = useState(0)
  const intRef  = useRef<ReturnType<typeof setTimeout>|null>(null)
  const tickRef = useRef<ReturnType<typeof setInterval>|null>(null)

  useEffect(()=>{
    if(speaking){ tickRef.current = setInterval(()=>setElapsed(e=>e+1),1000) }
    else { clearInterval(tickRef.current!); setElapsed(0) }
    return ()=>clearInterval(tickRef.current!)
  },[speaking])

  const schedule = useCallback(()=>{
    const delay=(mood==='tough'?5000:10000)+Math.random()*8000
    intRef.current=setTimeout(()=>{
      const pIdx  = Math.floor(Math.random()*count)
      const pType = panel[pIdx].personality as keyof typeof INTERRUPTS.friendly
      const list  = INTERRUPTS[mood][pType]
      setInterrupt({ text:list[Math.floor(Math.random()*list.length)], idx:pIdx })
      setTimeout(()=>{ setInterrupt(null); schedule() },4400)
    },delay)
  },[mood,count,panel])

  useEffect(()=>{
    if(!speaking||!interruptions){ clearTimeout(intRef.current!); setInterrupt(null); return }
    schedule()
    return ()=>clearTimeout(intRef.current!)
  },[speaking,interruptions,mood,count])

  // Grid columns: panelists + 1 "You" tile
  const cols = 2

  return (
    <div style={{ fontFamily:'system-ui,-apple-system,sans-serif', background:'#1C1C1C', borderRadius:14, overflow:'hidden',
      border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 24px 80px rgba(0,0,0,0.8)',
    }}>
      <style>{KF}</style>

      {/* ── TOP BAR ── */}
      <div style={{ background:'#252525', padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#EF4444', animation:'live-pulse 1.4s ease-in-out infinite' }}/>
          <span style={{ color:'#FFF', fontSize:13, fontWeight:600, letterSpacing:'-0.01em' }}>Panel Call</span>
          <span style={{ color:'rgba(255,255,255,0.25)', fontSize:12 }}>·</span>
          <span style={{ color:'rgba(255,255,255,0.4)', fontSize:12 }}>{PEOPLE.length + 1} participants</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ color:'rgba(255,255,255,0.5)', fontSize:12, fontVariantNumeric:'tabular-nums' }}>{fmt(elapsed)}</span>
          <div style={{ background:'#EF4444', borderRadius:4, padding:'2px 7px', fontSize:9, fontWeight:800, letterSpacing:'0.1em', color:'#FFF', animation:'live-pulse 1.4s ease-in-out infinite' }}>● REC</div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(0,0,0,0.4)', border:`1px solid ${theme.border}`,
            borderRadius:20, padding:'3px 10px',
          }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:theme.accent }}/>
            <span style={{ fontSize:9, fontWeight:800, letterSpacing:'0.15em', color:theme.accent }}>{theme.tag}</span>
          </div>
        </div>
      </div>

      {/* ── VIDEO GRID ── */}
      <div style={{ position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:3, padding:3, background:'#111' }}>
          {PEOPLE.slice(0,4).map((person,i)=>(
            <PanelistTile key={`${mood}-${i}`}
              person={person} idx={i} mood={mood}
              speaking={speaking} interrupt={interrupt}
            />
          ))}
        </div>

        {/* ── YOU pip — floating bottom-right ── */}
        <div style={{
          position:'absolute', bottom:12, right:12,
          width:'18%', aspectRatio:'16/9',
          background:'#0D0D0D', borderRadius:6, overflow:'hidden',
          border: speaking ? '2px solid #5558AF' : '2px solid rgba(255,255,255,0.15)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.8)',
          transition:'border-color 0.3s ease',
          zIndex:10,
        }}>
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
            background: speaking ? 'radial-gradient(ellipse at center, #1a1a3e, #0D0D0D)' : '#0D0D0D',
          }}>
            <span style={{ fontSize:18 }}>🎙</span>
          </div>
          <div style={{ position:'absolute', bottom:0, left:0, right:0,
            background:'linear-gradient(transparent, rgba(0,0,0,0.9))',
            padding:'6px 5px 3px',
          }}>
            <div style={{ fontSize:8, fontWeight:700, color:'#FFF' }}>You</div>
            <div style={{ fontSize:7, color: speaking ? '#818CF8' : 'rgba(255,255,255,0.3)' }}>
              {speaking ? '● Speaking' : '🔇 Muted'}
            </div>
          </div>
          {speaking && <div style={{ position:'absolute', inset:0, borderRadius:6, boxShadow:'inset 0 0 0 2px #5558AF', animation:'room-glow 2s ease-in-out infinite' }}/>}
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div style={{ background:'#252525', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        borderTop:'1px solid rgba(255,255,255,0.06)',
      }}>
        {[
          { icon: speaking ? '🎙' : '🔇', label: speaking ? 'Mute' : 'Unmute', active: speaking, color: speaking ? '#5558AF' : '#EF4444' },
          { icon:'📹', label:'Stop Video', active:false, color:'#EF4444' },
          { icon:'👥', label:'Participants', active:false, color:'rgba(255,255,255,0.5)' },
          { icon:'💬', label:'Chat', active:false, color:'rgba(255,255,255,0.5)' },
          { icon:'⋯',  label:'More', active:false, color:'rgba(255,255,255,0.5)' },
        ].map(btn=>(
          <div key={btn.label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'default', minWidth:52 }}>
            <div style={{ width:40, height:40, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16,
              background: btn.active ? `${btn.color}22` : 'rgba(255,255,255,0.06)',
              border:`1px solid ${btn.active ? btn.color+'44' : 'rgba(255,255,255,0.08)'}`,
            }}>{btn.icon}</div>
            <span style={{ fontSize:9, color:'rgba(255,255,255,0.35)', fontWeight:500 }}>{btn.label}</span>
          </div>
        ))}

        <div style={{ width:1, height:40, background:'rgba(255,255,255,0.08)', margin:'0 4px' }}/>

        {/* Leave button */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'default', minWidth:52 }}>
          <div style={{ width:40, height:40, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14,
            background:'#EF4444', border:'1px solid #DC2626',
          }}>📵</div>
          <span style={{ fontSize:9, color:'#FCA5A5', fontWeight:600 }}>Leave</span>
        </div>
      </div>

      {/* Status */}
      <div style={{ background:'#1C1C1C', padding:'8px 16px', textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ margin:0, fontSize:11, fontStyle:'italic', letterSpacing:'0.03em',
          color: speaking ? theme.accent : 'rgba(255,255,255,0.2)',
          transition:'color 0.5s ease',
        }}>
          {speaking ? "They're listening. Don't stop now." : "They're waiting. Tap the mic when you're ready."}
        </p>
      </div>
    </div>
  )
}
