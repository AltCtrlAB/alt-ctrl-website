import { fortnoxAuthorizeUrl } from '@/lib/fortnox'

// The client ID and scopes come from the environment at request time.
export const dynamic = 'force-dynamic'

const steps = [
  'Klicka på knappen nedan och logga in i Fortnox som systemadministratör.',
  'Har du tillgång till flera företag, välj det företag som ska kopplas.',
  'Granska behörigheterna och godkänn.',
]

// The activation page registered on the integration in Fortnox's developer portal.
export default function FortnoxActivationPage() {
  const authorizeUrl = fortnoxAuthorizeUrl()

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
        Koppla ert Fortnox till alt_ctrl_
      </h1>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Kopplingen låter oss hämta ert bokföringsunderlag direkt från Fortnox, så att ni slipper skicka filer. Vi läser
        bara och ändrar ingenting i er bokföring. Ni kan ta bort kopplingen när som helst i Fortnox.
      </p>
      <ol style={{ fontSize: '0.95rem', paddingLeft: '1.25rem', marginBottom: '2rem' }}>
        {steps.map((step) => (
          <li key={step} style={{ marginBottom: '0.4rem' }}>
            {step}
          </li>
        ))}
      </ol>
      {authorizeUrl ? (
        <a href={authorizeUrl} className="btn-primary">
          Aktivera kopplingen
        </a>
      ) : (
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Kopplingen är inte tillgänglig just nu. Kontakta oss på{' '}
          <a href="mailto:contact@alltunderkontroll.se" style={{ color: 'var(--accent-dark)' }}>
            contact@alltunderkontroll.se
          </a>
          .
        </p>
      )}
    </>
  )
}
