import { NextResponse } from 'next/server'
import { readCatalogsStore, writeCatalogsStore, type CatalogsStore } from '@/lib/profile-catalogs-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'

export async function GET() {
  try {
    const store = await readCatalogsStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read profile catalogs store', error)
    return NextResponse.json({ message: 'Katalog verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    assertR2ConfiguredForProduction()
    const body = (await request.json()) as CatalogsStore
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeCatalogsStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write profile catalogs store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
