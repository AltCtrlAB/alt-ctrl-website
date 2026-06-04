'use client'

import { useState } from 'react'

export default function Footer() {
  const [emailHov, setEmailHov] = useState(false)
  const [phoneHov, setPhoneHov] = useState(false)
  const [liHov, setLiHov] = useState(false)
  const [mailHov, setMailHov] = useState(false)
  const [telHov, setTelHov] = useState(false)

  return (
    <footer
      style={{
        padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border)',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
          }}
        >
          Kontakta oss
        </div>
        <a
          href="mailto:contact@alltunderkontroll.se"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.5rem',
            lineHeight: 1.1,
            color: emailHov ? 'var(--accent)' : 'var(--text)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={() => setEmailHov(true)}
          onMouseLeave={() => setEmailHov(false)}
        >
          contact@alltunderkontroll.se
        </a>
        <a
          href="tel:+46768680671"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.5rem',
            lineHeight: 1.1,
            color: phoneHov ? 'var(--accent)' : 'var(--text)',
            textDecoration: 'none',
            transition: 'color 0.2s',
            marginTop: '-0.35rem',
          }}
          onMouseEnter={() => setPhoneHov(true)}
          onMouseLeave={() => setPhoneHov(false)}
        >
          +46 76 868 06 71
        </a>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.02em',
          }}
        >
          Östra Hamngatan 16, 411 09 Göteborg, Sverige
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '1rem',
        }}
      >
        <div
          style={{
            order: 2,
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          &copy; 2026 Allt Under Kontroll AB
        </div>

        <div style={{ order: 1, display: 'flex', gap: '1rem' }}>
          <a
            href="https://www.linkedin.com/company/allt-under-kontroll/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              width: '38px',
              height: '38px',
              border: `1px solid ${liHov ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              background: liHov ? 'var(--accent)' : 'transparent',
              transition: 'all 0.2s',
            }}
            onMouseEnter={() => setLiHov(true)}
            onMouseLeave={() => setLiHov(false)}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke={liHov ? 'var(--white)' : 'var(--text-muted)'}
              fill="none"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M8 11v5M8 8v.01M12 16v-5c0-1 .6-2 2-2s2 1 2 2v5" />
            </svg>
          </a>

          <a
            href="mailto:contact@alltunderkontroll.se"
            aria-label="Email"
            style={{
              width: '38px',
              height: '38px',
              border: `1px solid ${mailHov ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              background: mailHov ? 'var(--accent)' : 'transparent',
              transition: 'all 0.2s',
            }}
            onMouseEnter={() => setMailHov(true)}
            onMouseLeave={() => setMailHov(false)}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke={mailHov ? 'var(--white)' : 'var(--text-muted)'}
              fill="none"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>

          <a
            href="tel:+46768680671"
            aria-label="Telefon"
            style={{
              width: '38px',
              height: '38px',
              border: `1px solid ${telHov ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              background: telHov ? 'var(--accent)' : 'transparent',
              transition: 'all 0.2s',
            }}
            onMouseEnter={() => setTelHov(true)}
            onMouseLeave={() => setTelHov(false)}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke={telHov ? 'var(--white)' : 'var(--text-muted)'}
              fill="none"
              strokeWidth="2"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
