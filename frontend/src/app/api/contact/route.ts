import { NextResponse } from 'next/server'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TOKEN_ENDPOINT = (tenantId: string) => `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`
const GRAPH_SENDMAIL = (sender: string) =>
  `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`

type GraphEnv = {
  tenantId: string
  clientId: string
  clientSecret: string
  sender: string
  contactEmail: string
}

// Module-scoped cache: a route.ts module is evaluated once per server process
// and stays resident, so this persists across form submissions (client-
// credentials tokens live ~60-75 min). Worst case on a cold start is one extra
// token fetch.
let cachedToken: { token: string; expiresAt: number } | null = null

// Refresh this many ms BEFORE the real expiry so a token never dies mid-request.
// Too small risks a 401 if the token expires in flight; too large means we fetch
// tokens more often than necessary. 60s is a safe middle ground for ~60 min tokens.
const TOKEN_REFRESH_MARGIN_MS = 60_000

/**
 * Acquire a Microsoft Graph access token via the OAuth2 client-credentials flow,
 * reusing the module-scoped cached token while it is still fresh.
 */
async function getAccessToken(env: GraphEnv): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - TOKEN_REFRESH_MARGIN_MS) {
    return cachedToken.token
  }

  const res = await fetch(TOKEN_ENDPOINT(env.tenantId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.clientId,
      client_secret: env.clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Token request failed (${res.status}): ${detail}`)
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }

  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }

  return data.access_token
}

type GraphMessage = {
  subject: string
  body: { contentType: 'HTML' | 'Text'; content: string }
  toRecipients: { emailAddress: { address: string } }[]
  replyTo?: { emailAddress: { address: string } }[]
}

/**
 * Send a single message via Graph `sendMail`. Graph signals success with
 * HTTP 202 Accepted and an EMPTY body, so we check the status and never parse
 * JSON from a successful response.
 */
async function sendMail(token: string, sender: string, message: GraphMessage): Promise<void> {
  const res = await fetch(GRAPH_SENDMAIL(sender), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, saveToSentItems: false }),
  })

  if (res.status !== 202) {
    const detail = await res.text()
    throw new Error(`sendMail failed (${res.status}): ${detail}`)
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 })
  }

  const { name, email, company, message } = body as {
    name: string
    email: string
    company: string
    message: string
  }

  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Namn är obligatoriskt.' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'En giltig e-postadress krävs.' }, { status: 400 })
  }

  const { GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, GRAPH_SENDER, CONTACT_EMAIL } = process.env

  if (!GRAPH_TENANT_ID || !GRAPH_CLIENT_ID || !GRAPH_CLIENT_SECRET || !GRAPH_SENDER || !CONTACT_EMAIL) {
    console.error('Missing Microsoft Graph environment variables')
    return NextResponse.json({ error: 'Serverfel: e-postkonfiguration saknas.' }, { status: 500 })
  }

  const env: GraphEnv = {
    tenantId: GRAPH_TENANT_ID,
    clientId: GRAPH_CLIENT_ID,
    clientSecret: GRAPH_CLIENT_SECRET,
    sender: GRAPH_SENDER,
    contactEmail: CONTACT_EMAIL,
  }

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedCompany = (company || '').trim()

  const safeName = escapeHtml(trimmedName)
  const safeEmail = escapeHtml(trimmedEmail)
  const safeCompany = escapeHtml(trimmedCompany || '–')
  const safeMessage = escapeHtml((message || '').trim() || '–')

  // Email 1: the submission, FROM noreply@ -> TO the team (contact@).
  const teamMessage: GraphMessage = {
    subject: `Ny förfrågan från ${trimmedName}${trimmedCompany ? ` (${trimmedCompany})` : ''}`,
    body: {
      contentType: 'HTML',
      content: `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Namn</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${safeName}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">E-post</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Företag</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${safeCompany}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Meddelande</td><td style="padding:8px 12px;white-space:pre-wrap">${safeMessage}</td></tr>
    </table>
  `,
    },
    toRecipients: [{ emailAddress: { address: env.contactEmail } }],
    // replyTo lets the team reply straight to the user from contact@.
    replyTo: [{ emailAddress: { address: trimmedEmail } }],
  }

  // Email 2: confirmation, FROM noreply@ -> TO the user.
  const confirmationMessage: GraphMessage = {
    subject: 'Tack för din förfrågan – alt_ctrl_',
    body: {
      contentType: 'HTML',
      content: `
    <div style="font-family:sans-serif;font-size:14px;line-height:1.6;max-width:600px">
      <p>Hej ${safeName},</p>
      <p>Tack för ditt meddelande, vi återkommer inom 1-2 arbetsdagar.</p>
      <p style="color:#888">Detta är en automatisk bekräftelse på en obevakad adress – vänligen svara inte på detta mejl.</p>
      <p>Vänliga hälsningar,<br/>alt_ctrl_</p>
    </div>
  `,
    },
    toRecipients: [{ emailAddress: { address: trimmedEmail } }],
  }

  let token: string
  try {
    token = await getAccessToken(env)
  } catch (err) {
    console.error('Graph token acquisition failed:', err)
    return NextResponse.json({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' }, { status: 500 })
  }

  // The team email is critical: if it fails, the lead is lost, so we surface a
  // 500 to the user.
  try {
    await sendMail(token, env.sender, teamMessage)
  } catch (err) {
    console.error('Graph sendMail (team) failed:', err)
    return NextResponse.json({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' }, { status: 500 })
  }

  // The confirmation is best-effort: a bad user address must not block the team
  // from having already received the submission.
  try {
    await sendMail(token, env.sender, confirmationMessage)
  } catch (err) {
    console.warn('Graph sendMail (confirmation) failed:', err)
  }

  return NextResponse.json({ success: true })
}
