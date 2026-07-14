import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, getAdminSessionIdentity } from '@/lib/auth'

export async function GET() {
  const cookieStore = await cookies()
  const identity = await getAdminSessionIdentity(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)

  if (!identity) {
    return NextResponse.json({ message: 'Geçerli oturum bulunamadı.' }, { status: 401 })
  }

  return NextResponse.json(
    { username: identity.username },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
