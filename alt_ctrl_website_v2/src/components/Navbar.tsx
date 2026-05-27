import { useState, useEffect, useRef } from 'react'

function RobotIcon({ progress }: { progress: number }) {
  // Legs alternate based on scroll position for a walking effect
  const step = Math.floor(progress * 40) % 2 === 0
  const color = 'var(--accent)'

  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Antenna */}
      <line x1="10" y1="0" x2="10" y2="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="1" r="1" fill={color} />
      {/* Head */}
      <rect x="5" y="3" width="10" height="7" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Eyes */}
      <circle cx="8" cy="6.5" r="1" fill={color} />
      <circle cx="12" cy="6.5" r="1" fill={color} />
      {/* Body */}
      <rect x="4" y="11" width="12" height="7" rx="1.5" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Chest dot */}
      <circle cx="10" cy="14.5" r="1" fill={color} />
      {/* Arms */}
      <line x1="4" y1="13" x2="1" y2={step ? "15" : "16"} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="13" x2="19" y2={step ? "16" : "15"} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="7.5" y1="18" x2={step ? "6" : "7.5"} y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.5" y1="18" x2={step ? "12.5" : "14"} y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

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
  const [progress, setProgress] = useState(0)
  const [flagPositions, setFlagPositions] = useState<{ id: string; label: string; pct: number }[]>([])

  const navLinks = [
    { href: '#metod', label: 'Metod' },
    { href: '#tjanster', label: 'Tjänster' },
    { href: '#ai', label: 'Vår syn' },
    { href: '#case', label: 'Case' },
    { href: '#teamet', label: 'Teamet' },
    { href: '#faq', label: 'FAQ' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Measure section positions after paint
  useEffect(() => {
    const measure = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const positions = navLinks
        .map(({ href, label }) => {
          const id = href.replace('#', '')
          const el = document.getElementById(id)
          if (!el) return null
          return { id, label, pct: Math.min(el.offsetTop / docHeight, 1) }
        })
        .filter(Boolean) as { id: string; label: string; pct: number }[]
      setFlagPositions(positions)
    }
    // Wait for layout
    const t = setTimeout(measure, 300)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      {/* Scroll progress robot track */}
      <div
        className="hidden-mobile"
        style={{
          flex: 1,
          margin: '0 2.5rem',
          position: 'relative',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Floor line */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '1px',
          background: 'var(--border)',
        }} />
        {/* Section flags */}
        {flagPositions.map((flag) => (
          <a
            key={flag.id}
            href={`#${flag.id}`}
            title={flag.label}
            style={{
              position: 'absolute',
              left: `${flag.pct * 100}%`,
              bottom: '1px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              transform: 'translateX(-50%)',
            }}
          >
            {/* Flag label */}
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.45rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: progress >= flag.pct ? 'var(--accent)' : 'var(--text-muted)',
              whiteSpace: 'nowrap',
              marginBottom: '1px',
              transition: 'color 0.3s',
            }}>
              {flag.label}
            </span>
            {/* Flag pole */}
            <span style={{
              width: '1px',
              height: '5px',
              background: progress >= flag.pct ? 'var(--accent)' : 'var(--border)',
              display: 'block',
              transition: 'background 0.3s',
            }} />
          </a>
        ))}
        {/* Robot */}
        <div style={{
          position: 'absolute',
          left: `calc(${progress * 100}% - 10px)`,
          bottom: '1px',
          transition: 'left 0.1s linear',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          <RobotIcon progress={progress} />
        </div>
      </div>

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
