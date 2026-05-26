import { useState } from 'react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [btnHov, setBtnHov] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <section
      id="kontakt"
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      <div
        className="section-label"
        style={{ justifyContent: 'center', display: 'flex' }}
      >
        Nästa steg
      </div>

      <div
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2rem, 4vw, 3.25rem)',
          lineHeight: 1.15,
          marginBottom: '1rem',
          letterSpacing: '-0.01em',
          maxWidth: '600px',
          margin: '0 auto 1rem',
        }}
      >
        Vi börjar med en förstudie.
      </div>

      <p
        style={{
          color: 'var(--text-secondary)',
          maxWidth: '480px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
          fontSize: '1rem',
        }}
      >
        På 2–3 veckor identifierar vi era mest lönsamma förbättringsområden —
        med estimerad effekt i tid och kronor.
      </p>

      {submitted ? (
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.85rem',
            color: 'var(--accent)',
            letterSpacing: '0.04em',
          }}
        >
          Tack! Vi hör av oss inom kort.
        </div>
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
              ((e.target as HTMLInputElement).style.borderColor =
                'var(--accent)')
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
    </section>
  )
}
