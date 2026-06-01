'use client'

import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

const terminalLines = ['> FÖRFRÅGAN MOTTAGEN', '> STATUS: UNDER GRANSKNING', '> VI ÅTERKOMMER INOM 1 ARBETSDAG']

function TerminalConfirmation() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    const line = terminalLines[currentLine]
    if (!line) return

    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 40)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setVisibleLines((l) => [...l, line])
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, 600)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar])

  const activeLineText = currentLine < terminalLines.length ? terminalLines[currentLine]?.slice(0, currentChar) : null

  return (
    <div style={{ textAlign: 'left', maxWidth: '520px', margin: '0 auto' }}>
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: '0.4rem',
      }}
    >
      {children}
    </div>
  )
}

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  background: 'var(--bg)',
  fontFamily: 'var(--sans)',
  fontSize: '0.9rem',
  color: 'var(--text)',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <FieldLabel>
        {label}
        {required && <span style={{ color: 'var(--accent)', marginLeft: '2px' }}>*</span>}
      </FieldLabel>
      {children}
    </div>
  )
}

export default function CTASection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [btnHov, setBtnHov] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const { ref, inView } = useInView()

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Något gick fel. Försök igen.')
        return
      }

      setSubmitted(true)
    } catch {
      setError('Kunde inte nå servern. Kontrollera din internetanslutning.')
    } finally {
      setSubmitting(false)
    }
  }

  const focusStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? 'var(--accent)' : 'var(--border)',
  })

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
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        <div className="section-label" style={{ ...fadeStyle(0), justifyContent: 'center', display: 'flex' }}>
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
          I ett kostnadsfritt inledande samtal på 30 minuter lär vi känna er verksamhet och berättar vad en förstudie
          faktiskt innebär för er. Ni bestämmer sedan om ni vill gå vidare.
        </p>

        {submitted ? (
          <TerminalConfirmation />
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: '520px',
              margin: '0 auto',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              ...fadeStyle(220),
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="cta-two-col">
              <Field label="Namn" required>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Anna Svensson"
                  required
                  disabled={submitting}
                  style={focusStyle('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </Field>
              <Field label="E-post" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="anna@foretaget.se"
                  required
                  disabled={submitting}
                  style={focusStyle('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </Field>
            </div>

            <Field label="Företag">
              <input
                type="text"
                value={form.company}
                onChange={set('company')}
                placeholder="Företaget AB"
                disabled={submitting}
                style={focusStyle('company')}
                onFocus={() => setFocused('company')}
                onBlur={() => setFocused(null)}
              />
            </Field>

            <Field label="Meddelande">
              <textarea
                value={form.message}
                onChange={set('message')}
                placeholder="Berätta kort om er verksamhet och vad ni vill åstadkomma..."
                rows={4}
                disabled={submitting}
                style={{
                  ...focusStyle('message'),
                  resize: 'vertical',
                  minHeight: '100px',
                  lineHeight: 1.6,
                }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </Field>

            {error && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(220, 38, 38, 0.08)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '4px',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  color: '#dc2626',
                  letterSpacing: '0.02em',
                }}
              >
                {error}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                }}
              >
                * obligatoriska fält
              </span>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '0.85rem 2rem',
                  background: submitting ? 'var(--text-muted)' : btnHov ? 'var(--accent-dark)' : 'var(--accent)',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--white)',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                  opacity: submitting ? 0.7 : 1,
                }}
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
              >
                {submitting ? 'Skickar...' : 'Skicka förfrågan'}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 560px) {
          .cta-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
