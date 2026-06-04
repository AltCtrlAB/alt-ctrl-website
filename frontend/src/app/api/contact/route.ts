import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Defensive floor above Vercel's low Hobby default.
export const maxDuration = 15

// Mask the GDPR-sensitive local-part, keep the domain: user@example.com -> u***@example.com
function maskEmail(email: string): string {
  const at = email.lastIndexOf('@')
  if (at <= 0) return '***'
  return `${email[0]}***@${email.slice(at + 1)}`
}

// Unanchored/global twin of EMAIL_RE: finds addresses *inside* a larger string so we
// can mask them out of provider error bodies before logging.
const EMAIL_GLOBAL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/g
function redactEmails(text: string): string {
  return text.replace(EMAIL_GLOBAL_RE, maskEmail)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  const { RESEND_API_KEY, EMAIL_FROM, CONTACT_EMAIL } = process.env

  if (!RESEND_API_KEY || !EMAIL_FROM || !CONTACT_EMAIL) {
    console.error('Missing Resend environment variables')
    return NextResponse.json({ error: 'Serverfel: e-postkonfiguration saknas.' }, { status: 500 })
  }

  const resend = new Resend(RESEND_API_KEY)

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedCompany = (company || '').trim()

  const safeName = escapeHtml(trimmedName)
  const safeEmail = escapeHtml(trimmedEmail)
  const safeCompany = escapeHtml(trimmedCompany || '-')
  const safeMessage = escapeHtml((message || '').trim() || '-')

  // Email 1: the submission, FROM noreply@ -> TO the team (contact@).
  const teamSubject = `Ny förfrågan från ${trimmedName}${trimmedCompany ? ` (${trimmedCompany})` : ''}`
  const teamHtml = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Namn</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${safeName}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">E-post</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Företag</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${safeCompany}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Meddelande</td><td style="padding:8px 12px;white-space:pre-wrap">${safeMessage}</td></tr>
    </table>
  `

  // Email 2: confirmation, FROM noreply@ -> TO the user.
  const confirmationSubject = 'Tack för din förfrågan'
  const confirmationHtml = `
    <div style="font-family:sans-serif;font-size:14px;line-height:1.6;max-width:600px">
      <p>Hej ${safeName},</p>
      <p>Tack för ditt meddelande. Vi har mottagit det och svarar så snart som möjligt, vanligtvis inom 24 timmar.</p>
      <p style="color:#888">Detta är en automatisk bekräftelse på en obevakad adress, vänligen svara inte på detta mejl.</p>
      <p>Vänliga hälsningar,<br/>alt_ctrl_</p>
    </div>
  `

  // The team email is critical: if it fails, the lead is lost, so we surface a 500.
  // Resend returns { data, error } rather than throwing, so we check both.
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      // replyTo lets the team reply straight to the user from contact@.
      replyTo: trimmedEmail,
      subject: teamSubject,
      html: teamHtml,
    })
    if (error) throw new Error(`${error.name}: ${error.message}`)
  } catch (err) {
    console.error('Resend send (team) failed:', err)
    return NextResponse.json({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' }, { status: 500 })
  }

  // The confirmation is best-effort: a bad user address must not block the team
  // from having already received the submission. Logged loudly with the recipient masked.
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: trimmedEmail,
      subject: confirmationSubject,
      html: confirmationHtml,
    })
    if (error) throw new Error(`${error.name}: ${error.message}`)
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('Resend send (confirmation) failed:', {
      recipient: maskEmail(trimmedEmail),
      detail: redactEmails(detail),
    })
  }

  return NextResponse.json({ success: true })
}
