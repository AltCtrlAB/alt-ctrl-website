import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

interface Service {
  num: string
  icon: React.ReactNode
  title: string
  description: string
}

const services: Service[] = [
  {
    num: '01_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent)" fill="none" strokeWidth="1.5">
        <path d="M9 19V6l12-3v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    title: 'Processoptimering',
    description:
      'Kartläggning av manuella flöden och systematiska läckor. Vi identifierar var tid och pengar försvinner — och prioriterar insatser efter effekt.',
  },
  {
    num: '02_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent)" fill="none" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Dataintegrering',
    description:
      'Sammankopplar era befintliga system utan att byta ut något. Validerar, harmoniserar och strukturerar data så att rapportering bygger på samma underlag.',
  },
  {
    num: '03_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent)" fill="none" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'AI & Automation',
    description:
      'AI när det faktiskt hjälper. Vi väljer verktyg efter problem, inte tvärtom. Produktionsfärdiga AI-lösningar som levererar mätbart värde.',
  },
  {
    num: '04_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent)" fill="none" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    title: 'Regulatorisk Compliance',
    description:
      'Plattformar för automatiserad rapportering till myndigheter. Korrekt, spårbar och med inbyggd regelverksuppdatering.',
  },
  {
    num: '05_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent)" fill="none" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'Dashboards & BI',
    description:
      'Realtidsövervakning av datakvalitet, deadlines och avvikelser. Från reaktivt arbete till proaktiv kontroll med tidiga varningar.',
  },
  {
    num: '06_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent)" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Förvaltning & Drift',
    description:
      'Löpande samarbete med tydliga mätpunkter och effektmål. Vi mäter, justerar och bygger vidare. Plattformen blir bättre över tid.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="tjanster"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">Tjänster, allt på en plats</div>
      <div className="section-title">Business och teknik under samma tak.</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          marginTop: '2rem',
        }}
        className="services-grid-responsive"
      >
        {services.map((s) => (
          <ServiceCard key={s.num} service={s} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: hovered ? 'var(--bg-light)' : 'var(--bg)',
        padding: '2.5rem',
        position: 'relative',
        transition: 'background 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Arrow circle — top right */}
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

      {/* Number */}
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          color: 'var(--accent)',
          marginBottom: '1.5rem',
          letterSpacing: '0.05em',
        }}
      >
        {service.num}
      </div>

      {/* Icon */}
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--accent)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '1rem',
          color: 'var(--text)',
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
        }}
      >
        {service.description}
      </p>
    </div>
  )
}
