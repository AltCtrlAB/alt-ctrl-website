'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

interface Phase {
  num: string
  name: string
  duration: string
  description: string
}

const phases: Phase[] = [
  {
    num: '1',
    name: 'Förstudie',
    duration: '2-3 veckor',
    description:
      'Vi kartlägger var tid och pengar försvinner. Ni får en prioriteringslista med estimerad effekt i tid och kronor. Ni vet exakt vad varje förbättring är värd innan ni beslutar.',
  },
  {
    num: '2',
    name: 'Implementation',
    duration: '4-16 veckor',
    description:
      'Vi bygger smarta lösningar i er befintliga miljö: automation, AI-verktyg och integrationer anpassade efter era faktiska flöden. Utan att byta system eller leverantör.',
  },
  {
    num: '3',
    name: 'Mät, justera, bygg vidare',
    duration: 'Löpande',
    description:
      'Vi följer upp med tydliga mätpunkter: tid sparad, kostnad reducerad, processer eliminerade. Löpande samarbete innebär att vi kontinuerligt identifierar nästa förbättring och att er plattform kompounderar i värde.',
  },
]

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

// Fallback node positions (fractions of road width) until measured.
const FALLBACK_THRESHOLDS = [0.18, 0.5, 0.82]
const FALLBACK_GOAL = 0.97

export default function ProcessSection() {
  const { ref, inView } = useInView()

  // Scroll progress 0 → 1, scrubbed by the road's position in the viewport.
  const [progress, setProgress] = useState(0)
  const [thresholds, setThresholds] = useState<number[]>(FALLBACK_THRESHOLDS)
  const [goalThreshold, setGoalThreshold] = useState(FALLBACK_GOAL)

  const roadRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const goalRef = useRef<HTMLDivElement>(null)

  // Measure each node's horizontal centre as a fraction of the road width,
  // so the green tip and the node's colour change line up exactly.
  const measure = useCallback(() => {
    const grid = gridRef.current
    if (!grid || grid.offsetParent === null) return // skip when desktop grid is display:none
    const g = grid.getBoundingClientRect()
    if (g.width === 0) return
    const next = nodeRefs.current.map((n) => {
      if (!n) return 0
      const r = n.getBoundingClientRect()
      return (r.left + r.width / 2 - g.left) / g.width
    })
    setThresholds(next)
    if (goalRef.current) {
      const r = goalRef.current.getBoundingClientRect()
      setGoalThreshold((r.left + r.width / 2 - g.left) / g.width)
    }
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    let raf = 0
    let target = 0
    let displayed = 0

    // Scroll position → where the fill *should* be. Fill as the road travels from 75% → 30%
    // of the viewport height - a wide band so the 1→2→3 milestones spread out, while
    // completion (30%) still sits above where it rests after a "#metod" jump.
    const computeTarget = () => {
      const el = roadRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      target = clamp((vh * 0.75 - rect.top) / (vh * 0.45), 0, 1)
    }

    // Ease the displayed fill toward the target so discrete mouse-wheel jumps glide
    // instead of teleporting. Continuous scrollbar dragging stays responsive.
    const animate = () => {
      const diff = target - displayed
      if (Math.abs(diff) < 0.0015) {
        displayed = target
        setProgress(displayed)
        raf = 0
        return
      }
      displayed += diff * 0.06
      setProgress(displayed)
      raf = requestAnimationFrame(animate)
    }

    const onScroll = () => {
      computeTarget()
      if (!raf) raf = requestAnimationFrame(animate)
    }

    // Initialise without animating (so a fresh load / navbar jump lands settled).
    computeTarget()
    displayed = target
    setProgress(displayed)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  const eps = 0.001
  const nodeActive = phases.map((_, i) => progress >= (thresholds[i] ?? FALLBACK_THRESHOLDS[i] ?? 1) - eps)
  const goalActive = progress >= goalThreshold - eps
  // Only the most recently reached milestone (the "frontier") ripples - so a new
  // trigger stops the previous one and the two never overlap.
  const frontierNode = goalActive ? -1 : nodeActive.lastIndexOf(true)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="metod"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label" style={fadeStyle(0)}>
        Så här arbetar vi
      </div>
      <div className="section-title" style={fadeStyle(80)}>
        En tydlig väg från start till mätbar effekt.
      </div>

      <div ref={roadRef}>
        {/* ───────── Desktop: horizontal road ───────── */}
        <div
          ref={gridRef}
          className="road-desktop"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr 1fr 1fr auto',
            columnGap: '1.5rem',
            rowGap: '1.75rem',
          }}
        >
          {/* Grey base line */}
          <div
            aria-hidden
            style={{
              gridColumn: '1 / -1',
              gridRow: 1,
              alignSelf: 'center',
              height: '2px',
              background: 'var(--border)',
              position: 'relative',
              zIndex: 0,
            }}
          />
          {/* Green progress line - scaleX follows scroll */}
          <div
            aria-hidden
            style={{
              gridColumn: '1 / -1',
              gridRow: 1,
              alignSelf: 'center',
              height: '2px',
              background: 'var(--accent)',
              transform: `scaleX(${progress})`,
              transformOrigin: 'left center',
              willChange: 'transform',
              position: 'relative',
              zIndex: 0,
            }}
          />

          {/* Start cap */}
          <div
            style={{
              gridColumn: 1,
              gridRow: 1,
              alignSelf: 'center',
              justifySelf: 'start',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'var(--bg)',
              paddingRight: '0.85rem',
            }}
          >
            <span style={{ width: '0.7rem', height: '0.7rem', borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ ...capLabelStyle, color: 'var(--accent)' }}>Start</span>
          </div>

          {/* Milestone nodes - left-aligned in each column, above their text */}
          {phases.map((phase, i) => (
            <div
              key={phase.num}
              ref={(el) => {
                nodeRefs.current[i] = el
              }}
              style={{
                gridColumn: i + 2,
                gridRow: 1,
                alignSelf: 'center',
                justifySelf: 'start',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <MilestoneNode num={phase.num} active={nodeActive[i] ?? false} ripple={frontierNode === i} />
            </div>
          ))}

          {/* Goal cap */}
          <div
            ref={goalRef}
            style={{
              gridColumn: 5,
              gridRow: 1,
              alignSelf: 'center',
              justifySelf: 'end',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'var(--bg)',
              paddingLeft: '0.85rem',
            }}
          >
            <span
              style={{
                ...capLabelStyle,
                color: goalActive ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'color 0.35s ease',
              }}
            >
              Mätbar effekt
            </span>
            <GoalNode active={goalActive} ripple={goalActive} />
          </div>

          {/* Text under each milestone */}
          {phases.map((phase, i) => (
            <div
              key={phase.num}
              style={{ gridColumn: i + 2, gridRow: 2, textAlign: 'left', ...fadeStyle(160 + i * 90) }}
            >
              <StepText phase={phase} />
            </div>
          ))}
        </div>

        {/* ───────── Mobile: vertical road ───────── */}
        <div className="road-mobile">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.25rem' }}>
            <div style={{ width: '2.5rem', display: 'flex', justifyContent: 'center' }}>
              <span style={{ width: '0.7rem', height: '0.7rem', borderRadius: '50%', background: 'var(--accent)' }} />
            </div>
            <span style={{ ...capLabelStyle, color: 'var(--accent)' }}>Start</span>
          </div>

          {phases.map((phase, i) => {
            const active = nodeActive[i] ?? false
            return (
              <div key={phase.num} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <MilestoneNode num={phase.num} active={active} ripple={frontierNode === i} />
                  <div
                    style={{
                      position: 'relative',
                      width: '2px',
                      flex: 1,
                      minHeight: '1.5rem',
                      background: 'var(--border)',
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--accent)',
                        transformOrigin: 'top',
                        transform: `scaleY(${active ? 1 : 0})`,
                        transition: 'transform 0.4s ease',
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    paddingBottom: i === phases.length - 1 ? '0.5rem' : '1.5rem',
                    flex: 1,
                    ...fadeStyle(160 + i * 90),
                  }}
                >
                  <StepText phase={phase} />
                </div>
              </div>
            )
          })}

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '2.5rem', display: 'flex', justifyContent: 'center' }}>
              <GoalNode active={goalActive} ripple={goalActive} />
            </div>
            <span
              style={{
                ...capLabelStyle,
                color: goalActive ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'color 0.35s ease',
              }}
            >
              Mätbar effekt
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          0%   { transform: scale(0.9); opacity: 0.65; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .road-mobile { display: none; }
        @media (max-width: 900px) {
          .road-desktop { display: none !important; }
          .road-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

const capLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--text-muted)',
  whiteSpace: 'nowrap',
}

/** Several concentric rings radiating outward from the node centre. */
function Ripples({ count = 3, duration = 2 }: { count?: number; duration?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid var(--accent)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            animation: `ripple ${duration}s ease-out ${((i * duration) / count).toFixed(2)}s 1 forwards`,
          }}
        />
      ))}
    </>
  )
}

function MilestoneNode({ num, active, ripple }: { num: string; active: boolean; ripple: boolean }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {ripple && <Ripples count={3} duration={1.2} />}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          background: active ? 'var(--accent)' : 'var(--bg-card)',
          color: active ? 'var(--white)' : 'var(--text-muted)',
          fontFamily: 'var(--mono)',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid var(--bg)',
          boxShadow: `0 0 0 1px ${active ? 'var(--accent)' : 'var(--border)'}`,
          transition: 'background 0.35s ease, color 0.35s ease, box-shadow 0.4s ease',
        }}
      >
        {num}
      </span>
    </span>
  )
}

function GoalNode({ active, ripple }: { active: boolean; ripple: boolean }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {ripple && <Ripples count={3} duration={1.1} />}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          width: '1.2rem',
          height: '1.2rem',
          borderRadius: '50%',
          background: active ? 'var(--accent)' : 'var(--bg-card)',
          color: active ? 'var(--white)' : 'var(--text-muted)',
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 0 1px ${active ? 'var(--accent)' : 'var(--border)'}`,
          transition: 'background 0.35s ease, color 0.35s ease, box-shadow 0.4s ease',
        }}
      >
        ✓
      </span>
    </span>
  )
}

function StepText({ phase }: { phase: Phase }) {
  return (
    <>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>{phase.name}</div>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          color: 'var(--accent)',
          letterSpacing: '0.04em',
          marginBottom: '0.85rem',
        }}
      >
        {phase.duration}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{phase.description}</div>
    </>
  )
}
