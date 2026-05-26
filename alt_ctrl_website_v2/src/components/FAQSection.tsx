import { useState } from 'react'

interface FAQItem {
  num: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    num: '01_',
    question: 'Vad ingår i förstudien?',
    answer:
      'Vi kartlägger era processer, identifierar manuella flöden och systematiska läckor, och prioriterar förbättringsområden efter estimerad effekt i tid och kronor. Förstudien tar 2–3 veckor.',
  },
  {
    num: '02_',
    question: 'Behöver vi byta ut våra befintliga system?',
    answer:
      'Nej. Vi bygger ovanpå det ni redan har. Inga nya system, ingen teknisk skuld, inga långa integrationer. Vi gör det ni redan har smartare.',
  },
  {
    num: '03_',
    question: 'Hur snabbt ser vi resultat?',
    answer:
      'Mätbar skillnad inom veckor, inte kvartal. Vi prioriterar insatser där insatsen är liten och effekten är stor, så att ni ser resultat tidigt i processen.',
  },
  {
    num: '04_',
    question: 'Vilken typ av bolag jobbar ni med?',
    answer:
      'Vi har jobbat med allt från Volvo och Stena till bolag i er storlek. Samma metodik — anpassad till er kontext. Vi är starkast inom industri, tillverkning och regulatoriskt tunga branscher.',
  },
]

export default function FAQSection() {
  return (
    <section
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-label">Vanliga frågor</div>
      <div className="section-title">Frågor &amp; svar.</div>

      <div style={{ maxWidth: '720px' }}>
        {faqItems.map((item) => (
          <FAQItemComponent key={item.num} item={item} />
        ))}
      </div>
    </section>
  )
}

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '1.5rem 0',
      }}
    >
      {/* Question row */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '2rem',
          background: 'none',
          border: 'none',
          width: '100%',
          textAlign: 'left',
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            color: 'var(--accent)',
            marginRight: '1rem',
            flexShrink: 0,
          }}
        >
          {item.num}
        </span>
        <p
          style={{
            flex: 1,
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--text)',
          }}
        >
          {item.question}
        </p>
        {/* Toggle button */}
        <div
          style={{
            width: '28px',
            height: '28px',
            border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--mono)',
            fontSize: '1rem',
            color: open ? 'var(--white)' : 'var(--text-muted)',
            background: open ? 'var(--accent)' : 'none',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          +
        </div>
      </button>

      {/* Answer */}
      <div
        style={{
          maxHeight: open ? '240px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, padding 0.35s ease',
          paddingTop: open ? '1rem' : '0',
        }}
      >
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            paddingLeft: '2.75rem',
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  )
}
