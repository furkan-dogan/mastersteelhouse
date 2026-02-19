import { NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  isValidAdminCredentials,
} from '@/lib/auth'

export const runtime = 'nodejs'

type Body = {
  username?: string
  password?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body
    const username = body.username?.trim() ?? ''
    const password = body.password ?? ''

    if (!username || !password) {
      return NextResponse.json({ message: 'Kullanıcı adı ve şifre zorunludur.' }, { status: 400 })
    }

    if (!isValidAdminCredentials(username, password)) {
      return NextResponse.json({ message: 'Kullanıcı adı veya şifre hatalı.' }, { status: 401 })
    }

    const token = await createAdminSessionToken()
    const response = NextResponse.json({ ok: true })
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (error) {
    console.error('Admin login failed', error)
    return NextResponse.json({ message: 'Giriş sırasında hata oluştu.' }, { status: 500 })
  }
}

