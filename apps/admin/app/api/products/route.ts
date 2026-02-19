import { NextResponse } from 'next/server'
import { readProductStore, writeProductStore, type ProductStore } from '@/lib/products-store'

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
    const body = (await request.json()) as ProductStore

    if (!Array.isArray(body.categories) || !Array.isArray(body.products)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeProductStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write products store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
