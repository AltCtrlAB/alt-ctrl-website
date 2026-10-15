import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { FORTNOX_API_URL, FORTNOX_TOKEN_URL, fortnoxRedirectUri } from '@/lib/fortnox'

// Defensive floor above Vercel's low Hobby default.
export const maxDuration = 15

interface CompanyInformation {
  CompanyName: string
  OrganizationNumber: string
  // The customer's TenantId for client-credentials tokens.
  DatabaseNumber: number
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function done(request: Request, status: 'ok' | 'fel' | 'avbruten') {
  return NextResponse.redirect(new URL(`/fortnox/klar?status=${status}`, request.url))
}

// Fortnox redirects the customer's administrator here after they approve the integration.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const error = url.searchParams.get('error')
  if (error) {
    console.error('Fortnox authorization returned an error:', error, url.searchParams.get('error_description'))
    return done(request, error === 'access_denied' ? 'avbruten' : 'fel')
  }

  const code = url.searchParams.get('code')
  if (!code) return done(request, 'fel')

  const { FORTNOX_CLIENT_ID, FORTNOX_CLIENT_SECRET, RESEND_API_KEY, EMAIL_FROM, CONTACT_EMAIL } = process.env
  if (!FORTNOX_CLIENT_ID || !FORTNOX_CLIENT_SECRET) {
    console.error('Missing Fortnox environment variables')
    return done(request, 'fel')
  }

  // The code is single-use and expires after 10 minutes, so it is exchanged straight away.
  let accessToken: string
  let scope: string
  try {
    const res = await fetch(FORTNOX_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${FORTNOX_CLIENT_ID}:${FORTNOX_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: fortnoxRedirectUri() }),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
    const token = (await res.json()) as { access_token: string; scope: string }
    accessToken = token.access_token
    scope = token.scope
  } catch (err) {
    console.error('Fortnox token exchange failed:', err)
    return done(request, 'fel')
  }

  let company: CompanyInformation
  try {
    const res = await fetch(`${FORTNOX_API_URL}/companyinformation`, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
    company = ((await res.json()) as { CompanyInformation: CompanyInformation }).CompanyInformation
  } catch (err) {
    console.error('Fortnox company information failed:', err)
    return done(request, 'fel')
  }

  // Logged as well as emailed: if the email fails, the TenantId is still in the Vercel logs,
  // and the customer's part is done either way.
  console.log('Fortnox connection activated:', {
    company: company.CompanyName,
    organizationNumber: company.OrganizationNumber,
    tenantId: company.DatabaseNumber,
    scope,
  })

  if (!RESEND_API_KEY || !EMAIL_FROM || !CONTACT_EMAIL) {
    console.error('Missing Resend environment variables')
    return done(request, 'ok')
  }

  const rows: [string, string][] = [
    ['Företag', company.CompanyName],
    ['Organisationsnummer', company.OrganizationNumber],
    ['TenantId', String(company.DatabaseNumber)],
    ['Behörigheter', scope],
  ]
  const html = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`,
        )
        .join('')}
    </table>
  `

  try {
    const { error: sendError } = await new Resend(RESEND_API_KEY).emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      subject: `Fortnox-koppling aktiverad: ${company.CompanyName}`,
      html,
    })
    if (sendError) throw new Error(`${sendError.name}: ${sendError.message}`)
  } catch (err) {
    console.error('Resend send (Fortnox activation) failed:', err)
  }

  return done(request, 'ok')
}
