import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

interface Phase {
  label: string
  name: string
  duration: string
  description: string
}

const phases: Phase[] = [
  {
    label: 'Fas 01_',
    name: 'Förstudie',
    duration: '2–3 veckor',
    description:
      'Vi kartlägger var tid och pengar läcker. Identifierar era mest lönsamma förbättringsområden. Ni får en prioriteringslista med estimerad effekt i tid och kronor.',
  },
  {
    label: 'Fas 02_',
    name: 'Implementation',
    duration: '4–16 veckor',
    description:
      'Vi bygger och implementerar utan att byta system eller leverantör. Verktygen anpassas till hur ni faktiskt jobbar — inte tvärtom. Snabb, mätbar effekt.',
  },
  {
    label: 'Fas 03_',
    name: 'Iterera & Förvalta',
    duration: 'Löpande',
    description:
      'Vi mäter, justerar och bygger vidare. Många engagemang övergår i löpande samarbete med tydliga mätpunkter och effektmål. Plattformen blir bättre över tid.',
  },
]

export default function ProcessSection() {
  return (
    <section
      id="metod"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
        }}
      >
        Så här arbetar vi
      </div>
      <div className="section-title">
        Från kartläggning till mätbar effekt. På veckor — inte år.
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
        transition: 'background 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Arrow circle */}
      <div
        style={{
          position: 'absolute',
          top: '2.5rem',
          right: '2.5rem',
          width: '28px',
          height: '28px',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hovered ? 'var(--accent)' : 'transparent',
          transition: 'all 0.2s',
        }}
      >
        <ArrowUpRight
          size={12}
          color={hovered ? 'var(--white)' : 'var(--text-muted)'}
          strokeWidth={2}
        />
      </div>

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
