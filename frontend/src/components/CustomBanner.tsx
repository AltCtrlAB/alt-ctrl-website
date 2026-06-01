'use client'

import { useState } from 'react'

export default function CustomBanner() {
  const [mailHov, setMailHov] = useState(false)
  const [bookHov, setBookHov] = useState(false)

  const btnBase = {
    padding: '0.65rem 1.25rem',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    background: 'none',
    fontFamily: 'var(--mono)',
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--text)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'inline-block',
  }

  return (
    <div
      style={{
        padding: 'clamp(1.5rem, 3vw, 3rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.15rem',
              maxWidth: '550px',
            }}
          >
            Vet ni inte var ni ska börja? Det är precis där vi är starka.
          </h3>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              maxWidth: '550px',
              marginTop: '0.5rem',
              lineHeight: 1.6,
            }}
          >
            Vi börjar alltid i verksamheten. Boka ett kostnadsfritt 30-minuterssamtal så identifierar vi era mest
            lönsamma förbättringsområden, med estimerad effekt i tid och kronor.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="mailto:info@alltunderkontroll.se"
            style={{
              ...btnBase,
              borderColor: mailHov ? 'var(--accent)' : 'var(--border)',
              color: mailHov ? 'var(--accent)' : 'var(--text)',
            }}
            onMouseEnter={() => setMailHov(true)}
            onMouseLeave={() => setMailHov(false)}
          >
            Maila oss
          </a>
          <a
            href="#kontakt"
            style={{
              ...btnBase,
              borderColor: bookHov ? 'var(--accent)' : 'var(--border)',
              color: bookHov ? 'var(--accent)' : 'var(--text)',
            }}
            onMouseEnter={() => setBookHov(true)}
            onMouseLeave={() => setBookHov(false)}
          >
            Boka samtal
          </a>
        </div>
      </div>
    </div>
  )
}
