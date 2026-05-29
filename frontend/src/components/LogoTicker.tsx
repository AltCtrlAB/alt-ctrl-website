"use client"

import { useState } from 'react'

const clients: { name: string; category: string }[] = [
  { name: 'Volvo',             category: '// Mobility' },
  { name: 'Scania',            category: '// Mobility' },
  { name: 'Stena',             category: '// Shipping & Energy' },
  { name: 'Polestar',          category: '// EV / Automotive' },
  { name: 'ESBE',              category: '// Industrikomponenter' },
  { name: 'Gnotec',            category: '// Tillverkning' },
  { name: 'Södra',             category: '// Skogsindustri' },
  { name: 'RISE',              category: '// FoU' },
  { name: 'Identimi',          category: '// Tech / SaaS' },
  { name: 'Felina Foundation', category: '// Välgörenhet' },
]

export default function LogoTicker() {
  const [paused, setPaused] = useState(false)
  const items = [...clients, ...clients, ...clients, ...clients]

  return (
    <div
      style={{
        padding: 'clamp(1.25rem, 2vw, 2rem) clamp(1.5rem, 5vw, 3rem) clamp(2.25rem, 3.5vw, 3.25rem)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          marginBottom: '1rem',
        }}
      >
        Vi har arbetat med
      </div>

      <div
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            display: 'flex',
            gap: '4rem',
            animation: 'ticker 30s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {items.map((client, i) => (
            <TickerItem
              key={`${client.name}-${i}`}
              client={client}
              isLast={i === items.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  )
}

function TickerItem({
  client,
  isLast,
}: {
  client: { name: string; category: string }
  isLast: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '4rem', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: hovered ? 'var(--accent)' : 'var(--text)',
            opacity: hovered ? 1 : 0.5,
            transition: 'opacity 0.3s, color 0.3s',
            whiteSpace: 'nowrap',
          }}
        >
          {client.name}
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            color: 'var(--accent)',
            letterSpacing: '0.06em',
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            whiteSpace: 'nowrap',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 0.2s, transform 0.2s',
            pointerEvents: 'none',
          }}
        >
          {client.category}
        </div>
      </div>
      {!isLast && (
        <span
          style={{
            width: '4px',
            height: '4px',
            background: 'var(--accent)',
            borderRadius: '50%',
            display: 'inline-block',
            marginLeft: '-3.5rem',
            flexShrink: 0,
          }}
        />
      )}
    </div>
  )
}
