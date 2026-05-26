const clients = [
  'Volvo',
  'Scania',
  'Stena',
  'Polestar',
  'ESBE',
  'Gnotec',
  'Södra',
  'RISE',
  'Identimi',
]

export default function LogoTicker() {
  // Duplicate for seamless loop
  const items = [...clients, ...clients]

  return (
    <div
      style={{
        padding: 'clamp(1.5rem, 3vw, 3rem)',
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
          marginBottom: '2rem',
        }}
      >
        Vi har arbetat med
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: '4rem',
            animation: 'ticker 30s linear infinite',
            width: 'max-content',
          }}
        >
          {items.map((name, i) => (
            <div
              key={`${name}-${i}`}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                opacity: 0.5,
                transition: 'opacity 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '4rem',
                cursor: 'default',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.opacity = '1')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.opacity = '0.5')
              }
            >
              {name}
              {i < items.length - 1 && (
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginLeft: '-3.5rem',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
