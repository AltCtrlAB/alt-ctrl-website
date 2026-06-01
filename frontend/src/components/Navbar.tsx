'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'metod', label: 'Metod', visualPct: 0 },
  { id: 'tjanster', label: 'Tjänster', visualPct: 0.17 },
  { id: 'ai', label: 'Vår syn', visualPct: 0.33 },
  { id: 'case', label: 'Case', visualPct: 0.5 },
  { id: 'teamet', label: 'Teamet', visualPct: 0.67 },
  { id: 'kontakt', label: 'Kontakt', visualPct: 0.83 },
  { id: 'faq', label: 'FAQ', visualPct: 1.0 },
]

function RobotIcon({ step }: { step: boolean }) {
  const color = 'var(--accent)'
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <line x1="10" y1="0" x2="10" y2="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="1" r="1" fill={color} />
      <rect x="5" y="3" width="10" height="7" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="6.5" r="1" fill={color} />
      <circle cx="12" cy="6.5" r="1" fill={color} />
      <rect x="4" y="11" width="12" height="7" rx="1.5" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="14.5" r="1" fill={color} />
      <line x1="4" y1="13" x2="1" y2={step ? '15' : '16'} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="13" x2="19" y2={step ? '16' : '15'} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.5" y1="18" x2={step ? '6' : '7.5'} y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line
        x1="12.5"
        y1="18"
        x2={step ? '12.5' : '14'}
        y2="22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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
        style={{ opacity: hovering ? 0.5 : 1, transition: 'opacity 0.15s', transitionDelay: hovering ? '0ms' : '80ms' }}
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
  const [actualPcts, setActualPcts] = useState<Record<string, number>>({})

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const measure = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const map: Record<string, number> = {}
      SECTIONS.map((s) => s.id).forEach((id) => {
        const el = document.getElementById(id)
        if (el) map[id] = Math.min(el.offsetTop / docHeight, 1)
      })
      setActualPcts(map)
    }
    const t = setTimeout(measure, 400)
    window.addEventListener('resize', measure)

    let debounceTimer: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(measure, 100)
    })
    ro.observe(document.documentElement)

    return () => {
      clearTimeout(t)
      clearTimeout(debounceTimer)
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  const visualProgress = (() => {
    const known = SECTIONS.filter((s) => actualPcts[s.id] !== undefined)
    const first = known[0]
    const last = known[known.length - 1]
    if (known.length < 2 || !first || !last) return progress

    const firstAct = actualPcts[first.id] ?? 0
    if (progress <= firstAct) return (progress / firstAct) * first.visualPct

    const lastAct = actualPcts[last.id] ?? 1
    if (progress >= lastAct) {
      const remaining = 1 - lastAct
      if (remaining <= 0) return last.visualPct
      return last.visualPct + ((progress - lastAct) / remaining) * (1 - last.visualPct)
    }

    for (let i = 0; i < known.length - 1; i++) {
      const a = known[i]
      const b = known[i + 1]
      if (!a || !b) continue
      const aAct = actualPcts[a.id] ?? 0
      const bAct = actualPcts[b.id] ?? 1
      if (progress >= aAct && progress < bAct) {
        const t = (progress - aAct) / (bAct - aAct)
        return a.visualPct + t * (b.visualPct - a.visualPct)
      }
    }
    return progress
  })()

  const step = Math.floor(visualProgress * 80) % 2 === 0

  const navLinks = SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.label }))

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
        background: scrolled ? 'rgba(230, 226, 220, 0.96)' : 'rgba(230, 226, 220, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-light)',
        transition: 'background 0.3s',
      }}
    >
      <LogoMark />

      {/* Robot track */}
      <div
        className="hidden-mobile"
        style={{ flex: 1, maxWidth: '720px', margin: '0 1.5rem', position: 'relative', height: '34px' }}
      >
        <div
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '1px', background: 'var(--border)' }}
        />

        {SECTIONS.map((s) => {
          const passed = progress >= (actualPcts[s.id] ?? 1)
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                position: 'absolute',
                left: `${s.visualPct * 100}%`,
                bottom: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                transform: 'translateX(-50%)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: passed ? 'var(--accent)' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  marginBottom: '2px',
                  transition: 'color 0.3s',
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  width: '1px',
                  height: '7px',
                  display: 'block',
                  background: passed ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'background 0.3s',
                }}
              />
            </a>
          )
        })}

        <div
          style={{
            position: 'absolute',
            left: `calc(${visualProgress * 100}% - 6px)`,
            bottom: '1px',
            transition: 'left 0.1s linear, opacity 0.4s ease',
            opacity: progress >= (actualPcts['metod'] ?? 1) ? 1 : 0,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          <RobotIcon step={step} />
        </div>
      </div>

      {/* Kontakt CTA */}
      <a
        href="#kontakt"
        className="hidden-mobile"
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
          flexShrink: 0,
        }}
        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.background = 'var(--accent-dark)')}
        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.background = 'var(--accent)')}
      >
        Kontakt
      </a>

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
          {navLinks.map((link) => {
            const isKontakt = link.href === '#kontakt'
            return (
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
                  ...(isKontakt
                    ? {
                        background: 'var(--accent)',
                        color: 'var(--white)',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '4px',
                        textAlign: 'center' as const,
                      }
                    : { color: 'var(--text-secondary)' }),
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 901px) {
          .show-mobile   { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
