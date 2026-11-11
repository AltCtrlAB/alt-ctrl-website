// Spiris (formerly Visma eEkonomi) OAuth, authorization code flow. Unlike Fortnox there is no
// service account: the customer's approval gives a refresh token, and that token is the connection.
// https://developer.vismaonline.com/docs/authentication

import { publicEncrypt, constants, createPublicKey, randomBytes, type KeyObject } from 'node:crypto'

export const SPIRIS_AUTH_URL = 'https://identity.vismaonline.com/connect/authorize'
export const SPIRIS_TOKEN_URL = 'https://identity.vismaonline.com/connect/token'
export const SPIRIS_API_URL = 'https://eaccountingapi.vismaonline.com/v2'

// Read-only: bookkeeping, supplier invoices and the company's name. offline_access gives the refresh token.
const DEFAULT_SCOPES = 'ea:api offline_access ea:sales_readonly ea:accounting_readonly ea:purchase_readonly'

// Limits the login to Spiris Bokföring & Fakturering, so the user only sees companies that have it.
const SERVICE_ID = '44643EB1-3F76-4C1C-A672-402AE8085934'

// Holds the state between the start route and the callback.
export const SPIRIS_STATE_COOKIE = 'spiris_state'

// Must match the Redirect URI registered on the client at Spiris, exactly.
export function spirisRedirectUri(): string {
  return process.env.SPIRIS_REDIRECT_URI || 'https://www.alltunderkontroll.se/api/spiris/callback'
}

// SPIRIS_TOKEN_PUBLIC_KEY is the public key as base64 DER (SPKI) on one line.
function sealingKey(): KeyObject | null {
  try {
    const key = createPublicKey({
      key: Buffer.from(process.env.SPIRIS_TOKEN_PUBLIC_KEY ?? '', 'base64'),
      format: 'der',
      type: 'spki',
    })
    return key.asymmetricKeyType === 'rsa' ? key : null
  } catch {
    return null
  }
}

// The token can only be handed over encrypted, so without a usable public key the flow is switched
// off. The key is parsed here, not just looked for: a mis-pasted one must show on the page, before a
// customer has approved and the single-use code is spent.
export function spirisConfigured(): boolean {
  const { SPIRIS_CLIENT_ID, SPIRIS_CLIENT_SECRET } = process.env
  return Boolean(SPIRIS_CLIENT_ID && SPIRIS_CLIENT_SECRET && sealingKey())
}

export function newSpirisState(): string {
  return randomBytes(24).toString('base64url')
}

// Returns null when the integration isn't configured, so callers can show an error instead of a broken link.
export function spirisAuthorizeUrl(state: string): string | null {
  const { SPIRIS_CLIENT_ID, SPIRIS_SCOPES } = process.env
  if (!SPIRIS_CLIENT_ID || !spirisConfigured()) return null

  const params = new URLSearchParams({
    client_id: SPIRIS_CLIENT_ID,
    redirect_uri: spirisRedirectUri(),
    // Space-separated, and must be scopes the client has been granted.
    scope: SPIRIS_SCOPES || DEFAULT_SCOPES,
    state,
    response_type: 'code',
    // Always ask which company: an accountant with several must not connect the last one used by accident.
    prompt: 'select_account',
    acr_values: `service:${SERVICE_ID}`,
  })
  // URLSearchParams encodes spaces as '+'; the scope list is documented with %20.
  return `${SPIRIS_AUTH_URL}?${params.toString().replace(/\+/g, '%20')}`
}

// The refresh token gives read access to the customer's books for two years, and this site has no
// database to keep it in. It is encrypted to a key whose private half only exists on the machine
// that fetches the data, so the email and the logs it travels through never hold it in clear.
export function sealSpirisToken(refreshToken: string): string {
  const key = sealingKey()
  if (!key) throw new Error('SPIRIS_TOKEN_PUBLIC_KEY is missing or not an RSA public key')
  const sealed = publicEncrypt(
    { key, padding: constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' },
    Buffer.from(refreshToken, 'utf8'),
  )
  return `spiris1.${sealed.toString('base64url')}`
}
