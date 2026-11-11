import { NextResponse } from 'next/server'
import { SPIRIS_STATE_COOKIE, newSpirisState, spirisAuthorizeUrl } from '@/lib/spiris'

// Sends the customer to Spiris' login. The state goes along in the link and stays behind in a
// cookie, so the callback can tell that the approval it receives was started from this browser.
export async function GET(request: Request) {
  const state = newSpirisState()
  const authorizeUrl = spirisAuthorizeUrl(state)
  if (!authorizeUrl) return NextResponse.redirect(new URL('/spiris/klar?status=fel', request.url))

  const response = NextResponse.redirect(authorizeUrl)
  response.cookies.set(SPIRIS_STATE_COOKIE, state, {
    httpOnly: true,
    // Plain http only exists on a developer's own machine.
    secure: process.env.NODE_ENV === 'production',
    // Lax: the cookie must come back on the redirect from Spiris, which is a top-level navigation.
    sameSite: 'lax',
    path: '/api/spiris',
    maxAge: 15 * 60,
  })
  return response
}
