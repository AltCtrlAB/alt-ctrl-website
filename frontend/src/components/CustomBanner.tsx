'use client'

import { useState } from 'react'

interface Contact {
  key: string
  label: string
  value: string
  href: string
}

const contacts: Contact[] = [
  {
    key: 'mail',
    label: 'Maila oss',
    value: 'contact@alltunderkontroll.se',
    href: 'mailto:contact@alltunderkontroll.se',
  },
  { key: 'tel', label: 'Ring oss', value: '+46 76 868 06 71', href: 'tel:+46768680671' },
  { key: 'fika', label: 'Boka en fika', value: '30 min - vi bjuder', href: '#kontakt' },
]

const iconPaths: Record<string, React.ReactNode> = {
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </>
  ),
  tel: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  fika: (
    <>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </>
  ),
}

export default function CustomBanner() {
  return (
    <section
      style={{
        padding: '0 clamp(1.5rem, 5vw, 3rem) clamp(3rem, 6vw, 6rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="banner-grid"
        style={{
          display: 'flex',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'start',
        }}
      >
        <div style={{ flex: '0 1 auto', width: '540px', maxWidth: '100%' }}>
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              lineHeight: 1.2,
              marginBottom: '0.85rem',
              whiteSpace: 'nowrap',
            }}
          >
            Vet ni inte var ni ska börja?
            <br />
            <span style={{ color: 'var(--accent)' }}>Det är precis där vi är starka.</span>
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Vi börjar alltid i verksamheten. Boka ett kostnadsfritt 30-minuterssamtal så identifierar vi era mest
            lönsamma förbättringsområden, med estimerad effekt i tid och kronor.
          </p>
        </div>

        <div
          className="banner-rows"
          style={{ border: '1px solid var(--border)', flex: '0 1 440px', minWidth: '300px', maxWidth: '100%' }}
        >
          {contacts.map((c, i) => (
            <ContactRow key={c.key} c={c} last={i === contacts.length - 1} />
          ))}
        </div>

        <div className="banner-buttons" style={{ gap: '0.85rem', flexWrap: 'wrap' }}>
          {contacts.map((c) => (
            <ActionButton key={c.key} c={c} />
          ))}
        </div>
      </div>

      <style>{`
        .banner-buttons { display: none; }
        @media (max-width: 840px) {
          .banner-grid { flex-direction: column !important; gap: 1rem !important; }
          .banner-rows { display: none !important; }
          .banner-buttons { display: flex !important; }
        }
      `}</style>
    </section>
  )
}

function ActionButton({ c }: { c: Contact }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={c.href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.85rem 1.4rem',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '4px',
        background: hovered ? 'var(--accent)' : 'transparent',
        color: hovered ? 'var(--white)' : 'var(--text)',
        fontFamily: 'var(--mono)',
        fontSize: '0.72rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {iconPaths[c.key]}
      </svg>
      {c.label}
    </a>
  )
}

function ContactRow({ c, last }: { c: Contact; last: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={c.href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.15rem 1.35rem',
        borderBottom: last ? 'none' : '1px solid var(--border)',
        textDecoration: 'none',
        background: hovered ? 'var(--bg-light)' : 'transparent',
        boxShadow: hovered ? 'inset 2px 0 0 var(--accent)' : 'none',
        transition: 'background 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          flexShrink: 0,
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          background: hovered ? 'var(--accent)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.25s',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke={hovered ? 'var(--white)' : 'var(--accent)'}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {iconPaths[c.key]}
        </svg>
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
          }}
        >
          {c.label}
        </span>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--text)' }}>{c.value}</span>
      </div>
      <span
        style={{
          marginLeft: 'auto',
          color: hovered ? 'var(--accent)' : 'var(--text-muted)',
          transition: 'color 0.25s, transform 0.25s',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          display: 'flex',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  )
}
