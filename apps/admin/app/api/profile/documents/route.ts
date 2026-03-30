import { NextResponse } from 'next/server'
import { readDocumentsStore, writeDocumentsStore, type DocumentsStore } from '@/lib/profile-documents-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'
import { revalidateProfilSite } from '@/lib/profil-revalidate'

export async function GET() {
  try {
    const store = await readDocumentsStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read profile documents store', error)
    return NextResponse.json({ message: 'Belge verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    assertR2ConfiguredForProduction()
    const body = (await request.json()) as DocumentsStore
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeDocumentsStore(body)
    await revalidateProfilSite()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write profile documents store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
