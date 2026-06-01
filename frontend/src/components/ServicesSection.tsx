'use client'

import { useState } from 'react'
import { useInView } from '../hooks/useInView'

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
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    title: 'Processoptimering',
    description:
      'Kartläggning av manuella flöden och systematiska läckor. Vi identifierar var tid och pengar försvinner, och prioriterar insatser efter effekt.',
  },
  {
    num: '02_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
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
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
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
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    title: 'Regulatorisk Compliance',
    description:
      'Plattformar för automatiserad rapportering till myndigheter. Vi håller plattformen uppdaterad när regelverket ändras, utan att ni behöver göra något.',
  },
  {
    num: '05_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'Dashboards & BI',
    description: 'Ni ser avvikelser innan de eskalerar, med dashboard anpassat till era faktiska mätpunkter.',
  },
  {
    num: '06_',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Förvaltning & Drift',
    description:
      'Ni slipper förvalta lösningen själva. Vi äger ansvaret och bygger vidare efter era faktiska resultat.',
  },
]

export default function ServicesSection() {
  const { ref, inView } = useInView()

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="tjanster"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label" style={fadeStyle(0)}>
        Tjänster, allt på en plats
      </div>
      <div className="section-title" style={fadeStyle(80)}>
        Vi hittar rätt, och levererar.
      </div>

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
        transition: 'background 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? 'inset 2px 0 0 var(--accent)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'absolute',
          top: '2.5rem',
          right: '2.5rem',
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--accent)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hovered ? 'var(--accent)' : 'transparent',
          transition: 'background 0.2s',
          color: hovered ? 'var(--white)' : 'var(--accent)',
        }}
      >
        {service.icon}
      </div>

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

      <h3
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '1rem',
          color: 'var(--text)',
        }}
      >
        {service.title}
      </h3>

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
