import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    console.error('Missing SMTP environment variables')
    return NextResponse.json({ error: 'Serverfel: e-postkonfiguration saknas.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const safeName = escapeHtml(name.trim())
  const safeEmail = escapeHtml(email.trim())
  const safeCompany = escapeHtml((company || '').trim() || '–')
  const safeMessage = escapeHtml((message || '').trim() || '–')

  const subject = `Ny förfrågan från ${name.trim()}${company?.trim() ? ` (${company.trim()})` : ''}`

  const html = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Namn</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${safeName}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">E-post</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee">Företag</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${safeCompany}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Meddelande</td><td style="padding:8px 12px;white-space:pre-wrap">${safeMessage}</td></tr>
    </table>
  `

  const text = `Namn: ${name.trim()}\nE-post: ${email.trim()}\nFöretag: ${(company || '').trim() || '–'}\nMeddelande: ${(message || '').trim() || '–'}`

  try {
    await transporter.sendMail({
      from: `"alt_ctrl_ Webbformulär" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject,
      html,
      text,
    })
  } catch (err) {
    console.error('SMTP send failed:', err)
    return NextResponse.json({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
