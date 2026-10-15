import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fortnox-koppling',
  robots: { index: false, follow: false },
}

export default function FortnoxLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '560px' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.9rem',
            color: 'var(--text)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '2rem',
          }}
        >
          alt_ctrl_
        </Link>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          {children}
        </div>
      </div>
    </main>
  )
}
