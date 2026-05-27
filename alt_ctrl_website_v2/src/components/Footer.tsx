import { useState } from 'react'

export default function Footer() {
  const [emailHov, setEmailHov] = useState(false)
  const [liHov, setLiHov] = useState(false)
  const [mailHov, setMailHov] = useState(false)

  return (
    <footer
      style={{
        padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border)',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}
    >
      {/* Left */}
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
          href="mailto:info@alltunderkontroll.se"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '1.5rem',
            color: emailHov ? 'var(--accent)' : 'var(--text)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={() => setEmailHov(true)}
          onMouseLeave={() => setEmailHov(false)}
        >
          info@alltunderkontroll.se
        </a>
      </div>

      {/* Right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          © 2026 Allt Under Kontroll AB
        </div>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* LinkedIn */}
          <a
            href="#"
            aria-label="LinkedIn"
            style={{
              width: '32px',
              height: '32px',
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
              width="14"
              height="14"
              stroke={liHov ? 'var(--white)' : 'var(--text-muted)'}
              fill="none"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M8 11v5M8 8v.01M12 16v-5c0-1 .6-2 2-2s2 1 2 2v5" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:info@alltunderkontroll.se"
            aria-label="Email"
            style={{
              width: '32px',
              height: '32px',
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
              width="14"
              height="14"
              stroke={mailHov ? 'var(--white)' : 'var(--text-muted)'}
              fill="none"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
