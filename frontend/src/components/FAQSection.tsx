'use client'

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
      'Vi kartlägger era processer, identifierar manuella flöden och systematiska läckor, och prioriterar förbättringsområden efter estimerad effekt i tid och kronor. Ni får en tydlig prioriteringslista med uppskattad besparing per åtgärd - så ni kan fatta välgrundade beslut om vad som är värt att ta tag i, och i vilken ordning. Förstudien tar 2-3 veckor och kräver minimal tid från er sida.',
  },
  {
    num: '02_',
    question: 'Behöver vi byta ut våra befintliga system?',
    answer:
      'Nej. Vi bygger ovanpå det ni redan har. Inga nya system, ingen teknisk skuld, inga långa integrationer. De flesta bolag har redan tillräckligt bra verktyg - problemet är att de inte pratar med varandra och att det manuella arbetet hamnar mellan dem. Det är precis där vi kommer in.',
  },
  {
    num: '03_',
    question: 'Hur snabbt ser vi resultat?',
    answer:
      'Mätbar skillnad inom veckor, inte kvartal. Vi prioriterar insatser där insatsen är liten och effekten är stor, så att ni ser resultat tidigt i processen. De flesta kunder har sin första automationsvinst live inom fyra till sex veckor från projektstart. Sedan bygger vi vidare därifrån.',
  },
  {
    num: '04_',
    question: 'Vilken typ av bolag jobbar ni med?',
    answer:
      'Vi jobbar med svenska bolag som vill eliminera manuella steg, sänka kostnader och fatta snabbare beslut. Våra kunder finns främst inom industri, tillverkning och regulatoriskt tunga branscher, men metodiken fungerar oavsett bransch. Det viktigaste är inte storleken på bolaget, utan viljan att arbeta smartare.',
  },
  {
    num: '05_',
    question: 'Vad kostar det?',
    answer:
      'Förstudien prissätts som ett fast uppdrag och beror på er komplexitet och antal processer vi tittar på. Implementation prissätts per leverans, inte per timme - ni vet vad ni betalar innan vi sätter igång. Vi undviker löpande räkning för att hålla incitamenten rätt. Hör av er så ger vi en indikation efter ett kort samtal.',
  },
  {
    num: '06_',
    question: 'Använder ni AI i alla lösningar?',
    answer:
      'Inte nödvändigtvis. Vi väljer verktyg efter problem, inte tvärtom. Ibland är en enkel integration eller ett automatiserat rapportflöde det rätta. AI används när det faktiskt ger mätbar nytta - inte för att det låter bra i en presentation. Det händer att vi rekommenderar något som inte involverar AI alls, och det är vi stolta över.',
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="faq-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 7fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'start',
        }}
      >
        <div className="faq-heading" style={{ position: 'sticky', top: '6rem' }}>
          <div className="section-label">Vanliga frågor</div>
          <div className="section-title" style={{ marginBottom: '1.25rem' }}>
            Frågor &amp; svar.
          </div>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
            }}
          >
            Hittar du inte svaret du söker?
            <br />
            Hör av dig så reder vi ut det.
          </p>
        </div>

        <div>
          {faqItems.map((item) => (
            <FAQItemComponent key={item.num} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-heading { position: static !important; }
        }
      `}</style>
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

      <div
        style={{
          maxHeight: open ? '400px' : '0',
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
