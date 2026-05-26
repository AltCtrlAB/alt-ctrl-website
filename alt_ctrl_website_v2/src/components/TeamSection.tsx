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
      'Management consulting, hållbarhet, processer och NIS2. Förstår hur beslut fattas i komplexa organisationer och vad som faktiskt driver förändring.',
  },
  {
    initials: 'FA',
    role: 'AI & Automation',
    name: 'Foad Alhayek',
    description:
      'AI/ML-expert med djup kunskap i Python och moderna AI-verktyg. Bygger produktionsfärdiga AI-lösningar som faktiskt levererar värde i verksamheten.',
  },
  {
    initials: 'JP',
    role: 'Fullstack & Operationer',
    name: 'Jonathan Persson',
    description:
      'Fullstack-utvecklare med starkt ben i både utveckling, processer och operations. Bygger lösningarna och ser till att de faktiskt levererar effekt i driften.',
  },
]

export default function TeamSection() {
  return (
    <section
      id="teamet"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">Teamet</div>
      <div className="section-title">
        Business, strategi och teknik — utan mellanhänder.
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
  return (
    <div
      style={{
        background: 'var(--bg)',
        padding: '2.5rem',
        transition: 'background 0.3s',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background =
          'var(--bg-light)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = 'var(--bg)')
      }
    >
      {/* Avatar */}
      <div
        style={{
          width: '48px',
          height: '48px',
          background: 'var(--accent)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--white)',
          marginBottom: '1.5rem',
        }}
      >
        {member.initials}
      </div>

      {/* Role */}
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

      {/* Name */}
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

      {/* Description */}
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
