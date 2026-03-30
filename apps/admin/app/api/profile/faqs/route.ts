import { NextResponse } from 'next/server'
import { readProfileFaqStore, writeProfileFaqStore, type ProfileFaqStore } from '@/lib/profile-faq-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'
import { revalidateProfilSite } from '@/lib/profil-revalidate'

export async function GET() {
  try {
    const store = await readProfileFaqStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read profile faq store', error)
    return NextResponse.json({ message: 'SSS verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    assertR2ConfiguredForProduction()
    const body = (await request.json()) as ProfileFaqStore

    if (!Array.isArray(body.items)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeProfileFaqStore(body)
    await revalidateProfilSite()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write profile faq store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
