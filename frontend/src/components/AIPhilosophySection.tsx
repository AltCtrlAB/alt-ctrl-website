'use client'

import { useInView } from '../hooks/useInView'

const principles = [
  {
    num: '01_',
    title: 'Beslutsunderlag, inte beslutsfattare',
    body: 'Vi bygger system som ger er bättre information, snabbare - inte system som bestämmer åt er. Beslutet förblir alltid hos er.',
  },
  {
    num: '02_',
    title: 'Rätt verktyg för rätt problem',
    body: 'Ibland är det en chatbot. Ibland är det RAG, automation eller en enkel integration. Vi väljer verktyg efter vad problemet faktiskt kräver - inte vad som är på modet.',
  },
  {
    num: '03_',
    title: 'Ni äger utfallet',
    body: 'Ansvar kan inte automatiseras. Systemet presenterar underlaget, experten värderar det, och ni fattar beslutet. Så har det alltid fungerat - vi ser till att det fortsätter så.',
  },
]

export default function AIPhilosophySection() {
  const { ref, inView } = useInView()

  const fade = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="ai"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-card)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120px',
          height: '2px',
          background: 'var(--accent)',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'start',
        }}
        className="ai-philosophy-grid"
      >
        <div>
          <div className="section-label" style={fade(0)}>
            Vår syn på AI
          </div>

          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1.75rem',
              ...fade(80),
            }}
          >
            AI i <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>loopen.</em>
            <br />
            Experten i <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>kontrollen.</em>
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '420px',
              marginBottom: '1.5rem',
              ...fade(160),
            }}
          >
            Vi vet när AI tillför värde och när det inte gör det. Det handlar inte om att välja bort tekniken - det
            handlar om att använda den med omdöme. Oavsett vad vi bygger gäller samma princip: systemet är
            beslutsunderlaget, ni är beslutsfattarna.
          </p>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: '470px',
              fontFamily: 'var(--mono)',
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '1rem',
              ...fade(220),
            }}
          >
            Det ger er kontroll. Och det ger er en partner som kan säga nej till AI när det faktiskt är rätt svar.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            border: '1px solid var(--border)',
          }}
        >
          {principles.map((p, i) => (
            <div
              key={p.num}
              style={{
                padding: '1.75rem 2rem',
                borderBottom: i < principles.length - 1 ? '1px solid var(--border)' : 'none',
                ...fade(200 + i * 80),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.65rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                  }}
                >
                  {p.num}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text)',
                  }}
                >
                  {p.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  paddingLeft: '2rem',
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ai-philosophy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
