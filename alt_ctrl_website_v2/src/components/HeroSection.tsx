export default function HeroSection() {
  const badges = [
    'Business & Strategi',
    'AI & Automation',
    'Fullstack & Integration',
    'Compliance',
  ]

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem) 4rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          opacity: 0.08,
          background: `
            repeating-linear-gradient(0deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 40px)
          `,
          pointerEvents: 'none',
        }}
      />
      {/* Circle accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '450px',
          height: '450px',
          border: '1px solid var(--accent)',
          borderRadius: '50%',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--accent)',
          marginBottom: '2rem',
          position: 'relative',
          animation: 'fadeUp 0.8s ease both',
        }}
      >
        <span style={{ opacity: 0.6, marginRight: '0.5rem' }}>//</span>
        Allt Under Kontroll AB · Göteborg
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
          lineHeight: 1.1,
          maxWidth: '750px',
          marginBottom: '1.5rem',
          position: 'relative',
          letterSpacing: '-0.02em',
          animation: 'fadeUp 0.8s ease both',
          animationDelay: '0.05s',
        }}
      >
        Vi hittar var er tid och era pengar läcker{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
          — och täpper till det.
        </em>
      </h1>

      {/* Sub */}
      <p
        style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '520px',
          marginBottom: '2.5rem',
          lineHeight: 1.7,
          position: 'relative',
          animation: 'fadeUp 0.8s ease 0.15s both',
        }}
      >
        Manuella processer kostar mer än ni tror. Vi identifierar var insatsen
        är liten och effekten är stor — med business, strategi och AI under
        samma tak.
      </p>

      {/* Badges */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          position: 'relative',
          animation: 'fadeUp 0.8s ease 0.3s both',
        }}
      >
        {badges.map((badge) => (
          <HeroBadge key={badge} label={badge} />
        ))}
      </div>

      {/* Meta */}
      <div
        style={{
          marginTop: '4rem',
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          position: 'relative',
          animation: 'fadeUp 0.8s ease 0.45s both',
        }}
      >
        Tillgängliga för uppdrag · Hela Norden
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .hero-bg-decor { width: 100%; opacity: 0.04 !important; }
        }
      `}</style>
    </section>
  )
}

function HeroBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.25rem',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        fontFamily: 'var(--mono)',
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--text)',
        background: 'var(--bg-card)',
        transition: 'border-color 0.2s, color 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--accent)'
        el.style.color = 'var(--accent)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--border)'
        el.style.color = 'var(--text)'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          background: 'var(--accent)',
          borderRadius: '50%',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {label}
    </div>
  )
}
