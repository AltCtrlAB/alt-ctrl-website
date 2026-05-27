import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

const terminalLines = [
  '> FÖRFRÅGAN MOTTAGEN',
  '> STATUS: UNDER GRANSKNING',
  '> VI ÅTERKOMMER INOM 1 ARBETSDAG',
]

function TerminalConfirmation() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= terminalLines.length) return
    const line = terminalLines[currentLine]

    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 40)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setVisibleLines(l => [...l, line])
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 600)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar])

  const activeLineText =
    currentLine < terminalLines.length
      ? terminalLines[currentLine].slice(0, currentChar)
      : null

  return (
    <div style={{ textAlign: 'left', maxWidth: '480px', margin: '0 auto' }}>
      {visibleLines.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            color: 'var(--accent)',
            letterSpacing: '0.04em',
            lineHeight: 2,
          }}
        >
          {line}
        </div>
      ))}
      {activeLineText !== null && (
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            color: 'var(--accent)',
            letterSpacing: '0.04em',
            lineHeight: 2,
            display: 'flex',
            alignItems: 'baseline',
            gap: '1px',
          }}
        >
          {activeLineText}
          <span style={{ animation: 'cursorBlink 1s step-end infinite' }}>_</span>
        </div>
      )}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [btnHov, setBtnHov] = useState(false)
  const { ref, inView } = useInView()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="kontakt"
      style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          border: '1px solid var(--border)',
          borderTop: '2px solid var(--accent)',
          borderRadius: '4px',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          background: 'var(--bg-card)',
          maxWidth: '640px',
          margin: '0 auto',
        }}
      >
        <div
          className="section-label"
          style={{ ...fadeStyle(0), justifyContent: 'center', display: 'flex' }}
        >
          Nästa steg
        </div>

        <div
          style={{
            ...fadeStyle(80),
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            maxWidth: '600px',
            margin: '0 auto 1rem',
          }}
        >
          Vi börjar med ett möte.
        </div>

        <p
          style={{
            ...fadeStyle(160),
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            fontSize: '1rem',
          }}
        >
          I ett inledande samtal på 30 minuter lär vi känna er verksamhet och
          berättar vad en förstudie faktiskt innebär för er. Ni bestämmer sedan
          om ni vill gå vidare.
        </p>

        {submitted ? (
          <TerminalConfirmation />
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0.75rem',
              maxWidth: '480px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="er@email.se"
              required
              style={{
                flex: '1 1 200px',
                padding: '0.85rem 1.25rem',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                background: 'var(--bg-card)',
                fontFamily: 'var(--sans)',
                fontSize: '0.9rem',
                color: 'var(--text)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) =>
                ((e.target as HTMLInputElement).style.borderColor = 'var(--accent)')
              }
              onBlur={(e) =>
                ((e.target as HTMLInputElement).style.borderColor = 'var(--border)')
              }
            />
            <button
              type="submit"
              style={{
                padding: '0.85rem 1.75rem',
                background: btnHov ? 'var(--accent-dark)' : 'var(--accent)',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--white)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={() => setBtnHov(true)}
              onMouseLeave={() => setBtnHov(false)}
            >
              Boka samtal
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
