"use client"

import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

interface Case {
  tag: string
  title: string
  client: string
  description: string
  metric: string
}

const cases: Case[] = [
  {
    tag: 'Hållbarhetsrapportering',
    title: 'Manuell insamling automatiserad',
    client: 'Processindustribolag · ~150 anställda',
    description:
      'En heltidstjänst gick till manuell datainsamling och sammanställning varje år, inför varje rapporteringsperiod. Data hämtades från flera system, formaterades för hand och kvalitetssäkrades i kalkylblad, ett flöde som var både sårbart och tidskrävande. Vi automatiserade hela kedjan i deras befintliga miljö utan att byta ett enda system.',
    metric: '~300 000 kr tidsbesparing per år',
  },
  {
    tag: 'AI in the Loop',
    title: 'Från 40 timmar till 2. Per produkt.',
    client: 'Produktbolag, industri · ~80 anställda',
    description:
      'Att skapa komplett produktinformation för en enskild produkt tog upp till 40 timmar. Research, skrivande och formatering gjordes manuellt av flera personer med ojämnt resultat. Vi byggde ett AI-drivet flöde som tar rådata från deras befintliga källor och genererar klar, konsekvent produktinformation på en bråkdel av tiden.',
    metric: '40h -> 2h per produkt',
  },
  {
    tag: 'Cybersäkerhet & NIS2',
    title: 'Compliance som inte kostar',
    client: 'Industribolag · 200+ leverantörer',
    description:
      'Med över 200 leverantörer var manuell compliance-uppföljning ohållbar. Ingen i organisationen hade full kontroll på status, dokumentation låg utspridd och revisionsrisken var påtaglig. Vi byggde ett centraliserat flöde som automatiskt samlar in, validerar och flaggar avvikelser, så teamet kan agera på undantag istället för att jaga data.',
    metric: '~1,5 MSEK lägre adminkostnad / år',
  },
]

export default function CasesSection() {
  const { ref, inView } = useInView()

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="case"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label" style={fadeStyle(0)}>Referenscase</div>
      <div className="section-title" style={fadeStyle(80)}>Så här ser det ut när det funkar.</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}
        className="cases-grid-responsive"
      >
        {cases.map((c) => (
          <CaseCard key={c.tag} caseItem={c} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cases-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function CaseCard({ caseItem }: { caseItem: Case }) {
  const [inView, setInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'var(--bg-light)'
        el.style.boxShadow = 'inset 2px 0 0 var(--accent)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'var(--bg)'
        el.style.boxShadow = 'none'
      }}
    >
      <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--accent)',
            marginBottom: '0.5rem',
          }}
        >
          {caseItem.tag}
        </div>

        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.35rem',
            lineHeight: 1.4,
          }}
        >
          {caseItem.title}
        </div>

        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}
        >
          {caseItem.client}
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {caseItem.description}
        </p>
      </div>

      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--accent)',
          padding: '1rem 2.5rem',
          borderTop: '1px solid var(--border)',
          background: 'rgba(59, 155, 98, 0.06)',
          letterSpacing: '0.02em',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
        }}
      >
        {caseItem.metric}
      </div>
    </div>
  )
}
