import { NextResponse } from 'next/server'
import { readReferenceStore, writeReferenceStore, type ReferenceStore } from '@/lib/references-store'

export async function GET() {
  try {
    const store = await readReferenceStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read reference store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as ReferenceStore
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }
    await writeReferenceStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write reference store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
