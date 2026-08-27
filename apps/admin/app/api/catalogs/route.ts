import { NextResponse } from 'next/server'
import { readCatalogsStore, writeCatalogsStore, type CatalogsStore } from '@/lib/catalogs-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'
import { revalidateWebSite } from '@/lib/web-revalidate'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const store = await readCatalogsStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read catalogs store', error)
    return NextResponse.json({ message: 'Katalog verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    assertR2ConfiguredForProduction()
    const body = (await request.json()) as CatalogsStore
    await writeCatalogsStore(body)
    await revalidateWebSite()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write catalogs store', error)
    return NextResponse.json({ message: 'Katalog kaydedilemedi.' }, { status: 500 })
  }
}
