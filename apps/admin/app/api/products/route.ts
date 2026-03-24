import { NextResponse } from 'next/server'
import { readProductStore, writeProductStore, type ProductStore } from '@/lib/products-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'

export async function GET() {
  try {
    const store = await readProductStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read products store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    assertR2ConfiguredForProduction()
    const body = (await request.json()) as ProductStore

    if (!Array.isArray(body.categories) || !Array.isArray(body.products)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeProductStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write products store', error)
    const message = error instanceof Error ? error.message : 'Kayit basarisiz.'
    return NextResponse.json({ message }, { status: 500 })
  }
}
