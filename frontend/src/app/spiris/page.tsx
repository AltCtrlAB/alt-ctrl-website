import { spirisConfigured } from '@/lib/spiris'

// The client ID and the key come from the environment at request time.
export const dynamic = 'force-dynamic'

const steps = [
  'Klicka på knappen nedan och logga in i Spiris med ert vanliga konto.',
  'Har du tillgång till flera företag, välj det företag som ska kopplas.',
  'Granska behörigheterna och godkänn.',
]

// The activation page for Spiris Bokföring & Fakturering (formerly Visma eEkonomi).
export default function SpirisActivationPage() {
  return (
    <>
      <p className="section-label">Spiris</p>
      <h1
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}
      >
        Koppla ert Spiris till alt_ctrl_
      </h1>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Kopplingen låter oss hämta ert bokföringsunderlag direkt från Spiris Bokföring & Fakturering, så att ni slipper
        skicka filer. Vi läser bara och ändrar ingenting i er bokföring. Vill ni ta bort kopplingen säger ni till, så
        stänger vi den direkt.
      </p>
      <ol style={{ fontSize: '0.95rem', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
        {steps.map((step) => (
          <li key={step} style={{ marginBottom: '0.4rem' }}>
            {step}
          </li>
        ))}
      </ol>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Kopplingen kräver att tillägget Spiris Integration är aktivt för företaget. Det slår ni på i Spiris under Fler
        funktioner i menyn till vänster.
      </p>
      {spirisConfigured() ? (
        // A plain link on purpose: the start route sets a cookie and must not be prefetched.
        <a href="/api/spiris/start" className="btn-primary">
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
