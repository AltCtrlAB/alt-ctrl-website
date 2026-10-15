// Fortnox OAuth for service-account integrations. The customer's system administrator
// approves once; after that we fetch tokens with client credentials + their TenantId.
// https://www.fortnox.se/developer/authorization/get-access-token-using-client-credentials

export const FORTNOX_AUTH_URL = 'https://apps.fortnox.se/oauth-v1/auth'
export const FORTNOX_TOKEN_URL = 'https://apps.fortnox.se/oauth-v1/token'
export const FORTNOX_API_URL = 'https://api.fortnox.se/3'

// Must match the Redirect URI registered on the integration in Fortnox's developer portal, exactly.
export function fortnoxRedirectUri(): string {
  return process.env.FORTNOX_REDIRECT_URI || 'https://www.alltunderkontroll.se/api/fortnox/callback'
}

// Returns null when the integration isn't configured, so callers can show an error instead of a broken link.
export function fortnoxAuthorizeUrl(): string | null {
  const { FORTNOX_CLIENT_ID, FORTNOX_SCOPES } = process.env
  if (!FORTNOX_CLIENT_ID || !FORTNOX_SCOPES) return null

  const params = new URLSearchParams({
    client_id: FORTNOX_CLIENT_ID,
    redirect_uri: fortnoxRedirectUri(),
    // Space-separated, and must match the permissions ticked on the integration.
    scope: FORTNOX_SCOPES,
    // The callback only reports a new connection to us, so a forged callback can't do harm;
    // state is required by Fortnox but not checked.
    state: 'alt-ctrl',
    access_type: 'offline',
    response_type: 'code',
    account_type: 'service',
  })
  // URLSearchParams encodes spaces as '+'; Fortnox documents %20 for the scope list.
  return `${FORTNOX_AUTH_URL}?${params.toString().replace(/\+/g, '%20')}`
}
