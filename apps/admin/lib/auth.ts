const encoder = new TextEncoder()

export const ADMIN_SESSION_COOKIE = 'mastersteelhouse_admin_session'

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured')
  }
  return secret
}

function getCredentialConfig() {
  const username = process.env.ADMIN_USER
  const password = process.env.ADMIN_PASSWORD
  if (!username || !password) {
    throw new Error('ADMIN_USER or ADMIN_PASSWORD is not configured')
  }
  return {
    username,
    password,
  }
}

async function signValue(value: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  const bytes = Array.from(new Uint8Array(signature))
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export function isValidAdminCredentials(username: string, password: string) {
  try {
    const config = getCredentialConfig()
    return timingSafeEqual(username, config.username) && timingSafeEqual(password, config.password)
  } catch {
    return false
  }
}

export async function createAdminSessionToken(maxAgeSeconds = 60 * 60 * 24 * 7) {
  const expiresAt = Date.now() + maxAgeSeconds * 1000
  const payload = String(expiresAt)
  const signature = await signValue(payload)
  return `${payload}.${signature}`
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) return false

  const [expiresAtRaw, signature] = token.split('.')
  const expiresAt = Number(expiresAtRaw)
  if (!expiresAtRaw || !signature || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false
  }

  const expected = await signValue(expiresAtRaw)
  return timingSafeEqual(signature, expected)
}
