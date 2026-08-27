import { NextResponse } from 'next/server'
import { readProductStore, writeProductStore, type ProductStore } from '@/lib/products-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'
import { revalidateWebSite } from '@/lib/web-revalidate'

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
  let body: ProductStore | null = null

  try {
    assertR2ConfiguredForProduction()
    body = (await request.json()) as ProductStore

    if (!Array.isArray(body.categories) || !Array.isArray(body.products)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeProductStore(body)
    await revalidateWebSite()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write products store', error)

    // Some hosting environments can throw after a successful upstream write.
    // If persisted store already matches the incoming payload, treat it as success.
    if (body && Array.isArray(body.categories) && Array.isArray(body.products)) {
      try {
        const latest = await readProductStore()
        if (JSON.stringify(latest) === JSON.stringify(body)) {
          await revalidateWebSite()
          return NextResponse.json({ ok: true, recovered: true })
        }
      } catch (recoveryError) {
        console.error('Failed to recover products write status', recoveryError)
      }
    }

    const message = error instanceof Error ? error.message : 'Kayit basarisiz.'
    return NextResponse.json({ message }, { status: 500 })
  }
}
