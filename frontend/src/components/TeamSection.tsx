"use client"

import { useState } from 'react'
import { useInView } from '../hooks/useInView'

interface TeamMember {
  initials: string
  role: string
  name: string
  description: string
}

const team: TeamMember[] = [
  {
    initials: 'MM',
    role: 'Strategi & Compliance',
    name: 'Magnus Melén',
    description:
      'Leder förstudier och kartläggningar. Bakgrund från managementkonsulting med fokus på hållbarhet, compliance och NIS2. Förstår hur beslut fattas och vad som krävs för att en förändring faktiskt händer.',
  },
  {
    initials: 'FA',
    role: 'AI & Automation',
    name: 'Foad Alhayek',
    description:
      'Bygger automatiseringar och AI-lösningar som faktiskt hamnar i produktion. Djup kunskap i Python och moderna AI-verktyg, med fokus på att lösa verkliga problem, inte teknikdemos.',
  },
  {
    initials: 'JP',
    role: 'Fullstack & Ops',
    name: 'Jonathan Persson',
    description:
      'Bygger lösningarna och driver leveransen. Fullstack-utvecklare med bakgrund i operations och sälj. Ansvarar för att det vi lovar i förstudien faktiskt levereras, i tid och med mätbar effekt.',
  },
]

export default function TeamSection() {
  const { ref, inView } = useInView()

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="teamet"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label" style={fadeStyle(0)}>Teamet</div>
      <div className="section-title" style={fadeStyle(80)}>
        Business, strategi och teknik, utan mellanhänder.
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}
        className="team-grid-responsive"
      >
        {team.map((member) => (
          <TeamCard key={member.initials} member={member} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .team-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: hovered ? 'var(--bg-light)' : 'var(--bg)',
        padding: '2.5rem',
        transition: 'background 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? 'inset 2px 0 0 var(--accent)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', width: '48px', height: '48px', marginBottom: '1.5rem' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            background: hovered ? 'var(--accent-dark)' : 'var(--accent)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--white)',
            transition: 'background 0.3s',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {member.initials}
        </div>
        {hovered && (
          <div
            key={member.initials + '-ring'}
            aria-hidden
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: '1px solid var(--accent)',
              animation: 'avatarRing 0.6s ease-out forwards',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--accent)',
          marginBottom: '0.25rem',
        }}
      >
        {member.role}
      </div>

      <div
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '1.05rem',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        {member.name}
      </div>

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
        }}
      >
        {member.description}
      </p>
    </div>
  )
}
