import Link from 'next/link'

const messages = {
  ok: {
    title: 'Klart! Kopplingen är aktiverad.',
    body: 'Tack! Vi har fått tillgång och hör av oss om vi behöver något mer. Du kan stänga den här sidan.',
  },
  avbruten: {
    title: 'Kopplingen avbröts',
    body: 'Ingenting har kopplats. Vill du aktivera kopplingen ändå kan du börja om när du vill.',
  },
  fel: {
    title: 'Något gick fel',
    body: 'Kopplingen kunde inte aktiveras. Försök igen, eller kontakta oss på contact@alltunderkontroll.se så hjälper vi dig.',
  },
}

export default async function FortnoxDonePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams
  const key = status === 'ok' || status === 'avbruten' ? status : 'fel'
  const { title, body } = messages[key]

  return (
    <>
      <p className="section-label">Fortnox</p>
      <h1
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: key === 'ok' ? 0 : '2rem' }}>
        {body}
      </p>
      {key !== 'ok' && (
        <Link href="/fortnox" className="btn-primary">
          Börja om
        </Link>
      )}
    </>
  )
}
