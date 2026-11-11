import { timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  SPIRIS_API_URL,
  SPIRIS_STATE_COOKIE,
  SPIRIS_TOKEN_URL,
  sealSpirisToken,
  spirisConfigured,
  spirisRedirectUri,
} from '@/lib/spiris'

// Defensive floor above Vercel's low Hobby default.
export const maxDuration = 15

interface CompanySettings {
  Name: string
  CorporateIdentityNumber: string | null
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
  const response = NextResponse.redirect(new URL(`/spiris/klar?status=${status}`, request.url))
  response.cookies.delete({ name: SPIRIS_STATE_COOKIE, path: '/api/spiris' })
  return response
}

function sameState(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

// Spiris redirects the customer here after they approve the integration.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const error = url.searchParams.get('error')
  if (error) {
    console.error('Spiris authorization returned an error:', error, url.searchParams.get('error_description'))
    return done(request, error === 'access_denied' ? 'avbruten' : 'fel')
  }

  const code = url.searchParams.get('code')
  if (!code) return done(request, 'fel')

  // Without this check anyone could send a customer a link that connects the sender's own
  // company here, and we would file that token as the customer's.
  const state = url.searchParams.get('state')
  const expected = (await cookies()).get(SPIRIS_STATE_COOKIE)?.value
  if (!state || !expected || !sameState(state, expected)) {
    console.error('Spiris callback with a state that does not match the one this browser started with')
    return done(request, 'fel')
  }

  const { SPIRIS_CLIENT_ID, SPIRIS_CLIENT_SECRET, RESEND_API_KEY, EMAIL_FROM, CONTACT_EMAIL } = process.env
  // Checked before the code is spent: without the key the token could not be handed over.
  if (!SPIRIS_CLIENT_ID || !SPIRIS_CLIENT_SECRET || !spirisConfigured()) {
    console.error('Missing Spiris environment variables')
    return done(request, 'fel')
  }

  // The code is single-use and short-lived, so it is exchanged straight away. The response
  // holds the tokens and is never logged.
  let accessToken: string
  let sealedToken: string
  let scope: string
  try {
    const res = await fetch(SPIRIS_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPIRIS_CLIENT_ID}:${SPIRIS_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: spirisRedirectUri() }),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
    const token = (await res.json()) as { access_token: string; refresh_token?: string; scope?: string }
    if (!token.refresh_token) throw new Error('no refresh token in the response (offline_access missing?)')
    accessToken = token.access_token
    sealedToken = sealSpirisToken(token.refresh_token)
    scope = token.scope ?? ''
  } catch (err) {
    console.error('Spiris token exchange failed:', err)
    return done(request, 'fel')
  }

  // Which company was connected. A company without the Spiris Integration module, or one that
  // has not finished the start guide, answers 403 here; the approval itself still stands, so
  // the token is handed over with the answer instead of the name.
  let companyName = 'Okänt företag'
  let organizationNumber = ''
  let companyNote = ''
  try {
    const res = await fetch(`${SPIRIS_API_URL}/companysettings`, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0, 300)}`)
    const company = (await res.json()) as CompanySettings
    companyName = company.Name
    organizationNumber = company.CorporateIdentityNumber ?? ''
  } catch (err) {
    companyNote = err instanceof Error ? err.message : String(err)
    console.error('Spiris company settings failed:', companyNote)
  }

  // Logged as well as emailed: if the email fails, the sealed token is still in the Vercel logs,
  // and the customer's part is done either way. Sealed, it is useless without the private key.
  console.log('Spiris connection activated:', {
    company: companyName,
    organizationNumber,
    scope,
    sealedToken,
  })

  if (!RESEND_API_KEY || !EMAIL_FROM || !CONTACT_EMAIL) {
    console.error('Missing Resend environment variables')
    return done(request, 'ok')
  }

  const rows: [string, string][] = [
    ['Företag', companyName],
    ['Organisationsnummer', organizationNumber],
    ['Behörigheter', scope],
    ['Förseglad token', sealedToken],
    ['Nästa steg', 'node scripts/fetch_spiris.ts <restaurang> --token <förseglad token>'],
  ]
  if (companyNote) rows.splice(2, 0, ['Företagsuppgifterna gick inte att läsa', companyNote])
  const html = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;word-break:break-all">${escapeHtml(value)}</td></tr>`,
        )
        .join('')}
    </table>
  `

  try {
    const { error: sendError } = await new Resend(RESEND_API_KEY).emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      subject: `Spiris-koppling aktiverad: ${companyName}`,
      html,
    })
    if (sendError) throw new Error(`${sendError.name}: ${sendError.message}`)
  } catch (err) {
    console.error('Resend send (Spiris activation) failed:', err)
  }

  return done(request, 'ok')
}
