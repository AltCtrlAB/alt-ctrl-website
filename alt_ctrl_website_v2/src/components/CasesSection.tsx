interface Case {
  tag: string
  title: string
  description: string
  metric: string
}

const cases: Case[] = [
  {
    tag: 'Hållbarhetsrapportering',
    title: 'Manuell insamling automatiserad',
    description:
      'Processindustribolag. Manuell insamling och sammanställning band upp en heltidstjänst delar av året. Vi automatiserade flödet i deras befintliga miljö.',
    metric: '~300 000 kr tidsbesparing per år',
  },
  {
    tag: 'AI in the Loop',
    title: 'Produktinformation på minuter',
    description:
      'Stor biltillverkare, Göteborg. Att skapa produktinformation per produkt tog 40 timmar — manuellt och inkonsistent. Med AI in the loop kortades flödet drastiskt.',
    metric: '40h → 2h per produkt',
  },
  {
    tag: 'Cybersäkerhet & NIS2',
    title: 'Compliance som inte kostar',
    description:
      'Industribolag, Supply chain. Manuell hantering av leverantörscompliance var kostsam och skapade regulatorisk exponering. Vi byggde ett strömlinjeformat flöde.',
    metric: '~1,5 MSEK lägre adminkostnad / år',
  },
]

export default function CasesSection() {
  return (
    <section
      id="case"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">Referenscase</div>
      <div className="section-title">Så här ser det ut när det funkar.</div>

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
  return (
    <div
      style={{
        background: 'var(--bg)',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
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
          marginBottom: '1rem',
          lineHeight: 1.4,
        }}
      >
        {caseItem.title}
      </div>

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          flex: 1,
        }}
      >
        {caseItem.description}
      </p>

      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--accent)',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        {caseItem.metric}
      </div>
    </div>
  )
}
