"use client"

import { useEffect, useRef, useState } from 'react'

const rotatingWords = ['Snabbare beslut', 'Lägre kostnader', 'Smartare processer', 'Färre manuella steg']

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const [ctaHov, setCtaHov] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length)
        setAnimating(false)
      }, 220)
    }, 2200)
    return () => clearInterval(id)
  }, [reducedMotion])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!gridRef.current) return
    if (reducedMotion) return
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = ((e.clientX - cx) / cx) * 8
    const dy = ((e.clientY - cy) / cy) * 8
    gridRef.current.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const handleMouseLeave = () => {
    if (!gridRef.current) return
    gridRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem) 4rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      {/* Grid background */}
      <div
        ref={gridRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          background: `
            repeating-linear-gradient(0deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 40px)
          `,
          pointerEvents: 'none',
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--accent)',
          marginBottom: '2rem',
          position: 'relative',
          animation: 'fadeUp 0.8s ease both',
        }}
      >
        <span style={{ opacity: 0.6, marginRight: '0.5rem' }}>//</span>
        Allt Under Kontroll AB · Göteborg
      </div>

      {/* H1 - static line + rotating word */}
      <h1
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
          lineHeight: 1.1,
          maxWidth: '750px',
          marginBottom: '1.5rem',
          position: 'relative',
          letterSpacing: '-0.02em',
          animation: 'fadeUp 0.8s ease both',
          animationDelay: '0.05s',
        }}
      >
        Er partner inom{' '}
        <span
          aria-live="polite"
          aria-label={rotatingWords[wordIndex]}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            height: '1.15em',
            position: 'relative',
          }}
        >
          <em
            style={{
              fontStyle: 'italic',
              color: 'var(--accent)',
              display: 'block',
              animation: animating ? 'wordExit 0.22s ease forwards' : 'wordEnter 0.35s ease both',
              whiteSpace: 'nowrap',
            }}
          >
            {rotatingWords[wordIndex]}
          </em>
        </span>
      </h1>

      {/* Sub */}
      <p
        style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '520px',
          marginBottom: '2.5rem',
          lineHeight: 1.7,
          position: 'relative',
          animation: 'fadeUp 0.8s ease 0.15s both',
        }}
      >
        Svenska bolag tappar hundratusentals kronor årligen på processer
        som borde vara automatiserade.
        <br />
        <em style={{ fontStyle: 'italic' }}>De flesta vet inte ens var.</em>
      </p>

      {/* CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          position: 'relative',
          animation: 'fadeUp 0.8s ease 0.4s both',
        }}
      >
        <a
          href="#kontakt"
          style={{
            display: 'inline-block',
            padding: '0.85rem 2rem',
            background: ctaHov ? 'var(--accent-dark)' : 'var(--accent)',
            color: 'var(--white)',
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={() => setCtaHov(true)}
          onMouseLeave={() => setCtaHov(false)}
        >
          Boka en genomgång
        </a>
      </div>

      {/* Meta */}
      <div
        style={{
          marginTop: '1.25rem',
          fontFamily: 'var(--mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          position: 'relative',
          animation: 'fadeUp 0.8s ease 0.55s both',
        }}
      >
        Tillgängliga för uppdrag · Hela Norden
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wordEnter {
          from { opacity: 0; transform: translateY(60%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wordExit {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-60%); }
        }
        @media (max-width: 900px) {
          .hero-bg-decor { width: 100%; opacity: 0.04 !important; }
        }
      `}</style>
    </section>
  )
}
