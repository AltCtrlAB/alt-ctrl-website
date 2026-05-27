import { useState, useEffect } from 'react'

function LogoMark() {
  const [active, setActive] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.ctrlKey) {
        setActive(true)
        setTimeout(() => setActive(false), 1200)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <a
      href="#"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        fontFamily: 'var(--mono)',
        fontSize: '1.15rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        textDecoration: 'none',
        color: 'var(--text)',
        display: 'inline-flex',
        gap: 0,
      }}
      aria-label="alt_ctrl_ - hem"
    >
      <span
        style={{
          opacity: hovering ? 0.5 : 1,
          transition: 'opacity 0.15s',
          transitionDelay: hovering ? '0ms' : '80ms',
        }}
      >
        alt_
      </span>
      <span
        style={{
          color: active ? 'var(--text)' : 'var(--accent)',
          transition: 'color 0.2s, font-style 0.1s',
          fontStyle: active ? 'italic' : 'normal',
        }}
      >
        ctrl
      </span>
      <span
        style={{
          color: 'var(--accent)',
          opacity: hovering ? 0.5 : 1,
          transition: 'opacity 0.15s',
          transitionDelay: hovering ? '160ms' : '40ms',
        }}
      >
        _
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#tjanster', label: 'Tjänster' },
    { href: '#metod', label: 'Metod' },
    { href: '#ai', label: 'Vår syn' },
    { href: '#case', label: 'Case' },
    { href: '#teamet', label: 'Teamet' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 3rem',
        background: scrolled
          ? 'rgba(230, 226, 220, 0.96)'
          : 'rgba(230, 226, 220, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-light)',
        transition: 'background 0.3s',
      }}
    >
      <LogoMark />

      {/* Desktop nav */}
      <div
        style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
        className="hidden-mobile"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = 'var(--accent)')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)')
            }
          >
            {link.label}
          </a>
        ))}
        <a
          href="#kontakt"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            background: 'var(--accent)',
            color: 'var(--white)',
            padding: '0.5rem 1.25rem',
            borderRadius: '4px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLAnchorElement).style.background = 'var(--accent-dark)')
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLAnchorElement).style.background = 'var(--accent)')
          }
        >
          Kontakt
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: 'var(--text)',
        }}
        className="show-mobile"
        aria-label="Menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(230, 226, 220, 0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
          className="show-mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                color: 'var(--text-secondary)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              background: 'var(--accent)',
              color: 'var(--white)',
              padding: '0.65rem 1.25rem',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            Kontakt
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile   { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
