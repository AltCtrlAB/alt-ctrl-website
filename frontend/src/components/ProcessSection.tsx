'use client'

import { useState } from 'react'
import { useInView } from '../hooks/useInView'

interface Phase {
  label: string
  name: string
  duration: string
  description: string
  isLast?: boolean
}

const phases: Phase[] = [
  {
    label: 'Steg 01_',
    name: 'Förstudie',
    duration: '2-3 veckor',
    description:
      'Vi kartlägger var tid och pengar försvinner. Ni får en prioriteringslista med estimerad effekt i tid och kronor. Ni vet exakt vad varje förbättring är värd innan ni beslutar.',
  },
  {
    label: 'Steg 02_',
    name: 'Implementation',
    duration: '4-16 veckor',
    description:
      'Vi bygger smarta lösningar i er befintliga miljö: automation, AI-verktyg och integrationer anpassade efter era faktiska flöden. Utan att byta system eller leverantör.',
  },
  {
    label: 'Steg 03_',
    name: 'Mät, justera, bygg vidare',
    duration: 'Löpande',
    description:
      'Vi följer upp med tydliga mätpunkter: tid sparad, kostnad reducerad, processer eliminerade. Löpande samarbete innebär att vi kontinuerligt identifierar nästa förbättring och att er plattform kompounderar i värde.',
    isLast: true,
  },
]

export default function ProcessSection() {
  const { ref, inView } = useInView()

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

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
        Från kartläggning till mätbar effekt. På veckor, inte år.
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}
        className="process-grid-responsive"
      >
        {phases.map((phase) => (
          <PhaseCard key={phase.label} phase={phase} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function PhaseCard({ phase }: { phase: Phase }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: hovered ? 'var(--bg-light)' : 'var(--bg)',
        padding: '2.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? 'inset 2px 0 0 var(--accent)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!phase.isLast && <div className="process-connector-arrow" aria-hidden />}

      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginBottom: '0.25rem',
        }}
      >
        {phase.label}
      </div>

      <div
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '1.5rem',
          marginBottom: '0.5rem',
        }}
      >
        {phase.name}
      </div>

      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.8rem',
          color: 'var(--accent)',
          marginBottom: '2rem',
          letterSpacing: '0.02em',
        }}
      >
        {phase.duration}
      </div>

      <div
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {phase.description}
      </div>
    </div>
  )
}
