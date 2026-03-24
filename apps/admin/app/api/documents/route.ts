import { NextResponse } from 'next/server'
import { readDocumentsStore, writeDocumentsStore, type DocumentsStore } from '@/lib/documents-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const store = await readDocumentsStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read documents store', error)
    return NextResponse.json({ message: 'Belgeler verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    assertR2ConfiguredForProduction()
    const body = (await request.json()) as DocumentsStore
    await writeDocumentsStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write documents store', error)
    return NextResponse.json({ message: 'Belgeler kaydedilemedi.' }, { status: 500 })
  }
}
