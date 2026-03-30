const PROFIL_SITE_URL = (process.env.PROFIL_SITE_URL ?? '').trim().replace(/\/$/, '')
const REVALIDATE_SECRET = (process.env.REVALIDATE_SECRET ?? '').trim()

export async function revalidateProfilSite() {
  if (!PROFIL_SITE_URL || !REVALIDATE_SECRET) return

  try {
    await fetch(`${PROFIL_SITE_URL}/api/revalidate?secret=${REVALIDATE_SECRET}`, {
      method: 'POST',
      cache: 'no-store',
    })
  } catch {
    // Revalidation failure should not break the save operation
  }
}
