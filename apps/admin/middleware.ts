import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const isAuthed = await verifyAdminSessionToken(token)

  if (pathname === '/login') {
    if (isAuthed) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (pathname === '/api/auth/login') {
    return NextResponse.next()
  }

  if (isAuthed) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ message: 'Yetkisiz erişim.' }, { status: 401 })
  }

  const loginUrl = new URL('/login', request.url)
  const next = `${pathname}${search}`
  if (next !== '/') {
    loginUrl.searchParams.set('next', next)
  }
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
