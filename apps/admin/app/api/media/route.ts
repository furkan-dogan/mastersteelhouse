import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const mediaServerUrl = (process.env.MEDIA_SERVER_URL || "http://185.231.111.126:8080").replace(/\/$/, "")

export async function GET() {
  try {
    const res = await fetch(`${mediaServerUrl}/list`, { cache: "no-store" })
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Medya sunucusu ulaşılamıyor" }, { status: 502 })
    }
    const data = await res.json()
    const items = (data.items || []).map((item: any) => ({
      _id: item.filename,
      filename: item.filename,
      url: item.url,
      originalName: item.originalName || item.filename,
      mimeType: item.mimeType || item.type || "application/octet-stream",
      size: item.size || 0,
      createdAt: item.createdAt || new Date().toISOString(),
    }))
    return NextResponse.json({ ok: true, items })
  } catch {
    return NextResponse.json({ ok: false, error: "Medya sunucusu ulaşılamıyor" }, { status: 502 })
  }
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const files = formData.getAll("files").filter((entry) => entry instanceof File) as File[]
  const singleFile = formData.get("file")
  if (files.length === 0 && !(singleFile instanceof File)) {
    return NextResponse.json({ ok: false, error: "Dosya bulunamadı" }, { status: 400 })
  }

  try {
    if (files.length > 1) {
      const payload = new FormData()
      files.forEach((file) => payload.append("files", file))
      const res = await fetch(`${mediaServerUrl}/upload-multiple`, {
        method: "POST",
        body: payload,
      })
      const data = await res.json()
      return NextResponse.json({ ok: res.ok, items: data.items || [], error: data.error })
    }

    const file = files[0] || (singleFile as File)
    const payload = new FormData()
    payload.append("file", file)
    const res = await fetch(`${mediaServerUrl}/upload`, { method: "POST", body: payload })
    const data = await res.json()
    return NextResponse.json({ ok: res.ok, item: data.item, error: data.error })
  } catch {
    return NextResponse.json({ ok: false, error: "Yükleme başarısız" }, { status: 502 })
  }
}
