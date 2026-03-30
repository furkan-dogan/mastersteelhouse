import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? ''

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Geçersiz token.' }, { status: 401 })
  }

  revalidatePath('/', 'layout')

  return NextResponse.json({ revalidated: true })
}
