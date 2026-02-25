import { NextResponse } from 'next/server'
import { readNewsStore, writeNewsStore, type NewsStore } from '@/lib/profile-news-store'

export async function GET() {
  try {
    const store = await readNewsStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read profile news store', error)
    return NextResponse.json({ message: 'Haber verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as NewsStore
    if (!Array.isArray(body.posts)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeNewsStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write profile news store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
